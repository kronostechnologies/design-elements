"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
react_1.storiesOf('Search Bar', module)
    .add('Contextual', () => (React.createElement(design_elements_react_1.SearchContextual, { id: "searchbar_contextual", label: "Search", onChange: (value) => { console.log(`Searching for: ${value}`); } })))
    .add('Global', () => (React.createElement(design_elements_react_1.SearchGlobal, { id: "searchbar_global", label: "Search", onSearch: (value) => { console.log(`Searching for: ${value}`); } })))
    .add('Disabled', () => (React.createElement(design_elements_react_1.SearchGlobal, { disabled: true, id: "searchbar_disabled", label: "Search" })));
//# sourceMappingURL=search.js.map