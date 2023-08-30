import { RadioButtonGroup } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

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

export const Normal: Story = () => (
    <RadioButtonGroup
        data-testid='radio-button-group-id'
        label="Planets"
        groupName="planets-1"
        buttons={buttons}
    />
);

export const Disabled: Story = () => (
    <RadioButtonGroup groupName="cars-1" buttons={[{ label: 'Toyota', value: 'toyota', disabled: true }]} />
);

export const DefaultChecked: Story = () => (
    <RadioButtonGroup groupName="cars-2" buttons={[{ label: 'Toyota', value: 'toyota', defaultChecked: true }]} />
);

export const WithTooltip: Story = () => (
    <RadioButtonGroup
        data-testid='radio-button-group-id'
        label="Planets"
        tooltip={{ label: 'Tooltip text content' }}
        groupName="planets-2"
        buttons={buttons}
    />
);
export const WithContent: Story = () => (
    <RadioButtonGroup
        label="Content"
        groupName="content"
        buttons={[
            { label: 'With content', value: 'with', content: { render: () => (<p>This is some content</p>) } },
            { label: 'Without content', value: 'without' },
        ]}
    />
);

export const Controlled: Story = () => {
    const [value, setValue] = useState('red');

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        if (value !== event.target.value) {
            setValue(event.target.value);
        }
    }

    return (
        <RadioButtonGroup
            label="Colors"
            groupName="colors"
            checkedValue={value}
            buttons={[
                { label: 'Blue', value: 'blue' },
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green', disabled: true },
                { label: 'Yellow', value: 'yellow' },
            ]}
            onChange={handleChange}
        />
    );
};
Controlled.parameters = rawCodeParameters;

export const Callback: Story = () => {
    function onChange(event: ChangeEvent<HTMLInputElement>): void {
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
Callback.parameters = rawCodeParameters;
