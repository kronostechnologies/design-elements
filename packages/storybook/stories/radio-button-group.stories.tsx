import { RadioButtonGroup } from '@equisoft/design-elements-react';
import { forceReRender, Story } from '@storybook/react';
import React, { ChangeEvent } from 'react';

export default {
    title: 'Controls/Radio Button Group',
    component: RadioButtonGroup,
};

const buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

const buttonsControlled = [
    { label: 'Blue', value: 'blue' },
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green', disabled: true },
    { label: 'Yellow', value: 'yellow' },
];

let checkedValue = 'red';

function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (checkedValue !== event.target.value) {
        checkedValue = event.target.value;
    }
    forceReRender();
}

export const Normal: Story = () => (
    <RadioButtonGroup label="Planets" groupName="planets" buttons={buttons} />
);

export const Disabled: Story = () => (
    <RadioButtonGroup groupName="cars" buttons={[{ label: 'Toyota', value: 'toyota', disabled: true }]} />
);

export const DefaultChecked: Story = () => (
    <RadioButtonGroup groupName="cars" buttons={[{ label: 'Toyota', value: 'toyota', defaultChecked: true }]} />
);

export const Controlled: Story = () => (
    <RadioButtonGroup
        label="Colors"
        groupName="colors"
        checkedValue={checkedValue}
        buttons={buttonsControlled}
        onChange={handleChange}
    />
);

export const Callback: Story = () => {
    function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const checkedState: string = event.target.checked ? 'checked' : 'unchecked';
        console.info(`Radio button ${event.target.value} is ${checkedState}!`);
    }

    return (
        <RadioButtonGroup
            groupName="cities"
            onChange={onChange}
            buttons={[
                { label: 'Québec', value: 'quebec' },
                { label: 'Montréal', value: 'montreal' },
            ]}
        />
    );
};
