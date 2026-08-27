import { accuracy, type SessionState } from '../lib/session';

interface Props {
  title: string;
  state: SessionState;
  onRestart: () => void;
  onPractiseMissed: () => void;
  onEdit?: () => void;
  onHome: () => void;
}

function duration(ms: number): string {
  const seconds = Math.max(1, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
}

export function Results({ title, state, onRestart, onPractiseMissed, onEdit, onHome }: Props) {
  const missed = state.missed.map((id) => state.byId[id]).filter(Boolean);
  const score = accuracy(state);
  const remark =
    state.answered === 0
      ? 'Nothing answered this time.'
      : score === 100
        ? 'Clean sweep. Nothing missed.'
        : score >= 80
          ? 'Solid — a few to tidy up.'
          : 'Worth another pass.';

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
              <b>{state.correct}</b> of {state.answered} correct
            </span>
            <span>
              best streak <b>{state.bestStreak}</b>
            </span>
            <span>{duration(Date.now() - state.startedAt)}</span>
          </div>
        </div>
      </div>

      {missed.length > 0 && (
        <div className="panel">
          <h2>Missed this session ({missed.length})</h2>
          <p className="hint">These are the ones worth another look.</p>
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
            Practise the {missed.length} you missed
          </button>
        )}
        <button
          type="button"
          className={missed.length ? 'btn big' : 'btn primary big'}
          onClick={onRestart}
        >
          Go again
        </button>
        {onEdit && (
          <button type="button" className="btn ghost" onClick={onEdit}>
            Change settings
          </button>
        )}
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>
    </div>
  );
}
