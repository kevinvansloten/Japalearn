import { KANA_GROUPS, groupsBySection, type KanaSection } from '../data/kana';
import {
  buildKanaCards,
  kanaPool,
  type KanaConfig,
  type KanaMode,
  type KanaScript,
} from '../lib/buildCards';
import type { Card } from '../lib/session';
import { useStrings } from '../i18n';
import { Chip, FlowPicker, ModeCard, Panel, SelectAll } from './ui';

const SECTIONS: KanaSection[] = ['gojuon', 'dakuten', 'yoon'];

const MODES: KanaMode[] = ['recognition', 'recall'];

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
  const s = useStrings();
  const patch = (update: Partial<KanaConfig>) => onChange({ ...config, ...update });

  const selectedKana = kanaPool(config).length;
  const cards = buildKanaCards(config, s);
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
          <strong>{s.deck.kana}</strong>
          <div className="faint">{s.setup.kanaSelected(selectedKana, cards.length)}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <Panel title={s.setup.whichScript} hint={s.setup.whichScriptHint}>
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
              {s.script[script]}
            </Chip>
          ))}
        </div>
      </Panel>

      <Panel title={s.setup.whichKana} hint={s.setup.whichKanaHint}>
        {SECTIONS.map((section) => {
          const groups = groupsBySection(section);
          const allOn = groups.every((g) => config.groupIds.includes(g.id));
          return (
            <div className="group-block" key={section}>
              <div className="group-head">
                <h3>{s.kanaSection[section]}</h3>
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
              {allOn && (
                <div className="faint" style={{ marginTop: 6 }}>
                  {s.setup.wholeSectionOn}
                </div>
              )}
            </div>
          );
        })}
        <div className="row" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn ghost"
            onClick={() => patch({ groupIds: KANA_GROUPS.map((g) => g.id) })}
          >
            {s.common.everything}
          </button>
          <button type="button" className="btn ghost" onClick={() => patch({ groupIds: [] })}>
            {s.common.nothing}
          </button>
        </div>
      </Panel>

      <Panel title={s.setup.howAsked}>
        <div className="mode-list">
          {MODES.map((mode) => (
            <ModeCard
              key={mode}
              pressed={config.modes.includes(mode)}
              onClick={() => {
                const next = toggle(config.modes, mode);
                if (next.length) patch({ modes: next });
              }}
              title={s.kanaMode.label[mode]}
              blurb={s.kanaMode.blurb[mode]}
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
          {ready ? s.setup.start(cards.length) : s.setup.pickARow}
        </button>
      </div>
    </div>
  );
}
