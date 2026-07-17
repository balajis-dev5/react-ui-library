import { useId } from 'react'
import type { ComponentProps } from 'react'
import { cx } from './cx'

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'id' | 'type'> {
  label: string
  hint?: string
}

export function Checkbox({ label, hint, className, ...rest }: CheckboxProps) {
  const id = useId()
  return (
    <div className="flex items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cx(
          'mt-0.5 h-4 w-4 shrink-0 rounded border-(--ui-line) accent-(--ui-accent)',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)',
          className,
        )}
        {...rest}
      />
      <span className="flex flex-col">
        <label htmlFor={id} className="cursor-pointer text-sm font-medium text-(--ui-ink)">
          {label}
        </label>
        {hint && (
          <span id={`${id}-hint`} className="text-xs text-(--ui-ink-3)">
            {hint}
          </span>
        )}
      </span>
    </div>
  )
}

export interface RadioGroupProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export function RadioGroup({ label, name, options, value, defaultValue, onChange }: RadioGroupProps) {
  const groupId = useId()
  return (
    <fieldset role="radiogroup" aria-labelledby={groupId} className="flex flex-col gap-2">
      <legend id={groupId} className="mb-1 text-sm font-medium text-(--ui-ink-2)">
        {label}
      </legend>
      {options.map((o) => {
        const id = `${groupId}-${o.value}`
        return (
          <span key={o.value} className="flex items-center gap-2.5">
            <input
              id={id}
              type="radio"
              name={name}
              value={o.value}
              checked={value !== undefined ? value === o.value : undefined}
              defaultChecked={defaultValue !== undefined ? defaultValue === o.value : undefined}
              onChange={() => onChange?.(o.value)}
              className="h-4 w-4 accent-(--ui-accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)"
            />
            <label htmlFor={id} className="cursor-pointer text-sm text-(--ui-ink)">
              {o.label}
            </label>
          </span>
        )
      })}
    </fieldset>
  )
}
