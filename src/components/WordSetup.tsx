import { useMemo } from 'react';
import { WORD_GROUPS, hasKanji } from '../data/words';
import {
  WORD_MODE_BLURB,
  WORD_MODE_LABEL,
  buildWordCards,
  wordPool,
  type WordConfig,
  type WordMode,
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

const MODES: WordMode[] = ['meaning', 'reading', 'recall', 'listening'];

interface Props {
  config: WordConfig;
  onChange: (config: WordConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function WordSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<WordConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  const usable: WordConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const selected = wordPool(usable);
  const cards = buildWordCards(usable);
  const kanaOnly = selected.filter((w) => !hasKanji(w)).length;

  const groups = WORD_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    blurb: group.blurb,
    items: group.words.map((word) => ({
      key: word.word,
      label: word.word,
      title: `${word.word}${hasKanji(word) ? ` (${word.reading})` : ''} — ${word.meanings.join(', ')}`,
      dot: masteryColour(itemAccuracy(stats[`vocab:${word.word}`])),
    })),
  }));

  const modes: ModeOption<WordMode>[] = MODES.map((mode) => ({
    id: mode,
    label: WORD_MODE_LABEL[mode],
    blurb: WORD_MODE_BLURB[mode],
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: 'Needs a Japanese voice installed on this device.' }
      : {}),
  }));

  const notes = [
    usable.modes.includes('reading') && kanaOnly > 0
      ? `${kanaOnly} of the selected words are written in kana already, so they get no reading card.`
      : null,
    usable.modes.includes('recall') && config.inputModes.recall === 'type'
      ? 'Meaning → word with typing needs a Japanese IME. Multiple choice works everywhere.'
      : null,
  ].filter(Boolean);

  return (
    <div className="stack">
      <SetupHeader
        title="Vocabulary — N5"
        subtitle={`${selected.length} words selected · ${cards.length} cards`}
        onHome={onHome}
      />

      <DeckPicker
        title="Which words?"
        hint="Turn on the sets you are working on, then switch off anything you already know."
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
      />

      <ModePicker<WordMode>
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
        footnote={notes.length ? notes.join(' ') : undefined}
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
