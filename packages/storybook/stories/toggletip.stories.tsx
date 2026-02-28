import { Toggletip } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toggletip> = {
    title: 'Components/Toggletip',
    component: Toggletip,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium'],
            },
        },
        maxWidth: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Toggletip>;

export const Default: Story = {
    args: {
        defaultOpen: true,
        size: 'medium',
        maxWidth: 'medium',
    },
    render: (args) => (
        <Toggletip {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </Toggletip>
    ),
};

export const Small: Story = {
    args: {
        closeOnClickOutside: false,
        defaultOpen: true,
        size: 'small',
        maxWidth: 'medium',
    },
    render: (args) => (
        <Toggletip {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            This one will stay open when clicking outside of it. It can be closed using the trigger icon.
        </Toggletip>
    ),
};
