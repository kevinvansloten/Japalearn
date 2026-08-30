import { useEffect, useMemo, useState } from 'react';
import { KANA_GROUPS } from './data/kana';
import type {
  ConjugationConfig,
  CounterConfig,
  DuolingoConfig,
  KanaConfig,
  ParticleConfig,
  ReadingConfig,
  KanjiConfig,
  WordConfig,
} from './lib/buildCards';
import type { Card, SessionOptions } from './lib/session';
import { planReview, type Decks } from './lib/review';
import { buildStageCards, currentStage } from './lib/curriculum';
import { sessionNewCap, type Pace } from './lib/schedule';
import { titleOf } from './i18n/content';
import {
  loadItemStats,
  loadPace,
  loadPref,
  newAllowanceToday,
  savePace,
  savePref,
} from './lib/storage';
import { Home } from './components/Home';
import { Plan } from './components/Plan';
import { KanaSetup } from './components/KanaSetup';
import { CounterSetup } from './components/CounterSetup';
import { KanjiSetup } from './components/KanjiSetup';
import { WordSetup } from './components/WordSetup';
import { ConjugationSetup } from './components/ConjugationSetup';
import { ParticleSetup } from './components/ParticleSetup';
import { DuolingoSetup } from './components/DuolingoSetup';
import { Browse } from './components/Browse';
import { Progress } from './components/Progress';
import type { BrowseDeck } from './lib/browse';
import { ReadingSetup } from './components/ReadingSetup';
import { Quiz } from './components/Quiz';
import { LanguagePicker } from './components/ui';
import { LanguageProvider, useStrings } from './i18n';

const DEFAULT_KANA: KanaConfig = {
  scripts: ['hira'],
  groupIds: KANA_GROUPS.filter((g) => g.section === 'gojuon').map((g) => g.id),
  modes: ['recognition'],
  flow: 'mistakes',
  order: 'shuffled',
};

const DEFAULT_KANJI: KanjiConfig = {
  groupIds: ['numbers'],
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', vocab: 'type', listening: 'type' },
  flow: 'mistakes',
  order: 'shuffled',
};

const DEFAULT_COUNTERS: CounterConfig = {
  groupIds: ['time'],
  excluded: [],
  modes: ['reading'],
  inputModes: { reading: 'type', meaning: 'type', listening: 'type' },
  flow: 'mistakes',
  order: 'shuffled',
};

const DEFAULT_WORDS: WordConfig = {
  groupIds: ['pointing'],
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', listening: 'type' },
  flow: 'mistakes',
  order: 'shuffled',
};

const DEFAULT_CONJUGATION: ConjugationConfig = {
  groupIds: ['ichidan'],
  excluded: [],
  verbForms: ['masu', 'te'],
  adjectiveForms: ['negative', 'past'],
  modes: ['produce'],
  inputModes: { produce: 'type', identify: 'choice', dictionary: 'type' },
  flow: 'mistakes',
  order: 'shuffled',
};

/**
 * Five units in rather than the whole course: three hundred and ten units of
 * vocabulary as an opening screen is not a deck, it is a wall. The range is
 * the first thing anyone changes anyway.
 */
const DEFAULT_DUOLINGO: DuolingoConfig = {
  fromUnit: 1,
  toUnit: 5,
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', recall: 'choice', reading: 'type', listening: 'type' },
  script: 'word',
  flow: 'mistakes',
  order: 'shuffled',
};

const DEFAULT_PARTICLES: ParticleConfig = {
  groupIds: ['wo'],
  excluded: [],
  inputMode: 'choice',
  flow: 'mistakes',
  order: 'shuffled',
};

const DEFAULT_READING: ReadingConfig = {
  groupIds: ['statements'],
  excluded: [],
  modes: ['meaning'],
  flow: 'mistakes',
  order: 'shuffled',
};

type Screen =
  | 'home' | 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles'
  | 'duolingo' | 'reading' | 'progress' | 'plan' | 'browse' | 'quiz';

interface Run {
  /** bumped per launch so Quiz remounts with a fresh session */
  id: number;
  title: string;
  cards: Card[];
  options: SessionOptions;
  back?: 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles'
    | 'duolingo'
    | 'reading';
  /** results move items along their Leitner boxes */
  scheduled?: boolean;
}

export default function App() {
  return (
    <LanguageProvider>
      <Learner />
    </LanguageProvider>
  );
}

