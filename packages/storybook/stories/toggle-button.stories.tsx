import { ToggleButton } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const ToggleButtonMeta: Meta<typeof ToggleButton> = {
    title: 'Components/Toggle Button',
    component: ToggleButton,
    argTypes: {
    },
};

export default ToggleButtonMeta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
    args: {
        ariaLabel: 'Lock',
        label: 'Lock',
    },
};

export const Disabled: Story = {
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
        label: 'Lock',
        disabled: true,
    },
};

export const WithIconAndLabel: Story = {
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
        label: 'Lock',
    },
};

export const WithIconAndAriaLabel: Story = {
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
    },
};

export const PressedWithIconAndLabel: Story = {
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
        label: 'Lock',
        pressed: true,
    },
};

export const PressedWithIconAndAriaLabel: Story = {
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
        pressed: true,
    },
};
