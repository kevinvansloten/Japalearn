import { CURRICULUM } from '../src/data/curriculum';
import { ALL_ADJECTIVES, ALL_VERBS } from '../src/data/conjugation';
import { ALL_COUNTERS, COUNTER_GROUPS } from '../src/data/counters';
import { ALL_KANA, KANA_GROUPS } from '../src/data/kana';
import { ALL_KANJI, KANJI_GROUPS } from '../src/data/kanji';
import { ALL_PARTICLE_SENTENCES, PARTICLE_GROUPS } from '../src/data/particles';
import { ALL_WORDS, WORD_GROUPS } from '../src/data/words';
import { CONJUGATION_GROUPS } from '../src/data/conjugation';
import type { Decks } from '../src/lib/review';
import {
  STAGE_PASS_MARK,
  buildStageCards,
  currentStage,
  isStageComplete,
  stageItems,
  stageNumber,
  stageProgress,
} from '../src/lib/curriculum';
import { masteryOf, reviewForecast, summarise, weakest } from '../src/lib/progress';
import type { ItemStats } from '../src/lib/storage';
import { eq, ok } from './assert';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);
const stat = (over: Partial<ItemStats> = {}): ItemStats => ({
  right: 0, wrong: 0, lastSeen: 0, ...over,
});

const decks: Decks = {
  kana: { scripts: ['hira'], groupIds: [], modes: ['recognition'], flow: 'once', order: 'ordered' },
  kanji: {
    groupIds: [], excluded: [], modes: ['meaning'],
    inputModes: { meaning: 'type', reading: 'type', recall: 'choice', vocab: 'type', listening: 'type' },
    flow: 'once', order: 'ordered',
  },
  counters: {
    groupIds: [], excluded: [], modes: ['reading'],
    inputModes: { reading: 'type', meaning: 'type', listening: 'type' },
    flow: 'once', order: 'ordered',
  },
  words: {
    groupIds: [], excluded: [], modes: ['meaning'],
    inputModes: { meaning: 'type', reading: 'type', recall: 'choice', listening: 'type' },
    flow: 'once', order: 'ordered',
  },
  conjugation: {
    groupIds: [], excluded: [], verbForms: ['te'], adjectiveForms: ['negative'], modes: ['produce'],
    inputModes: { produce: 'type', identify: 'choice', dictionary: 'type' },
    flow: 'once', order: 'ordered',
  },
  particles: { groupIds: [], excluded: [], inputMode: 'choice', flow: 'once', order: 'ordered' },
};

// -------------------------------------------------------------- mastery

ok('an unseen item is unseen', masteryOf(undefined) === 'unseen');
ok('progress without a box is unseen', masteryOf(stat({ right: 9, wrong: 1 })) === 'unseen');
ok('box 1 is still learning', masteryOf(stat({ box: 1 })) === 'learning');
ok('box 2 is still learning', masteryOf(stat({ box: 2 })) === 'learning');
ok('box 3 counts as known', masteryOf(stat({ box: 3 })) === 'known');
ok('box 5 counts as known', masteryOf(stat({ box: 5 })) === 'known');

const summary = summarise(['a', 'b', 'c', 'd'], {
  a: stat({ box: 4, right: 4, wrong: 0 }),
  b: stat({ box: 1, right: 1, wrong: 1 }),
});
eq('counts what is known', summary.known, 1);
eq('counts what is being learned', summary.learning, 1);
eq('counts what is untouched', summary.unseen, 2);
eq('accuracy is over what was answered', summary.accuracy, 83);
eq('percent is known over total', summary.percent, 25);
eq('an empty set is not a division by zero', summarise([], {}).percent, 0);

// --------------------------------------------------------------- stages

eq('the plan has stages', CURRICULUM.length > 0, true);
eq('stage ids are unique', new Set(CURRICULUM.map((s) => s.id)).size, CURRICULUM.length);
ok('every stage says what it is for',
  CURRICULUM.every((s) => s.title.trim() && s.goal.trim()));
ok('every stage covers something', CURRICULUM.every((s) => s.parts.length > 0));

/**
 * A stage naming a group that does not exist would silently cover nothing,
 * and the learner could never finish it.
 */
const groupsByDeck: Record<string, Set<string>> = {
  kana: new Set(KANA_GROUPS.map((g) => g.id)),
  kanji: new Set(KANJI_GROUPS.map((g) => g.id)),
  counters: new Set(COUNTER_GROUPS.map((g) => g.id)),
  words: new Set(WORD_GROUPS.map((g) => g.id)),
  conjugation: new Set(CONJUGATION_GROUPS.map((g) => g.id)),
  particles: new Set(PARTICLE_GROUPS.map((g) => g.id)),
};
const strayGroups: string[] = [];
for (const stage of CURRICULUM) {
  for (const part of stage.parts) {
    for (const id of part.groupIds) {
      if (!groupsByDeck[part.deck].has(id)) strayGroups.push(`${stage.id}: ${part.deck}/${id}`);
    }
  }
}
ok('every stage names groups that exist', strayGroups.length === 0, strayGroups.join('; '));

