"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
const addon_knobs_1 = require("@storybook/addon-knobs");
const stories = react_1.storiesOf('Storybook Knobs', module);
stories.addDecorator(addon_knobs_1.withKnobs);
react_1.storiesOf('Card', module)
    .add('default', () => (React.createElement(design_elements_react_1.Card, null, addon_knobs_1.text('Content', 'Hello, World!'))));
//# sourceMappingURL=card.js.map