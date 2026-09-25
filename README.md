# Design Elements
The Equisoft design system.

## Storybook and documentation
- [Snapshot](https://ds.equisoft.io/snapshot/) (main branch)
- [Latest](https://ds.equisoft.io/latest/) (latest release)

## Repository Structure
This project is setup as a monorepo containing multiple packages. While closely related, every package in the `/packages/` folder is stand-alone.

Packages meant for use within Equisoft apps are currently being published to [Equisoft's NPM repository](https://www.npmjs.com/settings/equisoft/packages).

Please visit each package's README for installation and usage details.


## Main Packages
To contribute to Design Elements or implement its components in your app, you will most likely have to get familiar with the following packages:

- `/react/`: [React](https://reactjs.org/) implementation of Design Elements. This is our first delivery target.
- `/storybook/`: This package contains the [Storybook](https://storybook.js.org/) documentation for Design Elements' React components. This includes props documentation and components implementation examples.

### Quick start

**Prerequisites**:
- Node.js `24.21.0` (see `.tool-versions`, used by [asdf](https://asdf-vm.com/))

**Note to Windows users**: If you have `make` installed, you can run it with `make -f Makefile` instead of `make`. If it doesn't work, your best bet is to look at the Makefile and run the commands separately

All the packages are linked together using Yarn Berry.

```bash
# Install dependencies for all workspaces (run once, and again after pulling changes to yarn.lock)
yarn
```

```bash
# Running stuff for dev, usually 1 per terminal. Watches files and rebuilds as needed.
make react      # Builds packages/react in watch mode
make storybook  # Starts the Storybook dev server at http://localhost:6006
```

```bash
# Building for production
make build_react
make build_storybook
```

## Contribution Guidelines
Design Elements is an Equisoft inner source project. As such, we welcome and encourage contributions to it from both product and service teams.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full guide: architecture background, the per-change checklist, and, since this package is consumed by multiple products, how to identify and flag breaking changes (props and major visual changes). For development setup, see the [Quick start](#quick-start) section above.

## About the Team
This project is designed, coded and maintained by the interdisciplinary [Product Design Team](https://confluence.equisoft.com/display/PRODUCTDESIGN) based in Equisoft's Quebec City and Montreal offices.
