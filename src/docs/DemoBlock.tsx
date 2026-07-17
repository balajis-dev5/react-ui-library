import { useState } from 'react'
import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

interface Props {
  id: string
  title: string
  note?: string
  code: string
  children: ReactNode
}

/** A docs section: heading, live demo surface, and a collapsible code snippet. */
export default function DemoBlock({ id, title, note, code, children }: Props) {
  const [showCode, setShowCode] = useState(false)
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <h2 className="text-base font-semibold text-(--ui-ink)">{title}</h2>
        <button
          onClick={() => setShowCode((s) => !s)}
          className="text-xs font-medium text-(--ui-accent) hover:underline"
          aria-expanded={showCode}
        >
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
      {note && <p className="mb-3 text-sm text-(--ui-ink-3)">{note}</p>}
      <div className="rounded-xl border border-(--ui-line) bg-(--ui-bg) p-5">{children}</div>
      <pre
        className={cx(
          'mt-2 overflow-x-auto rounded-xl bg-(--ui-bg-subtle) p-4 text-xs leading-relaxed text-(--ui-ink-2)',
          !showCode && 'hidden',
        )}
      >
        <code>{code.trim()}</code>
      </pre>
    </section>
  )
}
