import { useMemo } from 'react';
import { ALL_KANA } from '../data/kana';
import { ALL_COUNTERS } from '../data/counters';
import { ALL_KANJI } from '../data/kanji';
import type { ReviewPlan } from '../lib/review';
import { describeGap, nextDueAt } from '../lib/schedule';
import { itemAccuracy, loadItemStats, resetProgress } from '../lib/storage';

interface Props {
  plan: ReviewPlan;
  onReview: () => void;
  onKana: () => void;
  onKanji: () => void;
  onCounters: () => void;
  onReset: () => void;
}

interface Summary {
  seen: number;
  total: number;
  accuracy: number | null;
}

export function Home({ plan, onReview, onKana, onKanji, onCounters, onReset }: Props) {
  const stats = useMemo(() => loadItemStats(), []);
  const now = Date.now();
  const upcoming = nextDueAt(stats, now);

  const summarise = (ids: string[]): Summary => {
    let right = 0;
    let wrong = 0;
    let seen = 0;
    for (const id of ids) {
      const s = stats[id];
      if (!s || s.right + s.wrong === 0) continue;
      seen += 1;
      right += s.right;
      wrong += s.wrong;
    }
    return {
      seen,
      total: ids.length,
      accuracy: right + wrong ? Math.round((right / (right + wrong)) * 100) : null,
    };
  };

  const kana = summarise(ALL_KANA.map((k) => `kana:${k.id}`));
  const kanji = summarise(ALL_KANJI.map((k) => `kanji:${k.char}`));
  const counters = summarise(ALL_COUNTERS.map((c) => `counter:${c.form}`));
  const anyProgress = kana.seen + kanji.seen + counters.seen > 0;

  const weakest = useMemo(() => {
    return ALL_KANJI.map((k) => ({ char: k.char, meaning: k.meanings[0], acc: itemAccuracy(stats[`kanji:${k.char}`]) }))
      .filter((k): k is { char: string; meaning: string; acc: number } => k.acc !== null && k.acc < 70)
      .sort((a, b) => a.acc - b.acc)
      .slice(0, 12);
  }, [stats]);

  return (
    <div className="stack">
      <p className="hint" style={{ margin: 0, maxWidth: 560 }}>
        Drill the kana until they are automatic, then work through the N5 kanji in groups. Pick
        what to include, how you want to be asked, and how the session should run.
      </p>

      <section className="review-panel" data-ready={plan.cards.length > 0}>
        <div>
          <h2>{plan.cards.length ? 'Ready to review' : 'Nothing due'}</h2>
          {plan.cards.length ? (
            <p className="hint">
              {plan.due > 0 && (
                <>
                  <b>{plan.due}</b> to review
                </>
              )}
              {plan.due > 0 && plan.fresh > 0 && ' · '}
              {plan.fresh > 0 && (
                <>
                  <b>{plan.fresh}</b> new
                </>
              )}
            </p>
          ) : (
            <p className="hint">
              {upcoming
                ? `Next review ${describeGap(now, upcoming)}.`
                : 'Pick a deck below and practise — what you get right starts the clock.'}
            </p>
          )}
        </div>
        {plan.cards.length > 0 && (
          <button type="button" className="btn primary big" onClick={onReview}>
            Review {plan.cards.length}
          </button>
        )}
      </section>

      <div className="home-grid">
        <button type="button" className="home-card" onClick={onKana}>
          <span className="big">あ ア</span>
          <h2>Hiragana &amp; katakana</h2>
          <p>
            All {ALL_KANA.length} kana including dakuten and yōon. Type the sound, or pick the
            glyph.
          </p>
          <Progress summary={kana} unit="kana" />
        </button>

        <button type="button" className="home-card" onClick={onKanji}>
          <span className="big">日 本 語</span>
          <h2>Kanji — JLPT N5</h2>
          <p>{ALL_KANJI.length} kanji in nine groups. Meanings, readings, recall and vocabulary.</p>
          <Progress summary={kanji} unit="kanji" />
        </button>

        <button type="button" className="home-card" onClick={onCounters}>
          <span className="big">六本 二十歳</span>
          <h2>Counters, dates &amp; times</h2>
          <p>
            {ALL_COUNTERS.length} forms where the number changes shape — ろっぽん, ついたち, よじ.
          </p>
          <Progress summary={counters} unit="forms" />
        </button>
      </div>

      {weakest.length > 0 && (
        <section className="panel">
          <h2>Giving you the most trouble</h2>
          <p className="hint">Lowest lifetime accuracy across all your sessions.</p>
          <div className="missed-list">
            {weakest.map((k) => (
              <div className="missed-item" key={k.char}>
                <span className="g">{k.char}</span>
                <span className="a">
                  {k.meaning} · {k.acc}%
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {anyProgress && (
        <div className="row">
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              if (window.confirm('Clear all saved progress? This cannot be undone.')) {
                resetProgress();
                onReset();
              }
            }}
          >
            Reset saved progress
          </button>
        </div>
      )}
    </div>
  );
}

function Progress({ summary, unit }: { summary: Summary; unit: string }) {
  if (!summary.seen) {
    return <span className="faint">not practised yet</span>;
  }
  return (
    <span className="faint">
      {summary.seen} of {summary.total} {unit} practised · {summary.accuracy}% lifetime accuracy
    </span>
  );
}