const empty = CURRICULUM.filter((s) => stageItems(s).length === 0);
ok('no stage is empty', empty.length === 0, empty.map((s) => s.id).join('; '));

// The plan should account for essentially all the material, or following it
// leaves the learner with items they are never told about.
const planned = new Set(CURRICULUM.flatMap(stageItems));
const everything = [
  ...ALL_KANA.flatMap((k) => [`kana:hira:${k.id}`, `kana:kata:${k.id}`]),
  ...ALL_KANJI.map((k) => `kanji:${k.char}`),
  ...ALL_COUNTERS.map((c) => `counter:${c.form}`),
  ...ALL_WORDS.map((w) => `vocab:${w.word}`),
  ...[...ALL_VERBS, ...ALL_ADJECTIVES].map((v) => `conj:${v.word}`),
  ...ALL_PARTICLE_SENTENCES.map((s) => `particle:${s.text}`),
];
const unplanned = everything.filter((id) => !planned.has(id));
ok('the plan covers every item', unplanned.length === 0,
  `${unplanned.length} missed, e.g. ${unplanned.slice(0, 6).join(', ')}`);

// ------------------------------------------------------------ completion

const first = CURRICULUM[0];
const firstItems = stageItems(first);
eq('the first stage is hiragana', first.id, 'hiragana-basic');
eq('and it is the basic 46', firstItems.length, 46);

eq('an untouched stage is not complete', isStageComplete(first, {}), false);

const halfKnown = Object.fromEntries(
  firstItems.slice(0, Math.floor(firstItems.length / 2)).map((id) => [id, stat({ box: 4 })]),
);
eq('half known is not complete', isStageComplete(first, halfKnown), false);

const allKnown = Object.fromEntries(firstItems.map((id) => [id, stat({ box: 3 })]));
eq('all known is complete', isStageComplete(first, allKnown), true);

// Learning is not knowing: box 2 must not pass a stage.
const allLearning = Object.fromEntries(firstItems.map((id) => [id, stat({ box: 2 })]));
eq('a stage of box-2 items is not complete', isStageComplete(first, allLearning), false);

// The pass mark leaves room for a couple of stubborn items.
const nearlyAll = Object.fromEntries(
  firstItems.slice(0, Math.ceil(firstItems.length * STAGE_PASS_MARK)).map((id) => [id, stat({ box: 3 })]),
);
eq('the pass mark allows a few stragglers', isStageComplete(first, nearlyAll), true);

eq('the current stage starts at the first', currentStage({})!.id, CURRICULUM[0].id);
eq('finishing one moves you on', currentStage(allKnown)!.id, CURRICULUM[1].id);
eq('stage numbers are one-based', stageNumber(CURRICULUM[0]), 1);

const everythingKnown = Object.fromEntries(everything.map((id) => [id, stat({ box: 5 })]));
eq('finishing the plan leaves no current stage', currentStage(everythingKnown), null);
eq('a finished stage reports full progress',
  stageProgress(first, allKnown).known, firstItems.length);

// ---------------------------------------------------------------- cards

for (const stage of CURRICULUM) {
  const cards = buildStageCards(stage, decks);
  ok(`${stage.id} builds cards`, cards.length > 0, `${cards.length}`);
}

// A stage's cards must drill that stage's items and nothing else, or "study
// this" would quietly teach the wrong thing.
const strayCards: string[] = [];
for (const stage of CURRICULUM) {
  const allowed = new Set(stageItems(stage));
  for (const card of buildStageCards(stage, decks)) {
    if (!allowed.has(card.itemId)) strayCards.push(`${stage.id}: ${card.itemId}`);
  }
}
ok('stage cards only cover that stage', strayCards.length === 0, strayCards.slice(0, 5).join('; '));

// The kana stages are script-specific, so the cards must follow.
const katakanaStage = CURRICULUM.find((s) => s.id === 'katakana-basic')!;
const katakanaCards = buildStageCards(katakanaStage, decks);
ok('the katakana stage really shows katakana',
  katakanaCards.some((c) => /[ァ-ヺ]/.test(c.prompt) || /[ァ-ヺ]/.test(c.answer)));

// ------------------------------------------------------------- forecast

