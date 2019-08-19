"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@storybook/react");
const design_elements_react_1 = require("@equisoft/design-elements-react");
const progressBars = [
    {
        color: "rgb(101,226,255)",
        descriptionLabel: "You",
        endLabel: "50k - 100k$",
        percent: "100",
    },
    {
        color: "rgb(38, 50, 56)",
        descriptionLabel: "Equisoft",
        endLabel: "150k - 250k$",
        percent: "60",
        secondary: true,
    },
    {
        color: "rgb(99, 114, 130)",
        descriptionLabel: "General",
        endLabel: "150k - 250k$",
        percent: "60",
        secondary: true,
    }
];
const legendItems = [{
        name: "You",
        description: "Data from your answers"
    },
    {
        name: "Equisoft Peers",
        description: "Private Equisoft data",
        color: "#000014"
    },
    {
        name: "General Peers",
        description: "Publicly accessible data",
        color: "#304E63"
    }
];
react_1.storiesOf('Results/Legend', module)
    .add('Default', () => (React.createElement(design_elements_react_1.Legend, { items: legendItems })));
react_1.storiesOf('Results/ProgressCircle', module)
    .add('ProgressCircle', () => (React.createElement(design_elements_react_1.ProgressCircle, { percent: 66, color: 'rgb(101,226,255)', descriptionLabel: 'RRSP', resultLabel: '56 k$', secondary: false })))
    .add('ProgressCircle Secondary', () => (React.createElement(design_elements_react_1.ProgressCircle, { percent: 66, color: '#304E63', descriptionLabel: 'RRSP', resultLabel: '56 k$', secondary: true })));
react_1.storiesOf('Results/ProgressBar', module)
    .add('Default', () => (React.createElement(design_elements_react_1.ProgressBar, { content: progressBars })));
//# sourceMappingURL=results.js.map