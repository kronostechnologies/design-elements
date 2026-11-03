---
applyTo: "packages/react/src/**/*.test.ts,packages/react/src/**/*.test.tsx,packages/react/test/**,packages/react/src/test-utils/**"
---

This project uses Jest.

Group blocks within a test closure into given-when-then structure, separated with an
empty line (without comments).

For React component tests, use `@testing-library/react` (RTL):
- Use method `renderWithProviders` instead of `render`.
- Use `it` for test closures.
- Use `screen` for queries.
- Use `userEvent` for user interactions.

For React hooks tests, use hook testing from `@testing-library/react` (RTL).
