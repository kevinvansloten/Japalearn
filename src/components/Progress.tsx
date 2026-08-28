import { useMemo } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { ALL_ADJECTIVES, ALL_VERBS } from '../data/conjugation';
import { ALL_COUNTERS } from '../data/counters';
import { ALL_KANA } from '../data/kana';
import { ALL_KANJI } from '../data/kanji';
import { ALL_PARTICLE_SENTENCES } from '../data/particles';
import { ALL_WORDS } from '../data/words';
import { currentStage, isStageComplete, stageNumber, stageProgress } from '../lib/curriculum';
import { reviewForecast, summarise, weakest } from '../lib/progress';
import { loadItemStats } from '../lib/storage';
import { MasteryBar, Panel } from './ui';

const DECKS: { label: string; itemIds: string[] }[] = [
  {
    label: 'Hiragana & katakana',
    itemIds: ALL_KANA.flatMap((k) => [`kana:hira:${k.id}`, `kana:kata:${k.id}`]),
  },
  { label: 'Kanji', itemIds: ALL_KANJI.map((k) => `kanji:${k.char}`) },
  { label: 'Counters, dates & times', itemIds: ALL_COUNTERS.map((c) => `counter:${c.form}`) },
  { label: 'Vocabulary', itemIds: ALL_WORDS.map((w) => `vocab:${w.word}`) },
  {
    label: 'Conjugation',
    itemIds: [...ALL_VERBS, ...ALL_ADJECTIVES].map((v) => `conj:${v.word}`),
  },
  { label: 'Particles', itemIds: ALL_PARTICLE_SENTENCES.map((s) => `particle:${s.text}`) },
];

/** The label an item id refers to, for the weak-items list. */
function describe(itemId: string): { glyph: string; note: string } | null {
  const [kind, ...rest] = itemId.split(':');
  const key = rest.join(':');
  switch (kind) {
    case 'kana': {
      const [script, ...id] = key.split(':');
      const kana = ALL_KANA.find((k) => k.id === id.join(':'));
      if (!kana) return null;
      return { glyph: script === 'kata' ? kana.kata : kana.hira, note: kana.romaji };
    }
    case 'kanji': {
      const kanji = ALL_KANJI.find((k) => k.char === key);
      return kanji ? { glyph: kanji.char, note: kanji.meanings[0] } : null;
    }
    case 'counter': {
      const counter = ALL_COUNTERS.find((c) => c.form === key);
      return counter ? { glyph: counter.form, note: counter.reading } : null;
    }
    case 'vocab': {
      const word = ALL_WORDS.find((w) => w.word === key);
      return word ? { glyph: word.word, note: word.meanings[0] } : { glyph: key, note: '' };
    }
    case 'conj':
      return { glyph: key, note: 'conjugation' };
    case 'particle':
      return { glyph: key, note: '' };
    default:
      return null;
  }
}

interface Props {
  onHome: () => void;
}

export function Progress({ onHome }: Props) {
  const stats = useMemo(() => loadItemStats(), []);

  const everything = DECKS.flatMap((d) => d.itemIds);
  const overall = summarise(everything, stats);
  const forecast = reviewForecast(stats);
  const struggling = weakest(everything, stats);
  // Read the step from the same place the home screen does, rather than
  // counting completed stages: a later stage can finish before an earlier one.
  const stage = currentStage(stats);
  const busiest = Math.max(1, ...forecast);

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>Progress</strong>
          <div className="faint">
            {overall.known} of {overall.total} items known ·{' '}
            {stage ? `step ${stageNumber(stage)} of ${CURRICULUM.length}` : 'plan finished'}
          </div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>

      <Panel
        title="Where you are"
        hint="An item counts as known once it has survived a week — box 3 or higher."
      >
        {DECKS.map((deck) => {
          const summary = summarise(deck.itemIds, stats);
          return (
            <div className="deck-row" key={deck.label}>
              <div className="row between" style={{ marginBottom: 6 }}>
                <strong style={{ fontSize: 14 }}>{deck.label}</strong>
                <span className="faint">
                  {summary.known}/{summary.total} known
                  {summary.learning > 0 && ` · ${summary.learning} learning`}
                  {summary.accuracy !== null && ` · ${summary.accuracy}%`}
                </span>
              </div>
              <MasteryBar
                known={summary.known}
                learning={summary.learning}
                total={summary.total}
              />
            </div>
          );
        })}
      </Panel>

      <Panel title="The week ahead" hint="How many items fall due each day if you keep up.">
        {forecast.every((n) => n === 0) ? (
          <p className="hint">Nothing scheduled yet. Answer something and the clock starts.</p>
        ) : (
          <div className="forecast">
            {forecast.map((count, index) => (
              <div className="forecast-day" key={index}>
                <div className="forecast-bar">
                  {count > 0 && <span style={{ height: `${(count / busiest) * 100}%` }} />}
                </div>
                <div className="faint">{count}</div>
                <div className="faint">{index === 0 ? 'today' : `+${index}`}</div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="The plan" hint="Stages you have finished, and the one you are on.">
        <ol className="stage-list">
          {CURRICULUM.map((stage) => {
            const summary = stageProgress(stage, stats);
            const complete = isStageComplete(stage, stats);
            return (
              <li key={stage.id} className="stage-row" data-complete={complete}>
                <span className="tick" aria-hidden="true">
                  {complete ? '✓' : ''}
                </span>
                <span className="body">
                  <span className="title">{stage.title}</span>
                  <span className="faint">
                    {summary.known}/{summary.total} known
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </Panel>

      {struggling.length > 0 && (
        <Panel title="Giving you the most trouble" hint="Lowest accuracy across all your sessions.">
          <div className="missed-list">
            {struggling.map(({ id, accuracy }) => {
              const described = describe(id);
              if (!described) return null;
              return (
                <div className="missed-item" key={id}>
                  <span className="g">{described.glyph}</span>
                  <span className="a">
                    {described.note && `${described.note} · `}
                    {accuracy}%
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
      )}
    </div>
  );
}
