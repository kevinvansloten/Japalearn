export type InputMode = 'type' | 'choice';

export interface Card {
  id: string;
  /** underlying item (kana glyph, kanji char, vocab word) for lifetime stats */
  itemId: string;
  /** short label telling the learner what to answer */
  question: string;
  /** the big thing on screen; empty when the prompt is the audio itself */
  prompt: string;
  promptScript: 'jp' | 'latin' | 'audio';
  /** small line under the prompt, e.g. a hint about which reading */
  promptNote?: string;
  /**
   * The prompt broken into furigana segments, for prompts worth reading rather
   * than recognising. When present the quiz can show the reading over the
   * kanji on request.
   */
  promptRuby?: [written: string, reading?: string][];
  inputMode: InputMode;
  /** options when inputMode is 'choice' */
  choices?: string[];
  /** Optional display hints keyed by choice; grading still uses the choice itself. */
  choiceNotes?: Record<string, string>;
  /** placeholder for the typed answer field */
  placeholder?: string;
  /** Japanese text to read aloud: the audio prompt, and the replay on reveal */
  speech?: string;
  /** canonical answer shown on reveal */
  answer: string;
  /** script of the answer, so the input, choices and reveal pick the right font */
  answerScript: 'jp' | 'latin';
  /** extra context revealed after answering */
  details?: string[];
  check: (given: string) => boolean;
}

/** How the deck is worked through. */
export type Flow = 'once' | 'mistakes' | 'endless';
export type Order = 'ordered' | 'shuffled';

export interface SessionOptions {
  flow: Flow;
  order: Order;
}

export interface SessionState {
  byId: Record<string, Card>;
  ids: string[];
  queue: string[];
  currentId: string | null;
  phase: 'question' | 'feedback' | 'done';
  last: { correct: boolean; given: string } | null;
  answered: number;
  correct: number;
  streak: number;
  bestStreak: number;
  perCard: Record<string, { right: number; wrong: number }>;
  /** ids that have been missed at least once this session, in first-miss order */
  missed: string[];
  /** ids not yet answered correctly — only meaningful for the 'mistakes' flow */
  pending: string[];
  options: SessionOptions;
  startedAt: number;
}

export type SessionAction =
  | { type: 'answer'; given: string }
  | { type: 'reveal' }
  | { type: 'next' }
  | { type: 'finish' };

export function shuffle<T>(items: T[]): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** How far ahead a missed card is pushed back into the queue. */
const REQUEUE_GAP = 4;
/** Endless mode tops the queue up when it gets this short. */
const ENDLESS_REFILL_AT = 3;

function drawOrder(ids: string[], options: SessionOptions): string[] {
  return options.order === 'shuffled' ? shuffle(ids) : ids.slice();
}

/**
 * Endless refill: every card once, plus a second copy of anything currently
 * being answered badly, so weak cards come round more often.
 */
function endlessRefill(state: SessionState): string[] {
  const weak = state.ids.filter((id) => {
    const s = state.perCard[id];
    return s && s.wrong > 0 && s.wrong >= s.right;
  });
  return shuffle([...state.ids, ...weak]);
}

export function createSession(cards: Card[], options: SessionOptions): SessionState {
  const ids = cards.map((c) => c.id);
  const byId = Object.fromEntries(cards.map((c) => [c.id, c]));
  const queue = drawOrder(ids, options);

  return {
    byId,
    ids,
    queue: queue.slice(1),
    currentId: queue[0] ?? null,
    phase: queue.length ? 'question' : 'done',
    last: null,
    answered: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
    perCard: {},
    missed: [],
    pending: options.flow === 'mistakes' ? ids.slice() : [],
    options,
    startedAt: Date.now(),
  };
}

function advance(state: SessionState): SessionState {
  let queue = state.queue;

  if (state.options.flow === 'endless' && queue.length <= ENDLESS_REFILL_AT) {
    queue = [...queue, ...endlessRefill(state)];
  }

  if (!queue.length) {
    return { ...state, queue, currentId: null, phase: 'done', last: null };
  }

  return {
    ...state,
    queue: queue.slice(1),
    currentId: queue[0],
    phase: 'question',
    last: null,
  };
}

function requeue(queue: string[], id: string): string[] {
  const next = queue.slice();
  const at = Math.min(REQUEUE_GAP, next.length);
  next.splice(at, 0, id);
  return next;
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'answer': {
      if (state.phase !== 'question' || !state.currentId) return state;
      const card = state.byId[state.currentId];
      const correct = card.check(action.given);
      return grade(state, card.id, correct, action.given);
    }

    case 'reveal': {
      // "I don't know" — counts as a miss and shows the answer.
      if (state.phase !== 'question' || !state.currentId) return state;
      return grade(state, state.currentId, false, '');
    }

    case 'next':
      if (state.phase !== 'feedback') return state;
      return advance(state);

    case 'finish':
      return { ...state, phase: 'done', currentId: null, last: null };

    default:
      return state;
  }
}

function grade(state: SessionState, id: string, correct: boolean, given: string): SessionState {
  const prior = state.perCard[id] ?? { right: 0, wrong: 0 };
  const streak = correct ? state.streak + 1 : 0;

  let queue = state.queue;
  let pending = state.pending;

  if (state.options.flow === 'mistakes') {
    if (correct) {
      pending = pending.filter((p) => p !== id);
    } else {
      if (!pending.includes(id)) pending = [...pending, id];
      queue = requeue(queue, id);
    }
  }

  return {
    ...state,
    phase: 'feedback',
    last: { correct, given },
    answered: state.answered + 1,
    correct: state.correct + (correct ? 1 : 0),
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    perCard: {
      ...state.perCard,
      [id]: { right: prior.right + (correct ? 1 : 0), wrong: prior.wrong + (correct ? 0 : 1) },
    },
    missed: correct || state.missed.includes(id) ? state.missed : [...state.missed, id],
    queue,
    pending,
  };
}

/** Cards left to get through, or null when the session has no natural end. */
export function remaining(state: SessionState): number | null {
  if (state.options.flow === 'endless') return null;
  return state.queue.length + (state.phase === 'question' ? 1 : 0);
}

export const accuracy = (state: SessionState): number =>
  state.answered ? Math.round((state.correct / state.answered) * 100) : 0;
