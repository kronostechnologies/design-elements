# Contributing to Design Elements

Design Elements is an Equisoft inner-source project: contributions from product teams are welcome. Because the `react`
package is consumed by multiple downstream products, this guide puts extra weight on keeping its public API stable, and
on flagging clearly when it isn't.

## Before you start

- Read [`docs/architecture.md`](docs/architecture.md) first. It covers the monorepo
  layout, the providers, the token/theming pipeline, and the props conventions this
  guide builds on.
- The visual design source of truth is the
  [Design System UI Library in Figma](https://www.figma.com/design/EIJItUlyeIymb2dfgeoQJp/Design-System-UI-Library?m=dev).
  New components or visual changes should be reflected there (or already exist there)
  before you implement them.
- For development setup (installing dependencies, running the dev servers, building
  for production), see [`README.md`](README.md#quick-start).
- Code owners for this repository are `@kronostechnologies/design-system-core`.

## Making a change - checklist

When adding or modifying a component under `packages/react/src/components/<name>/`:

- [ ] Follow the props conventions from `docs/architecture.md`: an exported
      `XxxProps` interface, `forwardRef` for DOM ref access, `@default` TSDoc tags on
      optional props with non-obvious defaults, native React event handler types
      (`MouseEventHandler`, etc.), and reuse of existing hooks (`useDeviceContext`,
      `useTranslation`, ...) instead of duplicating logic.
- [ ] Style through design tokens, not hardcoded values. Add or update the relevant
      file under `packages/react/src/themes/tokens/component/` rather than inlining
      colors or spacing that should come from the theme.
- [ ] Add or update unit tests colocated as `*.test.tsx`, using Jest and
      `@testing-library/react`: `renderWithProviders` (not `render`), `screen` for
      queries, `userEvent` for interactions, `it` for test closures, and
      given-when-then blocks separated by a blank line (no comments).
- [ ] Add or update the Storybook story and/or docs page in
      `packages/storybook/stories/` (`*.stories.tsx` and/or `*.mdx`) so new props or
      behavior are documented and discoverable. Storybook's `addon-a11y` runs
      automated accessibility checks against your story.
- [ ] Update the package README only if usage instructions materially change.

## Linting, type-checking & tests

Run these from `packages/react` (equivalent scripts exist in `packages/storybook`):

```bash
yarn lint     # eslint + stylelint
yarn test     # TypeScript type-check (tsc) + Jest
```

CI (`.github/workflows/react.yml`) runs the same checks, plus a production build and
docgen compile, on every pull request.

## Commit & pull request conventions

- Commit messages and PR titles follow
  [Conventional Commits](https://www.conventionalcommits.org/), using the types from
  `.conventional-changelog.config.mjs`: `feat`, `fix`, `deps`, `docs`, `chore`,
  `style`, `refactor`, `perf`, `test`, `ci`.
- PR titles are linted in CI and must match `type(scope): description (DS-0000)`:
  - `type`: one of the allowed prefixes above.
  - `(scope)`: the component or area affected.
  - `!`: optional; **required whenever the change is breaking** (see below). Put it
    immediately after the scope, e.g. `feat(Button)!: ...`.
  - `DS-0000`: the related ticket.
- Use the pull request template: describe what changed and why, state explicitly
  whether the change is breaking, link the ticket, and include any relevant
  screenshots.
- Every pull request also gets a live Storybook preview once CI succeeds, at
  `https://ds.equisoft.io/pr-<number>/`. CI posts the link as a PR comment so you can
  review and share visual changes.

## Breaking changes

Every change to the `react` package's public API is a contract with every consuming
application, so treat the following as **breaking**, and mark them with `!` in the
commit/PR title:

> **What counts as "public API"?** Only what's exported (directly or transitively)
> from `packages/react/src/index.ts`. An internal helper component, an unexported
> prop, an internal-only token: none of that is public, so none of it is subject to
> these rules.

- Removing, renaming, or narrowing the type of a component prop.
- Adding a new **required** prop to an existing component.
- Changing DOM structure, class names, or other output that consumers may reasonably
  depend on.
- Changing the shape of `ThemeCustomization` (the ref/alias/component override
  contract): see `docs/architecture.md` and
  [ADR-001](docs/adr/ADR-001-Theme_and_tokens.md).
- **Major visual changes** to a component's default appearance (a redesign, say),
  even with no prop or type change. Consuming products may depend on the current
  look, including the space a component takes up.

When a change is breaking:

- Put `!` right after the component scope in the commit/PR title, and describe the
  migration (old behavior → new behavior) in the PR description.
- Attach before/after screenshots for any visual change.
- Call it out for extra attention during review. The multi-consumer impact is the
  whole point.

Prefer a non-breaking path when one exists:

- Add a new optional prop with a backward-compatible default instead of changing an
  existing prop's behavior.
- Mark a prop `@deprecated` (with a TSDoc note pointing to its replacement) for a
  transition period before removing it in a later breaking change.

## Review & release process

- Every PR needs review/approval from `@kronostechnologies/design-system-core`
  (enforced via `CODEOWNERS`).
- Merging to `master` runs the full CI pipeline (build, docgen, eslint, stylelint,
  tests), and tagged releases publish the `react` package to the
  [NPM repository](https://www.npmjs.com/package/@equisoft/design-elements-react).
- The changelog is generated from conventional commits.
