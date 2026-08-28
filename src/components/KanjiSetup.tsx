import { useMemo } from 'react';
import { KANJI_GROUPS } from '../data/kanji';
import {
  KANJI_MODE_BLURB,
  KANJI_MODE_LABEL,
  buildKanjiCards,
  kanjiPool,
  type KanjiConfig,
  type KanjiMode,
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

const MODES: KanjiMode[] = ['meaning', 'reading', 'recall', 'vocab', 'listening'];

interface Props {
  config: KanjiConfig;
  onChange: (config: KanjiConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function KanjiSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<KanjiConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  // Listening needs a Japanese voice from the OS. Without one those cards would
  // be silent and unanswerable, so drop them rather than deal out dead cards.
  const usable: KanjiConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const cards = buildKanjiCards(usable);

  const groups = KANJI_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    blurb: group.blurb,
    items: group.kanji.map((k) => ({
      key: k.char,
      label: k.char,
      title: `${k.char} — ${k.meanings.join(', ')}`,
      dot: masteryColour(itemAccuracy(stats[`kanji:${k.char}`])),
    })),
  }));

  const modes: ModeOption<KanjiMode>[] = MODES.map((mode) => ({
    id: mode,
    label: KANJI_MODE_LABEL[mode],
    blurb: KANJI_MODE_BLURB[mode],
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: 'Needs a Japanese voice installed on this device.' }
      : {}),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title="Kanji — JLPT N5"
        subtitle={`${kanjiPool(usable).length} kanji selected · ${cards.length} cards`}
        onHome={onHome}
      />

      <DeckPicker
        title="Which kanji?"
        hint="Turn on the groups you are studying, then switch off individual kanji you already know."
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
        itemLayout="tile"
      />

      <ModePicker<KanjiMode>
        hint="Pick any combination. Each mode can be typed or multiple choice."
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
        footnote={
          usable.modes.includes('recall') && config.inputModes.recall === 'type'
            ? 'Meaning → kanji with typing needs a Japanese IME. Multiple choice works everywhere.'
            : undefined
        }
      />

      <FlowPicker
        flow={config.flow}
        order={config.order}
        onFlow={(flow) => patch({ flow })}
        onOrder={(order) => patch({ order })}
      />

      <StartBar count={cards.length} empty="Pick at least one group" onStart={() => onStart(cards)} />
    </div>
  );
}
