# Design Elements Storybook

This [Storybook](https://storybook.js.org) currently documents the [React](../react) implementation of Equisoft's Design Elements.

## Getting started

To run this Storybook, all you need to do is install the package's dependencies and run the `start` script:

```
cd design-elements/packages/storybook
yarn
yarn start
```

Storybook should then open automatically in your browser.

## Developing with local components

If you wish to work with components from your local version of `@equisoft/design-elements-react` instead of loading them from an [npm published version](https://www.npmjs.com/package/@equisoft/design-elements-react), you need to follow these two steps:

```
cd design-elements/packages/react
yarn link

cd design-elements/packages/storybook
yarn link @equisoft/design-elements-react
```
