import { useEffect, useState } from 'react';
import { KANA_GROUPS } from './data/kana';
import type { KanaConfig, KanjiConfig } from './lib/buildCards';
import type { Card, SessionOptions } from './lib/session';
import { loadPref, savePref } from './lib/storage';
import { Home } from './components/Home';
import { KanaSetup } from './components/KanaSetup';
import { KanjiSetup } from './components/KanjiSetup';
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

type Screen = 'home' | 'kana' | 'kanji' | 'quiz';

interface Run {
  /** bumped per launch so Quiz remounts with a fresh session */
  id: number;
  title: string;
  cards: Card[];
  options: SessionOptions;
  back: 'kana' | 'kanji';
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

  useEffect(() => savePref('kana', kanaConfig), [kanaConfig]);
  useEffect(() => savePref('kanji', kanjiConfig), [kanjiConfig]);

  const start = (back: 'kana' | 'kanji', title: string, cards: Card[], options: SessionOptions) => {
    setRun((previous) => ({ id: (previous?.id ?? 0) + 1, title, cards, options, back }));
    setScreen('quiz');
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
        {screen !== 'home' && (
          <button type="button" className="btn ghost" onClick={goHome}>
            Home
          </button>
        )}
      </header>

      {screen === 'home' && (
        <Home
          key={version}
          onKana={() => setScreen('kana')}
          onKanji={() => setScreen('kanji')}
          onReset={() => setVersion((v) => v + 1)}
        />
      )}

      {screen === 'kana' && (
        <KanaSetup
          config={kanaConfig}
          onChange={setKanaConfig}
          onHome={goHome}
          onStart={(cards) =>
            start('kana', 'Hiragana & katakana', cards, {
              flow: kanaConfig.flow,
              order: kanaConfig.order,
            })
          }
        />
      )}

      {screen === 'kanji' && (
        <KanjiSetup
          config={kanjiConfig}
          onChange={setKanjiConfig}
          onHome={goHome}
          onStart={(cards) =>
            start('kanji', 'Kanji — N5', cards, {
              flow: kanjiConfig.flow,
              order: kanjiConfig.order,
            })
          }
        />
      )}

      {screen === 'quiz' && run && (
        <Quiz
          key={run.id}
          title={run.title}
          cards={run.cards}
          options={run.options}
          onEdit={() => setScreen(run.back)}
          onHome={goHome}
        />
      )}
    </div>
  );
}
