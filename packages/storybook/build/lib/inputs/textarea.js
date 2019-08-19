"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
react_1.storiesOf('TextArea', module)
    .add('Normal', () => (React.createElement(design_elements_react_1.TextArea, { id: "ta_normal", label: "Text area label", validMsg: 'Temporary Message' })))
    .add('Event callbacks (see console)', () => (React.createElement(design_elements_react_1.TextArea, { id: "ta_callbacks", label: "Text area label", onChange: (value) => console.log(`Custom function called on change. Current value: ${value}`), onBlur: (value) => console.log(`Custom function called on blur. Current value: ${value}`), onFocus: (value) => console.log(`Custom function called on focus. Current value: ${value}`), validMsg: 'Temporary Message' })))
    .add('Required', () => (React.createElement(design_elements_react_1.TextArea, { id: "ta_required", label: "Text area label", validMsg: 'Temporary Message', required: true })))
    .add('Default Value', () => (React.createElement(design_elements_react_1.TextArea, { defaultValue: "Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.", id: "ta_filled", label: "A label for a filled text area", validMsg: 'Temporary Message', required: true })))
    .add('Disabled', () => (React.createElement(design_elements_react_1.TextArea, { disabled: true, id: "ta_disabled", label: "A label for the disabled text area", validMsg: 'Temporary Message', required: true })));
//# sourceMappingURL=textarea.js.map