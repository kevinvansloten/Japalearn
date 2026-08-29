import { useMemo, useRef, useState } from 'react';
import { ALL_KANA } from '../data/kana';
import { ALL_COUNTERS } from '../data/counters';
import { ALL_KANJI } from '../data/kanji';
import { ALL_WORDS } from '../data/words';
import { ALL_ADJECTIVES, ALL_VERBS } from '../data/conjugation';
import { ALL_PARTICLE_SENTENCES } from '../data/particles';
import { CURRICULUM } from '../data/curriculum';
import type { Stage } from '../data/curriculum';
import { stageNumber, stageProgress } from '../lib/curriculum';
import type { ReviewPlan } from '../lib/review';
import { describeGap, nextDueAt } from '../lib/schedule';
import {
  exportProgress,
  importProgress,
  loadItemStats,
  resetProgress,
  secondsPerCard,
} from '../lib/storage';
import { useStrings } from '../i18n';
import { goalOf, titleOf } from '../i18n/content';

interface Props {
  plan: ReviewPlan;
  onReview: () => void;
  onKana: () => void;
  onKanji: () => void;
  onCounters: () => void;
  onWords: () => void;
  onConjugation: () => void;
  onParticles: () => void;
  onProgress: () => void;
  onPlan: () => void;
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
  onProgress,
  onPlan,
  stage,
  onStartStage,
  onReset,
}: Props) {
  const s = useStrings();
  const fileInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState('');
  const stats = useMemo(() => loadItemStats(), []);
  const now = Date.now();
  const upcoming = nextDueAt(stats, now);
  // What the session in front of you actually costs. A backlog after a week
  // away is a big number however it is dressed up, so say the number.
  const minutes = Math.max(1, Math.round((plan.cards.length * secondsPerCard().seconds) / 60));

  const summarise = (ids: string[]): Summary => {
    let right = 0;
    let wrong = 0;
    let seen = 0;
    for (const id of ids) {
      const stat = stats[id];
      if (!stat || stat.right + stat.wrong === 0) continue;
      seen += 1;
      right += stat.right;
      wrong += stat.wrong;
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
  const particles = summarise(
    ALL_PARTICLE_SENTENCES.map((sentence) => `particle:${sentence.text}`),
  );
  const conjugation = summarise(
    [...ALL_VERBS, ...ALL_ADJECTIVES].map((v) => `conj:${v.word}`),
  );
  const anyProgress = kana.seen + kanji.seen + counters.seen + words.seen + conjugation.seen + particles.seen > 0;

  return (
    <div className="stack">
      <p className="hint" style={{ margin: 0, maxWidth: 560 }}>
        {s.home.intro}
      </p>

      <section className="guide-panel">
        <div>
          {stage ? (
            <>
              <div className="faint">{s.home.step(stageNumber(stage), CURRICULUM.length)}</div>
              <h2>{titleOf(stage, s.lang)}</h2>
              <p className="hint">{goalOf(stage, s.lang)}</p>
              <p className="faint">
                {s.home.known(
                  stageProgress(stage, stats).known,
                  stageProgress(stage, stats).total,
                )}
              </p>
            </>
          ) : (
            <>
              <h2>{s.home.planDone}</h2>
              <p className="hint">{s.home.planDoneHint}</p>
            </>
          )}
        </div>
        <div className="row">
          <button type="button" className="btn ghost" onClick={onPlan}>
            {s.plan.nav}
          </button>
          <button type="button" className="btn ghost" onClick={onProgress}>
            {s.home.seeProgress}
          </button>
          {stage && (
            <button type="button" className="btn big" onClick={onStartStage}>
              {s.home.studyThis}
            </button>
          )}
        </div>
      </section>

      <section className="review-panel" data-ready={plan.cards.length > 0}>
        <div>
          <h2>{plan.cards.length ? s.home.readyToReview : s.home.nothingDue}</h2>
          {plan.cards.length ? (
            <p className="hint">
              {plan.due > 0 && (
                <>
                  <b>{plan.due}</b> {s.home.toReview}
                </>
              )}
              {plan.due > 0 && plan.fresh > 0 && ' · '}
              {plan.fresh > 0 && (
                <>
                  <b>{plan.fresh}</b> {s.home.fresh}
                </>
              )}
              {' · '}
              {s.home.aboutMinutes(minutes)}
            </p>
          ) : (
            <p className="hint">
              {upcoming
                ? s.home.nextReview(describeGap(now, upcoming, s))
                : s.home.nothingScheduled}
            </p>
          )}
        </div>
        {plan.cards.length > 0 && (
          <button type="button" className="btn primary big" onClick={onReview}>
            {s.home.review(plan.cards.length)}
          </button>
        )}
      </section>

      <div className="home-grid">
        <button type="button" className="home-card" onClick={onKana}>
          <span className="big">あ ア</span>
          <h2>{s.deck.kana}</h2>
          <p>{s.home.kanaBlurb(ALL_KANA.length)}</p>
          <Progress summary={kana} unit={s.home.unit.kana} />
        </button>

        <button type="button" className="home-card" onClick={onKanji}>
          <span className="big">日 本 語</span>
          <h2>{s.deck.kanji}</h2>
          <p>{s.home.kanjiBlurb(ALL_KANJI.length)}</p>
          <Progress summary={kanji} unit={s.home.unit.kanji} />
        </button>

        <button type="button" className="home-card" onClick={onCounters}>
          <span className="big">六本 二十歳</span>
          <h2>{s.deck.counters}</h2>
          <p>{s.home.countersBlurb(ALL_COUNTERS.length)}</p>
          <Progress summary={counters} unit={s.home.unit.forms} />
        </button>

        <button type="button" className="home-card" onClick={onWords}>
          <span className="big">これ 手紙</span>
          <h2>{s.deck.words}</h2>
          <p>{s.home.wordsBlurb(ALL_WORDS.length)}</p>
          <Progress summary={words} unit={s.home.unit.words} />
        </button>

        <button type="button" className="home-card" onClick={onConjugation}>
          <span className="big">書く 書いて</span>
          <h2>{s.deck.conjugation}</h2>
          <p>{s.home.conjugationBlurb(ALL_VERBS.length, ALL_ADJECTIVES.length)}</p>
          <Progress summary={conjugation} unit={s.home.unit.words} />
        </button>

        <button type="button" className="home-card" onClick={onParticles}>
          <span className="big">パン＿食べます</span>
          <h2>{s.deck.particles}</h2>
          <p>{s.home.particlesBlurb(ALL_PARTICLE_SENTENCES.length)}</p>
          <Progress summary={particles} unit={s.home.unit.sentences} />
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
              setNotice(s.home.exported);
            }}
          >
            {s.home.exportProgress}
          </button>

          <button type="button" className="btn ghost" onClick={() => fileInput.current?.click()}>
            {s.home.importProgress}
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
              if (!window.confirm(s.home.confirmImport)) return;
              const result = importProgress(await file.text(), s);
              setNotice(result.message);
              if (result.ok) onReset();
            }}
          />

          {anyProgress && (
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                if (window.confirm(s.home.confirmReset)) {
                  resetProgress();
                  setNotice(s.home.cleared);
                  onReset();
                }
              }}
            >
              {s.home.resetProgress}
            </button>
          )}
        </div>
        {notice && <span className="faint">{notice}</span>}
      </div>
    </div>
  );
}

function Progress({ summary, unit }: { summary: Summary; unit: string }) {
  const s = useStrings();
  if (!summary.seen) {
    return <span className="faint">{s.home.notPractised}</span>;
  }
  return (
    <span className="faint">
      {s.home.practised(summary.seen, summary.total, unit, summary.accuracy ?? 0)}
    </span>
  );
}
