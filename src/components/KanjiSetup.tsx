import { useMemo } from 'react';
import { KANJI_GROUPS } from '../data/kanji';
import { buildKanjiCards, kanjiPool, type KanjiConfig, type KanjiMode } from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import { useStrings } from '../i18n';
import { blurbOf, labelOf, meaningsOf } from '../i18n/content';
import { Chip, FlowPicker, ModeCard, Panel, Segmented, SelectAll } from './ui';

const MODES: KanjiMode[] = ['meaning', 'reading', 'recall', 'vocab', 'listening'];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/** Green / amber / red dot from lifetime accuracy, or nothing if never seen. */
function masteryColour(accuracy: number | null): string | undefined {
  if (accuracy === null) return undefined;
  if (accuracy >= 80) return 'var(--good)';
  if (accuracy >= 50) return '#e0b341';
  return 'var(--bad)';
}

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

  const selectedKanji = kanjiPool(usable).length;
  const cards = buildKanjiCards(usable, s);
  const ready = cards.length > 0;

  const setGroupKanji = (groupId: string, include: boolean) => {
    const group = KANJI_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const chars = group.kanji.map((k) => k.char);
    patch({
      excluded: include
        ? config.excluded.filter((c) => !chars.includes(c))
        : [...new Set([...config.excluded, ...chars])],
    });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>{s.deck.kanji}</strong>
          <div className="faint">{s.setup.kanjiSelected(selectedKanji, cards.length)}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <Panel
        title={s.setup.whichKanji}
        hint={s.setup.whichKanjiHint}
        aside={
          <SelectAll
            all={() => patch({ groupIds: KANJI_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {KANJI_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const included = group.kanji.filter((k) => !config.excluded.includes(k.char)).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {labelOf(group, s.lang)} · {included}/{group.kanji.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {blurbOf(group, s.lang)}
                  </div>
                </div>
                {on && (
                  <SelectAll
                    all={() => setGroupKanji(group.id, true)}
                    none={() => setGroupKanji(group.id, false)}
                  />
                )}
              </div>

              {on && (
                <div className="kanji-picker">
                  {group.kanji.map((k) => {
                    const isIncluded = !config.excluded.includes(k.char);
                    const colour = masteryColour(itemAccuracy(stats[`kanji:${k.char}`]));
                    return (
                      <button
                        key={k.char}
                        type="button"
                        className="kanji-toggle"
                        aria-pressed={isIncluded}
                        title={`${k.char} — ${meaningsOf(k, s.lang).join(', ')}`}
                        onClick={() => patch({ excluded: toggle(config.excluded, k.char) })}
                      >
                        {k.char}
                        {colour && <span className="dot" style={{ background: colour }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </Panel>

      <Panel title={s.setup.howAsked} hint={s.setup.anyCombinationEach}>
        <div className="mode-list">
          {MODES.map((mode) => (
            <ModeCard
              key={mode}
              pressed={usable.modes.includes(mode)}
              disabled={mode === 'listening' && !hasVoice}
              onClick={() => {
                const next = toggle(config.modes, mode);
                if (next.length) patch({ modes: next });
              }}
              title={s.kanjiMode.label[mode]}
              blurb={
                mode === 'listening' && !hasVoice
                  ? s.setup.needsVoice
                  : s.kanjiMode.blurb[mode]
              }
              aside={
                <Segmented<InputMode>
                  value={config.inputModes[mode]}
                  onChange={(value) =>
                    patch({ inputModes: { ...config.inputModes, [mode]: value } })
                  }
                  options={[
                    { value: 'type', label: s.common.type },
                    { value: 'choice', label: s.common.choose },
                  ]}
                />
              }
            />
          ))}
        </div>
        {usable.modes.includes('recall') && config.inputModes.recall === 'type' && (
          <p className="faint" style={{ marginTop: 10 }}>
            {s.setup.kanjiImeNote}
          </p>
        )}
      </Panel>

      <FlowPicker
        flow={config.flow}
        order={config.order}
        onFlow={(flow) => patch({ flow })}
        onOrder={(order) => patch({ order })}
      />

      <div className="row">
        <button
          type="button"
          className="btn primary big"
          disabled={!ready}
          onClick={() => onStart(cards)}
        >
          {ready ? s.setup.start(cards.length) : s.setup.pickAGroup}
        </button>
      </div>
    </div>
  );
}
