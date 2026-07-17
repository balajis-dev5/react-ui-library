# React UI Library

> **Status: 🚧 In development.** This repository currently holds the project's design documentation and roadmap. Source code is being built and published incrementally — watch the repo for releases.

> Typed, accessible React component library — the design system extracted from my dashboard and CRM projects.

![React 19](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![a11y](https://img.shields.io/badge/a11y-WAI--ARIA-6f42c1)
![License](https://img.shields.io/badge/license-MIT-green)

## Components (v1 scope — 16)

Button · IconButton · Input · Textarea · Select · Checkbox · Radio · Switch · Badge · Card · Dialog (focus-trapped) · Dropdown Menu · Tabs · Toast · Tooltip · DataTable (headless core + styled preset)

Every component ships with: typed props (no `any`), keyboard support, ARIA per WAI-ARIA Authoring Practices, dark-mode tokens, and a docs page with live examples.

## Design principles

1. **Accessibility is the feature.** Dialog traps focus and restores it on close; menus are arrow-key navigable; everything works without a mouse. This is the #1 thing that separates a "component library" from styled divs.
2. **Composition over configuration** — `<Dialog><DialogTrigger/><DialogContent/></Dialog>`, not a 30-prop monolith.
3. **Tokens, not hardcoded colors** — CSS variables for color/radius/spacing; theming = overriding variables.
4. **Controlled + uncontrolled** — every input supports both modes.

## Usage

```tsx
import { Button, Dialog, DialogContent, DialogTrigger } from '@balaji/ui'

<Dialog>
  <DialogTrigger asChild><Button>Delete report</Button></DialogTrigger>
  <DialogContent title="Are you sure?" description="This cannot be undone.">
    <Button variant="destructive">Delete</Button>
  </DialogContent>
</Dialog>
```

## Repo setup

```
packages/ui/        # the library (tsup build, ESM + types)
apps/docs/          # Vite docs site with live playground per component
```

```bash
npm install
npm run dev         # docs site
npm run test        # Vitest + Testing Library + jest-axe (a11y assertions)
npm run build       # tsup → dist (ESM, d.ts)
```

## Interview questions this repo answers

- How do you make a Dialog actually accessible? (focus trap, aria-modal, Escape, scroll lock, return focus)
- `forwardRef` + `asChild` pattern — why composition needs ref forwarding
- How do you publish a typed library? (tsup, exports map, peer deps on react)
- Testing a11y: jest-axe smoke tests + keyboard-interaction tests

## Roadmap

- [ ] v1.0 — 16 components + docs deployed
- [ ] v1.1 — Combobox, DatePicker (the two hardest — save for last deliberately)

MIT License
