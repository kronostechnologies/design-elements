import { Lozenge } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Lozenge> = {
    title: 'Components/Lozenge',
    component: Lozenge,
};

export default meta;

type Story = StoryObj<typeof Lozenge>;

export const Default: Story = {
    render: (args) => (
        <Lozenge {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            status
        </Lozenge>
    ),
};

export const Neutral: Story = {
    args: {
        variant: 'neutral',
    },
    render: (args) => (
        <Lozenge {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            neutral
        </Lozenge>
    ),
};

export const Success: Story = {
    args: {
        variant: 'success',
    },
    render: (args) => (
        <Lozenge {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            success
        </Lozenge>
    ),
};

export const Alert: Story = {
    args: {
        variant: 'alert',
    },
    render: (args) => (
        <Lozenge {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            alert
        </Lozenge>
    ),
};

export const Warning: Story = {
    args: {
        variant: 'warning',
    },
    render: (args) => (
        <Lozenge {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            warning
        </Lozenge>
    ),
};

export const Informative: Story = {
    args: {
        variant: 'info',
    },
    render: (args) => (
        <Lozenge {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            info
        </Lozenge>
    ),
};

export const Discovery: Story = {
    args: {
        variant: 'discovery',
    },
    render: (args) => (
        <Lozenge {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            discovery
        </Lozenge>
    ),
};
