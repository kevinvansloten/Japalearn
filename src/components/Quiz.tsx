import { useEffect, useRef, useState } from 'react';
import {
  accuracy,
  createSession,
  remaining,
  sessionReducer,
  type Card,
  type SessionAction,
  type SessionOptions,
  type SessionState,
} from '../lib/session';
import { recordReview, recordSession, recordTempo } from '../lib/storage';
import { romajiToKana } from '../lib/romaji';
import { speak, stopSpeaking, useJapaneseVoice } from '../lib/speech';
import { useStrings } from '../i18n';
import { Results } from './Results';
import { SpeakerIcon } from './ui';

const AUTO_ADVANCE_MS = 700;

interface Props {
  title: string;
  cards: Card[];
  options: SessionOptions;
  /** back to the setup screen for this deck, or absent for a review */
  onEdit?: () => void;
  onHome: () => void;
  /** a scheduled review, so results move items along their Leitner boxes */
  scheduled?: boolean;
}

export function Quiz({ title, cards, options, onEdit, onHome, scheduled }: Props) {
  const s = useStrings();
  const [state, setState] = useState<SessionState>(() => createSession(cards, options));
  const [draft, setDraft] = useState('');
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [furigana, setFurigana] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const hasVoice = useJapaneseVoice();
  // A review reschedules once. Going again, or drilling the ones you missed,
  // is ordinary practice — otherwise a second pass would push every box up a
  // rung again on the same day.
  const [reschedules, setReschedules] = useState(scheduled);

  const dispatch = (action: SessionAction) => setState((s) => sessionReducer(s, action));

  const restart = (deck: Card[], nextOptions: SessionOptions = options) => {
    setDraft('');
    setReschedules(false);
    setState(createSession(deck, nextOptions));
  };

  const card = state.currentId ? state.byId[state.currentId] : null;

  // Focus the input for every new typed card.
  useEffect(() => {
    if (state.phase === 'question' && card?.inputMode === 'type') inputRef.current?.focus();
  }, [state.currentId, state.phase, card?.inputMode]);

  useEffect(() => setFurigana(false), [state.currentId]);

  // A listening card's prompt is the audio, so play it as the card arrives.
  useEffect(() => {
    if (state.phase === 'question' && card?.promptScript === 'audio' && card.speech) {
      speak(card.speech);
    }
  }, [state.currentId, state.phase, card?.promptScript, card?.speech]);

  // On a phone the card fills the screen, so the answer and the Next button
  // land below the fold. 'nearest' is a no-op when they are already visible,
  // which is the usual case on a desktop.
  useEffect(() => {
    if (state.phase === 'feedback') {
      feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [state.phase, state.currentId]);

  // Never let a clip run on past the card that started it.
  useEffect(() => stopSpeaking, []);

  // Correct answers move on by themselves; misses wait so you can read them.
  useEffect(() => {
    if (state.phase !== 'feedback' || !autoAdvance || !state.last?.correct) return;
    const timer = window.setTimeout(() => {
      setDraft('');
      dispatch({ type: 'next' });
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [state.phase, state.last, autoAdvance]);

  // Fold the session into lifetime stats once it is over.
  useEffect(() => {
    if (state.phase !== 'done') return;
    const byItem: Record<string, { right: number; wrong: number }> = {};
    for (const [cardId, result] of Object.entries(state.perCard)) {
      const itemId = state.byId[cardId]?.itemId;
      if (!itemId) continue;
      const prior = byItem[itemId] ?? { right: 0, wrong: 0 };
      byItem[itemId] = { right: prior.right + result.right, wrong: prior.wrong + result.wrong };
    }
    if (reschedules) recordReview(byItem);
    else recordSession(byItem);
    // How long the cards actually took, so the plan screen can talk in minutes
    // without inventing the rate it converts them at.
    recordTempo(state.answered, Date.now() - state.startedAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // Enter continues from feedback; 1-4 pick a multiple-choice option.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (state.phase === 'feedback' && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        setDraft('');
        dispatch({ type: 'next' });
        return;
      }
      if (state.phase === 'question' && card?.inputMode === 'choice') {
        const index = Number(event.key) - 1;
        if (card.choices && index >= 0 && index < card.choices.length) {
          event.preventDefault();
          dispatch({ type: 'answer', given: card.choices[index] });
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.phase, card]);

  if (state.phase === 'done') {
    return (
      <Results
        title={title}
        state={state}
        onRestart={() => restart(cards)}
        onPractiseMissed={() => restart(state.missed.map((id) => state.byId[id]), {
          ...options,
          flow: 'mistakes',
        })}
        onEdit={onEdit}
        onHome={onHome}
      />
    );
  }

  if (!card) return null;

  const left = remaining(state);
  const done = state.answered;
  const progress = left === null ? 0 : (done / Math.max(done + left, 1)) * 100;
  const feedback = state.phase === 'feedback' ? state.last : null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    dispatch({ type: 'answer', given: draft });
  };

  const cardClass = feedback ? (feedback.correct ? 'card correct' : 'card wrong') : 'card';
  const kanaEcho =
    card.inputMode === 'type' && card.answerScript === 'jp' && draft.trim()
      ? romajiToKana(draft)
      : '';

  return (
    <div className="quiz">
      <div className="row between">
        <div>
          <strong>{title}</strong>
          <div className="faint">
            {left === null ? s.quiz.endless : s.quiz.toGo(left)}
          </div>
        </div>
        <div className="row">
          {onEdit && (
            <button type="button" className="btn ghost" onClick={onEdit}>
              {s.common.settings}
            </button>
          )}
          <button type="button" className="btn" onClick={() => dispatch({ type: 'finish' })}>
            {s.quiz.finish}
          </button>
        </div>
      </div>

      {left !== null && (
        <div className="progress">
          <div style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="scoreline">
        <span>
          <b>{state.correct}</b> / {state.answered} {s.quiz.correctLabel}
        </span>
        <span>
          <b>{accuracy(state)}%</b> {s.quiz.accuracyLabel}
        </span>
        <span>
          {s.quiz.streakLabel} <b>{state.streak}</b>
        </span>
      </div>

      <div className={cardClass}>
        <div className="question">{card.question}</div>
        {card.promptScript === 'audio' ? (
          <button
            type="button"
            className="listen"
            onClick={() => card.speech && speak(card.speech)}
            aria-label={s.quiz.playAgain}
          >
            <SpeakerIcon size={40} />
          </button>
        ) : card.promptRuby ? (
          <div className="glyph sentence">
            {card.promptRuby.map(([text, ruby], index) =>
              ruby && furigana ? (
                <ruby key={index}>
                  {text}
                  <rt>{ruby}</rt>
                </ruby>
              ) : (
                <span key={index}>{text}</span>
              ),
            )}
          </div>
        ) : (
          <div className={card.promptScript === 'jp' ? 'glyph' : 'glyph latin'}>{card.prompt}</div>
        )}

        {card.promptRuby && state.phase === 'question' && (
          <button
            type="button"
            className="btn ghost"
            onClick={() => setFurigana((on) => !on)}
          >
            {furigana ? 'Hide furigana' : 'Show furigana'}
          </button>
        )}
        {card.promptNote && <div className="prompt-note">{card.promptNote}</div>}

        {card.inputMode === 'type' ? (
          <form onSubmit={submit} style={{ marginTop: 18 }}>
            <input
              ref={inputRef}
              className={card.answerScript === 'jp' ? 'answer-input jp' : 'answer-input'}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                // Submit explicitly rather than relying on implicit form submission,
                // and stop the event here: effects flush mid-dispatch, so the window
                // listener below would otherwise see the new feedback phase and skip
                // straight past the answer on the very keypress that produced it.
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  submit(e);
                }
              }}
              disabled={state.phase === 'feedback'}
              placeholder={card.placeholder}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label={card.question}
            />
            {kanaEcho && state.phase === 'question' && (
              <div className="faint" style={{ marginTop: 6, fontFamily: 'var(--jp)' }}>
                {kanaEcho}
              </div>
            )}
            {state.phase === 'question' && (
              <div className="row" style={{ justifyContent: 'center', marginTop: 14 }}>
                <button type="submit" className="btn primary" disabled={!draft.trim()}>
                  {s.quiz.check}
                </button>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => dispatch({ type: 'reveal' })}
                >
                  {s.quiz.dontKnow}
                </button>
              </div>
            )}
          </form>
        ) : (
          <div className="choice-grid" style={{ marginTop: 18 }}>
            {card.choices?.map((choice) => {
              const isAnswer = card.check(choice);
              const picked = feedback && state.last?.given === choice;
              const className = [
                'choice',
                card.answerScript === 'jp' ? 'jp' : '',
                feedback && isAnswer ? 'is-answer' : '',
                feedback && picked && !isAnswer ? 'is-wrong' : '',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <button
                  key={choice}
                  type="button"
                  className={className}
                  disabled={state.phase === 'feedback'}
                  onClick={() => dispatch({ type: 'answer', given: choice })}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {feedback && (
        <div ref={feedbackRef} className={feedback.correct ? 'feedback correct' : 'feedback wrong'}>
          <div className="verdict">
            {feedback.correct
              ? s.quiz.verdictCorrect
              : feedback.given
                ? s.quiz.verdictWrong(feedback.given)
                : s.quiz.verdictRevealed}
          </div>
          <div className="row" style={{ gap: 8 }}>
            <span className={card.answerScript === 'jp' ? 'answer jp-text' : 'answer'}>
              {card.answer}
            </span>
            {hasVoice && card.speech && (
              <button
                type="button"
                className="speak-btn"
                onClick={() => speak(card.speech!)}
                aria-label={s.quiz.hear(card.speech!)}
                title={s.quiz.hearIt}
              >
                <SpeakerIcon size={16} />
              </button>
            )}
          </div>
          {card.details?.map((line) => (
            <div className="detail" key={line}>
              {line}
            </div>
          ))}
          <div className="row" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setDraft('');
                dispatch({ type: 'next' });
              }}
            >
              {s.quiz.next}
            </button>
            <span className="faint">
              {s.quiz.orPress} <span className="kbd">{s.quiz.enterKey}</span>
            </span>
          </div>
        </div>
      )}

      <div className="row between">
        <label className="row faint" style={{ gap: 6, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={autoAdvance}
            onChange={(e) => setAutoAdvance(e.target.checked)}
          />
          {s.quiz.autoAdvance}
        </label>
        {card.inputMode === 'choice' && <span className="faint">{s.quiz.choiceTip}</span>}
      </div>
    </div>
  );
}
