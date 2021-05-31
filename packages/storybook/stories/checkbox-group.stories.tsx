import { CheckboxGroup } from '@equisoft/design-elements-react';

import { forceReRender, Story } from '@storybook/react';
import React, { ChangeEvent } from 'react';

export default {
    title: 'Controls/Checkbox Group',
    component: CheckboxGroup,
};

const Checkboxes = [
    { label: 'Boat', name: 'vehicule1', value: 'boat' },
    {
        label: 'Plane', name: 'vehicule2', value: 'plane', defaultChecked: true,
    },
    {
        label: 'Car', name: 'vehicule3', value: 'car', disabled: true,
    },
    { label: 'Bike', name: 'vehicule4', value: 'bike' },
];

const CheckboxesControlled = [
    { label: 'Blue', name: 'color1', value: 'blue' },
    { label: 'Red', name: 'color2', value: 'red' },
    { label: 'Green', name: 'color3', value: 'green' },
    { label: 'Yellow', name: 'color4', value: 'yellow' },
];

let checkedValues = ['blue', 'yellow'];

function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (checkedValues.includes(event.target.value)) {
        checkedValues = checkedValues.filter((value) => value !== event.target.value);
        forceReRender();
    } else {
        checkedValues.push(event.target.value);
        forceReRender();
    }
}

export const Normal: Story = () => (
    <CheckboxGroup label="Vehicule" checkboxGroup={Checkboxes} />
);

export const Disabled: Story = () => (
    <CheckboxGroup checkboxGroup={[
        {
            label: 'Car', name: 'vehicule', value: 'car', disabled: true,
        },
    ]}
    />
);

export const Controlled: Story = () => (
    <CheckboxGroup
        label="Colors"
        checkboxGroup={CheckboxesControlled}
        checkedValues={checkedValues}
        onChange={handleChange}
    />
);

export const DefaultChecked: Story = () => (
    <CheckboxGroup checkboxGroup={[
        {
            label: 'Plane', name: 'vehicule', value: 'plane', defaultChecked: true,
        },
    ]}
    />
);

export const Callback: Story = () => {
    function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const checkedState: string = event.target.checked ? 'checked' : 'unchecked';
        console.info(`Checkbox ${event.target.value} is ${checkedState}!`);
    }

    return (
        <CheckboxGroup
            onChange={onChange}
            checkboxGroup={[
                {
                    label: 'Bike', name: 'vehicule', value: 'bike', defaultChecked: false,
                },
            ]}
        />
    );
};
