"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@storybook/react");
var design_elements_react_1 = require("@equisoft/design-elements-react");
react_2.storiesOf('Checkboxes', module)
    .add('Normal', function () { return (react_1.default.createElement(design_elements_react_1.Checkbox, { onChange: function () { console.log('Change event toggled'); } })); })
    .add('Checked by default', function () { return (react_1.default.createElement(design_elements_react_1.Checkbox, { defaultChecked: true, onChange: function () { console.log('Change event toggled'); } })); })
    .add('Event callback', function () { return (react_1.default.createElement(design_elements_react_1.Checkbox, { onChange: function (checked) { return console.log("Checkbox is " + (checked ? 'checked' : 'unchecked') + "!"); } })); });
//# sourceMappingURL=checkbox.js.map