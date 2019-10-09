# Design Elements
The Equisoft design system.

## Repository Structure
This repository is setup as a multipackage repository.  While related, every package in the `/packages/` folder is a separate project, with its own documentation and releases.

Packages that are meant to be used in Equisoft applications are published to [Equisoft's NPM repository](https://www.npmjs.com/settings/equisoft/packages).

Please visit each package's main page for installation and usage details.

## Main Packages
To contribute to the repo or implement the components in your app, you will most likely have to use the following packages:

- `/react/`: The [React](https://reactjs.org/) implementation of Design Elements.
- `/web/` : Global CSS files to be applied in tandem with the Design Elements components.  In the future, this repo might also contain the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) implementation of Design Elements.
- `/storybook/`: This package contains all of the [Storybook](https://storybook.js.org/) documentation for the React components of Design Elements.  This includes props documentation and components implementation examples.

## Contribution Guide
The design system is an inner source project within Equisoft.  As such, we welcome and encourage contributions to the repository from product and service teams.

### Types of contribution we welcome
There are a couple of ways you can contribute to the project:

- **Developing a new component**

- **Adding features to an existing component**

- **Bug fixing**


## About The Team
This project is designed and maintained by the interdisciplinary [Product Design Team](https://confluence.equisoft.com/display/PRODUCTDESIGN) based in Equisoft's Quebec City and Montreal offices.

We work in collaboration with the Tech Lead, Front-End ([Pierre-Luc Paquin](pierre-luc.paquin@equisoft.com)) to ensure that the project respects Equisoft's technological guidelines and integrates well with our suite of products.  Don't hesitate to contact him if you'd like to know if Design Elements is right for your project.