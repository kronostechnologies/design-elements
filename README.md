# Design Elements
The Equisoft design system.

## Repository Structure
This project is setup as a monorepo containing multiple packages. While closely related, every package in the `/packages/` folder is stand-alone.

Packages meant for use within Equisoft apps are currently being published to [Equisoft's NPM repository](https://www.npmjs.com/settings/equisoft/packages).

Please visit each package's README for installation and usage details.


## Main Packages
To contribute to Design Elements or implement its components in your app, you will most likely have to get familiar with the following packages:

- `/react/`: [React](https://reactjs.org/) implementation of Design Elements. This is our first delivery target.
- `/web/` : Complementary [Sass](https://sass-lang.com/) snipets to be used alongside Design Elements components.  On the long term, our goal is for this folder to contain the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) implementation of Design Elements.
- `/storybook/`: This package contains the [Storybook](https://storybook.js.org/) documentation for Design Elements' React components. This includes props documentation and components implementation examples.


## Contribution Guidelines
Design Elements is an Equisoft inner source project. As such, we welcome and encourage contributions to it from both product and service teams.

### Types of contribution we welcome
Here are the ways you are invited to contribute:
- **Developing a new component**
- **Adding features to an existing component**
- **Bug fixing**

### Templates
We use issue and pull request templates to standardize the contribution process and improve communication in the repo.  When reporting a bug, requesting a feature or submitting a pull request, please take the time to fill all relevant fields.


## About the Team
This project is designed, coded and maintained by the interdisciplinary [Product Design Team](https://confluence.equisoft.com/display/PRODUCTDESIGN) based in Equisoft's Quebec City and Montreal offices.

Our work is supervised by [Pierre-Luc Paquin](mailto:pierre-luc.paquin@equisoft.com), Equisoft's Tech Lead, Front-End, to ensure that the project serves apps needs and aligns with Equisoft's global Front-End strategy. [Pierre-Luc](mailto:pierre-luc.paquin@equisoft.com) also acts as Product Owner for the design system initiative, so don't hesitate to [contact him](mailto:pierre-luc.paquin@equisoft.com) today to know what Design Elements can do for you. 👨‍⚕️‍
