import { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from '@equisoft/design-elements-react';

const meta: Meta<typeof RadioButton> = {
    title: 'Components/Radio Button',
    component: RadioButton,
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
    args: {
        label: 'Merge contact',
    },
};

export const Checked: Story = {
    args: {
        label: 'Merge contact',
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Merge contact',
        disabled: true,
    },
};

export const CheckedAndDisabled: Story = {
    args: {
        label: 'Merge contact',
        checked: true,
        disabled: true,
    },
};
