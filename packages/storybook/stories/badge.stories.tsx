import { Badge, Icon } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    argTypes: {
        children: {
            control: { type: null },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: <Icon name="bell" />,
        value: 1,
    },
};

export const Dot: Story = {
    args: {
        children: <Icon name="bell" />,
        showValue: false,
        value: 1,
    },
};
