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
    render: (args) => {
        const [pressed, setPressed] = useState(false);
        return (
            <ToggleButton
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args}
                onChange={setPressed}
                pressed={pressed}
            />
        );
    },
};

export default ToggleButtonMeta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
    ...ToggleButtonMeta,
    args: {
        ariaLabel: 'Lock',
        label: 'Lock',
    },
};

export const IconWithLabel: Story = {
    ...ToggleButtonMeta,
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
        label: 'Lock',
    },
};

export const IconOnly: Story = {
    ...ToggleButtonMeta,
    args: {
        ariaLabel: 'Lock',
        iconName: 'lock',
    },
};
