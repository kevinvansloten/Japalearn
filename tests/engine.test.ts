import { buildKanaCards, buildKanjiCards, type KanjiConfig } from '../src/lib/buildCards';
import { KANA_GROUPS } from '../src/data/kana';
import { KANJI_GROUPS } from '../src/data/kanji';
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
  const candidates = [card.answer, bare, bare.split(' / ')[0], bare.split('、')[0]];
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
  modes: ['meaning', 'reading', 'recall', 'vocab'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', vocab: 'type' },
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
  inputModes: { meaning: 'choice', reading: 'choice', recall: 'choice', vocab: 'choice' },
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
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', vocab: 'type' },
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
