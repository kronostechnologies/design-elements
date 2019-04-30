# Storybook

This [Storybook](https://storybook.js.org) currently documents the [React](../react) implementation of Equisoft's Design Elements.

## Getting started

To run this Storybook, all you need to do is install the package's dependencies and run `start`:

```
cd design-elements/packages/storybook
yarn
yarn start
```
or
```
cd design-elements/packages/storybook
npm install
npm run start
```

## Working with local components

If you wish to load components from your local version of `@equisoft/design-elements-react` instead of loading them from a published version, you need to follow these two steps:

1. From `design-elements/packages/react`, run: `yarn link`
2. From `design-elements/packages/storybook`, run: `yarn link @equisoft/design-elements-react`
