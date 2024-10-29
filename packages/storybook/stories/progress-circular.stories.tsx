import { ProgressCircular } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressCircular> = {
    title: 'Components/Progress Circular',
    component: ProgressCircular,
    args: {
        size: 'medium',
        inverted: false,
    },
    argTypes: {
        className: {
            control: {
                type: 'text',
            },
        },
        inverted: {
            control: {
                type: 'boolean',
            },
        },
        value: {
            control: {
                type: 'range',
                min: 0,
                max: 100,
            },
        },
        size: {
            control: {
                type: 'select',
                options: ['xsmall', 'small', 'medium', 'large'],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ProgressCircular>;

export const Default: Story = {
    args: {
        value: 60,
        inverted: false,
    },
};
