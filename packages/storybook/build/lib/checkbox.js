"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
react_1.storiesOf('Checkboxes', module)
    .add('Normal', () => (React.createElement(design_elements_react_1.Checkbox, { onChange: () => { console.log('Change event toggled'); } })))
    .add('Checked by default', () => (React.createElement(design_elements_react_1.Checkbox, { defaultChecked: true, onChange: () => { console.log('Change event toggled'); } })))
    .add('Event callback', () => (React.createElement(design_elements_react_1.Checkbox, { onChange: (checked) => console.log(`Checkbox is ${checked ? 'checked' : 'unchecked'}!`) })));
//# sourceMappingURL=checkbox.js.map