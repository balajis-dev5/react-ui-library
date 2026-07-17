import type { ComponentProps } from 'react'
import { cx } from './cx'

export function Table({ className, ...rest }: ComponentProps<'table'>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--ui-line) bg-(--ui-bg)">
      <table className={cx('w-full text-sm text-(--ui-ink)', className)} {...rest} />
    </div>
  )
}

export function THead({ className, ...rest }: ComponentProps<'thead'>) {
  return <thead className={cx('border-b border-(--ui-line) text-left text-(--ui-ink-2)', className)} {...rest} />
}

export function TBody(props: ComponentProps<'tbody'>) {
  return <tbody {...props} />
}

export function TR({ className, ...rest }: ComponentProps<'tr'>) {
  return <tr className={cx('border-b border-(--ui-line) last:border-b-0', className)} {...rest} />
}

export function TH({ className, ...rest }: ComponentProps<'th'>) {
  return <th className={cx('px-4 py-2.5 font-medium whitespace-nowrap', className)} {...rest} />
}

export function TD({ className, ...rest }: ComponentProps<'td'>) {
  return <td className={cx('px-4 py-2.5 whitespace-nowrap', className)} {...rest} />
}
