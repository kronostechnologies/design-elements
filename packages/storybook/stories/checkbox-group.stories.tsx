import { CheckboxGroup } from '@equisoft/design-elements-react';

import { forceReRender } from '@storybook/react';
import React, { ChangeEvent } from 'react';

export default {
    title: 'Checkbox Group',
    component: CheckboxGroup,
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
    <CheckboxGroup label="Vehicule" checkboxGroup={Checkboxes} />
);

export const disabled = () => (
    <CheckboxGroup checkboxGroup={[{ label: 'Car', name: 'vehicule', value: 'car', disabled: true }]} />
);
export const controlled = () => {
    return (
        <CheckboxGroup
            label="Colors"
            checkboxGroup={CheckboxesControlled}
            checkedValues={checkedValues}
            onChange={handleChange}
        />
    );
};
export const defaultChecked = () => (
    <CheckboxGroup checkboxGroup={[{ label: 'Plane', name: 'vehicule', value: 'plane', defaultChecked: true }]} />
);
export const callback = () => (
    <CheckboxGroup
        onChange={(event) => console.log(`Checkbox ${event.target.value} is ${event.target.checked ? 'checked' : 'unchecked'}!`)}
        checkboxGroup={[{ label: 'Bike', name: 'vehicule', value: 'bike', defaultChecked: false }]}
    />
);
