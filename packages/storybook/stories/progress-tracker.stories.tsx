import { ProgressTracker } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const meta: Meta<typeof ProgressTracker> = {
    title: 'Components/Progress Tracker',
    component: ProgressTracker,
    parameters: rawCodeParameters,

};

export default meta;

type Story = StoryObj<typeof ProgressTracker>;

export const Default: Story = {
    args: {
        ariaLabel: 'Storybook progress',
        steps: [
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
        ],
        value: 2,
    },
};
