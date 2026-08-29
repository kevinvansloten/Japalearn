import { useMemo } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { ALL_ADJECTIVES, ALL_VERBS } from '../data/conjugation';
import { ALL_COUNTERS } from '../data/counters';
import { ALL_KANA } from '../data/kana';
import { ALL_KANJI } from '../data/kanji';
import { ALL_PARTICLE_SENTENCES } from '../data/particles';
import { ALL_WORDS } from '../data/words';
import { currentStage, stageNumber } from '../lib/curriculum';
// Aliased: `forecast` is already the name of the week-ahead bucket list below.
import { DEFAULT_ACCURACY, forecast as projectPlan } from '../lib/forecast';
import { reviewForecast, summarise, weakest, type Summary } from '../lib/progress';
import { loadItemStats, loadPace, secondsPerCard } from '../lib/storage';
import { useStrings } from '../i18n';
import { meaningsOf, titleOf } from '../i18n/content';
import type { Lang } from '../i18n/lang';
import type { Strings } from '../i18n/en';
import { Panel, stageDateFormat } from './ui';

const decksOf = (s: Strings): { label: string; itemIds: string[] }[] => [
  {
    label: s.deck.kana,
    itemIds: ALL_KANA.flatMap((k) => [`kana:hira:${k.id}`, `kana:kata:${k.id}`]),
  },
  { label: s.deck.kanjiShort, itemIds: ALL_KANJI.map((k) => `kanji:${k.char}`) },
  { label: s.deck.counters, itemIds: ALL_COUNTERS.map((c) => `counter:${c.form}`) },
  { label: s.deck.wordsShort, itemIds: ALL_WORDS.map((w) => `vocab:${w.word}`) },
  {
    label: s.deck.conjugation,
    itemIds: [...ALL_VERBS, ...ALL_ADJECTIVES].map((v) => `conj:${v.word}`),
  },
  {
    label: s.deck.particles,
    itemIds: ALL_PARTICLE_SENTENCES.map((sentence) => `particle:${sentence.text}`),
  },
];

/** The label an item id refers to, for the weak-items list. */
function describe(itemId: string, s: Strings, lang: Lang): { glyph: string; note: string } | null {
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
      return kanji ? { glyph: kanji.char, note: meaningsOf(kanji, lang)[0] } : null;
    }
    case 'counter': {
      const counter = ALL_COUNTERS.find((c) => c.form === key);
      return counter ? { glyph: counter.form, note: counter.reading } : null;
    }
    case 'vocab': {
      const word = ALL_WORDS.find((w) => w.word === key);
      return word
        ? { glyph: word.word, note: meaningsOf(word, lang)[0] }
        : { glyph: key, note: '' };
    }
    case 'conj':
      return { glyph: key, note: s.progress.conjugationNote };
    case 'particle':
      return { glyph: key, note: '' };
    default:
      return null;
  }
}

function Bar({ summary }: { summary: Summary }) {
  const s = useStrings();
  const pct = (n: number) => (summary.total ? (n / summary.total) * 100 : 0);
  return (
    <div className="mastery-bar" title={s.progress.barTitle(summary.known, summary.learning)}>
      <span className="known" style={{ width: `${pct(summary.known)}%` }} />
      <span className="learning" style={{ width: `${pct(summary.learning)}%` }} />
    </div>
  );
}

interface Props {
  onHome: () => void;
}

export function Progress({ onHome }: Props) {
  const s = useStrings();
  const stats = useMemo(() => loadItemStats(), []);
  const decks = decksOf(s);

  const everything = decks.flatMap((d) => d.itemIds);
  const overall = summarise(everything, stats);
  const forecast = reviewForecast(stats);
  const struggling = weakest(everything, stats);
  // Read the step from the same place the home screen does, rather than
  // counting completed stages: a later stage can finish before an earlier one.
  const stage = currentStage(stats);
  const busiest = Math.max(1, ...forecast);
  // Dated against the saved pace, so the checklist below agrees with the plan
  // screen rather than offering a second opinion.
  const projection = projectPlan(
    stats,
    loadPace(),
    overall.accuracy === null ? DEFAULT_ACCURACY : overall.accuracy / 100,
    secondsPerCard().seconds,
  );
  const stageDate = stageDateFormat(projection.finishesOn, s.lang);

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>{s.progress.title}</strong>
          <div className="faint">
            {s.progress.itemsKnown(overall.known, overall.total)} ·{' '}
            {stage
              ? s.progress.step(stageNumber(stage), CURRICULUM.length)
              : s.progress.planFinished}
          </div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <Panel title={s.progress.whereYouAre} hint={s.progress.whereYouAreHint}>
        {decks.map((deck) => {
          const summary = summarise(deck.itemIds, stats);
          return (
            <div className="deck-row" key={deck.label}>
              <div className="row between" style={{ marginBottom: 6 }}>
                <strong style={{ fontSize: 14 }}>{deck.label}</strong>
                <span className="faint">
                  {s.progress.knownOf(summary.known, summary.total)}
                  {summary.learning > 0 && s.progress.learning(summary.learning)}
                  {summary.accuracy !== null && ` · ${summary.accuracy}%`}
                </span>
              </div>
              <Bar summary={summary} />
            </div>
          );
        })}
      </Panel>

      <Panel title={s.progress.weekAhead} hint={s.progress.weekAheadHint}>
        {forecast.every((n) => n === 0) ? (
          <p className="hint">{s.progress.nothingScheduled}</p>
        ) : (
          <div className="forecast">
            {forecast.map((count, index) => (
              <div className="forecast-day" key={index}>
                <div className="forecast-bar">
                  {count > 0 && <span style={{ height: `${(count / busiest) * 100}%` }} />}
                </div>
                <div className="faint">{count}</div>
                <div className="faint">
                  {index === 0 ? s.progress.today : s.progress.inDays(index)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title={s.progress.thePlan} hint={s.progress.thePlanHint}>
        <ol className="stage-list">
          {projection.stages.map((entry) => (
            <li key={entry.stage.id} className="stage-row" data-complete={entry.complete}>
              <span className="tick" aria-hidden="true">
                {entry.complete ? '✓' : ''}
              </span>
              <span className="body">
                <span className="title">{titleOf(entry.stage, s.lang)}</span>
                <span className="faint">
                  {s.progress.knownOf(entry.known, entry.total)}
                  {entry.finishesOn !== null && ` · ${stageDate(entry.finishesOn)}`}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Panel>

      {struggling.length > 0 && (
        <Panel title={s.progress.trouble} hint={s.progress.troubleHint}>
          <div className="missed-list">
            {struggling.map(({ id, accuracy }) => {
              const described = describe(id, s, s.lang);
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
