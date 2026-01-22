import { ToggleButton } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const ToggleButtonMeta: Meta<typeof ToggleButton> = {
    title: 'Components/Toggle Button',
    component: ToggleButton,
    argTypes: {
        onClick: {
            control: { disable: true },
        },
    },
};

export default ToggleButtonMeta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
    args: {
        ariaLabel: 'Lock',
        label: 'Lock',
        onClick: (event) => {
            // eslint-disable-next-line no-console
            console.log('Toggle changed:', !event.currentTarget.ariaPressed);
        },
        pressed: false,
    },
};

export const IconWithLabel: Story = {
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
        label: 'Lock',
        onClick: (event) => {
            // eslint-disable-next-line no-console
            console.log('Toggle changed:', !event.currentTarget.ariaPressed);
        },
        pressed: false,
    },
};

export const IconOnly: Story = {
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
        onClick: (event) => {
            // eslint-disable-next-line no-console
            console.log('Toggle changed:', !event.currentTarget.ariaPressed);
        },
        pressed: false,
    },
};
