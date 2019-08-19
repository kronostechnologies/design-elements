"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@storybook/react");
var design_elements_react_1 = require("@equisoft/design-elements-react");
react_2.storiesOf('Input text fields', module)
    .add('Type: Text', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { id: "ta_firstname", label: "First Name", placeholder: "Ex.: John", type: "text", validMsg: 'Temporary Message' })); })
    .add('Type: Email', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { id: "ta_email", label: "Email", placeholder: "Ex.: name@example.com", type: "email", validMsg: 'Temporary Message' })); })
    .add('Type: Phone', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { id: "ta_phone", label: "Phone", placeholder: "Ex.: 555-555-5555", type: "tel", validMsg: 'Temporary Message' })); })
    .add('Default value', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { defaultValue: "1234 Main Street", id: "ta_address", label: "Address", validMsg: 'Temporary Message' })); })
    .add('Required', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { id: "ta_lastname", label: "Last Name (required)", placeholder: "Ex.: Doe", required: true, validMsg: 'Temporary Message' })); })
    .add('Event callbacks', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { id: "ta_lastname", label: "See console for callbacks", onChange: function (value) { return console.log("Custom function called on change. Current value: " + value); }, onBlur: function (value) { return console.log("Custom function called on blur. Current value: " + value); }, onFocus: function (value) { return console.log("Custom function called on focus. Current value: " + value); }, placeholder: "Ex.: Hello", required: true, validMsg: 'Temporary Message' })); })
    .add('Pattern validation', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { id: "ta_phone", label: "Telephone", pattern: "[0-9]{3}-?[0-9]{3}-?[0-9]{4}", placeholder: "Ex.: 555-123-4567", type: "tel", validMsg: "Please enter a valid phone number" })); })
    .add('Disabled', function () { return (react_1.default.createElement(design_elements_react_1.TextInput, { disabled: true, id: "ta_disabled", label: "A disabled text input", placeholder: "Sorry but this field is disabled", validMsg: 'Temporary Message' })); });
//# sourceMappingURL=inputs.js.map