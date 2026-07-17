import type { ReactNode } from 'react'
import { cx } from './cx'

type Tone = 'info' | 'good' | 'warn' | 'danger'

export interface AlertProps {
  tone?: Tone
  title: string
  children?: ReactNode
}

const tones: Record<Tone, { box: string; icon: string }> = {
  info: { box: 'bg-(--ui-bg-subtle) text-(--ui-ink)', icon: 'ℹ' },
  good: { box: 'bg-(--ui-good-bg) text-(--ui-good)', icon: '✓' },
  warn: { box: 'bg-(--ui-warn-bg) text-(--ui-warn)', icon: '⚠' },
  danger: { box: 'bg-(--ui-danger-bg) text-(--ui-danger)', icon: '✕' },
}

export function Alert({ tone = 'info', title, children }: AlertProps) {
  const t = tones[tone]
  return (
    <div role={tone === 'danger' || tone === 'warn' ? 'alert' : 'status'} className={cx('flex gap-3 rounded-(--ui-radius) p-3.5', t.box)}>
      <span aria-hidden className="mt-px text-sm leading-5 font-bold">
        {t.icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {children && <div className="mt-0.5 text-sm opacity-90">{children}</div>}
      </div>
    </div>
  )
}
