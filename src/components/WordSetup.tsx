import { useMemo } from 'react';
import { WORD_GROUPS, hasKanji } from '../data/words';
import { buildWordCards, wordPool, type WordConfig, type WordMode } from '../lib/buildCards';
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
import { blurbOf, labelOf, meaningsOf } from '../i18n/content';

const MODES: WordMode[] = ['meaning', 'reading', 'recall', 'listening'];

interface Props {
  config: WordConfig;
  onChange: (config: WordConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function WordSetup({ config, onChange, onStart, onHome }: Props) {
  const s = useStrings();
  const patch = (update: Partial<WordConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  const usable: WordConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const selected = wordPool(usable);
  const cards = buildWordCards(usable, s);
  const kanaOnly = selected.filter((w) => !hasKanji(w)).length;

  const groups = WORD_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    items: group.words.map((word) => ({
      key: word.word,
      label: word.word,
      title: `${word.word}${hasKanji(word) ? ` (${word.reading})` : ''} — ${meaningsOf(
        word,
        s.lang,
      ).join(', ')}`,
      dot: masteryColour(itemAccuracy(stats[`vocab:${word.word}`])),
    })),
  }));

  const modes: ModeOption<WordMode>[] = MODES.map((mode) => ({
    id: mode,
    label: s.wordMode.label[mode],
    blurb: s.wordMode.blurb[mode],
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: s.setup.needsVoice }
      : {}),
  }));

  const notes = [
    usable.modes.includes('reading') && kanaOnly > 0
      ? s.setup.kanaOnlyNote(kanaOnly)
      : null,
    usable.modes.includes('recall') && config.inputModes.recall === 'type'
      ? s.setup.wordImeNote
      : null,
  ].filter(Boolean);

  return (
    <div className="stack">
      <SetupHeader
        title={s.deck.words}
        subtitle={s.setup.wordsSelected(selected.length, cards.length)}
        onHome={onHome}
      />

      <DeckPicker
        title={s.setup.whichWords}
        hint={s.setup.whichWordsHint}
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
      />

      <ModePicker<WordMode>
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
        footnote={notes.length ? notes.join(' ') : undefined}
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