function Learner() {
  const s = useStrings();
  const [screen, setScreen] = useState<Screen>('home');
  const [run, setRun] = useState<Run | null>(null);
  /** bumped after a progress reset so the home screen re-reads localStorage */
  const [version, setVersion] = useState(0);

  const [kanaConfig, setKanaConfig] = useState<KanaConfig>(() => ({
    ...DEFAULT_KANA,
    ...loadPref<Partial<KanaConfig>>('kana', {}),
  }));
  const [kanjiConfig, setKanjiConfig] = useState<KanjiConfig>(() => {
    const saved = loadPref<Partial<KanjiConfig>>('kanji', {});
    return {
      ...DEFAULT_KANJI,
      ...saved,
      inputModes: { ...DEFAULT_KANJI.inputModes, ...saved.inputModes },
    };
  });

  const [counterConfig, setCounterConfig] = useState<CounterConfig>(() => {
    const saved = loadPref<Partial<CounterConfig>>('counters', {});
    return {
      ...DEFAULT_COUNTERS,
      ...saved,
      inputModes: { ...DEFAULT_COUNTERS.inputModes, ...saved.inputModes },
    };
  });

  const [wordConfig, setWordConfig] = useState<WordConfig>(() => {
    const saved = loadPref<Partial<WordConfig>>('words', {});
    return {
      ...DEFAULT_WORDS,
      ...saved,
      inputModes: { ...DEFAULT_WORDS.inputModes, ...saved.inputModes },
    };
  });

  const [conjugationConfig, setConjugationConfig] = useState<ConjugationConfig>(() => {
    const saved = loadPref<Partial<ConjugationConfig>>('conjugation', {});
    return {
      ...DEFAULT_CONJUGATION,
      ...saved,
      inputModes: { ...DEFAULT_CONJUGATION.inputModes, ...saved.inputModes },
    };
  });

  const [particleConfig, setParticleConfig] = useState<ParticleConfig>(() => ({
    ...DEFAULT_PARTICLES,
    ...loadPref<Partial<ParticleConfig>>('particles', {}),
  }));

  const [duolingoConfig, setDuolingoConfig] = useState<DuolingoConfig>(() => {
    const saved = loadPref<Partial<DuolingoConfig>>('duolingo', {});
    return {
      ...DEFAULT_DUOLINGO,
      ...saved,
      inputModes: { ...DEFAULT_DUOLINGO.inputModes, ...saved.inputModes },
    };
  });

  // Not a deck setting: the pace is what the new-item budget is spent against.
  // Saved on the way through rather than in an effect, because the review plan
  // below reads it back out of storage and would otherwise recompute against
  // the old value for one render.
  const [pace, setPaceState] = useState<Pace>(loadPace);
  const setPace = (next: Pace) => {
    savePace(next);
    setPaceState(next);
  };

  useEffect(() => savePref('duolingo', duolingoConfig), [duolingoConfig]);
  const [readingConfig, setReadingConfig] = useState<ReadingConfig>(() => ({
    ...DEFAULT_READING,
    ...loadPref<Partial<ReadingConfig>>('reading', {}),
  }));

  useEffect(() => savePref('reading', readingConfig), [readingConfig]);
  useEffect(() => savePref('particles', particleConfig), [particleConfig]);
  useEffect(() => savePref('conjugation', conjugationConfig), [conjugationConfig]);
  useEffect(() => savePref('words', wordConfig), [wordConfig]);
  useEffect(() => savePref('counters', counterConfig), [counterConfig]);
  useEffect(() => savePref('kana', kanaConfig), [kanaConfig]);
  useEffect(() => savePref('kanji', kanjiConfig), [kanjiConfig]);

  const start = (
    title: string,
    cards: Card[],
    options: SessionOptions,
    extra: {
      back?: 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles'
        | 'duolingo'
        | 'reading';
      scheduled?: boolean;
    } = {},
  ) => {
    setRun((previous) => ({ id: (previous?.id ?? 0) + 1, title, cards, options, ...extra }));
    setScreen('quiz');
  };

  const decks: Decks = {
    kana: kanaConfig,
    kanji: kanjiConfig,
    counters: counterConfig,
    words: wordConfig,
    conjugation: conjugationConfig,
    particles: particleConfig,
    reading: readingConfig,
  };

  // The stage to be getting on with, recomputed alongside the review plan.
  const stage = useMemo(() => currentStage(loadItemStats()), [version]);

  // Recomputed whenever we land back on the home screen, so finishing a review
  // immediately reflects the new schedule.
  const plan = useMemo(
    () =>
      planReview(
        decks,
        loadItemStats(),
        // The week's remaining allowance, taken one sitting at a time.
        sessionNewCap(pace, newAllowanceToday()),
        Date.now(),
        s,
      ),
    [
      kanaConfig,
      kanjiConfig,
      counterConfig,
      wordConfig,
      conjugationConfig,
      particleConfig,
      pace,
      readingConfig,
      version,
      s,
    ],
  );

  /**
   * Studying a stage is the guided form of a review, so it schedules. Starting
   * it as ordinary practice left the button unable to move the very progress
   * it was offering: practice never sets a box, and a stage is measured in
   * boxes.
   */
  const startStage = () => {
    if (!stage) return;
    start(
      titleOf(stage, s.lang),
      buildStageCards(stage, decks, s),
      { flow: 'mistakes', order: 'shuffled' },
      { scheduled: true },
    );
  };

  const goHome = () => {
    setScreen('home');
    setVersion((v) => v + 1);
  };

  return (
    <div className="app">
      <header className="topbar">
        <button
          type="button"
          className="brand"
          onClick={goHome}
          style={{ background: 'none', border: 0, padding: 0 }}
        >
          <span className="mark">日本</span>
          <span>JapanLearner</span>
        </button>
        <span className="spacer" />
        <LanguagePicker />
        {screen !== 'home' && (
          <button type="button" className="btn ghost" onClick={goHome}>
            {s.common.home}
          </button>
        )}
      </header>

      {screen === 'home' && (
        <Home
          key={version}
          plan={plan}
          onReview={() =>
            start(
              s.run.review,
              plan.cards,
              { flow: 'mistakes', order: 'shuffled' },
              { scheduled: true },
            )
          }
          onKana={() => setScreen('kana')}
          onKanji={() => setScreen('kanji')}
          onCounters={() => setScreen('counters')}
          onWords={() => setScreen('words')}
          onConjugation={() => setScreen('conjugation')}
          onParticles={() => setScreen('particles')}
          onDuolingo={() => setScreen('duolingo')}
          onReading={() => setScreen('reading')}
          onProgress={() => setScreen('progress')}
          onPlan={() => setScreen('plan')}
          onBrowse={() => setScreen('browse')}
          stage={stage}
          onStartStage={startStage}
          onReset={() => setVersion((v) => v + 1)}
        />
      )}

      {screen === 'kana' && (
        <KanaSetup
          config={kanaConfig}
          onChange={setKanaConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.kana,
              cards,
              { flow: kanaConfig.flow, order: kanaConfig.order },
              { back: 'kana' },
            )
          }
        />
      )}

      {screen === 'kanji' && (
        <KanjiSetup
          config={kanjiConfig}
          onChange={setKanjiConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.kanji,
              cards,
              { flow: kanjiConfig.flow, order: kanjiConfig.order },
              { back: 'kanji' },
            )
          }
        />
      )}

      {screen === 'counters' && (
        <CounterSetup
          config={counterConfig}
          onChange={setCounterConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.counters,
              cards,
              { flow: counterConfig.flow, order: counterConfig.order },
              { back: 'counters' },
            )
          }
        />
      )}

      {screen === 'words' && (
        <WordSetup
          config={wordConfig}
          onChange={setWordConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.words,
              cards,
              { flow: wordConfig.flow, order: wordConfig.order },
              { back: 'words' },
            )
          }
        />
      )}

      {screen === 'conjugation' && (
        <ConjugationSetup
          config={conjugationConfig}
          onChange={setConjugationConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.conjugation,
              cards,
              { flow: conjugationConfig.flow, order: conjugationConfig.order },
              { back: 'conjugation' },
            )
          }
        />
      )}

      {screen === 'particles' && (
        <ParticleSetup
          config={particleConfig}
          onChange={setParticleConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.particles,
              cards,
              { flow: particleConfig.flow, order: particleConfig.order },
              { back: 'particles' },
            )
          }
        />
      )}

      {/*
        * Not part of the guided plan or the review schedule: the plan is a
        * route through N5, and this deck is a record of what one course
        * happened to teach. It is drilled on its own terms, and its results
        * still count towards lifetime accuracy like any other session.
        */}
      {screen === 'duolingo' && (
        <DuolingoSetup
          config={duolingoConfig}
          onChange={setDuolingoConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.duolingo,
              cards,
              { flow: duolingoConfig.flow, order: duolingoConfig.order },
              { back: 'duolingo' },
            )
          }
        />
      )}

      {screen === 'reading' && (
        <ReadingSetup
          config={readingConfig}
          onChange={setReadingConfig}
          onHome={goHome}
          onStart={(cards) =>
            start(
              s.run.reading,
              cards,
              { flow: readingConfig.flow, order: readingConfig.order },
              { back: 'reading' },
            )
          }
        />
      )}

      {/*
        * The reference screen reads every deck but owns none of them, so the
        * only thing it hands back is which deck you were reading — the setup
        * screen for that deck picks it up from there.
        */}
      {screen === 'browse' && (
        <Browse
          key={version}
          onHome={goHome}
          onPractise={(browsed: BrowseDeck) => setScreen(browsed)}
        />
      )}

      {screen === 'progress' && <Progress key={version} onHome={goHome} />}

      {screen === 'plan' && (
        <Plan key={version} pace={pace} onPace={setPace} onHome={goHome} />
      )}

      {screen === 'quiz' && run && (
        <Quiz
          key={run.id}
          title={run.title}
          cards={run.cards}
          options={run.options}
          scheduled={run.scheduled}
          onEdit={run.back ? () => setScreen(run.back!) : undefined}
          onHome={goHome}
        />
      )}
    </div>
  );
}
