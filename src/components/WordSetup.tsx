import { useMemo } from 'react';
import { WORD_GROUPS, hasKanji } from '../data/words';
import { buildWordCards, wordPool, type WordConfig, type WordMode } from '../lib/buildCards';
import type { Card, InputMode } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import { useStrings } from '../i18n';
import { blurbOf, labelOf, meaningsOf } from '../i18n/content';
import { Chip, FlowPicker, ModeCard, Panel, Segmented, SelectAll, masteryColour } from './ui';

const MODES: WordMode[] = ['meaning', 'reading', 'recall', 'listening'];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

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
  const ready = cards.length > 0;
  const kanaOnly = selected.filter((w) => !hasKanji(w)).length;

  const setGroupWords = (groupId: string, include: boolean) => {
    const group = WORD_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const words = group.words.map((w) => w.word);
    patch({
      excluded: include
        ? config.excluded.filter((w) => !words.includes(w))
        : [...new Set([...config.excluded, ...words])],
    });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>{s.deck.words}</strong>
          <div className="faint">{s.setup.wordsSelected(selected.length, cards.length)}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <Panel
        title={s.setup.whichWords}
        hint={s.setup.whichWordsHint}
        aside={
          <SelectAll
            all={() => patch({ groupIds: WORD_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {WORD_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const included = group.words.filter((w) => !config.excluded.includes(w.word)).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {labelOf(group, s.lang)} · {included}/{group.words.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {blurbOf(group, s.lang)}
                  </div>
                </div>
                {on && (
                  <SelectAll
                    all={() => setGroupWords(group.id, true)}
                    none={() => setGroupWords(group.id, false)}
                  />
                )}
              </div>

              {on && (
                <div className="item-picker">
                  {group.words.map((entry) => {
                    const isIncluded = !config.excluded.includes(entry.word);
                    const colour = masteryColour(itemAccuracy(stats[`vocab:${entry.word}`]));
                    return (
                      <button
                        key={entry.word}
                        type="button"
                        className="item-toggle"
                        aria-pressed={isIncluded}
                        title={`${entry.word}${
                          hasKanji(entry) ? ` (${entry.reading})` : ''
                        } — ${meaningsOf(entry, s.lang).join(', ')}`}
                        onClick={() => patch({ excluded: toggle(config.excluded, entry.word) })}
                      >
                        {entry.word}
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

      <Panel title={s.setup.howAsked} hint={s.setup.anyCombination}>
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
              title={s.wordMode.label[mode]}
              blurb={
                mode === 'listening' && !hasVoice ? s.setup.needsVoice : s.wordMode.blurb[mode]
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
        {usable.modes.includes('reading') && kanaOnly > 0 && (
          <p className="faint" style={{ marginTop: 10 }}>
            {s.setup.kanaOnlyNote(kanaOnly)}
          </p>
        )}
        {usable.modes.includes('recall') && config.inputModes.recall === 'type' && (
          <p className="faint" style={{ marginTop: 10 }}>
            {s.setup.wordImeNote}
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
          {ready ? s.setup.start(cards.length) : s.setup.pickASet}
        </button>
      </div>
    </div>
  );
}
