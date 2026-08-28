import { useEffect, useMemo, useState } from 'react';
import { KANA_GROUPS } from './data/kana';
import type {
  ConjugationConfig,
  CounterConfig,
  KanaConfig,
  ParticleConfig,
  KanjiConfig,
  WordConfig,
} from './lib/buildCards';
import type { Card, SessionOptions } from './lib/session';
import { planReview } from './lib/review';
import { loadItemStats, loadPref, newAllowanceToday, savePref } from './lib/storage';
import { Home } from './components/Home';
import { KanaSetup } from './components/KanaSetup';
import { CounterSetup } from './components/CounterSetup';
import { KanjiSetup } from './components/KanjiSetup';
import { WordSetup } from './components/WordSetup';
import { ConjugationSetup } from './components/ConjugationSetup';
import { ParticleSetup } from './components/ParticleSetup';
import { Quiz } from './components/Quiz';

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

const DEFAULT_PARTICLES: ParticleConfig = {
  groupIds: ['wo'],
  excluded: [],
  inputMode: 'choice',
  flow: 'mistakes',
  order: 'shuffled',
};

type Screen =
  | 'home' | 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles' | 'quiz';

interface Run {
  /** bumped per launch so Quiz remounts with a fresh session */
  id: number;
  title: string;
  cards: Card[];
  options: SessionOptions;
  back?: 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles';
  /** results move items along their Leitner boxes */
  scheduled?: boolean;
}

export default function App() {
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
      back?: 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles';
      scheduled?: boolean;
    } = {},
  ) => {
    setRun((previous) => ({ id: (previous?.id ?? 0) + 1, title, cards, options, ...extra }));
    setScreen('quiz');
  };

  // Recomputed whenever we land back on the home screen, so finishing a review
  // immediately reflects the new schedule.
  const plan = useMemo(
    () =>
      planReview(
        {
          kana: kanaConfig,
          kanji: kanjiConfig,
          counters: counterConfig,
          words: wordConfig,
          conjugation: conjugationConfig,
          particles: particleConfig,
        },
        loadItemStats(),
        newAllowanceToday(),
      ),
    [
      kanaConfig,
      kanjiConfig,
      counterConfig,
      wordConfig,
      conjugationConfig,
      particleConfig,
      version,
    ],
  );

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
        {screen !== 'home' && (
          <button type="button" className="btn ghost" onClick={goHome}>
            Home
          </button>
        )}
      </header>

      {screen === 'home' && (
        <Home
          key={version}
          plan={plan}
          onReview={() =>
            start('Review', plan.cards, { flow: 'mistakes', order: 'shuffled' }, { scheduled: true })
          }
          onKana={() => setScreen('kana')}
          onKanji={() => setScreen('kanji')}
          onCounters={() => setScreen('counters')}
          onWords={() => setScreen('words')}
          onConjugation={() => setScreen('conjugation')}
          onParticles={() => setScreen('particles')}
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
              'Hiragana & katakana',
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
              'Kanji — N5',
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
              'Counters, dates & times',
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
              'Vocabulary — N5',
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
              'Conjugation',
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
              'Particles',
              cards,
              { flow: particleConfig.flow, order: particleConfig.order },
              { back: 'particles' },
            )
          }
        />
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
