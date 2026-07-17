import type { ComponentProps } from 'react'
import { cx } from './cx'

type Tone = 'neutral' | 'accent' | 'good' | 'warn' | 'danger'

export interface BadgeProps extends ComponentProps<'span'> {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  neutral: 'bg-(--ui-bg-subtle) text-(--ui-ink-2)',
  accent: 'bg-(--ui-accent) text-(--ui-accent-ink)',
  good: 'bg-(--ui-good-bg) text-(--ui-good)',
  warn: 'bg-(--ui-warn-bg) text-(--ui-warn)',
  danger: 'bg-(--ui-danger-bg) text-(--ui-danger)',
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', tones[tone], className)}
      {...rest}
    />
  )
}
