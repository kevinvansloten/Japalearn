import { KANA_GROUPS, SECTION_LABELS, groupsBySection, type KanaSection } from '../data/kana';
import {
  SCRIPT_LABEL,
  buildKanaCards,
  kanaPool,
  type KanaConfig,
  type KanaMode,
  type KanaScript,
} from '../lib/buildCards';
import type { Card } from '../lib/session';
import { Chip, FlowPicker, ModeCard, Panel, SelectAll } from './ui';

const SECTIONS: KanaSection[] = ['gojuon', 'dakuten', 'yoon'];

const MODES: { value: KanaMode; label: string; blurb: string }[] = [
  {
    value: 'recognition',
    label: 'Recognition — kana → sound',
    blurb: 'See か, type “ka”. This is the one to start with.',
  },
  {
    value: 'recall',
    label: 'Recall — sound → kana',
    blurb: 'See “ka”, pick か out of four. Harder, and it sticks better.',
  },
];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface Props {
  config: KanaConfig;
  onChange: (config: KanaConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function KanaSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<KanaConfig>) => onChange({ ...config, ...update });

  const selectedKana = kanaPool(config).length;
  const cards = buildKanaCards(config);
  const ready = cards.length > 0;

  const setSectionGroups = (section: KanaSection, on: boolean) => {
    const ids = groupsBySection(section).map((g) => g.id);
    patch({
      groupIds: on
        ? [...new Set([...config.groupIds, ...ids])]
        : config.groupIds.filter((id) => !ids.includes(id)),
    });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>Hiragana &amp; katakana</strong>
          <div className="faint">
            {selectedKana} kana selected · {cards.length} cards
          </div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>

      <Panel title="Which script?" hint="Pick one or both. Choosing both practises them together.">
        <div className="chip-grid">
          {(['hira', 'kata'] as KanaScript[]).map((script) => (
            <Chip
              key={script}
              pressed={config.scripts.includes(script)}
              onClick={() => {
                const next = toggle(config.scripts, script);
                if (next.length) patch({ scripts: next });
              }}
            >
              {SCRIPT_LABEL[script]}
            </Chip>
          ))}
        </div>
      </Panel>

      <Panel title="Which kana?" hint="Rows of the syllabary — turn on only what you are working on.">
        {SECTIONS.map((section) => {
          const groups = groupsBySection(section);
          const allOn = groups.every((g) => config.groupIds.includes(g.id));
          return (
            <div className="group-block" key={section}>
              <div className="group-head">
                <h3>{SECTION_LABELS[section]}</h3>
                <SelectAll
                  all={() => setSectionGroups(section, true)}
                  none={() => setSectionGroups(section, false)}
                />
              </div>
              <div className="chip-grid">
                {groups.map((group) => (
                  <Chip
                    key={group.id}
                    jp
                    pressed={config.groupIds.includes(group.id)}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {group.label}
                  </Chip>
                ))}
              </div>
              {allOn && <div className="faint" style={{ marginTop: 6 }}>whole section on</div>}
            </div>
          );
        })}
        <div className="row" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn ghost"
            onClick={() => patch({ groupIds: KANA_GROUPS.map((g) => g.id) })}
          >
            Everything
          </button>
          <button type="button" className="btn ghost" onClick={() => patch({ groupIds: [] })}>
            Nothing
          </button>
        </div>
      </Panel>

      <Panel title="How should you be asked?">
        <div className="mode-list">
          {MODES.map((mode) => (
            <ModeCard
              key={mode.value}
              pressed={config.modes.includes(mode.value)}
              onClick={() => {
                const next = toggle(config.modes, mode.value);
                if (next.length) patch({ modes: next });
              }}
              title={mode.label}
              blurb={mode.blurb}
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
          {ready ? `Start — ${cards.length} cards` : 'Pick at least one row'}
        </button>
      </div>
    </div>
  );
}
