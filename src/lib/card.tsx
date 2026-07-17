import type { ComponentProps } from 'react'
import { cx } from './cx'

export function Card({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className={cx('rounded-xl border border-(--ui-line) bg-(--ui-bg) text-(--ui-ink)', className)}
      {...rest}
    />
  )
}

export function CardHeader({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx('flex flex-col gap-0.5 border-b border-(--ui-line) px-4 py-3', className)} {...rest} />
}

export function CardTitle({ className, ...rest }: ComponentProps<'h3'>) {
  return <h3 className={cx('text-sm font-semibold', className)} {...rest} />
}

export function CardDescription({ className, ...rest }: ComponentProps<'p'>) {
  return <p className={cx('text-xs text-(--ui-ink-3)', className)} {...rest} />
}

export function CardContent({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx('px-4 py-3.5', className)} {...rest} />
}

export function CardFooter({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx('flex items-center gap-2 border-t border-(--ui-line) px-4 py-3', className)} {...rest} />
}
