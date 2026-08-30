import { useMemo } from 'react';
import { KANJI_GROUPS } from '../data/kanji';
import { buildKanjiCards, kanjiPool, type KanjiConfig, type KanjiMode } from '../lib/buildCards';
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

const MODES: KanjiMode[] = ['meaning', 'reading', 'recall', 'vocab', 'listening'];

interface Props {
  config: KanjiConfig;
  onChange: (config: KanjiConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function KanjiSetup({ config, onChange, onStart, onHome }: Props) {
  const s = useStrings();
  const patch = (update: Partial<KanjiConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  // Listening needs a Japanese voice from the OS. Without one those cards would
  // be silent and unanswerable, so drop them rather than deal out dead cards.
  const usable: KanjiConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((m) => m !== 'listening') };

  const cards = buildKanjiCards(usable, s);

  const groups = KANJI_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    items: group.kanji.map((k) => ({
      key: k.char,
      label: k.char,
      title: `${k.char} — ${meaningsOf(k, s.lang).join(', ')}`,
      dot: masteryColour(itemAccuracy(stats[`kanji:${k.char}`])),
    })),
  }));

  const modes: ModeOption<KanjiMode>[] = MODES.map((mode) => ({
    id: mode,
    label: s.kanjiMode.label[mode],
    blurb: s.kanjiMode.blurb[mode],
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: s.setup.needsVoice }
      : {}),
  }));

  return (
    <div className="stack">
      <SetupHeader
        title={s.deck.kanji}
        subtitle={s.setup.kanjiSelected(kanjiPool(usable).length, cards.length)}
        onHome={onHome}
      />

      <DeckPicker
        title={s.setup.whichKanji}
        hint={s.setup.whichKanjiHint}
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
        itemLayout="tile"
      />

      <ModePicker<KanjiMode>
        hint={s.setup.anyCombinationEach}
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
            ? s.setup.kanjiImeNote
            : undefined
        }
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
