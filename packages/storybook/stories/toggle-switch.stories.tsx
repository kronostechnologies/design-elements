import { ToggleSwitch } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof ToggleSwitch> = {
    title: 'Components/Toggle Switch',
    component: ToggleSwitch,
    argTypes: {
        onToggle: {
            control: { type: null },
        },
        toggled: {
            control: { type: null },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
    args: {
        label: 'Show children organizations',
    },
    render: (args) => {
        const [toggled, setToggled] = useState(false);
        return (
            <ToggleSwitch
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                toggled={toggled}
                onToggle={setToggled}
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `
const [toggled, setToggled] = useState(false);
return (
    <ToggleSwitch
        label="Show children organizations"
        toggled={toggled}
        onToggle={setToggled}
    />
);                
                `,
            },
        },
    },
};
