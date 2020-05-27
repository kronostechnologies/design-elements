import { forceReRender } from '@storybook/react';
import React, { ChangeEvent } from 'react';
import { RadioButtonGroup } from './radio-button-group';

export default {
    title: 'Radio Button Group',
    component: RadioButtonGroup,
};

const Buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

const ButtonsControlled = [
    { label: 'Blue', value: 'blue' },
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green', disabled: true },
    { label: 'Yellow', value: 'yellow' },
];

let checkedValue = 'red';

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checkedValue !== event.target.value) checkedValue = event.target.value;
    forceReRender();
};

export const normal = () => (
    <RadioButtonGroup label="Planets" groupName="planets" buttons={Buttons}/>
);

export const disabled = () => (
    <RadioButtonGroup groupName="cars" buttons={[{ label: 'Toyota', value: 'toyota', disabled: true }]}/>
);
export const defaultChecked = () => (
    <RadioButtonGroup groupName="cars" buttons={[{ label: 'Toyota', value: 'toyota', defaultChecked: true }]}/>
);
export const controlled = () => {
    return (
        <RadioButtonGroup
            label="Colors"
            groupName="colors"
            checkedValue={checkedValue}
            buttons={ButtonsControlled}
            onChange={handleChange}
        />
    );
};
export const callback = () => (
    <RadioButtonGroup
        groupName="cities"
        onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(`Radio button ${event.target.value} is ${event.target.checked ? 'checked' : 'unchecked'}!`)}
        buttons={[
            { label: 'Québec', value: 'quebec' },
            { label: 'Montréal', value: 'montreal' },
        ]}
    />
);
