/**
 * Reading the material instead of being asked about it.
 *
 * Everything else in the app is a question. This screen is the answer key: all
 * seven decks laid out to be read, with the reading, the meaning and whatever
 * context the deck carries — the kanji's example words, the verb's four forms,
 * the particle's reason. Nothing here is scored and nothing is scheduled.
 *
 * The mastery dots are the only thing it takes from your progress, and they
 * are the same ones the setup screens show, so the page doubles as a way of
 * seeing what you already have without answering anything to find out.
 *
 * Two decks need their own treatment. Kana are drawn as the syllabary rather
 * than as a list, because the grid is how anyone learns them. And the Duolingo
 * deck is six thousand words, so it is read a stretch of units at a time —
 * search still reaches all of it.
 */
import { useMemo, useState } from 'react';
import { groupsBySection, type KanaSection } from '../data/kana';
import { FIRST_UNIT, LAST_UNIT } from '../data/duolingo';
import { kanaItemId } from '../lib/buildCards';
import {
  BROWSE_DECKS,
  deckSize,
  search,
  sectionsFor,
  type BrowseDeck,
  type Line,
} from '../lib/browse';
import { speak, useJapaneseVoice } from '../lib/speech';
import { kanaToRomaji } from '../lib/romaji';
import { itemAccuracy, loadItemStats, loadPref, savePref } from '../lib/storage';
import { useStrings } from '../i18n';
import { Chip, Panel, SpeakerIcon } from './ui';
import { masteryColour } from './DeckPicker';

const SECTIONS: KanaSection[] = ['gojuon', 'dakuten', 'yoon'];

/** Long enough to read, short enough that the browser stays responsive. */
const SEARCH_LIMIT = 300;

const DECK_NAME: Record<BrowseDeck, (s: ReturnType<typeof useStrings>) => string> = {
  kana: (s) => s.deck.kana,
  kanji: (s) => s.deck.kanjiShort,
  counters: (s) => s.deck.counters,
  words: (s) => s.deck.wordsShort,
  conjugation: (s) => s.deck.conjugation,
  particles: (s) => s.deck.particles,
  reading: (s) => s.deck.reading,
  duolingo: (s) => s.deck.duolingoShort,
};

const clamp = (n: number): number => Math.min(LAST_UNIT, Math.max(FIRST_UNIT, n));

interface Props {
  onHome: () => void;
  /** jump straight from here into practising the deck being read */
  onPractise: (deck: BrowseDeck) => void;
  /** Shared with Duolingo practice, so either screen can change it. */
  duolingoRomaji: boolean;
  onDuolingoRomajiChange: (show: boolean) => void;
}

