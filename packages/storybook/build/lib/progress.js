"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
react_1.storiesOf('Progress', module)
    .add('Beginning', () => (React.createElement(design_elements_react_1.Progress, { max: 2, value: 0 })))
    .add('Middle', () => (React.createElement(design_elements_react_1.Progress, { max: 2, value: 1 })))
    .add('End', () => (React.createElement(design_elements_react_1.Progress, { max: 2, value: 2 })));
//# sourceMappingURL=progress.js.map