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
import type { Card } from '../lib/session';
import {
  DeckPicker,
  ModePicker,
  SetupHeader,
  StartBar,
  toggle,
  type ModeOption,
} from './DeckPicker';
import { Chip, FlowPicker, Panel, SelectAll } from './ui';

const MODES: ConjugationMode[] = ['produce', 'identify', 'dictionary'];

interface Props {
  config: ConjugationConfig;
  onChange: (config: ConjugationConfig) => void;
  onStart: (cards: Card[]) => void;
  onHome: () => void;
}

export function ConjugationSetup({ config, onChange, onStart, onHome }: Props) {
  const patch = (update: Partial<ConjugationConfig>) => onChange({ ...config, ...update });

  const cards = buildConjugationCards(config);
  const selectedGroups = CONJUGATION_GROUPS.filter((g) => config.groupIds.includes(g.id));
  const hasVerbs = selectedGroups.some((g) => g.verbs.length > 0);
  const hasAdjectives = selectedGroups.some((g) => g.adjectives.length > 0);

  const groups = CONJUGATION_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    blurb: group.blurb,
    items: [...group.verbs, ...group.adjectives].map((entry) => ({
      key: entry.word,
      label: entry.word,
      title: `${entry.word} (${entry.reading}) — ${entry.meaning}`,
    })),
  }));

  const modes: ModeOption<ConjugationMode>[] = MODES.map((mode) => ({
    id: mode,
    label: CONJUGATION_MODE_LABEL[mode],
    blurb: CONJUGATION_MODE_BLURB[mode],
    // Naming a grammatical form is recognition, so it is never typed.
    fixedInput: mode === 'identify',
  }));

  return (
    <div className="stack">
      <SetupHeader title="Conjugation" subtitle={`${cards.length} cards`} onHome={onHome} />

      <DeckPicker
        title="Which words?"
        hint="Verb classes decide how a word conjugates, so they make the natural groups."
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
      />

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

      <ModePicker<ConjugationMode>
        hint="Pick any combination."
        modes={modes}
        selected={config.modes}
        inputModes={config.inputModes}
        onToggle={(mode) => {
          const next = toggle(config.modes, mode);
          if (next.length) patch({ modes: next });
        }}
        onInputMode={(mode, value) =>
          patch({ inputModes: { ...config.inputModes, [mode]: value } })
        }
        footnote="Typed answers accept romaji, kana or the written form — かいて, kaite and 書いて all count."
      />

      <FlowPicker
        flow={config.flow}
        order={config.order}
        onFlow={(flow) => patch({ flow })}
        onOrder={(order) => patch({ order })}
      />

      <StartBar count={cards.length} empty="Pick at least one group" onStart={() => onStart(cards)} />
    </div>
  );
}
