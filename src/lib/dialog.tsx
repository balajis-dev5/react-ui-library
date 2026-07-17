import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cx } from './cx'

// Composition API: <Dialog><DialogTrigger>…</DialogTrigger><DialogContent>…</DialogContent></Dialog>
// The context carries open state + ids so content and trigger stay in sync
// without prop drilling.

interface DialogCtx {
  open: boolean
  setOpen: (open: boolean) => void
  labelId: string
  descId: string
}

const Ctx = createContext<DialogCtx | null>(null)

function useDialogCtx(component: string): DialogCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error(`<${component}> must be used inside <Dialog>`)
  return ctx
}

export interface DialogProps {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ children, open: controlled, onOpenChange }: DialogProps) {
  const [internal, setInternal] = useState(false)
  const open = controlled ?? internal
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlled === undefined) setInternal(next)
      onOpenChange?.(next)
    },
    [controlled, onOpenChange],
  )
  const labelId = useId()
  const descId = useId()
  return <Ctx.Provider value={{ open, setOpen, labelId, descId }}>{children}</Ctx.Provider>
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useDialogCtx('DialogTrigger')
  return (
    <span style={{ display: 'contents' }} onClick={() => setOpen(true)}>
      {children}
    </span>
  )
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export interface DialogContentProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function DialogContent({ title, description, children, className }: DialogContentProps) {
  const { open, setOpen, labelId, descId } = useDialogCtx('DialogContent')
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  // Focus management: remember the opener, move focus in, trap Tab, restore on close.
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    if (!panel) return

    const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
    ;(focusables[0] ?? panel).focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    // Scroll lock while open.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      restoreRef.current?.focus()
    }
  }, [open, setOpen])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" onClick={() => setOpen(false)}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={cx('w-full max-w-md rounded-xl border border-(--ui-line) bg-(--ui-bg) p-5 shadow-2xl', className)}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h2 id={labelId} className="text-base font-semibold text-(--ui-ink)">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-0.5 text-sm text-(--ui-ink-3)">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close dialog"
            className="rounded-md p-1 text-(--ui-ink-3) hover:bg-(--ui-bg-subtle) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="text-sm text-(--ui-ink-2)">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export function DialogClose({ children }: { children: ReactNode }) {
  const { setOpen } = useDialogCtx('DialogClose')
  return (
    <span style={{ display: 'contents' }} onClick={() => setOpen(false)}>
      {children}
    </span>
  )
}
