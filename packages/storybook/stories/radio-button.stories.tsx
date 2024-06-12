import { RadioButtonGroup, Button } from '@equisoft/design-elements-react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

const meta: Meta<typeof RadioButtonGroup> = {
    title: 'Components/Radio Button',
    component: RadioButtonGroup,
};

export default meta;

type Story = StoryObj<typeof RadioButtonGroup>;

const buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

export const Default: Story = {
    args: {
        label: 'Planets',
        groupName: 'planets-1',
        buttons,
    },
};

export const WithConditionalContent: Story = {
    args: {
        label: 'Select an option',
        groupName: 'content',
        buttons: [
            { label: 'This options has content', value: 'with', content: { element: <p>This is some content</p> } },
            { label: 'This one does not', value: 'without' },
            { label: 'This options has form content', value: 'form', content: { element: <input type="text" /> } },
        ],
    },
};

export const WithTooltip: Story = {
    args: {
        label: 'Planets',
        tooltip: { label: 'Tooltip text content' },
        groupName: 'planets-2',
        buttons,
    },
};

const controlledButtons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars' },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

export const Controlled: StoryFn = () => {
    const [value, setValue] = useState('mars');

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        if (value !== event.target.value) {
            setValue(event.target.value);
        }
    }

    return (
        <>
            <Button buttonType="primary" label="Change to Saturn" onClick={() => setValue('saturn')} />
            <RadioButtonGroup
                groupName="controlled-planets"
                checkedValue={value}
                buttons={controlledButtons}
                onChange={handleChange}
            />
        </>
    );
};
Controlled.parameters = rawCodeParameters;

export const Callback: StoryFn = () => {
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
