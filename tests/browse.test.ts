/**
 * The reference screen's projection of the decks.
 *
 * Nothing here is graded, so there is no "exactly one correct option" to
 * check. What matters instead is that the projection is complete and honest:
 * that every deck reaches the page, that nothing arrives blank, that the item
 * ids are the scheduler's real ones — otherwise the mastery dots would be
 * quietly wrong, which is worse than having none — and that search finds a
 * word by any of the ways someone might half-remember it.
 */
import {
  BROWSE_DECKS,
  deckSize,
  matches,
  search,
  sectionsFor,
  type BrowseDeck,
} from '../src/lib/browse';
import { ALL_KANA } from '../src/data/kana';
import { ALL_KANJI } from '../src/data/kanji';
import { ALL_WORDS } from '../src/data/words';
import { ALL_VERBS } from '../src/data/conjugation';
import { ALL_DUOLINGO_WORDS } from '../src/data/duolingo';
import { en } from '../src/i18n/en';
import { nl } from '../src/i18n/nl';
import { eq, ok } from './assert';

const lines = (deck: BrowseDeck, s = en) => sectionsFor(deck, s).flatMap((x) => x.lines);

// -------------------------------------------------------------- coverage

eq('every deck is listed', BROWSE_DECKS.length, 8);

for (const deck of BROWSE_DECKS) {
  const sections = sectionsFor(deck);
  ok(`${deck} produces sections`, sections.length > 0);
  ok(`every ${deck} section has lines`, sections.every((section) => section.lines.length > 0));
  ok(`every ${deck} section is named`, sections.every((section) => section.label.trim().length > 0));

  const all = sections.flatMap((section) => section.lines);
  ok(`no blank Japanese in ${deck}`, all.every((line) => line.jp.trim().length > 0));
  ok(`no blank meaning in ${deck}`, all.every((line) => line.gloss.trim().length > 0),
    all.filter((line) => !line.gloss.trim()).slice(0, 3).map((line) => line.jp).join('; '));
  ok(`no blank note in ${deck}`, all.every((line) => line.note === undefined || line.note.length > 0));

  // The count on the deck picker is worked out off the datasets rather than by
  // projecting them, so it has to agree with the projection it summarises.
  eq(`the ${deck} count matches what is shown`, deckSize(deck), all.length);
}

// The whole deck reaches the page, not just the first group of it.
eq('every kanji is readable', lines('kanji').length, ALL_KANJI.length);
eq('every word is readable', lines('words').length, ALL_WORDS.length);
eq('every kana is readable', lines('kana').length, ALL_KANA.length);
eq('every Duolingo word is readable', lines('duolingo').length, ALL_DUOLINGO_WORDS.length);

// ------------------------------------------------------------- item ids

/**
 * A dot drawn against the wrong id would report someone else's accuracy, so
 * these have to be the ids the scheduler actually writes.
 */
const NAMESPACE: Record<BrowseDeck, string> = {
  kana: 'kana:',
  kanji: 'kanji:',
  counters: 'counter:',
  words: 'vocab:',
  conjugation: 'conj:',
  particles: 'particle:',
  reading: 'reading:',
  duolingo: 'duo:',
};

for (const deck of BROWSE_DECKS) {
  const wrong = lines(deck).filter((line) => !line.itemId.startsWith(NAMESPACE[deck]));
  ok(`${deck} lines carry the scheduler's ids`, wrong.length === 0,
    wrong.slice(0, 3).map((line) => line.itemId).join('; '));
}

// --------------------------------------------------------------- content

// The conjugation page is the one that earns its place: every derived form at
// once, which no card can show.
const kaku = lines('conjugation').find((line) => line.jp === '書く');
ok('the conjugation page finds 書く', Boolean(kaku));
for (const form of ['書きます', '書いて', '書かない', '書いた']) {
  ok(`and shows ${form}`, kaku!.note!.includes(form), kaku!.note);
}

