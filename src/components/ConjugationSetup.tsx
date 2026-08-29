import { CONJUGATION_GROUPS } from '../data/conjugation';
import {
  buildConjugationCards,
  type ConjugationConfig,
  type ConjugationMode,
} from '../lib/buildCards';
import { ADJECTIVE_FORMS, VERB_FORMS } from '../lib/conjugate';
import type { Card, InputMode } from '../lib/session';
import { useStrings } from '../i18n';
import { blurbOf, labelOf, meaningOf } from '../i18n/content';
import { Chip, FlowPicker, ModeCard, Panel, Segmented, SelectAll } from './ui';

const MODES: ConjugationMode[] = ['produce', 'identify', 'dictionary'];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface Props {
  config: ConjugationConfig;
  onChange: (config: ConjugationConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function ConjugationSetup({ config, onChange, onStart, onHome }: Props) {
  const s = useStrings();
  const patch = (update: Partial<ConjugationConfig>) => onChange({ ...config, ...update });

  const cards = buildConjugationCards(config, s);
  const ready = cards.length > 0;

  const selectedGroups = CONJUGATION_GROUPS.filter((g) => config.groupIds.includes(g.id));
  const hasVerbs = selectedGroups.some((g) => g.verbs.length > 0);
  const hasAdjectives = selectedGroups.some((g) => g.adjectives.length > 0);

  const setGroupWords = (groupId: string, include: boolean) => {
    const group = CONJUGATION_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const words = [...group.verbs, ...group.adjectives].map((w) => w.word);
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
          <strong>{s.deck.conjugation}</strong>
          <div className="faint">{s.setup.cardCount(cards.length)}</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          {s.common.home}
        </button>
      </div>

      <Panel
        title={s.setup.whichConjugation}
        hint={s.setup.whichConjugationHint}
        aside={
          <SelectAll
            all={() => patch({ groupIds: CONJUGATION_GROUPS.map((g) => g.id), excluded: [] })}
            none={() => patch({ groupIds: [] })}
          />
        }
      >
        {CONJUGATION_GROUPS.map((group) => {
          const on = config.groupIds.includes(group.id);
          const words = [...group.verbs, ...group.adjectives];
          const included = words.filter((w) => !config.excluded.includes(w.word)).length;
          return (
            <div className="group-block" key={group.id}>
              <div className="group-head">
                <div>
                  <Chip
                    pressed={on}
                    onClick={() => patch({ groupIds: toggle(config.groupIds, group.id) })}
                  >
                    {labelOf(group, s.lang)} · {included}/{words.length}
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
                  {words.map((entry) => (
                    <button
                      key={entry.word}
                      type="button"
                      className="item-toggle"
                      aria-pressed={!config.excluded.includes(entry.word)}
                      title={`${entry.word} (${entry.reading}) — ${meaningOf(entry, s.lang)}`}
                      onClick={() => patch({ excluded: toggle(config.excluded, entry.word) })}
                    >
                      {entry.word}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </Panel>

      <Panel title={s.setup.whichForms} hint={s.setup.whichFormsHint}>
        {hasVerbs && (
          <>
            <div className="group-head">
              <h3>{s.setup.verbs}</h3>
              <SelectAll
                all={() => patch({ verbForms: [...VERB_FORMS] })}
                none={() => patch({ verbForms: ['te'] })}
              />
            </div>
            <div className="chip-grid" style={{ marginBottom: 16 }}>
              {VERB_FORMS.map((form) => (
                <Chip
                  key={form}
                  pressed={config.verbForms.includes(form)}
                  onClick={() => {
                    const next = toggle(config.verbForms, form);
                    if (next.length) patch({ verbForms: next });
                  }}
                >
                  {s.verbForm[form]}
                </Chip>
              ))}
            </div>
          </>
        )}

        {hasAdjectives && (
          <>
            <div className="group-head">
              <h3>{s.setup.adjectives}</h3>
              <SelectAll
                all={() => patch({ adjectiveForms: [...ADJECTIVE_FORMS] })}
                none={() => patch({ adjectiveForms: ['negative'] })}
              />
            </div>
            <div className="chip-grid">
              {ADJECTIVE_FORMS.map((form) => (
                <Chip
                  key={form}
                  pressed={config.adjectiveForms.includes(form)}
                  onClick={() => {
                    const next = toggle(config.adjectiveForms, form);
                    if (next.length) patch({ adjectiveForms: next });
                  }}
                >
                  {s.adjectiveForm[form]}
                </Chip>
              ))}
            </div>
          </>
        )}

        {!hasVerbs && !hasAdjectives && <p className="hint">{s.setup.pickAGroupFirst}</p>}
      </Panel>

      <Panel title={s.setup.howAsked} hint={s.setup.anyCombination}>
        <div className="mode-list">
          {MODES.map((mode) => (
            <ModeCard
              key={mode}
              pressed={config.modes.includes(mode)}
              onClick={() => {
                const next = toggle(config.modes, mode);
                if (next.length) patch({ modes: next });
              }}
              title={s.conjugationMode.label[mode]}
              blurb={s.conjugationMode.blurb[mode]}
              aside={
                mode === 'identify' ? undefined : (
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
                )
              }
            />
          ))}
        </div>
        <p className="faint" style={{ marginTop: 10 }}>
          {s.setup.conjugationInputNote}
        </p>
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
