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
import type { Card } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import {
  DeckPicker,
  ModePicker,
  SetupHeader,
  StartBar,
  masteryColour,
  toggle,
  type ModeOption,
} from './DeckPicker';
import { FlowPicker } from './ui';

const MODES: CounterMode[] = ['reading', 'meaning', 'listening'];

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

  const cards = buildCounterCards(usable);

  const groups = COUNTER_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    blurb: group.blurb,
    items: group.items.map((item) => ({
      key: item.form,
      label: item.form,
      title: `${item.form} (${item.reading}) — ${item.meaning}`,
      dot: masteryColour(itemAccuracy(stats[`counter:${item.form}`])),
      flag: item.irregular,
    })),
  }));

  const modes: ModeOption<CounterMode>[] = MODES.map((mode) => ({
    id: mode,
    label: COUNTER_MODE_LABEL[mode],
    blurb: COUNTER_MODE_BLURB[mode],
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: 'Needs a Japanese voice installed on this device.' }
      : {}),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title="Counters, dates & times"
        subtitle={`${counterPool(usable).length} selected · ${cards.length} cards`}
        onHome={onHome}
      />

      <DeckPicker
        title="What do you want to drill?"
        hint="Turn on the sets you are working on, then switch off anything you already have."
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
        footnote="A dash above an item marks a sound change — 六本 rather than 六ほん."
      />

      <ModePicker<CounterMode>
        hint="Pick any combination."
        modes={modes}
        selected={usable.modes}
        inputModes={config.inputModes}
        onToggle={(mode) => {
          const next = toggle(config.modes, mode);
          if (next.length) patch({ modes: next });
        }}
        onInputMode={(mode, value) =>
          patch({ inputModes: { ...config.inputModes, [mode]: value } })
        }
      />

      <FlowPicker
        flow={config.flow}
        order={config.order}
        onFlow={(flow) => patch({ flow })}
        onOrder={(order) => patch({ order })}
      />

      <StartBar count={cards.length} empty="Pick at least one set" onStart={() => onStart(cards)} />
    </div>
  );
}
