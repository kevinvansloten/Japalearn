import { useMemo } from 'react';
import { COUNTER_GROUPS } from '../data/counters';
import {
  COUNTER_MODE_BLURB,
  COUNTER_MODE_LABEL,
  buildCounterCards,
  counterPool,
  type CounterConfig,
  type CounterMode,
} from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import { Chip, FlowPicker, ModeCard, Panel, Segmented, SelectAll } from './ui';

const MODES: CounterMode[] = ['reading', 'meaning', 'listening'];

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
  config: CounterConfig;
  onChange: (config: CounterConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function CounterSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<CounterConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  const usable: CounterConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const selected = counterPool(usable).length;
  const cards = buildCounterCards(usable);
  const ready = cards.length > 0;

  const setGroupItems = (groupId: string, include: boolean) => {
    const group = COUNTER_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const forms = group.items.map((i) => i.form);
    patch({
      excluded: include
        ? config.excluded.filter((f) => !forms.includes(f))
        : [...new Set([...config.excluded, ...forms])],
    });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>Counters, dates &amp; times</strong>
          <div className="faint">
            {selected} selected · {cards.length} cards
          </div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>

      <Panel
        title="What do you want to drill?"
        hint="Turn on the sets you are working on, then switch off anything you already have."
        aside={
          <SelectAll
            all={() => patch({ groupIds: COUNTER_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {COUNTER_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const included = group.items.filter((i) => !config.excluded.includes(i.form)).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {group.label} · {included}/{group.items.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {group.blurb}
                  </div>
                </div>
                {on && (
                  <SelectAll
                    all={() => setGroupItems(group.id, true)}
                    none={() => setGroupItems(group.id, false)}
                  />
                )}
              </div>

              {on && (
                <div className="item-picker">
                  {group.items.map((item) => {
                    const isIncluded = !config.excluded.includes(item.form);
                    const colour = masteryColour(itemAccuracy(stats[`counter:${item.form}`]));
                    return (
                      <button
                        key={item.form}
                        type="button"
                        className="item-toggle"
                        aria-pressed={isIncluded}
                        title={`${item.form} (${item.reading}) — ${item.meaning}`}
                        onClick={() => patch({ excluded: toggle(config.excluded, item.form) })}
                      >
                        {item.form}
                        {item.irregular && <span className="warn" aria-hidden="true" />}
                        {colour && <span className="dot" style={{ background: colour }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <p className="faint" style={{ marginTop: 12 }}>
          A dash above an item marks a sound change — 六本 rather than 六ほん.
        </p>
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
              title={COUNTER_MODE_LABEL[mode]}
              blurb={
                mode === 'listening' && !hasVoice
                  ? 'Needs a Japanese voice installed on this device.'
                  : COUNTER_MODE_BLURB[mode]
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
