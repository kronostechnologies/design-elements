import React from 'react';

import { RadioButton } from '@equisoft/design-elements-react';

export default {
    title: 'Radio Button',
    component: RadioButton,
};

const Buttons = [
        { label: 'Earth', value: 'earth' },
        { label: 'Mars', value: 'mars', defaultChecked: true },
        { label: 'Pluto', value: 'pluto', disabled: true },
        { label: 'Saturn', value: 'saturn' },
];

export const normal = () => (
    <RadioButton label="Planets" groupName="planets" buttons={Buttons}/>
);

export const disabled = () => (
    <RadioButton groupName="cars" buttons={[{ label: 'Toyota', value: 'toyota', disabled: true }]}/>
);
export const defaultChecked = () => (
    <RadioButton groupName="cars" buttons={[{ label: 'Toyota', value: 'toyota', defaultChecked: true }]}/>
);
