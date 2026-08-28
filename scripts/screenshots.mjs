// Regenerates the README screenshots in docs/screenshots.
//
//   npm run build && npx vite preview --port 4173 --strictPort   (in one shell)
//   node scripts/screenshots.mjs docs/screenshots                (in another)
//
// Drives headless Edge over the DevTools protocol using Node's built-in
// WebSocket, so there is nothing extra to install. The app is seeded with a
// little practice history first, so the progress affordances are visible.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9333;
const BASE = 'http://localhost:4173';
const OUT = process.argv[2] ?? 'docs/screenshots';
const PROFILE = join(process.env.TEMP, `japanlearner-shots-${Date.now()}`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(OUT, { recursive: true });

const edge = spawn(EDGE, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${PROFILE}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--hide-scrollbars',
  '--window-size=1100,900',
  BASE,
], { stdio: 'ignore' });

// Wait for the debugging endpoint to come up.
let target = null;
for (let i = 0; i < 60; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    target = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
    if (target) break;
  } catch {}
  await sleep(500);
}
if (!target) throw new Error('Edge devtools endpoint never appeared');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.addEventListener('open', res, { once: true });
  ws.addEventListener('error', rej, { once: true });
});

let nextId = 1;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(`eval failed: ${JSON.stringify(r.exceptionDetails)}`);
  return r.result.value;
};

await send('Page.enable');
await send('Runtime.enable');

async function viewport(width, height) {
  await send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: 2, mobile: false,
  });
}

async function goto(url) {
  await send('Page.navigate', { url });
  await sleep(900);
}

async function shot(name, height = 900) {
  await viewport(1100, height);
  await sleep(450);
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  const file = join(OUT, `${name}.png`);
  writeFileSync(file, Buffer.from(data, 'base64'));
  console.log(`wrote ${name}.png (${height}px tall)`);
}

/** Click a button by its visible text, then let React settle. */
async function click(text) {
  const found = await evaluate(`(() => {
    const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes(${JSON.stringify(text)}));
    if (!b) return false;
    b.click();
    return true;
  })()`);
  if (!found) throw new Error(`no button containing "${text}"`);
  await sleep(400);
}

// ------------------------------------------------------------ 1. home

// Seed a little practice history so the progress affordances are visible.
await goto(BASE);
await evaluate(`(() => {
  const store = { items: {}, prefs: {} };
  const seed = { '日': [9,1], '月': [8,2], '火': [6,3], '水': [7,1], '木': [4,4],
                 '金': [5,2], '土': [3,5], '曜': [2,6], '年': [6,1], '時': [7,2],
                 '分': [3,4], '半': [5,1], '今': [8,1], '間': [2,5], '毎': [4,2], '週': [3,3] };
  const DAY = 24 * 60 * 60 * 1000;
  const now = Date.now();
  let i = 0;
  for (const [char, [right, wrong]] of Object.entries(seed)) {
    // Half are scheduled and already due, the rest are still unseen, so the
    // review panel shows both counts.
    const scheduled = i < 8;
    store.items['kanji:' + char] = {
      right, wrong, lastSeen: now,
      ...(scheduled ? { box: 1 + (i % 3), due: now - (1 + i) * DAY } : {}),
    };
    i += 1;
  }
  store.prefs.newIntroduced = { date: new Date().toLocaleDateString('en-CA'), count: 12 };
  store.items['kana:vowels-あ'] = { right: 12, wrong: 1, lastSeen: Date.now() };
  store.items['kana:k-か'] = { right: 9, wrong: 3, lastSeen: Date.now() };
  store.prefs.kanji = {
    groupIds: ['time'], excluded: [], modes: ['reading'],
    inputModes: { meaning: 'type', reading: 'choice', recall: 'choice', vocab: 'type', listening: 'type' },
    flow: 'mistakes', order: 'ordered',
  };
  store.prefs.conjugation = {
    groupIds: ['godan'], excluded: [], verbForms: ['masu', 'te'],
    adjectiveForms: ['negative', 'past'], modes: ['produce'],
    inputModes: { produce: 'type', identify: 'choice', dictionary: 'type' },
    flow: 'mistakes', order: 'shuffled',
  };
  store.prefs.words = {
    groupIds: ['pointing'], excluded: [], modes: ['meaning'],
    inputModes: { meaning: 'type', reading: 'type', recall: 'choice', listening: 'type' },
    flow: 'mistakes', order: 'shuffled',
  };
  store.prefs.counters = {
    groupIds: ['time'], excluded: [], modes: ['reading'],
    inputModes: { reading: 'type', meaning: 'type', listening: 'type' },
    flow: 'mistakes', order: 'ordered',
  };
  store.prefs.kana = {
    scripts: ['hira'], groupIds: ['vowels','k','s','t','n','h','m','y','r','w'],
    modes: ['recognition'], flow: 'mistakes', order: 'ordered',
  };
  localStorage.setItem('japanlearner.v1', JSON.stringify(store));
  return 'seeded';
})()`);
await goto(BASE);
await shot('home', 1120);

// ------------------------------------------------------- 2. kanji quiz

await click('Kanji — JLPT N5');
await click('Start —');
// Hold on the feedback state instead of auto-advancing past it.
await evaluate(`document.querySelector('input[type=checkbox]').click()`);
await sleep(300);
// Ordered + the "time" group means the first card is 日, whose on'yomi is ニチ.
await click('ニチ');
await shot('quiz', 980);

// ------------------------------------------------------ 3. kanji setup

await click('Settings');
await evaluate(`window.scrollTo(0, 150)`);
await sleep(300);
await shot('setup', 820);

ws.close();
edge.kill();
await sleep(300);
try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
console.log('done');
process.exit(0);