const forecast = reviewForecast(
  {
    a: stat({ box: 1, due: NOW - DAY }),
    b: stat({ box: 1, due: NOW + 2 * 60 * 60 * 1000 }),
    c: stat({ box: 2, due: NOW + 3 * DAY }),
    d: stat({ box: 2, due: NOW + 90 * DAY }),
    e: stat({ right: 1, wrong: 0 }),
  },
  7,
  NOW,
);
eq('overdue and today land on today', forecast[0], 2);
eq('later items land on their day', forecast[3], 1);
eq('items past the window are left out', forecast.reduce((a, b) => a + b, 0), 3);
eq('the window is the length asked for', forecast.length, 7);

// --------------------------------------------------------------- weakest

const struggling = weakest(['a', 'b', 'c', 'd'], {
  a: stat({ right: 1, wrong: 9 }),
  b: stat({ right: 9, wrong: 1 }),
  c: stat({ right: 4, wrong: 6 }),
  d: stat({ right: 1, wrong: 0 }),
});
eq('only the struggling items', struggling.length, 2);
eq('worst first', struggling[0].id, 'a');
ok('a single attempt is not enough to judge', !struggling.some((s) => s.id === 'd'));

// ------------------------------------------- kana are scheduled per script

/**
 * あ and ア were one item until the guided path exposed it: finishing the
 * hiragana stage marked the katakana stage finished too. They must stay
 * separate, or neither the plan nor the schedule can tell them apart.
 */
const hiraganaStage = CURRICULUM.find((s) => s.id === 'hiragana-basic')!;
const katakanaBasic = CURRICULUM.find((s) => s.id === 'katakana-basic')!;
const hiraIds = new Set(stageItems(hiraganaStage));
const kataIds = stageItems(katakanaBasic);
const shared = kataIds.filter((id) => hiraIds.has(id));
eq('the two scripts share no items', shared.length, 0);

const hiraganaKnown = Object.fromEntries([...hiraIds].map((id) => [id, stat({ box: 4 })]));
eq('finishing hiragana completes its own stage', isStageComplete(hiraganaStage, hiraganaKnown), true);
eq('but leaves katakana untouched', isStageComplete(katakanaBasic, hiraganaKnown), false);
eq('and the next stage is the hiragana extras',
  currentStage(hiraganaKnown)!.id, 'hiragana-rest');

// The cards a kana stage builds must carry the script-qualified ids too, or the
// stage could never be completed by studying it.
const hiraCards = buildStageCards(hiraganaStage, decks);
ok('hiragana stage cards use hiragana ids',
  hiraCards.every((c) => c.itemId.startsWith('kana:hira:')),
  hiraCards.find((c) => !c.itemId.startsWith('kana:hira:'))?.itemId);
const kataCards = buildStageCards(katakanaBasic, decks);
ok('katakana stage cards use katakana ids',
  kataCards.every((c) => c.itemId.startsWith('kana:kata:')),
  kataCards.find((c) => !c.itemId.startsWith('kana:kata:'))?.itemId);

// ------------------------------------- studying a stage must advance it

/**
 * The bug this guards: the guide's "Study this" started an ordinary practice
 * session, and practice deliberately never sets a box. A stage is measured in
 * boxes, so the button could never move the progress it was offering — the
 * panel sat at "0 of 46 known" however much you studied.
 *
 * These assert the two halves of the fix: a stage becomes reachable only
 * through the scheduling path, and one session is visible as *learning* even
 * though it is not yet *known*.
 */
const stageOne = CURRICULUM[0];
const stageOneItems = stageItems(stageOne);

// What practice records: counts, and no schedule at all.
const practised = Object.fromEntries(
  stageOneItems.map((id) => [id, stat({ right: 3, wrong: 0, lastSeen: NOW })]),
);
eq('practice alone leaves a stage untouched', stageProgress(stageOne, practised).known, 0);
eq('and none of it counts as learning either', stageProgress(stageOne, practised).learning, 0);
eq('so the plan does not move', currentStage(practised)!.id, stageOne.id);

// What one scheduled session records: box 1 for everything answered.
const studiedOnce = Object.fromEntries(
  stageOneItems.map((id) => [id, stat({ right: 1, wrong: 0, box: 1, due: NOW + DAY })]),
);
eq('one session is not yet known', stageProgress(stageOne, studiedOnce).known, 0);
eq('but all of it is visibly learning',
  stageProgress(stageOne, studiedOnce).learning, stageOneItems.length);
ok('which is progress the panel can show',
  stageProgress(stageOne, studiedOnce).learning > 0);

// And repeated sessions carry it to known, completing the stage.
const studiedUntilKnown = Object.fromEntries(
  stageOneItems.map((id) => [id, stat({ right: 3, wrong: 0, box: 3, due: NOW + 7 * DAY })]),
);
eq('sticking with it completes the stage', isStageComplete(stageOne, studiedUntilKnown), true);
eq('and the plan moves on', currentStage(studiedUntilKnown)!.id, CURRICULUM[1].id);
