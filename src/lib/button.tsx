import type { ComponentProps } from 'react'
import { cx } from './cx'
import { Spinner } from './spinner'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
  size?: Size
  /** Shows a spinner and disables the button; the label stays visible for width stability. */
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-(--ui-accent) text-(--ui-accent-ink) hover:bg-(--ui-accent-hover)',
  secondary: 'bg-(--ui-bg-subtle) text-(--ui-ink) hover:opacity-80',
  outline: 'border border-(--ui-line) bg-transparent text-(--ui-ink) hover:bg-(--ui-bg-subtle)',
  ghost: 'bg-transparent text-(--ui-ink-2) hover:bg-(--ui-bg-subtle)',
  destructive: 'bg-(--ui-danger) text-white hover:bg-(--ui-danger-hover)',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
}

export function Button({ variant = 'primary', size = 'md', loading, disabled, className, children, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'inline-flex items-center justify-center rounded-(--ui-radius) font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading && <Spinner size={size === 'lg' ? 18 : 14} />}
      {children}
    </button>
  )
}
