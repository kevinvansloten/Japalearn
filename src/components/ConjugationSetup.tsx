import { CONJUGATION_GROUPS } from '../data/conjugation';
import {
  CONJUGATION_MODE_BLURB,
  CONJUGATION_MODE_LABEL,
  buildConjugationCards,
  type ConjugationConfig,
  type ConjugationMode,
} from '../lib/buildCards';
import {
  ADJECTIVE_FORMS,
  ADJECTIVE_FORM_LABEL,
  VERB_FORMS,
  VERB_FORM_LABEL,
} from '../lib/conjugate';
import type { Card, InputMode } from '../lib/session';
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
  const patch = (update: Partial<ConjugationConfig>) => onChange({ ...config, ...update });

  const cards = buildConjugationCards(config);
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
          <strong>Conjugation</strong>
          <div className="faint">{cards.length} cards</div>
        </div>
        <button type="button" className="btn ghost" onClick={onHome}>
          Home
        </button>
      </div>

      <Panel
        title="Which words?"
        hint="Verb classes decide how a word conjugates, so they make the natural groups."
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
                    {group.label} · {included}/{words.length}
                  </Chip>
                  <div className="hint" style={{ marginTop: 4 }}>
                    {group.blurb}
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
                      title={`${entry.word} (${entry.reading}) — ${entry.meaning}`}
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

      <Panel title="Which forms?" hint="Drill one form until it is automatic, or mix them.">
        {hasVerbs && (
          <>
            <div className="group-head">
              <h3>Verbs</h3>
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
                  {VERB_FORM_LABEL[form]}
                </Chip>
              ))}
            </div>
          </>
        )}

        {hasAdjectives && (
          <>
            <div className="group-head">
              <h3>Adjectives</h3>
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
                  {ADJECTIVE_FORM_LABEL[form]}
                </Chip>
              ))}
            </div>
          </>
        )}

        {!hasVerbs && !hasAdjectives && (
          <p className="hint">Pick a group above and its forms will appear here.</p>
        )}
      </Panel>

      <Panel title="How should you be asked?" hint="Pick any combination.">
        <div className="mode-list">
          {MODES.map((mode) => (
            <ModeCard
              key={mode}
              pressed={config.modes.includes(mode)}
              onClick={() => {
                const next = toggle(config.modes, mode);
                if (next.length) patch({ modes: next });
              }}
              title={CONJUGATION_MODE_LABEL[mode]}
              blurb={CONJUGATION_MODE_BLURB[mode]}
              aside={
                mode === 'identify' ? undefined : (
                  <Segmented<InputMode>
                    value={config.inputModes[mode]}
                    onChange={(value) =>
                      patch({ inputModes: { ...config.inputModes, [mode]: value } })
                    }
                    options={[
                      { value: 'type', label: 'Type' },
                      { value: 'choice', label: 'Choose' },
                    ]}
                  />
                )
              }
            />
          ))}
        </div>
        <p className="faint" style={{ marginTop: 10 }}>
          Typed answers accept romaji, kana or the written form — かいて, kaite and 書いて all
          count.
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
          {ready ? `Start — ${cards.length} cards` : 'Pick at least one group'}
        </button>
      </div>
    </div>
  );
}