export function Browse({ onHome, onPractise, duolingoRomaji, onDuolingoRomajiChange }: Props) {
  const s = useStrings();
  const stats = useMemo(() => loadItemStats(), []);
  const hasVoice = useJapaneseVoice();

  const [deck, setDeck] = useState<BrowseDeck>(() =>
    loadPref<BrowseDeck>('browseDeck', 'kana'),
  );
  const [query, setQuery] = useState('');
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(5);

  const pick = (next: BrowseDeck) => {
    setDeck(next);
    savePref('browseDeck', next);
  };

  const sections = useMemo(() => sectionsFor(deck, s), [deck, s]);
  const searching = query.trim().length > 0;
  const found = useMemo(
    () => (searching ? search(sections, query) : []),
    [sections, query, searching],
  );

  // The Duolingo deck is read a range at a time; every other deck is small
  // enough to put on the page whole.
  const shown = useMemo(() => {
    if (deck !== 'duolingo') return sections;
    const [low, high] = [Math.min(from, to), Math.max(from, to)];
    return sections.filter((_, index) => index + 1 >= low && index + 1 <= high);
  }, [deck, sections, from, to]);

  const dot = (itemId: string) => {
    const colour = masteryColour(itemAccuracy(stats[itemId]));
    return colour ? <span className="dot" style={{ background: colour }} /> : null;
  };

  const speaker = (text: string) =>
    hasVoice && text ? (
      <button
        type="button"
        className="speak-btn"
        onClick={() => speak(text)}
        aria-label={s.quiz.hearIt}
        title={s.quiz.hearIt}
      >
        <SpeakerIcon size={14} />
      </button>
    ) : (
      <span />
    );

  const row = (line: Line) => (
    <div className="browse-row" key={line.itemId + line.jp}>
      <div className="browse-jp">
        <span className="jp">{line.jp}</span>
        {line.reading && <span className="reading">{line.reading}</span>}
        {deck === 'duolingo' && duolingoRomaji && line.speech && (
          <span className="romaji-note">{kanaToRomaji(line.speech)}</span>
        )}
      </div>
      <div className="browse-gloss">
        <span>{line.gloss}</span>
        {line.note && <span className="note">{line.note}</span>}
      </div>
      {speaker(line.speech)}
      <span className="browse-dot">{dot(line.itemId)}</span>
    </div>
  );

  return (
    <div className="stack">
      <div className="row between">
        <div>
          <strong>{s.browse.title}</strong>
          <div className="faint">{s.browse.hint}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <Panel
        title={s.browse.whichDeck}
        aside={
          <button type="button" className="btn ghost" onClick={() => onPractise(deck)}>
            {s.browse.practise}
          </button>
        }
      >
        <div className="chip-grid">
          {BROWSE_DECKS.map((option) => (
            <Chip key={option} pressed={deck === option} onClick={() => pick(option)}>
              {DECK_NAME[option](s)} · {deckSize(option)}
            </Chip>
          ))}
        </div>

        <div className="row" style={{ marginTop: 14, gap: 10 }}>
          <input
            className="browse-search"
            type="search"
            value={query}
            placeholder={s.browse.searchPlaceholder}
            aria-label={s.browse.searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          {searching && <span className="faint">{s.browse.found(found.length)}</span>}
        </div>

        {deck === 'duolingo' && !searching && (
          <div className="row" style={{ marginTop: 12, gap: 10, alignItems: 'baseline' }}>
            <label className="hint" htmlFor="browse-from">
              {s.setup.unitFrom}
            </label>
            <input
              id="browse-from"
              className="unit-input"
              type="number"
              min={FIRST_UNIT}
              max={LAST_UNIT}
              value={from}
              onChange={(event) => setFrom(clamp(Number(event.target.value)))}
            />
            <label className="hint" htmlFor="browse-to">
              {s.setup.unitTo}
            </label>
            <input
              id="browse-to"
              className="unit-input"
              type="number"
              min={FIRST_UNIT}
              max={LAST_UNIT}
              value={to}
              onChange={(event) => setTo(clamp(Number(event.target.value)))}
            />
          </div>
        )}
        {deck === 'duolingo' && (
          <label className="row" style={{ marginTop: 12, gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={duolingoRomaji}
              onChange={(event) => onDuolingoRomajiChange(event.target.checked)}
            />
            {s.setup.showRomaji}
          </label>
        )}
      </Panel>

      {searching ? (
        <Panel title={s.browse.results}>
          {found.length === 0 ? (
            <p className="faint">{s.browse.noMatches(query.trim())}</p>
          ) : (
            <>
              <div className="browse-list">{found.slice(0, SEARCH_LIMIT).map(row)}</div>
              {found.length > SEARCH_LIMIT && (
                <p className="faint" style={{ marginTop: 10 }}>
                  {s.browse.showingFirst(SEARCH_LIMIT, found.length)}
                </p>
              )}
            </>
          )}
        </Panel>
      ) : deck === 'kana' ? (
        <KanaTables dot={dot} hasVoice={hasVoice} />
      ) : (
        shown.map((section) => (
          <Panel key={section.id} title={section.label} hint={section.blurb}>
            <div className="browse-list">{section.lines.map(row)}</div>
          </Panel>
        ))
      )}
    </div>
  );
}

/**
 * The syllabary, one consonant row per line. KANA_GROUPS is already exactly
 * that — か / k holds か き く け こ — so the grid falls out of the data
 * rather than needing a layout of its own.
 */
function KanaTables({
  dot,
  hasVoice,
}: {
  dot: (itemId: string) => JSX.Element | null;
  hasVoice: boolean;
}) {
  const s = useStrings();
  return (
    <>
      {SECTIONS.map((section) => (
        <Panel key={section} title={s.kanaSection[section]} hint={hasVoice ? s.browse.tapToHear : undefined}>
          {groupsBySection(section).map((group) => (
            <div className="kana-row" key={group.id}>
              <span className="kana-row-label">{group.label}</span>
              <div className="kana-cells">
                {group.kana.map((kana) => (
                  <button
                    key={kana.id}
                    type="button"
                    className="kana-cell"
                    disabled={!hasVoice}
                    onClick={() => speak(kana.hira)}
                    title={kana.alt.length ? `${kana.romaji} · ${kana.alt.join(' · ')}` : kana.romaji}
                  >
                    <span className="pair">
                      {kana.hira} {kana.kata}
                    </span>
                    <span className="romaji">{kana.romaji}</span>
                    {dot(kanaItemId('hira', kana))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Panel>
      ))}
    </>
  );
}
