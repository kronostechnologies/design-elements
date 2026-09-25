# Architecture

Design Elements is not a single application: it is a library consumed by multiple
Equisoft products (product and service teams across the company). Because of this:

- The visual design (Figma) and the code implementation must stay in sync, but they
  are two distinct sources of truth maintained somewhat independently today.
- The public API of the `react` package (component props, exported types, theme
  customization contract) is a **contract with every consuming application**.
  Breaking that contract, or shipping an unflagged major visual change, has a
  multiplied cost across the company.

Understanding the architecture below is a prerequisite for the contributing
guidelines (props stability rules, PR checklist, what counts as a breaking change),
which builds directly on this document.

## Design source of truth

The visual design lives in Figma:
[Design System UI Library](https://www.figma.com/design/EIJItUlyeIymb2dfgeoQJp/Design-System-UI-Library).
Component specs, palette, and design tokens originate there. There is currently no automated sync between Figma and the
token/component code in this repository. Updates are applied manually by whoever implements or updates a component.

Rendered documentation of the implemented components is published via Storybook:
- [Snapshot](https://ds.equisoft.io/snapshot/) (`main` branch)
- [Latest](https://ds.equisoft.io/latest/) (latest release)

## Repository structure

Design Elements is a Yarn Berry workspaces monorepo (`packages/*`). Packages are
stand-alone but linked together for local development.

| Package | Role |
|---|---|
| `packages/react` | The React implementation of Design Elements. This is the primary delivery target and the focus of this document. |
| `packages/storybook` | Storybook documentation site: prop tables, usage examples, visual reference for every component. |
| `packages/kronos-crm-icons`, `packages/kronos-fna-icons` | Standalone, legacy generated icon packages published for /connect and /plan. Independent of `react`; slated to eventually be replaced by the design system's own icon set. |
| `packages/webapp` | Sample/host application used to validate the design system in a real app context. |

## `packages/react/src` layout

```
src/
├── components/   # One folder per component (implementation, styles, tests, stories)
├── hooks/        # Cross-component reusable behavior
├── themes/       # Token definitions + theme build pipeline (see Theming below)
├── styles/       # Global SCSS, font loading, style injection
├── i18n/         # i18next setup, translation resources, useTranslation
├── icons/        # Icon component + icon name registry
├── logos/        # Brand logo components
├── utils/        # Small shared utilities (uuid, dev console, etc.)
└── test-utils/   # Testing helpers
```

Each component folder typically contains: the component implementation (styled-
components definitions included (preferred), inline or in a separate file depending on the
component), `*.test.tsx` unit tests, and an `index.ts` re-exporting the public API.
Storybook stories and docs live in `packages/storybook/stories/` (`*.stories.tsx`
and/or `*.mdx`), not in the component folders.

## Providers

Every consuming application wraps its tree with the root `DesignSystem` component
(`components/design-system.tsx`), which composes all the necessary providers. 
The nesting order matters: `DeviceContextProvider` is outermost because the theming
layer needs to know the current device (mobile/tablet/desktop) to resolve
context-dependent tokens (see Theming below).

- **`DeviceContextProvider`** (`components/device-context-provider`): determines
  `device: 'desktop' | 'tablet' | 'mobile'` from viewport width (or a forced
  `staticDevice` for SSR/tests), and exposes it via `useDeviceContext()`.
- **`ThemeWrapper`** (`components/theme-wrapper`, internal): resolves the design tokens for the current
  device/customization into a concrete `ResolvedTheme` and provides it through styled-components' `ThemeProvider`. It
  also optionally mounts children in the Shadow DOM (`isolateStyles`) and injects global styles via `useStyle()`.
- **`IntlProvider`** (`components/internationalization-provider`, internal):
  configures i18next for the requested `language` (defaulting to `en-CA`) and exposes
  it through its own context, consumed by `useTranslation()`.
- **`ToastProvider`** (`components/toast`): holds global toast/notification state
  (add/remove/auto-dismiss after 10s) via a reducer, exposed through `useToast()`.

Components needing device, theme, translation, or toast information consume these
via hooks (`useDeviceContext`, `useTheme`, `useTranslation`, `useToast`) rather than
reaching into context directly.

## Theming & design tokens

Theming follows a three-layer token model (see
[ADR-001: Theme and tokens](adr/ADR-001-Theme_and_tokens.md) for the full rationale):

1. **`ref` tokens** (`themes/tokens/ref/`): raw values: color palette, text/typography
   attributes, utility values. These are the only values with no semantic meaning
   attached.
2. **`alias` tokens** (`themes/tokens/alias/`): semantic tokens (e.g. an
   "interaction color") that resolve to a `ref` token or another `alias` token. Alias
   tokens can be **contextual**: a token name suffixed with a context value (e.g.
   `:mobile`, `:tablet`, `:desktop`) overrides the base value when that context is
   active. Today the only context dimension is device type, but the mechanism isn't
   tied to that specifically: it's designed to support other context dimensions later
   (see below).
3. **`component` tokens** (`themes/tokens/component/`, one file per component, e.g.
   `button-tokens.ts`): resolve to an `alias` or `ref` token and are what components
   actually consume for styling.

The pipeline is implemented in `themes/build-theme.ts`, in three stages:

1. **Customization**: a partial `ThemeCustomization` (ref/alias/component overrides)
   is merged over the Equisoft defaults (`equisoftThemeCustomization`). Unknown or
   missing keys fall back to defaults; partial overrides are supported at every layer.
2. **Contextualization**: contextual alias tokens (`token:context-value`) are
   resolved against the active `TokenContext`, an ordered list of context values. The
   only context dimension implemented so far is device type
   (`'desktop' | 'tablet' | 'mobile'`, derived from `DeviceContextProvider`), but the
   type is meant to be extended with other dimensions in the future, e.g. display
   preferences like density, contrast, or motion, without changing how contextual
   tokens are declared or resolved.
3. **Resolution**: token references are fully resolved into concrete values,
   producing the final `ResolvedTheme` (`{ ref, alias, component }`) exposed to
   components.

Results are cached (`themeCache`) keyed by customization/context to avoid recomputing
the theme on every render.

Consumers:
- Pass a `ThemeCustomization` object to `DesignSystem`/`ThemeWrapper` to override
  palette, alias, or component tokens.
- Read the resolved theme in component code via `useTheme()` (wraps styled-components'
  `useContext(ThemeContext)`), returning a typed `ResolvedTheme`.

Only colors are customizable today; the model is designed to extend to other token
types later (see ADR-001 "Consequences").

## Component & props conventions

These conventions are observed across existing components (e.g. `Button` in
`components/buttons/button.tsx`) and should be treated as the baseline for new work:

- **Named, exported prop interfaces**: every component exports a `XxxProps`
  interface (e.g. `ButtonProps`) alongside the component itself, and reuses/exports
  any supporting union types (e.g. `ButtonType`, `Type`) so consumers can reference
  them.
- **Documented defaults**: optional props with a non-obvious default are annotated
  with a `@default` TSDoc tag (e.g. `@default primary`, `@default medium`); Storybook
  reads these to populate its prop tables.
- **Native-shaped event handlers**: event props use the corresponding React DOM
  handler types (`MouseEventHandler`, `FocusEventHandler`, `KeyboardEventHandler`,
  etc.) rather than custom callback shapes, so components behave predictably for
  consumers already familiar with native elements.
- **Controlled prop surface**: props are explicit, typed fields, not a generic
  `[key: string]: any` bag. The one deliberate exception is spreading the rest of
  `props` onto the root DOM node specifically to allow `aria-*`/`data-*` passthrough
  (documented inline with an eslint-disable comment), not arbitrary prop leakage.
- **Shared behavior through hooks**: cross-cutting concerns (device type,
  translations, ids, dropdown/list behavior, click-outside, etc.) are implemented once
  in `hooks/` and consumed by components, instead of being reimplemented per
  component.
- **Tokens over hardcoded values**: visual styling is built with styled-components
  against the resolved theme's `component` tokens. Components should not hardcode
  colors/spacing that already exist as tokens.

## Versioning & the cost of breaking changes

Because Design Elements is consumed by multiple downstream applications, changes to
its public API (component props, exported types, the `ThemeCustomization` shape) are
treated as a shared contract rather than an internal implementation detail. Public API
here means anything exported, directly or transitively, from `packages/react/src/index.ts`
(e.g. via `export * from './components'` or the `themes`/`hooks` re-exports). Code that
isn't reachable from that entry point is internal and isn't subject to these rules.

- Commits and PR titles follow the Conventional Commits format
  (`type(Component)!: description (DS-0000)`), enforced by CI
  (`.github/workflows/pr-title-lint.yml`). The `!` marker denotes a breaking change,
  driving semantic versioning and changelog generation
  (`.conventional-changelog.config.mjs`).
- **Breaking changes** include, but are not limited to: removing or renaming a prop,
  narrowing a prop's accepted type, adding a new required prop, or changing DOM
  structure/class names that consumers may depend on.
- **Major visual changes** (e.g. a redesign of a component's default appearance) are
  also to be flagged and versioned as breaking, even when the React prop API itself
  is unchanged, since consuming products may have taken visual dependencies (screenshots,
  visual regression tests, brand consistency requirements).
- The token/theme system's customization layer is itself part of the public API: a
  change to how `ThemeCustomization` is structured (as happened historically per
  ADR-001) is a breaking change on its own.

## Next steps

See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the practical contributing guide built
on this document: development setup, the per-change checklist, commit/PR conventions,
and the breaking-change decision checklist (props and major visual changes).
