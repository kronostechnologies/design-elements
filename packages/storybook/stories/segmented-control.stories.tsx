import { ToggleButtonGroup } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { MouseEvent } from 'react';
import { rawCodeParameters } from './utils/parameters';

const buttonGroup = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
];

const defaultCheckedGroup = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', defaultPressed: true },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
];

const disabledGroup = [
    { label: 'Option 1', value: 'option1', disabled: true },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3', disabled: true },
    { label: 'Option 4', value: 'option4' },
];

export default {
    title: 'Components/Segmented Control',
    component: ToggleButtonGroup,
    tags: ['autodocs'],
};

export const Default: Story = () => (
    <ToggleButtonGroup groupName="Story2" buttonGroup={defaultCheckedGroup} />
);

export const WithCallback: Story = () => (
    <ToggleButtonGroup
        groupName="Test5"
        buttonGroup={buttonGroup}
        onClick={(event: MouseEvent<HTMLButtonElement>) => console.info(`Toggled button value: ${event.currentTarget.value}`)}
    />
);
WithCallback.parameters = rawCodeParameters;
