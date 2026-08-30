import { PARTICLE_GROUPS } from '../data/particles';
import { buildParticleCards, particlePool, type ParticleConfig } from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { DeckPicker, SetupHeader, StartBar } from './DeckPicker';
import { FlowPicker, Panel, Segmented } from './ui';
import { useStrings } from '../i18n';
import { blurbOf, labelOf, sentenceOf } from '../i18n/content';

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

  const groups = PARTICLE_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    items: group.sentences.map((sentence) => ({
      key: sentence.text,
      label: sentence.text,
      title: sentenceOf(sentence, s.lang),
    })),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title={s.deck.particles}
        subtitle={s.setup.sentenceCount(particlePool(config).length)}
        onHome={onHome}
      />

      <DeckPicker
        title={s.setup.whichParticles}
        hint={s.setup.whichParticlesHint}
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
        itemLayout="block"
      />

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

      <StartBar
        count={cards.length}
        sentences
        empty={s.setup.pickAGroup}
        onStart={() => onStart(cards)}
      />
    </div>
  );
}
