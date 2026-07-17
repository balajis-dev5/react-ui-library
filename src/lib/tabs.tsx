import { createContext, useContext, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cx } from './cx'

// WAI-ARIA tabs: roving tabindex, arrow-key navigation, Home/End support.

interface TabsCtx {
  value: string
  setValue: (v: string) => void
  baseId: string
}

const Ctx = createContext<TabsCtx | null>(null)

function useTabsCtx(component: string): TabsCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>`)
  return ctx
}

export interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

export function Tabs({ defaultValue, value, onValueChange, children }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const baseId = useId()
  const setValue = (v: string) => {
    if (value === undefined) setInternal(v)
    onValueChange?.(v)
  }
  return (
    <Ctx.Provider value={{ value: current, setValue, baseId }}>
      <div>{children}</div>
    </Ctx.Provider>
  )
}

export function TabList({ label, children }: { label: string; children: ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null)

  const onKeyDown = (e: React.KeyboardEvent) => {
    const tabs = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]') ?? [])
    const idx = tabs.indexOf(document.activeElement as HTMLElement)
    if (idx === -1) return
    let next = -1
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    if (next >= 0) {
      e.preventDefault()
      tabs[next].focus()
      tabs[next].click()
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="inline-flex gap-1 rounded-(--ui-radius) bg-(--ui-bg-subtle) p-1"
    >
      {children}
    </div>
  )
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { value: current, setValue, baseId } = useTabsCtx('Tab')
  const selected = current === value
  return (
    <button
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => setValue(value)}
      className={cx(
        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)',
        selected ? 'bg-(--ui-bg) text-(--ui-ink) shadow-sm' : 'text-(--ui-ink-3) hover:text-(--ui-ink-2)',
      )}
    >
      {children}
    </button>
  )
}

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { value: current, baseId } = useTabsCtx('TabPanel')
  if (current !== value) return null
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className="mt-3 text-sm text-(--ui-ink-2) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-ring)"
    >
      {children}
    </div>
  )
}
