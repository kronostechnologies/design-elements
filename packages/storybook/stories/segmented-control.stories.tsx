import { SegmentedControl } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';
import { rawCodeParameters } from './utils/parameters';

const SegmentedControlMeta: Meta<typeof SegmentedControl> = {
    title: 'Components/Segmented Control',
    component: SegmentedControl,
    argTypes: {
        onClick: {
            control: { disable: true },
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
