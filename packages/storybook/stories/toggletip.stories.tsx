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
            options: ['18rem', '22rem', '26rem'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Toggletip>;

export const Default: Story = {
    args: {
        defaultOpen: true,
        size: 'medium',
    },
    render: (args) => (
        <Toggletip {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </Toggletip>
    ),
};
