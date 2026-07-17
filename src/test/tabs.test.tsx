import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tab, TabList, TabPanel, Tabs } from '../lib'

function Fixture() {
  return (
    <Tabs defaultValue="a">
      <TabList label="Views">
        <Tab value="a">Alpha</Tab>
        <Tab value="b">Beta</Tab>
        <Tab value="c">Gamma</Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
      <TabPanel value="c">Panel C</TabPanel>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('only the selected tab is in the tab order (roving tabindex)', () => {
    render(<Fixture />)
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('tabindex', '-1')
  })

  it('ArrowRight moves selection and shows the right panel; End jumps to the last tab', async () => {
    render(<Fixture />)
    screen.getByRole('tab', { name: 'Alpha' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel B')
    await userEvent.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel C')
  })

  it('wraps from the last tab to the first with ArrowRight', async () => {
    render(<Fixture />)
    const gamma = screen.getByRole('tab', { name: 'Gamma' })
    await userEvent.click(gamma)
    gamma.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true')
  })
})
