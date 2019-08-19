"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@storybook/react");
var design_elements_react_1 = require("@equisoft/design-elements-react");
react_2.storiesOf('Progress', module)
    .add('Beginning', function () { return (react_1.default.createElement(design_elements_react_1.Progress, { max: 2, value: 0 })); })
    .add('Middle', function () { return (react_1.default.createElement(design_elements_react_1.Progress, { max: 2, value: 1 })); })
    .add('End', function () { return (react_1.default.createElement(design_elements_react_1.Progress, { max: 2, value: 2 })); });
//# sourceMappingURL=progress.js.map