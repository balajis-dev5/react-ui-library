# @balaji/ui — React UI Library

> Typed, accessible React 19 component library — zero runtime dependencies, themed entirely with CSS variables. The design system behind my dashboard and CRM projects.

**Live docs:** https://balajis-dev5.github.io/react-ui-library/ — every example is interactive; try it with the keyboard alone.

![React 19](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![a11y](https://img.shields.io/badge/a11y-WAI--ARIA-6f42c1)
![License](https://img.shields.io/badge/license-MIT-green)

## Components (14)

Button · Spinner · Input · Textarea · Select · Checkbox · RadioGroup · Switch · Badge · Alert · Card · Dialog · Tabs · Toast · Tooltip · Table

Every component ships with typed props (no `any`), keyboard support, and ARIA wiring per the WAI-ARIA Authoring Practices. The interactive ones have Vitest + Testing Library specs asserting the keyboard behavior — not just "it renders".

## What "accessible" concretely means here

- **Dialog** — composition API (`<Dialog><DialogTrigger>…<DialogContent>`), focus moves in on open, Tab is trapped and wraps, Escape closes, focus returns to the trigger, body scroll locks. All of it covered by tests.
- **Tabs** — roving tabindex: only the active tab is tabbable; ArrowLeft/Right move and wrap, Home/End jump.
- **Switch** — a real `role="switch"` button (not a styled checkbox), Space/Enter toggle, controlled + uncontrolled.
- **Toast** — rendered into an `aria-live` region so screen readers announce without focus theft.
- **Inputs** — label/hint/error share one `aria-describedby` + `aria-invalid` wiring via a `FieldShell` primitive.
- **Tooltip** — shows on focus (not only hover) and dismisses on Escape, per WCAG 1.4.13.

## Design principles

1. **Accessibility is the feature.** It's what separates a component library from styled divs.
2. **Composition over configuration** — `Dialog`/`Card`/`Tabs` are compound components, not 30-prop monoliths.
3. **Tokens, not hardcoded colors** — every color/radius flows through `--ui-*` CSS variables; theming (incl. dark mode) is overriding variables.
4. **Controlled + uncontrolled** — every stateful component supports both modes.
5. **Zero dependencies** — the library is React only; even icons are inline SVG.

## Usage

```tsx
import { Button, Dialog, DialogClose, DialogContent, DialogTrigger } from '@balaji/ui'

<Dialog>
  <DialogTrigger><Button variant="destructive">Delete report</Button></DialogTrigger>
  <DialogContent title="Delete this report?" description="This cannot be undone.">
    <DialogClose><Button variant="ghost">Cancel</Button></DialogClose>
    <DialogClose><Button variant="destructive">Delete</Button></DialogClose>
  </DialogContent>
</Dialog>
```

## Development

```bash
npm install
npm run dev        # docs site with live examples
npm run test       # Vitest + Testing Library (keyboard/aria specs)
npm run build      # type-check + docs build
```

```
src/
├── lib/        # the library — components + tokens.css, exported from index.ts
├── docs/       # the docs site you see on GitHub Pages
└── test/       # behavior specs for the interactive components
```

## Interview questions this repo answers

- How do you make a Dialog actually accessible? (focus trap, aria-modal, Escape, scroll lock, return focus — see `dialog.tsx` + `dialog.test.tsx`)
- What is a roving tabindex and why do Tabs need it? (`tabs.tsx`)
- How do you test keyboard interaction without a browser? (Testing Library + user-event; fake timers for the toast auto-dismiss)
- How does controlled/uncontrolled duality work? (`switch.tsx` — one component, both modes)

## Roadmap

- [x] v1.0 — 14 components, tested, docs deployed
- [ ] v1.1 — DropdownMenu + Combobox (the two hardest — saved for last deliberately)

MIT License
