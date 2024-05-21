import { CheckboxGroup } from '@equisoft/design-elements-react';
import { StoryFn } from '@storybook/react';
import { ChangeEvent } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Checkbox Group',
    component: CheckboxGroup,
    tags: ['autodocs'],
};

type Story = StoryFn;

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
    } else {
        checkedValues.push(event.target.value);
    }
}

export const Normal: Story = () => (
    <CheckboxGroup data-testid='some-checkbox-group-data-testid' label="Vehicule" checkboxGroup={Checkboxes} />
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
    function onChange(event: ChangeEvent<HTMLInputElement>): void {
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
Callback.parameters = rawCodeParameters;
