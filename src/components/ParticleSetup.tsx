import { PARTICLE_GROUPS } from '../data/particles';
import { buildParticleCards, particlePool, type ParticleConfig } from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { useStrings } from '../i18n';
import { blurbOf, labelOf, sentenceOf } from '../i18n/content';
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
  const s = useStrings();
  const patch = (update: Partial<ParticleConfig>) => onChange({ ...config, ...update });

  const cards = buildParticleCards(config, s);
  const ready = cards.length > 0;
  const selected = particlePool(config);

  const setGroupSentences = (groupId: string, include: boolean) => {
    const group = PARTICLE_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const texts = group.sentences.map((sentence) => sentence.text);
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
          <strong>{s.deck.particles}</strong>
          <div className="faint">{s.setup.sentenceCount(selected.length)}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <Panel
        title={s.setup.whichParticles}
        hint={s.setup.whichParticlesHint}
        aside={
          <SelectAll
            all={() => patch({ groupIds: PARTICLE_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {PARTICLE_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const included = group.sentences.filter(
            (sentence) => !config.excluded.includes(sentence.text),
          ).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {labelOf(group, s.lang)} · {included}/{group.sentences.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {blurbOf(group, s.lang)}
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
                      title={sentenceOf(sentence, s.lang)}
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

      <Panel title={s.setup.howAnswer}>
        <div className="row">
          <Segmented<InputMode>
            value={config.inputMode}
            onChange={(inputMode) => patch({ inputMode })}
            options={[
              { value: 'choice', label: s.common.choose },
              { value: 'type', label: s.common.type },
            ]}
          />
        </div>
        <p className="faint" style={{ marginTop: 10 }}>
          {s.setup.particleNote}
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
          {ready ? s.setup.startSentences(cards.length) : s.setup.pickAGroup}
        </button>
      </div>
    </div>
  );
}
