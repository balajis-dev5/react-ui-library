import { useId, useState } from 'react'
import { cx } from './cx'

export interface SwitchProps {
  label: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

/** A real button with role="switch" — toggles on click, Space and Enter. */
export function Switch({ label, checked, defaultChecked = false, disabled, onChange }: SwitchProps) {
  const id = useId()
  const [internal, setInternal] = useState(defaultChecked)
  const isOn = checked ?? internal

  const toggle = () => {
    if (disabled) return
    const next = !isOn
    if (checked === undefined) setInternal(next)
    onChange?.(next)
  }

  return (
    <span className="inline-flex items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-labelledby={id}
        disabled={disabled}
        onClick={toggle}
        className={cx(
          'relative h-5.5 w-10 rounded-full transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isOn ? 'bg-(--ui-accent)' : 'bg-(--ui-bg-subtle) border border-(--ui-line)',
        )}
      >
        <span
          aria-hidden
          className={cx(
            'absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition-all',
            isOn ? 'left-[calc(100%-1.25rem)]' : 'left-0.5',
          )}
        />
      </button>
      <label id={id} onClick={toggle} className={cx('text-sm text-(--ui-ink)', !disabled && 'cursor-pointer')}>
        {label}
      </label>
    </span>
  )
}
