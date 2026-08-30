/**
 * The roadmap: say how much and how often, and see when that gets you through.
 *
 * The pace set here is not a private note to the learner — it is the same
 * number `newAllowanceToday` spends, so the date below it is a prediction of
 * what the app will actually do rather than an encouraging guess.
 */
import { useMemo } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { stageItems } from '../lib/curriculum';
import { forecast, DEFAULT_ACCURACY } from '../lib/forecast';
import { summarise } from '../lib/progress';
import { PACE_LIMITS, weeklyAllowance, type Pace } from '../lib/schedule';
import { loadItemStats, secondsPerCard } from '../lib/storage';
import { useStrings } from '../i18n';
import { titleOf } from '../i18n/content';
import type { Lang } from '../i18n/lang';
import { Panel, stageDateFormat } from './ui';

/** "14 March" — near enough to be worth naming the day. */
const dayOf = (ms: number, lang: Lang): string =>
  new Date(ms).toLocaleDateString(lang, { day: 'numeric', month: 'long' });

/** "March 2027" — far enough out that a day would be false precision. */
const monthOf = (ms: number, lang: Lang): string =>
  new Date(ms).toLocaleDateString(lang, { month: 'long', year: 'numeric' });

/** Past this, the headline stops counting weeks and starts naming a month. */
const WEEKS_HORIZON = 70;

const DAYS_A_WEEK = [1, 2, 3, 4, 5, 6, 7];

interface Props {
  pace: Pace;
  onPace: (pace: Pace) => void;
  onHome: () => void;
}

export function Plan({ pace, onPace, onHome }: Props) {
  const s = useStrings();
  const stats = useMemo(() => loadItemStats(), []);
  const itemIds = useMemo(() => [...new Set(CURRICULUM.flatMap(stageItems))], []);

  const overall = summarise(itemIds, stats);
  const tempo = secondsPerCard();
  const accuracy = overall.accuracy === null ? DEFAULT_ACCURACY : overall.accuracy / 100;

  const plan = useMemo(
    () => forecast(stats, pace, accuracy, tempo.seconds),
    [stats, pace, accuracy, tempo.seconds],
  );

  const [minNew, maxNew] = PACE_LIMITS.newPerDay;
  const cards = Math.round(plan.load.perSession);
  const minutes = Math.max(1, Math.round(plan.load.minutes));
  const stageDate = stageDateFormat(plan.finishesOn, s.lang);

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>{s.plan.title}</strong>
          <div className="faint">{s.plan.subtitle(overall.known, overall.total)}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <section className="guide-panel plan-headline">
        {plan.finishesOn === null ? (
          <div>
            <h2>{s.plan.finished}</h2>
            <p className="hint">{s.plan.finishedHint}</p>
          </div>
        ) : plan.days <= WEEKS_HORIZON ? (
          <div>
            <h2>{s.plan.headlineDays(s.plan.inWeeks(Math.max(1, Math.round(plan.days / 7))))}</h2>
            <p className="hint">{dayOf(plan.finishesOn, s.lang)}</p>
            <p className="faint">{s.plan.caveat(plan.total)}</p>
          </div>
        ) : (
          <div>
            <h2>{s.plan.headline(monthOf(plan.finishesOn, s.lang))}</h2>
            <p className="hint">{s.plan.inMonths(Math.round(plan.days / 30))}</p>
            <p className="faint">{s.plan.caveat(plan.total)}</p>
          </div>
        )}
      </section>

      <Panel title={s.plan.paceTitle} hint={s.plan.paceHint}>
        <div className="pace-row">
          <label htmlFor="pace-new">{s.plan.newPerDay}</label>
          <input
            id="pace-new"
            type="range"
            min={minNew}
            max={maxNew}
            value={pace.newPerDay}
            onChange={(event) => onPace({ ...pace, newPerDay: Number(event.target.value) })}
          />
          <output htmlFor="pace-new" className="pace-value">
            {pace.newPerDay}
          </output>
        </div>

        <div className="pace-row">
          <span id="pace-days-label">{s.plan.daysPerWeek}</span>
          <div className="segmented" role="group" aria-labelledby="pace-days-label">
            {DAYS_A_WEEK.map((days) => (
              <button
                key={days}
                type="button"
                aria-pressed={pace.daysPerWeek === days}
                onClick={() => onPace({ ...pace, daysPerWeek: days })}
              >
                {days}
              </button>
            ))}
          </div>
          {/* No number here: a bare "105" beside a row of day counts reads as
              one of them. The week's total gets a sentence of its own below. */}
          <span />
        </div>

        <p className="hint">{s.plan.weekly(weeklyAllowance(pace))}</p>
        <p className="faint">{s.plan.budgetNote}</p>
      </Panel>

      <Panel title={s.plan.costTitle}>
        <p className="hint">{s.plan.busiest(cards, minutes)}</p>
        <p className="hint">
          {s.plan.upkeep(
            Math.round(plan.load.upkeep),
            Math.max(1, Math.round(plan.load.upkeepMinutes)),
          )}
        </p>
        {pace.daysPerWeek < 7 && <p className="faint">{s.plan.restDays(pace.daysPerWeek)}</p>}
        <p className="faint">
          {tempo.measured
            ? s.plan.measured(Math.round(tempo.seconds))
            : s.plan.assumed(Math.round(tempo.seconds))}
        </p>
        {overall.accuracy !== null && (
          <p className="faint">{s.plan.accuracyNote(overall.accuracy)}</p>
        )}
      </Panel>

      <Panel title={s.plan.timelineTitle} hint={s.plan.timelineHint}>
        <ol className="stage-list">
          {plan.stages.map((entry) => (
            <li key={entry.stage.id} className="stage-row" data-complete={entry.complete}>
              <span className="tick" aria-hidden="true">
                {entry.complete ? '✓' : ''}
              </span>
              <span className="body">
                <span className="title">{titleOf(entry.stage, s.lang)}</span>
                <span className="stage-when faint">
                  {entry.complete
                    ? s.plan.stageDone
                    : entry.finishesOn !== null && stageDate(entry.finishesOn)}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
