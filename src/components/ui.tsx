import type { ReactNode } from 'react';
import type { Flow, Order } from '../lib/session';

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
}: {
  pressed: boolean;
  onClick: () => void;
  title: string;
  blurb: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mode-card" data-on={pressed}>
      <button
        type="button"
        className="mode-hit"
        onClick={onClick}
        aria-pressed={pressed}
        aria-label={title}
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

const FLOW_OPTIONS: { value: Flow; label: string; blurb: string }[] = [
  { value: 'once', label: 'One pass', blurb: 'Every card once, then a summary.' },
  { value: 'mistakes', label: 'Repeat mistakes', blurb: 'Anything you miss comes back until you get it.' },
  { value: 'endless', label: 'Endless', blurb: 'Keeps going, weak cards come round more often.' },
];

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
  return (
    <Panel title="How do you want to practise?">
      <div className="mode-list">
        {FLOW_OPTIONS.map((option) => (
          <ModeCard
            key={option.value}
            pressed={flow === option.value}
            onClick={() => onFlow(option.value)}
            title={option.label}
            blurb={option.blurb}
          />
        ))}
      </div>
      {flow !== 'endless' && (
        <div className="row" style={{ marginTop: 14 }}>
          <span className="hint">Order</span>
          <Segmented
            value={order}
            onChange={onOrder}
            options={[
              { value: 'ordered', label: 'In order' },
              { value: 'shuffled', label: 'Shuffled' },
            ]}
          />
        </div>
      )}
    </Panel>
  );
}

export function SelectAll({
  all,
  none,
}: {
  all: () => void;
  none: () => void;
}) {
  return (
    <div className="row">
      <button type="button" className="btn ghost" onClick={all}>
        Select all
      </button>
      <button type="button" className="btn ghost" onClick={none}>
        Clear
      </button>
    </div>
  );
}
