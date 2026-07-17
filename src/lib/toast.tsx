import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cx } from './cx'

type Tone = 'neutral' | 'good' | 'danger'

interface ToastItem {
  id: number
  title: string
  description?: string
  tone: Tone
}

interface ToastApi {
  toast: (t: { title: string; description?: string; tone?: Tone; duration?: number }) => void
}

const Ctx = createContext<ToastApi | null>(null)

export function useToast(): ToastApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

const tones: Record<Tone, string> = {
  neutral: 'border-(--ui-line) bg-(--ui-bg) text-(--ui-ink)',
  good: 'border-transparent bg-(--ui-good-bg) text-(--ui-good)',
  danger: 'border-transparent bg-(--ui-danger-bg) text-(--ui-danger)',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback<ToastApi['toast']>(
    ({ title, description, tone = 'neutral', duration = 4000 }) => {
      const id = nextId.current++
      setItems((list) => [...list, { id, title, description, tone }])
      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      {createPortal(
        // aria-live region: screen readers announce new toasts without focus moves
        <div aria-live="polite" aria-label="Notifications" className="fixed right-4 bottom-4 z-50 flex w-80 flex-col gap-2">
          {items.map((t) => (
            <div key={t.id} role="status" className={cx('flex items-start gap-3 rounded-(--ui-radius) border p-3.5 shadow-lg', tones[t.tone])}>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{t.title}</p>
                {t.description && <p className="mt-0.5 text-sm opacity-85">{t.description}</p>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="rounded p-0.5 opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </Ctx.Provider>
  )
}
