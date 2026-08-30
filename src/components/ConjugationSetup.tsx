import { CONJUGATION_GROUPS } from '../data/conjugation';
import {
  buildConjugationCards,
  type ConjugationConfig,
  type ConjugationMode,
} from '../lib/buildCards';
import { ADJECTIVE_FORMS, VERB_FORMS } from '../lib/conjugate';
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
import { useStrings } from '../i18n';
import { blurbOf, labelOf, meaningOf } from '../i18n/content';

const MODES: ConjugationMode[] = ['produce', 'identify', 'dictionary'];

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
  const selectedGroups = CONJUGATION_GROUPS.filter((g) => config.groupIds.includes(g.id));
  const hasVerbs = selectedGroups.some((g) => g.verbs.length > 0);
  const hasAdjectives = selectedGroups.some((g) => g.adjectives.length > 0);

  const groups = CONJUGATION_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    items: [...group.verbs, ...group.adjectives].map((entry) => ({
      key: entry.word,
      label: entry.word,
      title: `${entry.word} (${entry.reading}) — ${meaningOf(entry, s.lang)}`,
    })),
  }));

  const modes: ModeOption<ConjugationMode>[] = MODES.map((mode) => ({
    id: mode,
    label: s.conjugationMode.label[mode],
    blurb: s.conjugationMode.blurb[mode],
    // Naming a grammatical form is recognition, so it is never typed.
    fixedInput: mode === 'identify',
  }));

  return (
    <div className="stack">
      <SetupHeader
        title={s.deck.conjugation}
        subtitle={s.setup.cardCount(cards.length)}
        onHome={onHome}
      />

      <DeckPicker
        title={s.setup.whichConjugation}
        hint={s.setup.whichConjugationHint}
        groups={groups}
        groupIds={config.groupIds}
        excluded={config.excluded}
        onGroups={(groupIds) => patch({ groupIds })}
        onExcluded={(excluded) => patch({ excluded })}
      />

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

        {!hasVerbs && !hasAdjectives && (
          <p className="hint">{s.setup.pickAGroupFirst}</p>
        )}
      </Panel>

      <ModePicker<ConjugationMode>
        hint={s.setup.anyCombination}
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
        footnote={s.setup.conjugationInputNote}
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
