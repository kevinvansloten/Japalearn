import { ALL_COUNTERS, COUNTER_GROUPS } from '../src/data/counters';
import { buildCounterCards, counterPool, type CounterConfig } from '../src/lib/buildCards';
import { checkReading, romajiToKana } from '../src/lib/romaji';
import { eq, ok } from './assert';

const base: CounterConfig = {
  groupIds: COUNTER_GROUPS.map((g) => g.id),
  excluded: [],
  modes: ['reading'],
  inputModes: { reading: 'type', meaning: 'type', listening: 'type' },
  flow: 'once',
  order: 'ordered',
};

// ---------------------------------------------------------- data health

ok('every group has items', COUNTER_GROUPS.every((g) => g.items.length > 0));
eq('no duplicate forms', new Set(ALL_COUNTERS.map((c) => c.form)).size, ALL_COUNTERS.length);

// A reading with a stray kanji or latin letter in it would be unanswerable and
// unspeakable, so hold the whole dataset to kana.
const badReadings = ALL_COUNTERS.filter((c) => !/^[ぁ-ゖー]+$/.test(c.reading));
ok('every reading is hiragana', badReadings.length === 0,
  badReadings.slice(0, 5).map((c) => `${c.form}=${c.reading}`).join('; '));

const badAlts = ALL_COUNTERS.flatMap((c) => c.alt ?? []).filter((r) => !/^[ぁ-ゖー]+$/.test(r));
ok('every alternate reading is hiragana', badAlts.length === 0, badAlts.join('; '));

ok('every item has a meaning', ALL_COUNTERS.every((c) => c.meaning.trim().length > 0));

// Round-trip each reading through the romaji conversion the app grades with.
// If a reading cannot be typed, the card cannot be answered.
const untypeable = ALL_COUNTERS.filter((c) => !checkReading(c.reading, [c.reading]));
ok('every reading accepts itself', untypeable.length === 0,
  untypeable.slice(0, 5).map((c) => c.form).join('; '));

// -------------------------------------------------- the sound changes

/** The readings that most often go wrong, checked individually. */
const expected: [string, string][] = [
  ['一本', 'いっぽん'], ['三本', 'さんぼん'], ['六本', 'ろっぽん'], ['八本', 'はっぽん'],
  ['一匹', 'いっぴき'], ['三匹', 'さんびき'], ['六匹', 'ろっぴき'],
  ['一杯', 'いっぱい'], ['三杯', 'さんばい'], ['六杯', 'ろっぱい'],
  ['一人', 'ひとり'], ['二人', 'ふたり'], ['四人', 'よにん'],
  ['一日', 'ついたち'], ['二日', 'ふつか'], ['八日', 'ようか'], ['二十日', 'はつか'],
  ['四時', 'よじ'], ['七時', 'しちじ'], ['九時', 'くじ'],
  ['一分', 'いっぷん'], ['三分', 'さんぷん'], ['六分', 'ろっぷん'], ['十分', 'じゅっぷん'],
  ['四月', 'しがつ'], ['七月', 'しちがつ'], ['九月', 'くがつ'],
  ['三百', 'さんびゃく'], ['六百', 'ろっぴゃく'], ['八百', 'はっぴゃく'],
  ['三千', 'さんぜん'], ['八千', 'はっせん'],
  ['二十歳', 'はたち'],
];
const byForm = new Map(ALL_COUNTERS.map((c) => [c.form, c]));
const wrong = expected.filter(([form, reading]) => byForm.get(form)?.reading !== reading);
ok('the notorious readings are right', wrong.length === 0,
  wrong.map(([f, r]) => `${f} should be ${r}, got ${byForm.get(f)?.reading}`).join('; '));

// Anything whose reading shifts should be flagged, so the reveal can say so
// and the picker can mark it.
const unflagged = expected
  .map(([form]) => form)
  .filter((form) => byForm.get(form)?.irregular !== true);
ok('the shifted forms are flagged as irregular', unflagged.length === 0, unflagged.join('; '));

// ---------------------------------------------------------- the cards

const reading = buildCounterCards(base);
eq('one reading card per item', reading.length, ALL_COUNTERS.length);
ok('prompts are the written form', reading.every((c) => c.promptScript === 'jp' && c.prompt));
ok('the meaning is shown as a hint', reading.every((c) => Boolean(c.promptNote)));

const roppon = reading.find((c) => c.prompt === '六本')!;
ok('六本 accepts romaji', roppon.check('roppon'));
ok('六本 accepts kana', roppon.check('ろっぽん'));
ok('六本 rejects the naive reading', !roppon.check('rokuhon'));
eq('六本 converts as expected', romajiToKana('roppon'), 'ろっぽん');

// Alternate readings must be accepted, or じっぷん would be marked wrong.
const juppun = reading.find((c) => c.prompt === '十分')!;
ok('十分 accepts じゅっぷん', juppun.check('じゅっぷん'));
ok('十分 also accepts じっぷん', juppun.check('じっぷん'));

const hatachi = reading.find((c) => c.prompt === '二十歳')!;
ok('二十歳 accepts はたち', hatachi.check('hatachi'));
ok('二十歳 rejects にじゅっさい', !hatachi.check('にじゅっさい'));
ok('二十歳 explains the irregularity',
  hatachi.details!.some((d) => d.includes('shifts')));

// Listening cards speak the reading and show nothing.
const listening = buildCounterCards({ ...base, modes: ['listening'] });
ok('listening cards are audio prompts', listening.every((c) => c.promptScript === 'audio'));
ok('listening cards all have speech', listening.every((c) => Boolean(c.speech)));
ok('listening speech is the reading',
  listening.find((c) => c.id.includes('六本'))!.speech === 'ろっぽん');

// Multiple choice must have exactly one right option in every mode.
const choices = (['reading', 'meaning', 'listening'] as const).flatMap((mode) =>
  buildCounterCards({
    ...base,
    modes: [mode],
    inputModes: { reading: 'choice', meaning: 'choice', listening: 'choice' },
  }),
);
const ambiguous = choices.filter((c) => c.choices!.filter((o) => c.check(o)).length !== 1);
ok('exactly one correct option per choice card', ambiguous.length === 0,
  ambiguous.slice(0, 5).map((c) => c.id).join('; '));

eq('card ids are unique', new Set(choices.map((c) => c.id)).size, choices.length);

// ------------------------------------------------------------ selection

eq('groups filter the pool',
  counterPool({ ...base, groupIds: ['days'] }).length,
  COUNTER_GROUPS.find((g) => g.id === 'days')!.items.length);
eq('exclusions apply',
  counterPool({ ...base, groupIds: ['days'], excluded: ['一日', '二日'] }).length,
  COUNTER_GROUPS.find((g) => g.id === 'days')!.items.length - 2);
eq('no groups means no cards', buildCounterCards({ ...base, groupIds: [] }).length, 0);
