import { buildKanaCards, buildKanjiCards, type KanjiConfig } from '../src/lib/buildCards';
import { ALL_KANA, KANA_GROUPS } from '../src/data/kana';
import { KANA_LOOKALIKE_SETS, KANJI_LOOKALIKE_SETS } from '../src/data/confusables';
import { ALL_KANJI, KANJI_GROUPS } from '../src/data/kanji';
import { createSession, sessionReducer, type Card, type SessionState } from '../src/lib/session';
import { ok } from './assert';

const allKanaGroups = KANA_GROUPS.map((g) => g.id);
const allKanjiGroups = KANJI_GROUPS.map((g) => g.id);

const answer = (s: SessionState, given: string) =>
  sessionReducer(sessionReducer(s, { type: 'answer', given }), { type: 'next' });

/** Produce something the card will actually accept, derived from what it displays. */
function correctAnswerFor(card: Card): string {
  if (card.choices) return card.choices.find((c) => card.check(c))!;
  const bare = card.answer.replace(/\s*[(（].*$/, '');
  const candidates = [
    card.answer,
    bare,
    ...bare.split(/\s+/).filter(Boolean),
    bare.split(' / ')[0],
    bare.split('、')[0],
  ];
  const found = candidates.find((c) => card.check(c));
  if (found !== undefined) return found;
  throw new Error(`no accepted answer for ${card.id} (answer="${card.answer}")`);
}

/** Play a session, answering correctly unless the card id is in `missIds`. */
function play(cards: Card[], flow: 'once' | 'mistakes' | 'endless', missIds: Set<string>, cap = 500) {
  let s = createSession(cards, { flow, order: 'ordered' });
  let steps = 0;
  while (s.phase !== 'done' && steps < cap) {
    const card = s.byId[s.currentId!];
    // A deliberately wrong answer that no card would accept.
    s = answer(s, missIds.has(card.id) ? '@@@wrong@@@' : correctAnswerFor(card));
    steps += 1;
  }
  return { state: s, steps };
}

// ------------------------------------------------------------ card decks

const everyKana = buildKanaCards({
  scripts: ['hira', 'kata'],
  groupIds: allKanaGroups,
  modes: ['recognition', 'recall'],
  flow: 'once',
  order: 'ordered',
});
// Duplicate ids would silently collapse cards in the session's lookup map.
ok('kana ids unique', new Set(everyKana.map((c) => c.id)).size === everyKana.length);
ok('kana card count', everyKana.length === 104 * 2 * 2, `${everyKana.length}`);

const fullKanji: KanjiConfig = {
  groupIds: allKanjiGroups,
  excluded: [],
  modes: ['meaning', 'reading', 'recall', 'vocab', 'listening'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', vocab: 'type', listening: 'type' },
  flow: 'once',
  order: 'ordered',
};
const everyKanji = buildKanjiCards(fullKanji);
ok('kanji ids unique', new Set(everyKanji.map((c) => c.id)).size === everyKanji.length);

// Every card must accept something a learner could reasonably produce from what
// it shows, or the deck contains cards that cannot be answered correctly.
const unanswerable: string[] = [];
for (const card of everyKanji.concat(everyKana)) {
  try {
    correctAnswerFor(card);
  } catch {
    unanswerable.push(`${card.id} → "${card.answer}"`);
  }
}
ok('every card has an acceptable answer', unanswerable.length === 0, unanswerable.slice(0, 5).join('; '));

// Ambiguous distractors would make a question unanswerable in multiple choice.
const choiceCards = buildKanjiCards({
  ...fullKanji,
  inputModes: { meaning: 'choice', reading: 'choice', recall: 'choice', vocab: 'choice', listening: 'choice' },
}).filter((c) => c.choices);
const badChoice = choiceCards.filter((c) => c.choices!.filter((o) => c.check(o)).length !== 1);
ok('exactly one correct option per choice card', badChoice.length === 0,
  badChoice.slice(0, 5).map((c) => c.id).join('; '));
ok('choice cards have options', choiceCards.every((c) => c.choices!.length >= 2));

// ----------------------------------------------------------------- flows

const three = buildKanaCards({
  scripts: ['hira'], groupIds: ['y'], modes: ['recognition'], flow: 'once', order: 'ordered',
});
ok('small deck size', three.length === 3, `${three.length}`);

const clean = play(three, 'once', new Set());
ok('once: completes', clean.state.phase === 'done');
ok('once: all answered', clean.state.answered === 3, `${clean.state.answered}`);
ok('once: all correct', clean.state.correct === 3, `${clean.state.correct}`);
ok('once: no missed', clean.state.missed.length === 0);

const sloppy = play(three, 'once', new Set([three[1].id]));
ok('once: wrong does not requeue', sloppy.state.answered === 3, `${sloppy.state.answered}`);
ok('once: one missed', sloppy.state.missed.length === 1);

// In the mistakes flow a missed card comes back, so the session takes more turns
// than there are cards, and still ends once everything has been answered right.
const missOnce = new Set([three[1].id]);
let s = createSession(three, { flow: 'mistakes', order: 'ordered' });
let turns = 0;
while (s.phase !== 'done' && turns < 100) {
  const card = s.byId[s.currentId!];
  const beWrong = missOnce.has(card.id);
  if (beWrong) missOnce.delete(card.id);
  s = answer(s, beWrong ? '@@@wrong@@@' : correctAnswerFor(card));
  turns += 1;
}
ok('mistakes: completes', s.phase === 'done');
ok('mistakes: missed card came back', s.answered === 4, `${s.answered}`);
ok('mistakes: nothing left pending', s.pending.length === 0, JSON.stringify(s.pending));

const stubborn = play(three, 'mistakes', new Set([three[0].id]), 40);
ok('mistakes: never ends while a card is unlearned', stubborn.state.phase !== 'done');

const endless = play(three, 'endless', new Set(), 50);
ok('endless: never done', endless.state.phase !== 'done');
ok('endless: keeps serving cards', endless.state.answered === 50, `${endless.state.answered}`);

// ----------------------------------------------------------------- vocab

const numbers = KANJI_GROUPS.find((g) => g.id === 'numbers')!;
const vocab = buildKanjiCards({
  groupIds: ['numbers'],
  excluded: numbers.kanji.map((k) => k.char).filter((c) => c !== '一'),
  modes: ['vocab'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', vocab: 'type', listening: 'type' },
  flow: 'once',
  order: 'ordered',
});
ok('vocab: two cards for 一', vocab.length === 2, `${vocab.length}`);
ok('vocab: prompt is the word', vocab[0].prompt === '一つ', vocab[0].prompt);
ok('vocab: accepts romaji', vocab[0].check('hitotsu'));
ok('vocab: accepts kana', vocab[0].check('ひとつ'));
ok('vocab: rejects nonsense', !vocab[0].check('nihon'));
ok('vocab: reveals the meaning', vocab[0].details!.some((d) => d.includes('one thing')));

// ------------------------------------------------------------ kana recall

const recall = buildKanaCards({
  scripts: ['hira'], groupIds: ['k'], modes: ['recall'], flow: 'once', order: 'ordered',
});
ok('recall: is multiple choice', recall.every((c) => c.inputMode === 'choice'));
ok('recall: prompt is romaji', recall[0].prompt === 'ka', recall[0].prompt);
ok('recall: correct option present', recall[0].choices!.includes('か'));
ok('recall: grades correctly', recall[0].check('か') && !recall[0].check('き'));

// -------------------------------------------------------------- selection

const trimmed = buildKanjiCards({ ...fullKanji, modes: ['meaning'], excluded: ['一', '二'] });
const untrimmed = buildKanjiCards({ ...fullKanji, modes: ['meaning'], excluded: [] });
ok('exclusions apply', untrimmed.length - trimmed.length === 2,
  `${untrimmed.length} vs ${trimmed.length}`);

// ----------------------------------------------------- look-alike choices

// A set that names a character the deck does not contain can never be drawn,
// so the entry would be silently dead.
const kanaGlyphs = new Set(ALL_KANA.flatMap((k) => [k.hira, k.kata]));
const strayKana = KANA_LOOKALIKE_SETS.flat().filter((c) => !kanaGlyphs.has(c));
ok('kana look-alike sets only name real kana', strayKana.length === 0, strayKana.join(' '));

const kanjiChars = new Set(ALL_KANJI.map((k) => k.char));
const strayKanji = KANJI_LOOKALIKE_SETS.flat().filter((c) => !kanjiChars.has(c));
ok('kanji look-alike sets only name deck kanji', strayKanji.length === 0, strayKanji.join(' '));

// シ ツ ソ ン is the canonical katakana trap. With all four in the pool, the
// three distractor slots should be exactly the three look-alikes every time.
const katakanaRecall = buildKanaCards({
  scripts: ['kata'], groupIds: ['s', 't', 'w'], modes: ['recall'], flow: 'once', order: 'ordered',
});
const shiCard = katakanaRecall.find((c) => c.answer === 'シ')!;
ok('シ card exists', Boolean(shiCard));
ok('シ is drilled against ツ ソ ン',
  ['ツ', 'ソ', 'ン'].every((c) => shiCard.choices!.includes(c)),
  shiCard.choices!.join(' '));

// 木 本 休 体 all share a shape and all live in different groups.
const treeRecall = buildKanjiCards({
  ...fullKanji,
  groupIds: ['time', 'places', 'verbs', 'body'],
  modes: ['recall'],
  inputModes: { ...fullKanji.inputModes, recall: 'choice' },
});
const treeCard = treeRecall.find((c) => c.answer === '木')!;
ok('木 is drilled against 本 休 体',
  ['本', '休', '体'].every((c) => treeCard.choices!.includes(c)),
  treeCard.choices!.join(' '));

// Falling back to random distractors when nothing look-alike is in the pool.
const loneRecall = buildKanaCards({
  scripts: ['hira'], groupIds: ['k'], modes: ['recall'], flow: 'once', order: 'ordered',
});
ok('still fills four options without look-alikes in the pool',
  loneRecall.every((c) => c.choices!.length === 4),
  loneRecall.map((c) => c.choices!.length).join(','));

// --------------------------------------------------------------- audio

const listening = buildKanjiCards({
  ...fullKanji,
  groupIds: ['numbers'],
  excluded: numbers.kanji.map((k) => k.char).filter((c) => c !== '一'),
  modes: ['listening'],
});
ok('listening: one card per example word', listening.length === 2, `${listening.length}`);
ok('listening: the audio is the prompt', listening.every((c) => c.promptScript === 'audio'));
ok('listening: nothing is shown', listening.every((c) => c.prompt === ''));
ok('listening: speaks the reading', listening[0].speech === 'ひとつ', listening[0].speech);
ok('listening: accepts romaji', listening[0].check('hitotsu'));
ok('listening: rejects nonsense', !listening[0].check('nihon'));

// An audio prompt with nothing to say would be a blank, unanswerable card.
const mute = everyKanji.filter((c) => c.promptScript === 'audio' && !c.speech);
ok('no silent audio prompts', mute.length === 0, mute.map((c) => c.id).join('; '));

// Anything spoken must be kana, so the voice cannot pick the wrong reading of
// a bare kanji.
const spoken = everyKanji.concat(everyKana).filter((c) => c.speech);
const nonKana = spoken.filter((c) => !/^[぀-ヿー]+$/.test(c.speech!));
ok('spoken text is always kana', nonKana.length === 0,
  nonKana.slice(0, 5).map((c) => `${c.id}="${c.speech}"`).join('; '));
