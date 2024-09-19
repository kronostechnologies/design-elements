import { SegmentedControl } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';
import { rawCodeParameters } from './utils/parameters';

const SegmentedControlMeta: Meta<typeof SegmentedControl> = {
    title: 'Components/Segmented Control',
    component: SegmentedControl,
    argTypes: {
        requireSelection: {
            control: 'boolean',
            description: 'When true, a button must always be selected',
            defaultValue: false,
        },
        onClick: {
            control: { ariaDisabled: true },
        },
    },
};

export default SegmentedControlMeta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
    args: {
        buttonGroup: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
        ],
        groupName: 'Story1',
    },
};

export const WithIcon: Story = {
    args: {
        buttonGroup: [
            { value: 'option1', icon: 'alertCircle', ariaLabel: 'Alert' },
            { label: 'Option', value: 'option2', icon: 'alertCircle' },
            { label: 'Option', value: 'option3', icon: 'alertCircle', ariaDisabled: true },
            { label: 'Option', value: 'option4', defaultPressed: true },
        ],
        groupName: 'Story1',
        requireSelection: true,
    },
};

export const WithCallback: Story = {
    parameters: rawCodeParameters,
    args: {
        buttonGroup: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2', defaultPressed: true },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
        ],
        groupName: 'Story2',
        onClick: (event: MouseEvent<HTMLButtonElement>) => console.info(`Toggled button value: ${event.currentTarget.value}`),
    },
};
