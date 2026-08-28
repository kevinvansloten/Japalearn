import { PARTICLE_GROUPS } from '../data/particles';
import { buildParticleCards, particlePool, type ParticleConfig } from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { Chip, FlowPicker, Panel, Segmented, SelectAll } from './ui';

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface Props {
  config: ParticleConfig;
  onChange: (config: ParticleConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function ParticleSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<ParticleConfig>) => onChange({ ...config, ...update });

  const cards = buildParticleCards(config);
  const ready = cards.length > 0;
  const selected = particlePool(config);

  const setGroupSentences = (groupId: string, include: boolean) => {
    const group = PARTICLE_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const texts = group.sentences.map((s) => s.text);
    patch({
      excluded: include
        ? config.excluded.filter((t) => !texts.includes(t))
        : [...new Set([...config.excluded, ...texts])],
    });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>Particles</strong>
          <div className="faint">{selected.length} sentences</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>

      <Panel
        title="Which particles?"
        hint="Grouped by what the particle does, since that is what decides which one a sentence takes."
        aside={
          <SelectAll
            all={() => patch({ groupIds: PARTICLE_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {PARTICLE_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const included = group.sentences.filter((s) => !config.excluded.includes(s.text)).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {group.label} · {included}/{group.sentences.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {group.blurb}
                  </div>
                </div>
                {on && (
                  <SelectAll
                    all={() => setGroupSentences(group.id, true)}
                    none={() => setGroupSentences(group.id, false)}
                  />
                )}
              </div>

              {on && (
                <div className="sentence-picker">
                  {group.sentences.map((sentence) => (
                    <button
                      key={sentence.text}
                      type="button"
                      className="sentence-toggle"
                      aria-pressed={!config.excluded.includes(sentence.text)}
                      title={sentence.english}
                      onClick={() => patch({ excluded: toggle(config.excluded, sentence.text) })}
                    >
                      {sentence.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </Panel>

      <Panel title="How should you answer?">
        <div className="row">
          <Segmented<InputMode>
            value={config.inputMode}
            onChange={(inputMode) => patch({ inputMode })}
            options={[
              { value: 'choice', label: 'Choose' },
              { value: 'type', label: 'Type' },
            ]}
          />
        </div>
        <p className="faint" style={{ marginTop: 10 }}>
          Some sentences take more than one particle — 学校に行きます and 学校へ行きます are both
          right. Typing accepts either; multiple choice only ever offers one of them, so there is
          always exactly one correct option on screen.
        </p>
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
          {ready ? `Start — ${cards.length} sentences` : 'Pick at least one group'}
        </button>
      </div>
    </div>
  );
}
