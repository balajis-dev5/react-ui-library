import { useId, useState } from 'react'
import type { ReactNode } from 'react'

export interface TooltipProps {
  content: string
  children: ReactNode
}

/**
 * Shows on hover AND keyboard focus, hides on Escape (WCAG 1.4.13).
 * The wrapper stays inline so tooltips work mid-sentence.
 */
export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      aria-describedby={open ? id : undefined}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          id={id}
          className="absolute bottom-full left-1/2 z-50 mb-1.5 w-max max-w-56 -translate-x-1/2 rounded-md bg-(--ui-ink) px-2.5 py-1.5 text-xs text-(--ui-bg) shadow-md"
        >
          {content}
        </span>
      )}
    </span>
  )
}
