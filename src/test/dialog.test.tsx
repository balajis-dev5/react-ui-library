import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Button, Dialog, DialogClose, DialogContent, DialogTrigger } from '../lib'

function Fixture() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent title="Delete this report?" description="This cannot be undone.">
        <DialogClose>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('opens from the trigger with correct aria wiring', async () => {
    render(<Fixture />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAccessibleName('Delete this report?')
    expect(dialog).toHaveAccessibleDescription('This cannot be undone.')
  })

  it('closes on Escape and restores focus to the trigger', async () => {
    render(<Fixture />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(trigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('traps Tab inside the dialog', async () => {
    render(<Fixture />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    // Focusables inside: Close (X), Cancel, Delete. Tab from the last wraps to the first.
    const close = screen.getByRole('button', { name: 'Close dialog' })
    const del = screen.getByRole('button', { name: 'Delete' })
    del.focus()
    await userEvent.tab()
    expect(close).toHaveFocus()
    await userEvent.tab({ shift: true })
    expect(del).toHaveFocus()
  })
})
