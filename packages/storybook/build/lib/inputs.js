"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
react_1.storiesOf('Input text fields', module)
    .add('Type: Text', () => (React.createElement(design_elements_react_1.TextInput, { id: "ta_firstname", label: "First Name", placeholder: "Ex.: John", type: "text", validMsg: 'Temporary Message' })))
    .add('Type: Email', () => (React.createElement(design_elements_react_1.TextInput, { id: "ta_email", label: "Email", placeholder: "Ex.: name@example.com", type: "email", validMsg: 'Temporary Message' })))
    .add('Type: Phone', () => (React.createElement(design_elements_react_1.TextInput, { id: "ta_phone", label: "Phone", placeholder: "Ex.: 555-555-5555", type: "tel", validMsg: 'Temporary Message' })))
    .add('Default value', () => (React.createElement(design_elements_react_1.TextInput, { defaultValue: "1234 Main Street", id: "ta_address", label: "Address", validMsg: 'Temporary Message' })))
    .add('Required', () => (React.createElement(design_elements_react_1.TextInput, { id: "ta_lastname", label: "Last Name (required)", placeholder: "Ex.: Doe", required: true, validMsg: 'Temporary Message' })))
    .add('Event callbacks', () => (React.createElement(design_elements_react_1.TextInput, { id: "ta_lastname", label: "See console for callbacks", onChange: (value) => console.log(`Custom function called on change. Current value: ${value}`), onBlur: (value) => console.log(`Custom function called on blur. Current value: ${value}`), onFocus: (value) => console.log(`Custom function called on focus. Current value: ${value}`), placeholder: "Ex.: Hello", required: true, validMsg: 'Temporary Message' })))
    .add('Pattern validation', () => (React.createElement(design_elements_react_1.TextInput, { id: "ta_phone", label: "Telephone", pattern: "[0-9]{3}-?[0-9]{3}-?[0-9]{4}", placeholder: "Ex.: 555-123-4567", type: "tel", validMsg: "Please enter a valid phone number" })))
    .add('Disabled', () => (React.createElement(design_elements_react_1.TextInput, { disabled: true, id: "ta_disabled", label: "A disabled text input", placeholder: "Sorry but this field is disabled", validMsg: 'Temporary Message' })));
//# sourceMappingURL=inputs.js.map