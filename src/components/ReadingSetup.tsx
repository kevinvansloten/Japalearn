import { READING_GROUPS, written } from '../data/reading';
import {
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
import { useStrings } from '../i18n';
import { blurbOf, labelOf, sentenceOf } from '../i18n/content';

const MODES: ReadingMode[] = ['meaning', 'listening'];

interface Props {
  config: ReadingConfig;
  onChange: (config: ReadingConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function ReadingSetup({ config, onChange, onStart, onHome }: Props) {
  const s = useStrings();
  const patch = (update: Partial<ReadingConfig>) => onChange({ ...config, ...update });
  const hasVoice = useJapaneseVoice();

  const usable: ReadingConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const cards = buildReadingCards(usable, s);

  const groups = READING_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    items: group.sentences.map((sentence) => ({
      key: written(sentence),
      label: written(sentence),
      title: sentenceOf(sentence, s.lang),
    })),
  }));

  const modes: ModeOption<ReadingMode>[] = MODES.map((mode) => ({
    id: mode,
    label: s.readingMode.label[mode],
    blurb: s.readingMode.blurb[mode],
    // Translating a sentence by typing cannot be graded fairly.
    fixedInput: true,
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: s.setup.needsVoice }
      : {}),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title={s.deck.reading}
        subtitle={s.setup.readingSelected(readingPool(usable).length, cards.length)}
        onHome={onHome}
      />

      <DeckPicker
        title={s.setup.whichSentences}
        hint={s.setup.whichSentencesHint}
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
        footnote={s.setup.furiganaNote}
      />

      <FlowPicker
        flow={config.flow}
        order={config.order}
        onFlow={(flow) => patch({ flow })}
        onOrder={(order) => patch({ order })}
      />

      <StartBar count={cards.length} empty={s.setup.pickAGroup} onStart={() => onStart(cards)} />
    </div>
  );
}
