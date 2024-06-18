import { Toggletip } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toggletip> = {
    title: 'Components/Toggletip',
    component: Toggletip,
    argTypes: {
        buttonSize: {
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
        buttonSize: 'medium',
        maxWidth: 'medium',
    },
    render: (args) => (
        <Toggletip {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </Toggletip>
    ),
};
