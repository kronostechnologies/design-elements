import { Toggletip } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toggletip> = {
    title: 'Components/Toggletip',
    component: Toggletip,
};

export default meta;

type Story = StoryObj<typeof Toggletip>;

export const Default: Story = {
    args: {
        defaultOpen: true,
    },
    render: (args) => (
        <Toggletip {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            Toggletip content
        </Toggletip>
    ),
};
