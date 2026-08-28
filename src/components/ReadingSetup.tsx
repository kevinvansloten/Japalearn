import { READING_GROUPS, written } from '../data/reading';
import {
  READING_MODE_BLURB,
  READING_MODE_LABEL,
  buildReadingCards,
  readingPool,
  type ReadingConfig,
  type ReadingMode,
} from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import {
  DeckPicker,
  ModePicker,
  SetupHeader,
  StartBar,
  toggle,
  type ModeOption,
} from './DeckPicker';
import { FlowPicker } from './ui';

const MODES: ReadingMode[] = ['meaning', 'listening'];

interface Props {
  config: ReadingConfig;
  onChange: (config: ReadingConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function ReadingSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<ReadingConfig>) => onChange({ ...config, ...update });
  const hasVoice = useJapaneseVoice();

  const usable: ReadingConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const cards = buildReadingCards(usable);

  const groups = READING_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    blurb: group.blurb,
    items: group.sentences.map((sentence) => ({
      key: written(sentence),
      label: written(sentence),
      title: sentence.english,
    })),
  }));

  const modes: ModeOption<ReadingMode>[] = MODES.map((mode) => ({
    id: mode,
    label: READING_MODE_LABEL[mode],
    blurb: READING_MODE_BLURB[mode],
    // Translating a sentence by typing cannot be graded fairly.
    fixedInput: true,
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: 'Needs a Japanese voice installed on this device.' }
      : {}),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title="Reading"
        subtitle={`${readingPool(usable).length} sentences · ${cards.length} cards`}
        onHome={onHome}
      />

      <DeckPicker
        title="Which sentences?"
        hint="Grouped by the pattern they use, so a set hangs together."
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
        itemLayout="block"
      />

      <ModePicker<ReadingMode>
        modes={modes}
        selected={usable.modes}
        // Both modes are always multiple choice, so nothing reads this.
        inputModes={{ meaning: 'choice' as InputMode, listening: 'choice' as InputMode }}
        onToggle={(mode) => {
          const next = toggle(config.modes, mode);
          if (next.length) patch({ modes: next });
        }}
        onInputMode={() => {}}
        footnote="Furigana are hidden until you ask for them, so you read the kanji first."
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
