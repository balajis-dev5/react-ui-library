import { useId } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { cx } from './cx'

interface FieldShellProps {
  label: string
  hint?: string
  error?: string
  id: string
  children: ReactNode
}

/** Shared label / hint / error scaffolding so every input wires aria the same way. */
export function FieldShell({ label, hint, error, id, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-(--ui-ink-2)">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-(--ui-ink-3)">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-(--ui-danger)">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClasses = (error?: string) =>
  cx(
    'w-full rounded-(--ui-radius) border bg-(--ui-bg) px-3 py-2 text-sm text-(--ui-ink)',
    'placeholder:text-(--ui-ink-3) focus:outline-none focus:ring-2 focus:ring-(--ui-ring)',
    'disabled:cursor-not-allowed disabled:opacity-50',
    error ? 'border-(--ui-danger)' : 'border-(--ui-line)',
  )

export function fieldAria(id: string, hint?: string, error?: string) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  }
}

export interface InputProps extends Omit<ComponentProps<'input'>, 'id'> {
  label: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, className, ...rest }: InputProps) {
  const id = useId()
  return (
    <FieldShell label={label} hint={hint} error={error} id={id}>
      <input className={cx(inputClasses(error), className)} {...fieldAria(id, hint, error)} {...rest} />
    </FieldShell>
  )
}

export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'id'> {
  label: string
  hint?: string
  error?: string
}

export function Textarea({ label, hint, error, className, rows = 4, ...rest }: TextareaProps) {
  const id = useId()
  return (
    <FieldShell label={label} hint={hint} error={error} id={id}>
      <textarea rows={rows} className={cx(inputClasses(error), 'resize-y', className)} {...fieldAria(id, hint, error)} {...rest} />
    </FieldShell>
  )
}

export interface SelectProps extends Omit<ComponentProps<'select'>, 'id'> {
  label: string
  hint?: string
  error?: string
}

export function Select({ label, hint, error, className, children, ...rest }: SelectProps) {
  const id = useId()
  return (
    <FieldShell label={label} hint={hint} error={error} id={id}>
      <select className={cx(inputClasses(error), 'appearance-none', className)} {...fieldAria(id, hint, error)} {...rest}>
        {children}
      </select>
    </FieldShell>
  )
}
