import { useMemo } from 'react';
import { WORD_GROUPS, hasKanji } from '../data/words';
import {
  WORD_MODE_BLURB,
  WORD_MODE_LABEL,
  buildWordCards,
  wordPool,
  type WordConfig,
  type WordMode,
} from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import { Chip, FlowPicker, ModeCard, Panel, Segmented, SelectAll } from './ui';

const MODES: WordMode[] = ['meaning', 'reading', 'recall', 'listening'];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function masteryColour(accuracy: number | null): string | undefined {
  if (accuracy === null) return undefined;
  if (accuracy >= 80) return 'var(--good)';
  if (accuracy >= 50) return '#e0b341';
  return 'var(--bad)';
}

interface Props {
  config: WordConfig;
  onChange: (config: WordConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function WordSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<WordConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  const usable: WordConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const selected = wordPool(usable);
  const cards = buildWordCards(usable);
  const ready = cards.length > 0;
  const kanaOnly = selected.filter((w) => !hasKanji(w)).length;

  const setGroupWords = (groupId: string, include: boolean) => {
    const group = WORD_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const words = group.words.map((w) => w.word);
    patch({
      excluded: include
        ? config.excluded.filter((w) => !words.includes(w))
        : [...new Set([...config.excluded, ...words])],
    });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>Vocabulary — N5</strong>
          <div className="faint">
            {selected.length} words selected · {cards.length} cards
          </div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>

      <Panel
        title="Which words?"
        hint="Turn on the sets you are working on, then switch off anything you already know."
        aside={
          <SelectAll
            all={() => patch({ groupIds: WORD_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {WORD_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const included = group.words.filter((w) => !config.excluded.includes(w.word)).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {group.label} · {included}/{group.words.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {group.blurb}
                  </div>
                </div>
                {on && (
                  <SelectAll
                    all={() => setGroupWords(group.id, true)}
                    none={() => setGroupWords(group.id, false)}
                  />
                )}
              </div>

              {on && (
                <div className="item-picker">
                  {group.words.map((entry) => {
                    const isIncluded = !config.excluded.includes(entry.word);
                    const colour = masteryColour(itemAccuracy(stats[`vocab:${entry.word}`]));
                    return (
                      <button
                        key={entry.word}
                        type="button"
                        className="item-toggle"
                        aria-pressed={isIncluded}
                        title={`${entry.word}${
                          hasKanji(entry) ? ` (${entry.reading})` : ''
                        } — ${entry.meanings.join(', ')}`}
                        onClick={() => patch({ excluded: toggle(config.excluded, entry.word) })}
                      >
                        {entry.word}
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

      <Panel title="How should you be asked?" hint="Pick any combination.">
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
              title={WORD_MODE_LABEL[mode]}
              blurb={
                mode === 'listening' && !hasVoice
                  ? 'Needs a Japanese voice installed on this device.'
                  : WORD_MODE_BLURB[mode]
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
        {usable.modes.includes('reading') && kanaOnly > 0 && (
          <p className="faint" style={{ marginTop: 10 }}>
            {kanaOnly} of the selected words are written in kana already, so they get no reading
            card.
          </p>
        )}
        {usable.modes.includes('recall') && config.inputModes.recall === 'type' && (
          <p className="faint" style={{ marginTop: 10 }}>
            Meaning → word with typing needs a Japanese IME. Multiple choice works everywhere.
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
          {ready ? `Start — ${cards.length} cards` : 'Pick at least one set'}
        </button>
      </div>
    </div>
  );
}
