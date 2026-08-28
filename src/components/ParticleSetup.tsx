import { PARTICLE_GROUPS } from '../data/particles';
import { buildParticleCards, particlePool, type ParticleConfig } from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { DeckPicker, SetupHeader, StartBar } from './DeckPicker';
import { FlowPicker, Panel, Segmented } from './ui';

interface Props {
  config: ParticleConfig;
  onChange: (config: ParticleConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function ParticleSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<ParticleConfig>) => onChange({ ...config, ...update });
  const cards = buildParticleCards(config);

  const groups = PARTICLE_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    blurb: group.blurb,
    items: group.sentences.map((sentence) => ({
      key: sentence.text,
      label: sentence.text,
      title: sentence.english,
    })),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title="Particles"
        subtitle={`${particlePool(config).length} sentences`}
        onHome={onHome}
      />

      <DeckPicker
        title="Which particles?"
        hint="Grouped by what the particle does, since that is what decides which one a sentence takes."
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
        itemLayout="block"
      />

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

      <StartBar
        count={cards.length}
        noun="sentences"
        empty="Pick at least one group"
        onStart={() => onStart(cards)}
      />
    </div>
  );
}
