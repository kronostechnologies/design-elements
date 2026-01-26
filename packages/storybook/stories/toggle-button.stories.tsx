import { ToggleButton } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const ToggleButtonMeta: Meta<typeof ToggleButton> = {
    title: 'Components/Toggle Button',
    component: ToggleButton,
    argTypes: {
        onChange: {
            control: { disable: true },
        },
        pressed: {
            control: { disable: true },
        },
    },
    parameters: {
        docs: {
            source: {
                code: `
const [pressed, setPressed] = useState(false);
return (
    <ToggleButton
        ariaLabel='Lock'
        label='Lock'
        onChange={setPressed}
        pressed={pressed}
    />
);
                `,
            },
        },
    },
};

export default ToggleButtonMeta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
    args: {
    },
    render: () => {
        const [pressed, setPressed] = useState(false);
        return (
            <ToggleButton
                ariaLabel='Lock'
                label='Lock'
                onChange={setPressed}
                pressed={pressed}
            />
        );
    },
};

export const IconWithLabel: Story = {
    args: {
    },
    render: () => {
        const [pressed, setPressed] = useState(false);
        return (
            <ToggleButton
                ariaLabel='Lock'
                iconName='lock'
                label='Lock'
                onChange={setPressed}
                pressed={pressed}
            />
        );
    },
};

export const IconOnly: Story = {
    args: {
    },
    render: () => {
        const [pressed, setPressed] = useState(false);
        return (
            <ToggleButton
                ariaLabel='Lock'
                iconName='lock'
                onChange={setPressed}
                pressed={pressed}
            />
        );
    },
};
