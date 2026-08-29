import { accuracy, type SessionState } from '../lib/session';
import { useStrings } from '../i18n';
import type { Strings } from '../i18n/en';

interface Props {
  title: string;
  state: SessionState;
  onRestart: () => void;
  onPractiseMissed: () => void;
  onEdit?: () => void;
  onHome: () => void;
}

function duration(ms: number, s: Strings): string {
  const seconds = Math.max(1, Math.round(ms / 1000));
  if (seconds < 60) return s.results.seconds(seconds);
  const minutes = Math.floor(seconds / 60);
  return s.results.minutes(minutes, seconds % 60);
}

export function Results({ title, state, onRestart, onPractiseMissed, onEdit, onHome }: Props) {
  const s = useStrings();
  const missed = state.missed.map((id) => state.byId[id]).filter(Boolean);
  const score = accuracy(state);
  const remark =
    state.answered === 0
      ? s.results.nothingAnswered
      : score === 100
        ? s.results.clean
        : score >= 80
          ? s.results.solid
          : s.results.another;

  return (
    <div className="stack">
      <div className="panel">
        <div className="row between">
          <div>
            <div className="hint">{title}</div>
            <div className="result-figure">{score}%</div>
            <div className="hint">{remark}</div>
          </div>
          <div className="scoreline" style={{ flexDirection: 'column', gap: 6, textAlign: 'right' }}>
            <span>
              {s.results.ofCorrect(state.correct, state.answered)}
            </span>
            <span>
              {s.results.bestStreak} <b>{state.bestStreak}</b>
            </span>
            <span>{duration(Date.now() - state.startedAt, s)}</span>
          </div>
        </div>
      </div>

      {missed.length > 0 && (
        <div className="panel">
          <h2>{s.results.missed(missed.length)}</h2>
          <p className="hint">{s.results.missedHint}</p>
          <div className="missed-list">
            {missed.map((card) => (
              <div className="missed-item" key={card.id}>
                <span className={card.promptScript === 'jp' ? 'g' : ''}>{card.prompt}</span>
                <span className={card.answerScript === 'jp' ? 'a jp-text' : 'a'}>{card.answer}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="row">
        {missed.length > 0 && (
          <button type="button" className="btn primary big" onClick={onPractiseMissed}>
            {s.results.practiseMissed(missed.length)}
          </button>
        )}
        <button
          type="button"
          className={missed.length ? 'btn big' : 'btn primary big'}
          onClick={onRestart}
        >
          {s.results.goAgain}
        </button>
        {onEdit && (
          <button type="button" className="btn ghost" onClick={onEdit}>
            {s.results.changeSettings}
          </button>
        )}
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>
    </div>
  );
}
