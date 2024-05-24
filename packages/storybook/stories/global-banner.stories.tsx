import { GlobalBanner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { DeviceContextDecorator } from './utils/device-context-decorator';

const GlobalBannerMeta: Meta<typeof GlobalBanner> = {
    title: 'Components/Global Banner',
    component: GlobalBanner,
    decorators: [DeviceContextDecorator],
    args: {
        actionButton: {
            label: 'Action',
            onClick: () => console.info('Action button clicked.'),
        },
    },
    argTypes: {
        onDismiss: {
            control: { disable: true },
        },
    },
};

export default GlobalBannerMeta;
type Story = StoryObj<typeof GlobalBanner>;

export const Neutral: Story = {
    args: {
        label: 'Neutral.',
        type: 'neutral',
        dismissable: true,
    },
    render: (args) => (
        <GlobalBanner
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        >
            Neutral global banner.
        </GlobalBanner>
    ),
};

export const Warning: Story = {
    args: {
        label: 'Warning.',
        type: 'warning',
        dismissable: true,
    },
    render: (args) => (
        <GlobalBanner
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        >
            Warning message.
        </GlobalBanner>
    ),
};

export const Alert: Story = {
    args: {
        label: 'Alert.',
        type: 'alert',
    },
    render: (args) => (
        <GlobalBanner
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        >
            Alert message.
        </GlobalBanner>
    ),
};

export const Discovery: Story = {
    args: {
        label: 'Discovery.',
        type: 'discovery',
        dismissable: true,
    },
    render: (args) => (
        <GlobalBanner
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        >
            Info message.
        </GlobalBanner>
    ),
};
