import type { ReactNode } from 'react';
import type { Flow, Order } from '../lib/session';
import { BUNDLES, useLanguage, useStrings } from '../i18n';
import { LANGS, type Lang } from '../i18n/lang';

/**
 * A formatter for a column of projected dates.
 *
 * Deciding per row whether to name the day or only the month makes the column
 * lose precision partway down — "3 Nov" above "November 2026" reads as though
 * the plan got vaguer as it went on. So the format is chosen once, from where
 * the plan ends: the year appears only when the plan runs past this one.
 */
export function stageDateFormat(
  finishesOn: number | null,
  lang: Lang,
  now = Date.now(),
): (ms: number) => string {
  const spansYears =
    finishesOn !== null && new Date(finishesOn).getFullYear() !== new Date(now).getFullYear();
  return (ms) =>
    new Date(ms).toLocaleDateString(lang, {
      day: 'numeric',
      month: 'short',
      ...(spansYears ? { year: 'numeric' } : {}),
    });
}

export function SpeakerIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export function Panel({
  title,
  hint,
  aside,
  children,
}: {
  title: string;
  hint?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel">
      <div className="row between">
        <div>
          <h2>{title}</h2>
          {hint && <p className="hint">{hint}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function Chip({
  pressed,
  onClick,
  jp,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  jp?: boolean;
  children: ReactNode;
}) {
  return (
    <button type="button" className={jp ? 'chip jp' : 'chip'} aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="segmented">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function ModeCard({
  pressed,
  onClick,
  title,
  blurb,
  aside,
  disabled,
}: {
  pressed: boolean;
  onClick: () => void;
  title: string;
  blurb: string;
  aside?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="mode-card" data-on={pressed} data-disabled={disabled}>
      <button
        type="button"
        className="mode-hit"
        onClick={onClick}
        aria-pressed={pressed}
        aria-label={title}
        disabled={disabled}
      >
        <span className="box" aria-hidden="true">
          ✓
        </span>
        <span className="body">
          <span className="title">{title}</span>
          <span className="hint">{blurb}</span>
        </span>
      </button>
      {aside}
    </div>
  );
}

const FLOWS: Flow[] = ['once', 'mistakes', 'endless'];

export function FlowPicker({
  flow,
  order,
  onFlow,
  onOrder,
}: {
  flow: Flow;
  order: Order;
  onFlow: (flow: Flow) => void;
  onOrder: (order: Order) => void;
}) {
  const s = useStrings();
  return (
    <Panel title={s.flow.title}>
      <div className="mode-list">
        {FLOWS.map((option) => (
          <ModeCard
            key={option}
            pressed={flow === option}
            onClick={() => onFlow(option)}
            title={s.flow.label[option]}
            blurb={s.flow.blurb[option]}
          />
        ))}
      </div>
      {flow !== 'endless' && (
        <div className="row" style={{ marginTop: 14 }}>
          <span className="hint">{s.flow.order}</span>
          <Segmented
            value={order}
            onChange={onOrder}
            options={[
              { value: 'ordered', label: s.flow.ordered },
              { value: 'shuffled', label: s.flow.shuffled },
            ]}
          />
        </div>
      )}
    </Panel>
  );
}

/**
 * The colour of an item's mastery dot, or nothing at all for an item that has
 * never been answered — an empty dot would claim a score it does not have.
 *
 * Shared because four screens draw the same dot and a fifth reading of the
 * same numbers should not disagree with the other four about where "good"
 * starts.
 */
export function masteryColour(accuracy: number | null): string | undefined {
  if (accuracy === null) return undefined;
  if (accuracy >= 80) return 'var(--good)';
  if (accuracy >= 50) return '#e0b341';
  return 'var(--bad)';
}

export function SelectAll({
  all,
  none,
}: {
  all: () => void;
  none: () => void;
}) {
  const s = useStrings();
  return (
    <div className="row">
      <button type="button" className="btn ghost" onClick={all}>
        {s.common.selectAll}
      </button>
      <button type="button" className="btn ghost" onClick={none}>
        {s.common.clear}
      </button>
    </div>
  );
}

/**
 * The language switch. Two letters rather than the language's full name: it
 * lives in the top bar next to the title, where "Nederlands" would crowd out
 * the app it belongs to. The full name is on the button for anyone who needs
 * it read out or hovered.
 */
export function LanguagePicker() {
  const { lang, setLang } = useLanguage();
  const s = useStrings();
  return (
    <div className="segmented" role="group" aria-label={s.common.language}>
      {LANGS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={lang === option}
          aria-label={BUNDLES[option].name}
          title={BUNDLES[option].name}
          onClick={() => setLang(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
