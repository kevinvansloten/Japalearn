/**
 * The parts every deck's setup screen was repeating.
 *
 * Five screens had grown the same block: groups you switch on, items inside a
 * group you switch off, a mode list with a type-or-choose toggle beside each,
 * and a start button that counts the cards. They differed only in what the
 * items look like.
 */
import type { ReactNode } from 'react';
import type { InputMode } from '../lib/session';
import { Chip, ModeCard, Panel, Segmented, SelectAll } from './ui';

export interface PickerItem {
  /** what goes in the config's `excluded` list */
  key: string;
  label: string;
  title?: string;
  /** mastery dot colour, if the item has been practised */
  dot?: string;
  /** a small marker, e.g. a counter whose reading shifts */
  flag?: boolean;
}

export interface PickerGroup {
  id: string;
  label: string;
  blurb: string;
  items: PickerItem[];
}

/** How wide the item toggles want to be. */
export type ItemLayout = 'tile' | 'wide' | 'block';

export function SetupHeader({
  title,
  subtitle,
  onHome,
}: {
  title: string;
  subtitle: string;
  onHome: () => void;
}) {
  return (
    <div className="row between">
      <div>
        <strong>{title}</strong>
        <div className="faint">{subtitle}</div>
      </div>
      <button type="button" className="btn ghost" onClick={onHome}>
        Home
      </button>
    </div>
  );
}

export function DeckPicker({
  title,
  hint,
  groups,
  groupIds,
  excluded,
  onGroups,
  onExcluded,
  itemLayout = 'wide',
  footnote,
}: {
  title: string;
  hint: string;
  groups: PickerGroup[];
  groupIds: string[];
  excluded: string[];
  onGroups: (ids: string[]) => void;
  onExcluded: (keys: string[]) => void;
  itemLayout?: ItemLayout;
  footnote?: ReactNode;
}) {
  const toggleGroup = (id: string) =>
    onGroups(groupIds.includes(id) ? groupIds.filter((g) => g !== id) : [...groupIds, id]);

  const toggleItem = (key: string) =>
    onExcluded(excluded.includes(key) ? excluded.filter((k) => k !== key) : [...excluded, key]);

  const setGroupItems = (group: PickerGroup, include: boolean) => {
    const keys = group.items.map((i) => i.key);
    onExcluded(
      include
        ? excluded.filter((k) => !keys.includes(k))
        : [...new Set([...excluded, ...keys])],
    );
  };

  return (
    <Panel
      title={title}
      hint={hint}
      aside={
        <SelectAll
          all={() => {
            onGroups(groups.map((g) => g.id));
            onExcluded([]);
          }}
          none={() => onGroups([])}
        />
      }
    >
      {groups.map((group) => {
        const on = groupIds.includes(group.id);
        const included = group.items.filter((i) => !excluded.includes(i.key)).length;
        return (
          <div className="group-block" key={group.id}>
            <div className="group-head">
              <div>
                <Chip pressed={on} onClick={() => toggleGroup(group.id)}>
                  {group.label} · {included}/{group.items.length}
                </Chip>
                <div className="hint" style={{ marginTop: 4 }}>
                  {group.blurb}
                </div>
              </div>
              {on && (
                <SelectAll
                  all={() => setGroupItems(group, true)}
                  none={() => setGroupItems(group, false)}
                />
              )}
            </div>

            {on && (
              <div className={`item-picker layout-${itemLayout}`}>
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="item-toggle"
                    aria-pressed={!excluded.includes(item.key)}
                    title={item.title}
                    onClick={() => toggleItem(item.key)}
                  >
                    {item.label}
                    {item.flag && <span className="warn" aria-hidden="true" />}
                    {item.dot && <span className="dot" style={{ background: item.dot }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {footnote && (
        <p className="faint" style={{ marginTop: 12 }}>
          {footnote}
        </p>
      )}
    </Panel>
  );
}

export interface ModeOption<M extends string> {
  id: M;
  label: string;
  blurb: string;
  /** unavailable, with the reason shown in place of the blurb */
  unavailable?: string;
  /** this mode is always multiple choice, so it has no toggle */
  fixedInput?: boolean;
}

export function ModePicker<M extends string>({
  hint,
  modes,
  selected,
  inputModes,
  onToggle,
  onInputMode,
  footnote,
}: {
  hint?: string;
  modes: ModeOption<M>[];
  selected: M[];
  inputModes: Record<M, InputMode>;
  onToggle: (mode: M) => void;
  onInputMode: (mode: M, input: InputMode) => void;
  footnote?: ReactNode;
}) {
  return (
    <Panel title="How should you be asked?" hint={hint}>
      <div className="mode-list">
        {modes.map((mode) => (
          <ModeCard
            key={mode.id}
            pressed={selected.includes(mode.id)}
            disabled={Boolean(mode.unavailable)}
            onClick={() => onToggle(mode.id)}
            title={mode.label}
            blurb={mode.unavailable ?? mode.blurb}
            aside={
              mode.fixedInput ? undefined : (
                <Segmented<InputMode>
                  value={inputModes[mode.id]}
                  onChange={(value) => onInputMode(mode.id, value)}
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
      {footnote && (
        <p className="faint" style={{ marginTop: 10 }}>
          {footnote}
        </p>
      )}
    </Panel>
  );
}

export function StartBar({
  count,
  noun = 'cards',
  empty,
  onStart,
}: {
  count: number;
  noun?: string;
  /** what to say when nothing is selected */
  empty: string;
  onStart: () => void;
}) {
  return (
    <div className="row">
      <button
        type="button"
        className="btn primary big"
        disabled={count === 0}
        onClick={onStart}
      >
        {count > 0 ? `Start — ${count} ${noun}` : empty}
      </button>
    </div>
  );
}

/** Shared by every deck that shows a mastery dot on its items. */
export function masteryColour(accuracy: number | null): string | undefined {
  if (accuracy === null) return undefined;
  if (accuracy >= 80) return 'var(--good)';
  if (accuracy >= 50) return '#e0b341';
  return 'var(--bad)';
}

/** Add or remove a value, the operation every setup screen was redefining. */
export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
