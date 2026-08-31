/**
 * Picking a stretch of the Duolingo course to practise.
 *
 * The header, the mode list and the start button are the shared ones, but the
 * selection itself is not: DeckPicker switches groups on and off, and this deck
 * has three hundred and ten of them with the learner always at some point along
 * them. Three hundred and ten checkboxes is not a question anyone can answer.
 * "I am on unit 37" is, so the selection is a range — two numbers to save
 * rather than a list of hundreds — and only the unit you open renders its
 * words, because a range of forty is two thousand toggles.
 */
import { useMemo, useState } from 'react';
import {
  DUOLINGO_UNITS,
  FIRST_UNIT,
  LAST_UNIT,
  duolingoItemId,
  hasKanji,
  hasReading,
} from '../data/duolingo';
import {
  buildDuolingoCards,
  duolingoCardCount,
  duolingoPool,
  duolingoUnits,
  type DuolingoConfig,
  type DuolingoMode,
  type DuolingoScript,
} from '../lib/buildCards';
import type { Card } from '../lib/session';
import { kanaToRomaji } from '../lib/romaji';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import { useStrings } from '../i18n';
import { labelOf, blurbOf, meaningsOf } from '../i18n/content';
import {
  ModePicker,
  SetupHeader,
  StartBar,
  masteryColour,
  toggle,
  type ModeOption,
} from './DeckPicker';
import { Chip, FlowPicker, ModeCard, Panel, SelectAll } from './ui';

const MODES: DuolingoMode[] = ['meaning', 'recall', 'reading', 'listening'];
const SCRIPTS: DuolingoScript[] = ['word', 'kana', 'romaji'];

const clamp = (n: number): number => Math.min(LAST_UNIT, Math.max(FIRST_UNIT, n));

