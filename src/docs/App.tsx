import { useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Input,
  RadioGroup,
  Select,
  Spinner,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  TBody,
  TD,
  Textarea,
  TH,
  THead,
  ToastProvider,
  Tooltip,
  TR,
  useToast,
} from '../lib'
import DemoBlock from './DemoBlock'

const SECTIONS = [
  'Button', 'Input', 'Textarea', 'Select', 'Checkbox & Radio', 'Switch', 'Badge',
  'Alert', 'Card', 'Dialog', 'Tabs', 'Toast', 'Tooltip', 'Table',
] as const

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-')

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const next = !dark
        document.documentElement.classList.toggle('dark', next)
        localStorage.setItem('ui-theme', next ? 'dark' : 'light')
        setDark(next)
      }}
    >
      {dark ? 'Light mode' : 'Dark mode'}
    </Button>
  )
}

function ToastDemo() {
  const { toast } = useToast()
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast({ title: 'Report saved', description: 'Revenue by region is in your library.' })}>
        Show toast
      </Button>
      <Button variant="outline" onClick={() => toast({ title: 'Export complete', tone: 'good' })}>
        Success toast
      </Button>
      <Button variant="outline" onClick={() => toast({ title: 'Export failed', description: 'The server did not respond.', tone: 'danger' })}>
        Error toast
      </Button>
    </div>
  )
}

