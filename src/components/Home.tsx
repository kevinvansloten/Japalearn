import { useMemo, useRef, useState } from 'react';
import { ALL_KANA } from '../data/kana';
import { ALL_COUNTERS } from '../data/counters';
import { ALL_KANJI } from '../data/kanji';
import { ALL_WORDS } from '../data/words';
import { ALL_ADJECTIVES, ALL_VERBS } from '../data/conjugation';
import { ALL_PARTICLE_SENTENCES } from '../data/particles';
import { ALL_READING_SENTENCES, written } from '../data/reading';
import { CURRICULUM } from '../data/curriculum';
import type { Stage } from '../data/curriculum';
import { stageNumber, stageProgress } from '../lib/curriculum';
import type { ReviewPlan } from '../lib/review';
import { describeGap, nextDueAt } from '../lib/schedule';
import type { ItemStats } from '../lib/storage';
import { exportProgress, importProgress, loadItemStats, resetProgress } from '../lib/storage';
import { MasteryBar } from './ui';

interface Props {
  plan: ReviewPlan;
  onReview: () => void;
  onKana: () => void;
  onKanji: () => void;
  onCounters: () => void;
  onWords: () => void;
  onConjugation: () => void;
  onParticles: () => void;
  onReading: () => void;
  onProgress: () => void;
  /** the stage the learner is on, or null once the plan is finished */
  stage: Stage | null;
  onStartStage: () => void;
  onReset: () => void;
}

interface Summary {
  seen: number;
  total: number;
  accuracy: number | null;
}

export function Home({
  plan,
  onReview,
  onKana,
  onKanji,
  onCounters,
  onWords,
  onConjugation,
  onParticles,
  onReading,
  onProgress,
  stage,
  onStartStage,
  onReset,
}: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState('');
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

  const kana = summarise(
    ALL_KANA.flatMap((k) => [`kana:hira:${k.id}`, `kana:kata:${k.id}`]),
  );
  const kanji = summarise(ALL_KANJI.map((k) => `kanji:${k.char}`));
  const counters = summarise(ALL_COUNTERS.map((c) => `counter:${c.form}`));
  const words = summarise(ALL_WORDS.map((w) => `vocab:${w.word}`));
  const readingSummary = summarise(ALL_READING_SENTENCES.map((s) => `reading:${written(s)}`));
  const particles = summarise(ALL_PARTICLE_SENTENCES.map((s) => `particle:${s.text}`));
  const conjugation = summarise(
    [...ALL_VERBS, ...ALL_ADJECTIVES].map((v) => `conj:${v.word}`),
  );
  const anyProgress = kana.seen + kanji.seen + counters.seen + words.seen + conjugation.seen + particles.seen + readingSummary.seen > 0;

  return (
    <div className="stack">
      <p className="hint" style={{ margin: 0, maxWidth: 560 }}>
        Seven decks covering N5, from the kana up to reading whole sentences. Review what is
        due, follow the plan, or pick a deck and drill exactly what you choose. Review what is due, or pick a deck
        and drill exactly what you choose.
      </p>

      <section className="guide-panel">
        <div>
          {stage ? (
            <>
              <div className="faint">
                Step {stageNumber(stage)} of {CURRICULUM.length}
              </div>
              <h2>{stage.title}</h2>
              <p className="hint">{stage.goal}</p>
              <StageProgress stage={stage} stats={stats} />
            </>
          ) : (
            <>
              <h2>You have been through the whole plan</h2>
              <p className="hint">
                Keep reviewing, or pick any deck and drill whatever you like.
              </p>
            </>
          )}
        </div>
        <div className="row">
          <button type="button" className="btn ghost" onClick={onProgress}>
            See progress
          </button>
          {stage && (
            <button type="button" className="btn big" onClick={onStartStage}>
              Study this
            </button>
          )}
        </div>
      </section>

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

        <button type="button" className="home-card" onClick={onWords}>
          <span className="big">これ 手紙</span>
          <h2>Vocabulary — N5</h2>
          <p>
            {ALL_WORDS.length} core words, including the kana-only ones no kanji deck can reach.
          </p>
          <Progress summary={words} unit="words" />
        </button>

        <button type="button" className="home-card" onClick={onConjugation}>
          <span className="big">書く 書いて</span>
          <h2>Conjugation</h2>
          <p>
            ます, て-form, ない and past, across {ALL_VERBS.length} verbs and{' '}
            {ALL_ADJECTIVES.length} adjectives.
          </p>
          <Progress summary={conjugation} unit="words" />
        </button>

        <button type="button" className="home-card" onClick={onParticles}>
          <span className="big">パン＿食べます</span>
          <h2>Particles</h2>
          <p>
            {ALL_PARTICLE_SENTENCES.length} sentences with a gap — は, が, を, に, で and the rest.
          </p>
          <Progress summary={particles} unit="sentences" />
        </button>

        <button type="button" className="home-card" onClick={onReading}>
          <span className="big">私はパンを</span>
          <h2>Reading</h2>
          <p>
            {ALL_READING_SENTENCES.length} sentences that use the other decks together, with
            furigana when you want them.
          </p>
          <Progress summary={readingSummary} unit="sentences" />
        </button>
      </div>

      <div className="row between">
        <div className="row">
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              const blob = new Blob([exportProgress()], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `japanlearner-${new Date().toISOString().slice(0, 10)}.json`;
              link.click();
              URL.revokeObjectURL(url);
              setNotice('Progress downloaded.');
            }}
          >
            Export progress
          </button>

          <button type="button" className="btn ghost" onClick={() => fileInput.current?.click()}>
            Import progress
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (!file) return;
              if (
                !window.confirm(
                  'Importing replaces all saved progress on this device. Continue?',
                )
              ) {
                return;
              }
              const result = importProgress(await file.text());
              setNotice(result.message);
              if (result.ok) onReset();
            }}
          />

          {anyProgress && (
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                if (window.confirm('Clear all saved progress? This cannot be undone.')) {
                  resetProgress();
                  setNotice('Progress cleared.');
                  onReset();
                }
              }}
            >
              Reset saved progress
            </button>
          )}
        </div>
        {notice && <span className="faint">{notice}</span>}
      </div>
    </div>
  );
}

/**
 * A first session leaves everything in box 1, which is "learning" rather than
 * "known" — so showing only the known count reads as no progress at all after
 * a session that went fine. Both are shown, with a bar.
 */
function StageProgress({ stage, stats }: { stage: Stage; stats: Record<string, ItemStats> }) {
  const { known, learning, total } = stageProgress(stage, stats);
  return (
    <div style={{ maxWidth: 320, marginTop: 8 }}>
      <MasteryBar known={known} learning={learning} total={total} />
      <div className="faint" style={{ marginTop: 6 }}>
        {known} of {total} known
        {learning > 0 && ` · ${learning} still learning`}
      </div>
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
