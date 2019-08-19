"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
const provinces = [{ value: "", label: "-" },
    { value: "on", label: "Ontario" },
    { value: "qc", label: "Quebec" },
    { value: "bc", label: "British Columbia" },
    { value: "ab", label: "Alberta" },
    { value: "mb", label: "Manitoba" },
    { value: "sk", label: "Saskatchewan" },
    { value: "ns", label: "Nova Scotia" },
    { value: "nb", label: "New Brunswick" },
    { value: "nl", label: "Newfoundland and Labrador" },
    { value: "pe", label: "Prince Edward Island" },
    { value: "nt", label: "Northwest Territories" },
    { value: "nu", label: "Nunavut" },
    { value: "yt", label: "Yukon" }];
react_1.storiesOf('Select', module)
    .add('Default', () => (React.createElement(design_elements_react_1.Select, { id: "s_provinces", label: "Choose your province or territory", options: provinces, valid: true, validMsg: 'Temporary Message', children: true })));
//# sourceMappingURL=select.js.map