export default function App() {
  const [switchOn, setSwitchOn] = useState(true)

  return (
    <ToastProvider>
      <div className="mx-auto flex max-w-5xl gap-8 px-4 py-8">
        <nav aria-label="Components" className="sticky top-8 hidden h-fit w-44 shrink-0 md:block">
          <p className="mb-2 text-xs font-semibold tracking-wide text-(--ui-ink-3) uppercase">Components</p>
          <ul className="space-y-0.5 border-l border-(--ui-line)">
            {SECTIONS.map((s) => (
              <li key={s}>
                <a href={`#${slug(s)}`} className="block border-l-2 border-transparent px-3 py-1 text-sm text-(--ui-ink-2) hover:border-(--ui-accent) hover:text-(--ui-ink)">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1 space-y-10">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-(--ui-ink)">@balaji/ui</h1>
              <p className="mt-1 max-w-xl text-sm text-(--ui-ink-2)">
                Typed, accessible React 19 components — zero runtime dependencies, themed with CSS variables. Every
                interactive example below works with a keyboard alone; try Tab, arrows and Escape.
              </p>
              <div className="mt-2 flex gap-2">
                <Badge tone="accent">v1.0</Badge>
                <Badge>14 components</Badge>
                <Badge tone="good">keyboard-tested</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <Button variant="secondary" size="sm" onClick={() => window.open('https://github.com/balajis-dev5/react-ui-library', '_blank')}>
                GitHub
              </Button>
            </div>
          </header>

          <DemoBlock
            id="button"
            title="Button"
            note="Five variants, three sizes, and a loading state that keeps the label visible so the width never jumps."
            code={`<Button>Save changes</Button>
<Button variant="secondary">Duplicate</Button>
<Button variant="outline">Export</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button loading>Saving…</Button>`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Button>Save changes</Button>
              <Button variant="secondary">Duplicate</Button>
              <Button variant="outline">Export</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="destructive">Delete</Button>
              <Button loading>Saving…</Button>
            </div>
          </DemoBlock>

          <DemoBlock
            id="input"
            title="Input"
            note="Label, hint and error are wired with aria-describedby; the error state sets aria-invalid."
            code={`<Input label="Workspace name" hint="Shown in the sidebar." />
<Input label="Email" type="email" error="Enter a valid email address." />`}
          >
            <div className="grid max-w-md gap-4">
              <Input label="Workspace name" hint="Shown in the sidebar." placeholder="Acme Inc." />
              <Input label="Email" type="email" defaultValue="not-an-email" error="Enter a valid email address." />
            </div>
          </DemoBlock>

          <DemoBlock id="textarea" title="Textarea" code={`<Textarea label="Description" hint="Markdown supported." />`}>
            <div className="max-w-md">
              <Textarea label="Description" hint="Markdown supported." placeholder="What is this report about?" />
            </div>
          </DemoBlock>

          <DemoBlock id="select" title="Select" code={`<Select label="Role">
  <option>Admin</option>
  <option>Editor</option>
  <option>Viewer</option>
</Select>`}>
            <div className="max-w-md">
              <Select label="Role" defaultValue="Editor">
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </Select>
            </div>
          </DemoBlock>

          <DemoBlock
            id="checkbox-radio"
            title="Checkbox & Radio"
            code={`<Checkbox label="Email me on failures" hint="Only for scheduled reports." />
<RadioGroup label="Export format" name="fmt" defaultValue="xlsx"
  options={[{ value: 'csv', label: 'CSV' }, { value: 'xlsx', label: 'Excel' }, { value: 'pdf', label: 'PDF' }]} />`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-3">
                <Checkbox label="Email me on failures" hint="Only for scheduled reports." defaultChecked />
                <Checkbox label="Include archived rows" />
              </div>
              <RadioGroup
                label="Export format"
                name="fmt"
                defaultValue="xlsx"
                options={[
                  { value: 'csv', label: 'CSV' },
                  { value: 'xlsx', label: 'Excel' },
                  { value: 'pdf', label: 'PDF' },
                ]}
              />
            </div>
          </DemoBlock>

          <DemoBlock
            id="switch"
            title="Switch"
            note="A real button with role=switch — toggles with Space/Enter, works controlled or uncontrolled."
            code={`<Switch label="Auto-refresh" checked={on} onChange={setOn} />`}
          >
            <div className="flex flex-col gap-3">
              <Switch label={`Auto-refresh is ${switchOn ? 'on' : 'off'}`} checked={switchOn} onChange={setSwitchOn} />
              <Switch label="Weekly digest (uncontrolled)" defaultChecked />
              <Switch label="Disabled option" disabled />
            </div>
          </DemoBlock>

          <DemoBlock id="badge" title="Badge" code={`<Badge>Draft</Badge>
<Badge tone="accent">New</Badge>
<Badge tone="good">Active</Badge>
<Badge tone="warn">Pending</Badge>
<Badge tone="danger">Failed</Badge>`}>
            <div className="flex flex-wrap gap-2">
              <Badge>Draft</Badge>
              <Badge tone="accent">New</Badge>
              <Badge tone="good">Active</Badge>
              <Badge tone="warn">Pending</Badge>
              <Badge tone="danger">Failed</Badge>
            </div>
          </DemoBlock>

          <DemoBlock id="alert" title="Alert" code={`<Alert tone="good" title="Backup complete">42 reports exported.</Alert>
<Alert tone="danger" title="Connection lost">Retrying in 5 seconds…</Alert>`}>
            <div className="grid gap-3">
              <Alert title="Heads up">Scheduled maintenance on Sunday, 02:00–03:00 IST.</Alert>
              <Alert tone="good" title="Backup complete">42 reports exported to S3.</Alert>
              <Alert tone="warn" title="Storage at 85%">Consider archiving old exports.</Alert>
              <Alert tone="danger" title="Connection lost">Retrying in 5 seconds…</Alert>
            </div>
          </DemoBlock>

          <DemoBlock id="card" title="Card" code={`<Card>
  <CardHeader>
    <CardTitle>Monthly revenue</CardTitle>
    <CardDescription>July 2026</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>`}>
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Monthly revenue</CardTitle>
                <CardDescription>July 2026 · all regions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">$304,000</p>
                <p className="mt-1 text-xs text-(--ui-good)">+5.2% vs last month</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">View report</Button>
              </CardFooter>
            </Card>
          </DemoBlock>

          <DemoBlock
            id="dialog"
            title="Dialog"
            note="Focus is trapped while open, Escape closes, and focus returns to the trigger — try it with the keyboard."
            code={`<Dialog>
  <DialogTrigger><Button variant="destructive">Delete report</Button></DialogTrigger>
  <DialogContent title="Delete this report?" description="This cannot be undone.">
    <div className="flex justify-end gap-2 pt-2">
      <DialogClose><Button variant="ghost">Cancel</Button></DialogClose>
      <DialogClose><Button variant="destructive">Delete</Button></DialogClose>
    </div>
  </DialogContent>
</Dialog>`}
          >
            <Dialog>
              <DialogTrigger>
                <Button variant="destructive">Delete report</Button>
              </DialogTrigger>
              <DialogContent title="Delete this report?" description="“Revenue by region” will be removed for everyone. This cannot be undone.">
                <div className="flex justify-end gap-2 pt-2">
                  <DialogClose>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <DialogClose>
                    <Button variant="destructive">Delete</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </DemoBlock>

          <DemoBlock
            id="tabs"
            title="Tabs"
            note="Roving tabindex per WAI-ARIA: Arrow keys move between tabs, Home/End jump to the ends."
            code={`<Tabs defaultValue="preview">
  <TabList label="Report views">
    <Tab value="preview">Preview</Tab>
    <Tab value="sql">SQL</Tab>
    <Tab value="schedule">Schedule</Tab>
  </TabList>
  <TabPanel value="preview">…</TabPanel>
</Tabs>`}
          >
            <Tabs defaultValue="preview">
              <TabList label="Report views">
                <Tab value="preview">Preview</Tab>
                <Tab value="sql">SQL</Tab>
                <Tab value="schedule">Schedule</Tab>
              </TabList>
              <TabPanel value="preview">The rendered report table with live data.</TabPanel>
              <TabPanel value="sql">The compiled, parameterized SQL for this report.</TabPanel>
              <TabPanel value="schedule">Email delivery: every Monday at 08:00.</TabPanel>
            </Tabs>
          </DemoBlock>

          <DemoBlock
            id="toast"
            title="Toast"
            note="Announced via an aria-live region; auto-dismisses after 4s or on the close button."
            code={`const { toast } = useToast()
toast({ title: 'Export complete', tone: 'good' })`}
          >
            <ToastDemo />
          </DemoBlock>

          <DemoBlock
            id="tooltip"
            title="Tooltip"
            note="Appears on hover and on keyboard focus; Escape dismisses it (WCAG 1.4.13)."
            code={`<Tooltip content="Sums the visible rows only">
  <Button variant="outline">Column total</Button>
</Tooltip>`}
          >
            <div className="flex items-center gap-6">
              <Tooltip content="Sums the visible rows only">
                <Button variant="outline">Column total</Button>
              </Tooltip>
              <Tooltip content="Loading is in progress">
                <span tabIndex={0} className="rounded p-1 focus-visible:ring-2 focus-visible:ring-(--ui-ring)">
                  <Spinner />
                </span>
              </Tooltip>
            </div>
          </DemoBlock>

          <DemoBlock id="table" title="Table" code={`<Table>
  <THead><TR><TH>Report</TH><TH>Owner</TH><TH>Status</TH></TR></THead>
  <TBody><TR><TD>Revenue by region</TD><TD>Balaji</TD><TD><Badge tone="good">Active</Badge></TD></TR></TBody>
</Table>`}>
            <Table>
              <THead>
                <TR>
                  <TH>Report</TH>
                  <TH>Owner</TH>
                  <TH>Last run</TH>
                  <TH>Status</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD>Revenue by region</TD>
                  <TD>Balaji</TD>
                  <TD>Today, 08:00</TD>
                  <TD><Badge tone="good">Active</Badge></TD>
                </TR>
                <TR>
                  <TD>Churn cohort analysis</TD>
                  <TD>Priya</TD>
                  <TD>Yesterday</TD>
                  <TD><Badge tone="warn">Pending</Badge></TD>
                </TR>
                <TR>
                  <TD>Failed payments</TD>
                  <TD>Dev</TD>
                  <TD>Jul 12</TD>
                  <TD><Badge tone="danger">Failed</Badge></TD>
                </TR>
              </TBody>
            </Table>
          </DemoBlock>

          <footer className="border-t border-(--ui-line) pt-4 pb-8 text-xs text-(--ui-ink-3)">
            MIT © Balaji S · <a className="text-(--ui-accent) hover:underline" href="https://github.com/balajis-dev5/react-ui-library">Source on GitHub</a>
          </footer>
        </main>
      </div>
    </ToastProvider>
  )
}
