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

// For PR testing, TO BE REMOVED
const testDataPR = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    {
        label: 'Pluto',
        value: 'pluto',
        disabled: true,
        content: {
            element: (
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    <input onFocus={() => {
                        // eslint-disable-next-line no-console
                        console.log('Pluto');
                    }}
                    />
                </div>
            ),
        },
    },
    {
        label: 'Saturn',
        value: 'saturn',
        content: {
            element: (
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    <input onFocus={() => {
                        // eslint-disable-next-line no-console
                        console.log('Saturn');
                    }}
                    />
                </div>
            ),
        },
    },
    {
        label: 'Jupiter',
        value: 'jupiter',
        content: {
            element: (
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    <input onFocus={() => {
                        // eslint-disable-next-line no-console
                        console.log('Jupiter');
                    }}
                    />
                </div>
            ),
        },
    },
];

export const TestPR: StoryFn = () => (
    <RadioButtonGroup
        groupName="controlled-planets"
        buttons={testDataPR}
    />
);
// End PR testing

export const WithConditionalContent: Story = {
    args: {
        label: 'Select an option',
        groupName: 'content',
        buttons: [
            { label: 'This options has content', value: 'with', content: { element: <p>This is some content</p> } },
            { label: 'This one does not', value: 'without' },
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
                buttons={buttons}
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
