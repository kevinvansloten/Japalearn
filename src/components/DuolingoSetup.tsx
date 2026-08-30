/**
 * Picking a stretch of the Duolingo course to practise.
 *
 * The other setup screens list their groups as chips and let you toggle any
 * combination, which works because none of them has more than a dozen. This
 * deck has three hundred and ten units and you are always at some point along
 * them, so the selection is a range instead: from the unit you started at to
 * the one you are on. That is the question a Duolingo learner can actually
 * answer, and it is two numbers to save rather than a list of hundreds.
 *
 * Units in range are listed, and only the one you open renders its words — a
 * range of forty units is two thousand toggles, and building them all to keep
 * one on screen is what would make this screen feel slow.
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
import type { Card, InputMode } from '../lib/session';
import { useJapaneseVoice } from '../lib/speech';
import { itemAccuracy, loadItemStats } from '../lib/storage';
import { useStrings } from '../i18n';
import { labelOf, blurbOf, meaningsOf } from '../i18n/content';
import { Chip, FlowPicker, ModeCard, Panel, Segmented, SelectAll, masteryColour } from './ui';

const MODES: DuolingoMode[] = ['meaning', 'recall', 'reading', 'listening'];
const SCRIPTS: DuolingoScript[] = ['word', 'kana', 'romaji'];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

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
  const ready = count > 0;

  // Phrases the dictionary would not give a single reading for: they still
  // carry meaning and recall cards, and it is worth saying so before the
  // learner wonders why the numbers do not line up.
  const unreadable = selected.filter((entry) => !hasReading(entry)).length;

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
      <div className="row between">
        <div>
          <strong>{s.deck.duolingo}</strong>
          <div className="faint">{s.setup.duolingoSelected(selected.length, count)}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

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
                  <div className="item-picker">
                    {unit.words.map((entry) => {
                      const isIncluded = !config.excluded.includes(entry.word);
                      const colour = masteryColour(itemAccuracy(stats[duolingoItemId(entry)]));
                      return (
                        <button
                          key={entry.word}
                          type="button"
                          className="item-toggle"
                          aria-pressed={isIncluded}
                          title={`${entry.word}${
                            hasReading(entry) && hasKanji(entry) ? ` (${entry.reading})` : ''
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
      </Panel>

      <Panel title={s.setup.howAsked} hint={s.setup.anyCombinationEach}>
        <div className="mode-list">
          {MODES.map((mode) => (
            <ModeCard
              key={mode}
              pressed={usable.modes.includes(mode)}
              disabled={
                (mode === 'listening' && !hasVoice) ||
                (mode === 'reading' && config.script !== 'word')
              }
              onClick={() => {
                const next = toggle(config.modes, mode);
                if (next.length) patch({ modes: next });
              }}
              title={s.duolingoMode.label[mode]}
              blurb={
                mode === 'listening' && !hasVoice
                  ? s.setup.needsVoice
                  : mode === 'reading' && config.script !== 'word'
                  ? s.setup.readingNeedsWord
                  : s.duolingoMode.blurb[mode]
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
        {usable.modes.includes('recall') &&
          config.inputModes.recall === 'type' &&
          config.script === 'word' && (
            <p className="faint" style={{ marginTop: 10 }}>
              {s.setup.duolingoImeNote}
            </p>
          )}
        {unreadable > 0 && (
          <p className="faint" style={{ marginTop: 10 }}>
            {s.setup.noReadingNote(unreadable)}
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
          onClick={() => onStart(buildDuolingoCards(usable, s))}
        >
          {ready ? s.setup.start(count) : s.setup.pickASet}
        </button>
      </div>
    </div>
  );
}
