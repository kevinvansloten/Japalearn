import { useMemo } from 'react';
import { COUNTER_GROUPS } from '../data/counters';
import {
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
import { useStrings } from '../i18n';
import { blurbOf, labelOf, meaningOf } from '../i18n/content';

const MODES: CounterMode[] = ['reading', 'meaning', 'listening'];

interface Props {
  config: CounterConfig;
  onChange: (config: CounterConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function CounterSetup({ config, onChange, onStart, onHome }: Props) {
  const s = useStrings();
  const patch = (update: Partial<CounterConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  const usable: CounterConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const cards = buildCounterCards(usable, s);

  const groups = COUNTER_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    items: group.items.map((item) => ({
      key: item.form,
      label: item.form,
      title: `${item.form} (${item.reading}) — ${meaningOf(item, s.lang)}`,
      dot: masteryColour(itemAccuracy(stats[`counter:${item.form}`])),
      flag: item.irregular,
    })),
  }));

  const modes: ModeOption<CounterMode>[] = MODES.map((mode) => ({
    id: mode,
    label: s.counterMode.label[mode],
    blurb: s.counterMode.blurb[mode],
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: s.setup.needsVoice }
      : {}),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title={s.deck.counters}
        subtitle={s.setup.countersSelected(counterPool(usable).length, cards.length)}
        onHome={onHome}
      />

      <DeckPicker
        title={s.setup.whatToDrill}
        hint={s.setup.whatToDrillHint}
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
        footnote={s.setup.irregularNote}
      />

      <ModePicker<CounterMode>
        hint={s.setup.anyCombination}
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

      <StartBar count={cards.length} empty={s.setup.pickASet} onStart={() => onStart(cards)} />
    </div>
  );
}