interface Props {
  config: DuolingoConfig;
  onChange: (config: DuolingoConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function DuolingoSetup({ config, onChange, onStart, onHome }: Props) {
  const s = useStrings();
  const patch = (update: Partial<DuolingoConfig>) => onChange({ ...config, ...update });
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();
  const [open, setOpen] = useState<string | null>(null);

  const usable: DuolingoConfig = hasVoice
    ? config
    : { ...config, modes: config.modes.filter((mode) => mode !== 'listening') };

  const units = duolingoUnits(usable);
  const selected = duolingoPool(usable);
  const count = duolingoCardCount(usable);

  // Phrases the dictionary would not give a single reading for. They still
  // carry meaning and recall cards, and it is worth saying so before the
  // learner wonders why the numbers do not line up.
  const unreadable = selected.filter((entry) => !hasReading(entry)).length;

  const modes: ModeOption<DuolingoMode>[] = MODES.map((mode) => ({
    id: mode,
    label: s.duolingoMode.label[mode],
    blurb: s.duolingoMode.blurb[mode],
    ...(mode === 'listening' && !hasVoice
      ? { unavailable: s.setup.needsVoice }
      : mode === 'reading' && config.script !== 'word'
      ? { unavailable: s.setup.readingNeedsWord }
      : {}),
  }));

  const notes = [
    usable.modes.includes('recall') &&
    config.inputModes.recall === 'type' &&
    config.script === 'word'
      ? s.setup.duolingoImeNote
      : null,
    unreadable > 0 ? s.setup.noReadingNote(unreadable) : null,
  ].filter(Boolean);

  const setUnitWords = (unitId: string, include: boolean) => {
    const unit = DUOLINGO_UNITS.find((u) => u.id === unitId);
    if (!unit) return;
    const words = unit.words.map((word) => word.word);
    patch({
      excluded: include
        ? config.excluded.filter((word) => !words.includes(word))
        : [...new Set([...config.excluded, ...words])],
    });
  };

  return (
    <div className="stack">
      <SetupHeader
        title={s.deck.duolingo}
        subtitle={s.setup.duolingoSelected(selected.length, count)}
        onHome={onHome}
      />

      <Panel
        title={s.setup.whichUnits}
        hint={s.setup.whichUnitsHint}
        aside={
          <div className="row">
            <button
              type="button"
              className="btn ghost"
              onClick={() => patch({ fromUnit: FIRST_UNIT, toUnit: LAST_UNIT, excluded: [] })}
            >
              {s.setup.everyUnit}
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() =>
                patch({ fromUnit: clamp(config.toUnit - 9), toUnit: config.toUnit, excluded: [] })
              }
            >
              {s.setup.lastTen}
            </button>
          </div>
        }
      >
        <div className="row" style={{ gap: 10, alignItems: 'baseline' }}>
          <label className="hint" htmlFor="duo-from">
            {s.setup.unitFrom}
          </label>
          <input
            id="duo-from"
            className="unit-input"
            type="number"
            min={FIRST_UNIT}
            max={LAST_UNIT}
            value={config.fromUnit}
            onChange={(event) => patch({ fromUnit: clamp(Number(event.target.value)) })}
          />
          <label className="hint" htmlFor="duo-to">
            {s.setup.unitTo}
          </label>
          <input
            id="duo-to"
            className="unit-input"
            type="number"
            min={FIRST_UNIT}
            max={LAST_UNIT}
            value={config.toUnit}
            onChange={(event) => patch({ toUnit: clamp(Number(event.target.value)) })}
          />
          <span className="faint">{s.setup.unitWords(selected.length)}</span>
        </div>

        <div className="unit-list">
          {units.map((unit) => {
            const included = unit.words.filter(
              (word) => !config.excluded.includes(word.word),
            ).length;
            const isOpen = open === unit.id;
            return (
              <div className="group-block" key={unit.id}>
                <div className="group-head">
                  <div>
                    <Chip pressed={isOpen} onClick={() => setOpen(isOpen ? null : unit.id)}>
                      {unit.number}. {labelOf(unit, s.lang)} · {included}/{unit.words.length}
                    </Chip>
                    {isOpen && (
                      <div className="hint" style={{ marginTop: 4 }}>
                        {blurbOf(unit, s.lang)}
                      </div>
                    )}
                  </div>
                  {isOpen && (
                    <SelectAll
                      all={() => setUnitWords(unit.id, true)}
                      none={() => setUnitWords(unit.id, false)}
                    />
                  )}
                </div>

                {isOpen && (
                  <div className="item-picker layout-wide">
                    {unit.words.map((entry) => {
                      const colour = masteryColour(itemAccuracy(stats[duolingoItemId(entry)]));
                      return (
                        <button
                          key={entry.word}
                          type="button"
                          className={config.showRomaji && hasReading(entry)
                            ? 'item-toggle with-romaji' : 'item-toggle'}
                          aria-pressed={!config.excluded.includes(entry.word)}
                          title={`${entry.word}${
                            hasReading(entry) && hasKanji(entry) ? ` (${entry.reading})` : ''
                          } — ${meaningsOf(entry, s.lang).join(', ')}`}
                          onClick={() => patch({ excluded: toggle(config.excluded, entry.word) })}
                        >
                          {entry.word}
                          {config.showRomaji && hasReading(entry) && (
                            <span className="romaji-note">{kanaToRomaji(entry.reading)}</span>
                          )}
                          {colour && <span className="dot" style={{ background: colour }} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {!units.length && <p className="faint">{s.setup.noUnitsInRange}</p>}
        </div>
      </Panel>

      <Panel title={s.setup.howWritten} hint={s.setup.howWrittenHint}>
        <div className="mode-list">
          {SCRIPTS.map((script) => (
            <ModeCard
              key={script}
              pressed={config.script === script}
              onClick={() => patch({ script })}
              title={s.duolingoScript.label[script]}
              blurb={s.duolingoScript.blurb[script]}
            />
          ))}
        </div>
        <label className="row" style={{ gap: 8, marginTop: 16, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={config.showRomaji ?? false}
            onChange={(event) => patch({ showRomaji: event.target.checked })}
            aria-describedby="duo-romaji-hint"
          />
          {s.setup.showRomaji}
        </label>
        <p id="duo-romaji-hint" className="hint">{s.setup.showRomajiHint}</p>
      </Panel>

      <ModePicker<DuolingoMode>
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
        footnote={notes.length ? notes.join(' ') : undefined}
      />

      <FlowPicker
        flow={config.flow}
        order={config.order}
        onFlow={(flow) => patch({ flow })}
        onOrder={(order) => patch({ order })}
      />

      <StartBar
        count={count}
        empty={s.setup.pickASet}
        onStart={() => onStart(buildDuolingoCards(usable, s))}
      />
    </div>
  );
}
