import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button, ToastProvider, useToast } from '../lib'

function Fixture() {
  const { toast } = useToast()
  return <Button onClick={() => toast({ title: 'Export complete', duration: 3000 })}>Notify</Button>
}

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows in an aria-live region and auto-dismisses after its duration', () => {
    vi.useFakeTimers()
    render(
      <ToastProvider>
        <Fixture />
      </ToastProvider>,
    )
    // Click synchronously — userEvent's async delays don't mix with fake timers.
    act(() => {
      screen.getByRole('button', { name: 'Notify' }).click()
    })
    expect(screen.getByText('Export complete')).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(3100)
    })
    expect(screen.queryByText('Export complete')).not.toBeInTheDocument()
  })

  it('dismisses from the close button', async () => {
    render(
      <ToastProvider>
        <Fixture />
      </ToastProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Notify' }))
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }))
    expect(screen.queryByText('Export complete')).not.toBeInTheDocument()
  })
})
