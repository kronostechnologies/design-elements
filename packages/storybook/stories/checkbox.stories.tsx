import { Checkbox } from '@equisoft/design-elements-react';

import { forceReRender } from '@storybook/react';
import React, { ChangeEvent } from 'react';

export default {
    title: 'Checkboxes',
    component: Checkbox,
};

const Checkboxes = [
    { label: 'Boat', name: 'vehicule1', value: 'boat' },
    { label: 'Plane', name: 'vehicule2', value: 'plane', defaultChecked: true },
    { label: 'Car', name: 'vehicule3', value: 'car', disabled: true },
    { label: 'Bike', name: 'vehicule4', value: 'bike' },
];

const CheckboxesControlled = [
    { label: 'Blue', name: 'color1', value: 'blue' },
    { label: 'Red', name: 'color2', value: 'red' },
    { label: 'Green', name: 'color3', value: 'green' },
    { label: 'Yellow', name: 'color4', value: 'yellow' },
];

let checkedValues = ['blue', 'yellow'];

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checkedValues.includes(event.target.value)) {
        checkedValues = checkedValues.filter(value => value !== event.target.value);
        forceReRender();
    } else {
        checkedValues.push(event.target.value);
        forceReRender();
    }
};

export const normal = () => (
    <Checkbox label="Vehicule" checkboxGroup={Checkboxes} />
);

export const disabled = () => (
    <Checkbox checkboxGroup={[{ label: 'Car', name: 'vehicule', value: 'car', disabled: true }]} />
);
export const controlled = () => {
    return (
        <Checkbox
            label="Colors"
            checkboxGroup={CheckboxesControlled}
            checkedValues={checkedValues}
            onChange={handleChange}
        />
    );
};
export const defaultChecked = () => (
    <Checkbox checkboxGroup={[{ label: 'Plane', name: 'vehicule', value: 'plane', defaultChecked: true }]} />
);
export const callback = () => (
    <Checkbox
        onChange={(event) => console.log(`Checkbox ${event.target.value} is ${event.target.checked ? 'checked' : 'unchecked'}!`)}
        checkboxGroup={[{ label: 'Bike', name: 'vehicule', value: 'bike', checked: false }]}
    />
);
