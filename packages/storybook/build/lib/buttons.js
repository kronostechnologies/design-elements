"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@storybook/react");
var design_elements_react_1 = require("@equisoft/design-elements-react");
react_2.storiesOf('Buttons', module)
    .add('Primary', function () { return (react_1.default.createElement(design_elements_react_1.Button, { buttonType: "primary", onClick: function () { console.log('Button Clicked'); } }, "Primary Button")); })
    .add('Secondary', function () { return (react_1.default.createElement(design_elements_react_1.Button, { buttonType: "secondary", onClick: function () { console.log('Button Clicked'); } }, "Secondary Button")); })
    .add('Tertiary', function () { return (react_1.default.createElement(design_elements_react_1.Button, { buttonType: "tertiary", onClick: function () { console.log('Button Clicked'); } }, "Tertiary Button")); })
    .add('Disabled', function () { return (react_1.default.createElement(design_elements_react_1.Button, { disabled: true, buttonType: "primary", onClick: function () { console.log('Button Clicked'); } }, "Disabled Button")); })
    .add('Event callback', function () { return (react_1.default.createElement(design_elements_react_1.Button, { onClick: function () { console.log("The button has been clicked!"); }, buttonType: "primary" }, "See Console For Callback")); });
react_2.storiesOf('Buttons/Add', module)
    .add('Primary', function () { return (react_1.default.createElement(design_elements_react_1.AddButton, { buttonType: "primary", onClick: function () { console.log('Button Clicked'); } }, "Primary Button")); })
    .add('Secondary', function () { return (react_1.default.createElement(design_elements_react_1.AddButton, { buttonType: "secondary", onClick: function () { console.log('Button Clicked'); } }, "Secondary Button")); })
    .add('Tertiary', function () { return (react_1.default.createElement(design_elements_react_1.AddButton, { buttonType: "tertiary", onClick: function () { console.log('Button Clicked'); } }, "Tertiary Button")); });
//# sourceMappingURL=buttons.js.map