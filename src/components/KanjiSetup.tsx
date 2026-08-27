import { useMemo } from 'react';
import { KANJI_GROUPS } from '../data/kanji';
import {
  KANJI_MODE_BLURB,
  KANJI_MODE_LABEL,
  buildKanjiCards,
  kanjiPool,
  type KanjiConfig,
  type KanjiMode,
} from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import { Chip, FlowPicker, ModeCard, Panel, Segmented, SelectAll } from './ui';

const MODES: KanjiMode[] = ['meaning', 'reading', 'recall', 'vocab', 'listening'];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/** Green / amber / red dot from lifetime accuracy, or nothing if never seen. */
function masteryColour(accuracy: number | null): string | undefined {
  if (accuracy === null) return undefined;
  if (accuracy >= 80) return 'var(--good)';
  if (accuracy >= 50) return '#e0b341';
  return 'var(--bad)';
}

interface Props {
  config: KanjiConfig;
  onChange: (config: KanjiConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function KanjiSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<KanjiConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  // Listening needs a Japanese voice from the OS. Without one those cards would
  // be silent and unanswerable, so drop them rather than deal out dead cards.
  const usable: KanjiConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const selectedKanji = kanjiPool(usable).length;
  const cards = buildKanjiCards(usable);
  const ready = cards.length > 0;

  const setGroupKanji = (groupId: string, include: boolean) => {
    const group = KANJI_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const chars = group.kanji.map((k) => k.char);
    patch({
      excluded: include
        ? config.excluded.filter((c) => !chars.includes(c))
        : [...new Set([...config.excluded, ...chars])],
    });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>Kanji — JLPT N5</strong>
          <div className="faint">
            {selectedKanji} kanji selected · {cards.length} cards
          </div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>

      <Panel
        title="Which kanji?"
        hint="Turn on the groups you are studying, then switch off individual kanji you already know."
        aside={
          <SelectAll
            all={() => patch({ groupIds: KANJI_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {KANJI_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const included = group.kanji.filter((k) => !config.excluded.includes(k.char)).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {group.label} · {included}/{group.kanji.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {group.blurb}
                  </div>
                </div>
                {on && (
                  <SelectAll
                    all={() => setGroupKanji(group.id, true)}
                    none={() => setGroupKanji(group.id, false)}
                  />
                )}
              </div>

              {on && (
                <div className="kanji-picker">
                  {group.kanji.map((k) => {
                    const isIncluded = !config.excluded.includes(k.char);
                    const colour = masteryColour(itemAccuracy(stats[`kanji:${k.char}`]));
                    return (
                      <button
                        key={k.char}
                        type="button"
                        className="kanji-toggle"
                        aria-pressed={isIncluded}
                        title={`${k.char} — ${k.meanings.join(', ')}`}
                        onClick={() => patch({ excluded: toggle(config.excluded, k.char) })}
                      >
                        {k.char}
                        {colour && <span className="dot" style={{ background: colour }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </Panel>

      <Panel
        title="How should you be asked?"
        hint="Pick any combination. Each mode can be typed or multiple choice."
      >
        <div className="mode-list">
          {MODES.map((mode) => (
            <ModeCard
              key={mode}
              pressed={usable.modes.includes(mode)}
              disabled={mode === 'listening' && !hasVoice}
              onClick={() => {
                const next = toggle(config.modes, mode);
                if (next.length) patch({ modes: next });
              }}
              title={KANJI_MODE_LABEL[mode]}
              blurb={
                mode === 'listening' && !hasVoice
                  ? 'Needs a Japanese voice installed on this device.'
                  : KANJI_MODE_BLURB[mode]
              }
              aside={
                <Segmented<InputMode>
                  value={config.inputModes[mode]}
                  onChange={(value) =>
                    patch({ inputModes: { ...config.inputModes, [mode]: value } })
                  }
                  options={[
                    { value: 'type', label: 'Type' },
                    { value: 'choice', label: 'Choose' },
                  ]}
                />
              }
            />
          ))}
        </div>
        {usable.modes.includes('recall') && config.inputModes.recall === 'type' && (
          <p className="faint" style={{ marginTop: 10 }}>
            Meaning → kanji with typing needs a Japanese IME installed. Multiple choice works
            everywhere.
          </p>
        )}
      </Panel>

      <FlowPicker
        flow={config.flow}
        order={config.order}
        onFlow={(flow) => patch({ flow })}
        onOrder={(order) => patch({ order })}
      />

      <div className="row">
        <button
          type="button"
          className="btn primary big"
          disabled={!ready}
          onClick={() => onStart(cards)}
        >
          {ready ? `Start — ${cards.length} cards` : 'Pick at least one group'}
        </button>
      </div>
    </div>
  );
}