// An irregular verb has no rule to derive it, only overrides — if those were
// missed this would throw rather than fail, so it is worth naming.
const suru = lines('conjugation').find((line) => line.jp === 'する');
ok('irregular verbs still lay out their forms', Boolean(suru?.note?.includes('します')));
ok('every verb reaches the page', lines('conjugation').length >= ALL_VERBS.length);

// Particles are shown filled in: a gap is a question, and this page asks none.
const particles = lines('particles');
ok('particle sentences are shown filled in', particles.every((line) => !line.jp.includes('＿')),
  particles.filter((line) => line.jp.includes('＿')).slice(0, 3).map((line) => line.jp).join('; '));
ok('and each says why it takes the particle it does',
  particles.every((line) => (line.note ?? '').length > 0));

// Kanji bring their readings and example words along.
const nichi = lines('kanji').find((line) => line.jp === '日');
ok('kanji show their readings', Boolean(nichi?.note?.includes('on')));
ok('and an example word with its reading', Boolean(nichi?.note?.includes('日曜日（にちようび）')),
  nichi?.note);

// A word already written in kana has nothing to add on a second line.
const kore = lines('words').find((line) => line.jp === 'これ');
eq('kana-only words show no separate reading', kore!.reading, '');
const tegami = lines('words').find((line) => line.jp === '手紙');
eq('but words with kanji do', tegami!.reading, 'てがみ');

// ---------------------------------------------------------------- search

const words = sectionsFor('words');
ok('search finds a word by its meaning', search(words, 'letter').some((l) => l.jp === '手紙'));
ok('by its kana', search(words, 'てがみ').some((l) => l.jp === '手紙'));
ok('by its kanji', search(words, '手紙').some((l) => l.jp === '手紙'));
// The point of this one: someone who cannot type kana can still look a word up.
ok('and by its romaji', search(words, 'tegami').some((l) => l.jp === '手紙'),
  'romaji search missed 手紙');

ok('search ignores case', search(words, 'LETTER').some((l) => l.jp === '手紙'));
eq('an empty search matches everything', search(words, '   ').length, lines('words').length);
eq('a search that matches nothing returns nothing', search(words, 'zzzzzz').length, 0);

ok('a line matches itself by every field it shows',
  lines('kanji').every((line) => matches(line, line.gloss.split(',')[0].trim())));

// Search has to reach the whole Duolingo deck, not just the units on screen.
const duolingo = sectionsFor('duolingo');
ok('search reaches deep into the Duolingo deck',
  search(duolingo, 'tabemasu').some((line) => line.jp === '食べます'));

// ------------------------------------------------------------- in Dutch

for (const deck of BROWSE_DECKS) {
  eq(`the Dutch ${deck} page has the same lines`, lines(deck, nl).length, lines(deck).length);
  ok(`and nothing on it is blank`, lines(deck, nl).every((line) => line.gloss.trim().length > 0));
}

/**
 * Where a deck has been translated the page follows it, and where it has not
 * the page falls back to English rather than to a blank — which is the whole
 * point of the content fallback, and is why the assertion above about nothing
 * being blank is the more important of the two.
 *
 * Group names are translated for every deck, so they are asked first. The
 * per-item meanings are not: the N5 word deck's Dutch table is still empty,
 * while the imported Duolingo deck arrived with a Dutch gloss for most of it.
 */
const enLabels = sectionsFor('words').map((section) => section.label);
const nlLabels = sectionsFor('words', nl).map((section) => section.label);
ok('the Dutch page names its groups in Dutch',
  nlLabels.some((label, i) => label !== enLabels[i]), nlLabels.slice(0, 3).join('; '));

const enDuolingo = lines('duolingo');
const nlDuolingo = lines('duolingo', nl);
const translated = nlDuolingo.filter((line, i) => line.gloss !== enDuolingo[i].gloss).length;
ok('and glosses the Duolingo deck in Dutch where it can',
  translated > nlDuolingo.length / 4, `${translated}/${nlDuolingo.length}`);

const untranslated = lines('words', nl);
ok('while an untranslated deck falls back to English rather than to a blank',
  untranslated.every((line) => line.gloss.trim().length > 0));
