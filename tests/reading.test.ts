import { ALL_ADJECTIVES, ALL_VERBS } from '../src/data/conjugation';
import { ALL_COUNTERS } from '../src/data/counters';
import { ALL_KANJI } from '../src/data/kanji';
import { ALL_WORDS } from '../src/data/words';
import {
  ALL_READING_SENTENCES,
  READING_GROUPS,
  reading,
  written,
} from '../src/data/reading';
import { buildReadingCards, readingPool, type ReadingConfig } from '../src/lib/buildCards';
import { eq, ok } from './assert';

const base: ReadingConfig = {
  groupIds: READING_GROUPS.map((g) => g.id),
  excluded: [],
  modes: ['meaning'],
  flow: 'once',
  order: 'ordered',
};

// ---------------------------------------------------------- data health

ok('every group has sentences', READING_GROUPS.every((g) => g.sentences.length > 0));
eq('no duplicate sentences',
  new Set(ALL_READING_SENTENCES.map(written)).size, ALL_READING_SENTENCES.length);
eq('no duplicate translations',
  new Set(ALL_READING_SENTENCES.map((s) => s.english)).size, ALL_READING_SENTENCES.length);
ok('every sentence is translated',
  ALL_READING_SENTENCES.every((s) => s.english.trim().length > 0));

/**
 * The reading is derived from the same segments as the written form, so the
 * two cannot drift — but a segment carrying kanji with no reading would leave
 * kanji in what is meant to be kana, and get spoken wrong.
 */
const unreadable = ALL_READING_SENTENCES.filter((s) => /[一-龯]/.test(reading(s)));
ok('the derived reading is free of kanji', unreadable.length === 0,
  unreadable.slice(0, 5).map((s) => `${written(s)} -> ${reading(s)}`).join('; '));

// A ruby that repeats its own base is a mistake, not furigana.
const pointless = ALL_READING_SENTENCES.flatMap((s) =>
  s.segments.filter(([text, ruby]) => ruby !== undefined && ruby === text).map(() => written(s)),
);
ok('no segment is annotated with itself', pointless.length === 0, pointless.join('; '));

// Furigana belong over kanji. A reading on a kana-only run would render as
// ruby over kana, which is noise.
const rubyOnKana = ALL_READING_SENTENCES.flatMap((s) =>
  s.segments
    .filter(([text, ruby]) => ruby !== undefined && !/[一-龯]/.test(text))
    .map(([text]) => `${written(s)}: "${text}"`),
);
ok('furigana only sit over kanji', rubyOnKana.length === 0, rubyOnKana.slice(0, 5).join('; '));

// Every reading must be kana, or it cannot be spoken.
const badRuby = ALL_READING_SENTENCES.flatMap((s) =>
  s.segments
    .filter(([, ruby]) => ruby !== undefined && !/^[ぁ-ゖァ-ヺー]+$/.test(ruby))
    .map(([text, ruby]) => `${text}=${ruby}`),
);
ok('every furigana reading is kana', badRuby.length === 0, badRuby.join('; '));

// The whole point of this deck is reusing what the app already teaches.
const taught = new Set<string>();
for (const text of [
  ...ALL_KANJI.map((k) => k.char),
  ...ALL_KANJI.flatMap((k) => k.vocab.map((v) => v.word)),
  ...ALL_WORDS.map((w) => w.word),
  ...ALL_COUNTERS.map((c) => c.form),
  ...ALL_VERBS.map((v) => v.word),
  ...ALL_ADJECTIVES.map((a) => a.word),
]) {
  for (const ch of text) taught.add(ch);
}
const untaught = new Set<string>();
for (const sentence of ALL_READING_SENTENCES) {
  for (const ch of written(sentence)) {
    if (/[一-龯]/.test(ch) && !taught.has(ch)) untaught.add(ch);
  }
}
ok('sentences only use kanji taught elsewhere in the app', untaught.size === 0,
  [...untaught].join(' '));

// Sentences should be sentences, not fragments or essays.
const wrongLength = ALL_READING_SENTENCES.filter((s) => {
  const text = written(s);
  return text.length < 5 || text.length > 26 || !/[。？]$/.test(text);
});
ok('every sentence is a sensible length and ends properly', wrongLength.length === 0,
  wrongLength.map(written).join('; '));

// ---------------------------------------------------------------- cards

const cards = buildReadingCards(base);
eq('one card per sentence', cards.length, ALL_READING_SENTENCES.length);
ok('the sentence is the prompt', cards.every((c) => c.prompt.length > 0));
ok('every card carries its furigana', cards.every((c) => (c.promptRuby?.length ?? 0) > 0));
ok('the prompt and its segments agree',
  cards.every((c) => c.promptRuby!.map(([t]) => t).join('') === c.prompt));

// Comprehension can only be multiple choice, never typed.
ok('reading cards are always choice', cards.every((c) => c.inputMode === 'choice'));
const ambiguous = cards.filter((c) => c.choices!.filter((o) => c.check(o)).length !== 1);
ok('exactly one correct option per card', ambiguous.length === 0,
  ambiguous.slice(0, 5).map((c) => c.prompt).join('; '));
ok('four options each', cards.every((c) => c.choices!.length === 4));

const first = cards.find((c) => c.prompt.startsWith('私は毎日'))!;
ok('the everyday sentence is there', Boolean(first));
ok('it accepts its translation', first.check('I eat bread every day.'));
ok('it rejects another sentence', !first.check('I go to school.'));
ok('it speaks the kana, not the kanji', /^[ぁ-ゖァ-ヺー。、]+$/.test(first.speech!), first.speech);

// Listening hides the sentence and plays it instead.
const listening = buildReadingCards({ ...base, modes: ['listening'] });
eq('a listening card per sentence', listening.length, ALL_READING_SENTENCES.length);
ok('listening prompts are audio', listening.every((c) => c.promptScript === 'audio'));
ok('listening shows nothing', listening.every((c) => c.prompt === ''));
ok('listening reveals the sentence',
  listening.every((c) => c.details!.some((d) => /[ぁ-ゖァ-ヺ一-龯]/.test(d))));

const both = buildReadingCards({ ...base, modes: ['meaning', 'listening'] });
eq('card ids are unique', new Set(both.map((c) => c.id)).size, both.length);
ok('both modes share one schedule per sentence',
  new Set(both.map((c) => c.itemId)).size === ALL_READING_SENTENCES.length);

// ------------------------------------------------------------ selection

eq('groups filter the pool',
  readingPool({ ...base, groupIds: ['questions'] }).length,
  READING_GROUPS.find((g) => g.id === 'questions')!.sentences.length);
eq('no groups means no cards', buildReadingCards({ ...base, groupIds: [] }).length, 0);
