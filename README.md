# Design Elements
The Equisoft design system.

## Repository Structure
This project is setup as a monorepo containing multiple packages. While closely related, every package in the `/packages/` folder is stand-alone.

Packages meant for use within Equisoft apps are currently being published to [Equisoft's NPM repository](https://www.npmjs.com/settings/equisoft/packages).

Please visit each package's README for installation and usage details.


## Main Packages
To contribute to Design Elements or implement its components in your app, you will most likely have to get familiar with the following packages:

- `/react/`: [React](https://reactjs.org/) implementation of Design Elements. This is our first delivery target.
- `/storybook/`: This package contains the [Storybook](https://storybook.js.org/) documentation for Design Elements' React components. This includes props documentation and components implementation examples.

### Quick start

TL;DR: Run `make build_all` to begin.

All the packages are linked together using yarn. This is messy, and it breaks often. When in doubt, run `make build_all` to reset (also, run it the first time you open the project). To understand how this all works, open the _Makefile_, duh.

Other commands:

```bash
# Running stuff for dev, usually 1 per terminal. Watches files and rebuilds as needed.
make react
make storybook
```

```bash
# Building for production
make build_react
make build_storybook
make build_all # runs all 2 above in the right order
```

## Contribution Guidelines
Design Elements is an Equisoft inner source project. As such, we welcome and encourage contributions to it from both product and service teams.

### Types of contribution we welcome
Here are the ways you are invited to contribute:
- **Developing a new component**
- **Adding features to an existing component**
- **Bug fixing**

### Templates
We use issue and pull request templates to standardize the contribution process and improve communication in the repository.

When reporting a bug, requesting a feature or submitting a pull request, **please take the time to fill all relevant fields**.

## About the Team
This project is designed, coded and maintained by the interdisciplinary [Product Design Team](https://confluence.equisoft.com/display/PRODUCTDESIGN) based in Equisoft's Quebec City and Montreal offices.
