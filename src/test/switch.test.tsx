import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from '../lib'

describe('Switch', () => {
  it('toggles with the keyboard and reports the new value', async () => {
    const onChange = vi.fn()
    render(<Switch label="Auto-refresh" onChange={onChange} />)
    const sw = screen.getByRole('switch', { name: 'Auto-refresh' })
    expect(sw).toHaveAttribute('aria-checked', 'false')
    sw.focus()
    await userEvent.keyboard(' ')
    expect(onChange).toHaveBeenCalledWith(true)
    expect(sw).toHaveAttribute('aria-checked', 'true')
  })

  it('controlled mode follows the prop, not internal state', async () => {
    const onChange = vi.fn()
    render(<Switch label="Digest" checked={false} onChange={onChange} />)
    const sw = screen.getByRole('switch')
    await userEvent.click(sw)
    expect(onChange).toHaveBeenCalledWith(true)
    // Parent didn't update the prop, so the switch must still read unchecked.
    expect(sw).toHaveAttribute('aria-checked', 'false')
  })

  it('disabled switch ignores interaction', async () => {
    const onChange = vi.fn()
    render(<Switch label="Locked" disabled onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
