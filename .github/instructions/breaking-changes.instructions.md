---
applyTo: "packages/react/src/components/**/*.ts,packages/react/src/components/**/*.tsx,packages/react/src/themes/**/*.ts,packages/react/src/hooks/**/*.ts,packages/react/src/styles/**/*.ts,packages/react/src/styles/**/*.scss,packages/react/src/styled-components-theme.ts"
---

Design Elements' `react` package is consumed by multiple downstream products, so its
public API is a shared contract. **Only elements reachable (recursively) from
`packages/react/src/index.ts` exports are public API**. Anything not exported from
there (directly or transitively) is internal and not subject to breaking-change rules,
even if its file lives under `components/`, `themes/`, or `hooks/`. See
`docs/architecture.md` and `CONTRIBUTING.md` for the full breaking-change checklist
and rationale.

Note on `hooks/`: this directory is watched in full because it's cheap to check, but
most hooks in it are internal implementation details used by components and
are **not** exported from `packages/react/src/index.ts`. Only hooks actually
re-exported there are public API. Always verify against
`packages/react/src/index.ts` rather than assuming every file under `hooks/` is
public.

When implementing a change or reviewing a pull request, first confirm the affected
prop/type/token is actually reachable from `packages/react/src/index.ts`. If it is,
treat the following as breaking:
- Removing, renaming, or narrowing the type of a component prop.
- Adding a new required prop to an existing component.
- Changing DOM structure, class names, or other output consumers may depend on.
- Changing the shape of `ThemeCustomization` (ref/alias/component token overrides).
- A major visual change to a component's default appearance, even with no prop/type
  change.

Note: if a component is exported from `packages/react/src/index.ts`, its `Props`
interface should also be exported there so consumers can type their own
wrappers/usages. This is not itself a breaking change, but flag it as a gap when
you notice it.

If you identify one of the above:
- In code review comments, flag it explicitly as `Severity: High - Breaking change`
  with a short explanation of what breaks and for whom.
- When authoring a change yourself, confirm the PR title includes `!` after the
  component scope (e.g. `feat(Button)!: ...`) and that the PR description includes a
  migration note (old behavior → new behavior).
- Prefer non-breaking alternatives when they exist (new optional prop, `@deprecated`
  transition period) over changing existing behavior.
