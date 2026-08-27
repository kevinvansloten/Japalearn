import { useMemo } from 'react';
import { ALL_KANA } from '../data/kana';
import { ALL_KANJI } from '../data/kanji';
import { itemAccuracy, loadItemStats, resetProgress } from '../lib/storage';

interface Props {
  onKana: () => void;
  onKanji: () => void;
  onReset: () => void;
}

interface Summary {
  seen: number;
  total: number;
  accuracy: number | null;
}

export function Home({ onKana, onKanji, onReset }: Props) {
  const stats = useMemo(() => loadItemStats(), []);

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
  const anyProgress = kana.seen + kanji.seen > 0;

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
