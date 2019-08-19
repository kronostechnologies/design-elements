"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
react_1.storiesOf('Buttons', module)
    .add('Primary', () => (React.createElement(design_elements_react_1.Button, { buttonType: "primary", onClick: () => { console.log('Button Clicked'); } }, "Primary Button")))
    .add('Secondary', () => (React.createElement(design_elements_react_1.Button, { buttonType: "secondary", onClick: () => { console.log('Button Clicked'); } }, "Secondary Button")))
    .add('Tertiary', () => (React.createElement(design_elements_react_1.Button, { buttonType: "tertiary", onClick: () => { console.log('Button Clicked'); } }, "Tertiary Button")))
    .add('Disabled', () => (React.createElement(design_elements_react_1.Button, { disabled: true, buttonType: "primary", onClick: () => { console.log('Button Clicked'); } }, "Disabled Button")))
    .add('Event callback', () => (React.createElement(design_elements_react_1.Button, { onClick: () => { console.log("The button has been clicked!"); }, buttonType: "primary" }, "See Console For Callback")));
react_1.storiesOf('Buttons/Add', module)
    .add('Primary', () => (React.createElement(design_elements_react_1.AddButton, { buttonType: "primary", onClick: () => { console.log('Button Clicked'); } }, "Primary Button")))
    .add('Secondary', () => (React.createElement(design_elements_react_1.AddButton, { buttonType: "secondary", onClick: () => { console.log('Button Clicked'); } }, "Secondary Button")))
    .add('Tertiary', () => (React.createElement(design_elements_react_1.AddButton, { buttonType: "tertiary", onClick: () => { console.log('Button Clicked'); } }, "Tertiary Button")));
//# sourceMappingURL=buttons.js.map