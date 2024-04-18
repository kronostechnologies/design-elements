import { GlobalBanner } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { DeviceContextDecorator } from './utils/device-context-decorator';

export default {
    title: 'Components/Global Banner',
    component: GlobalBanner,
    decorators: [DeviceContextDecorator],
};

const actionButton = {
    label: 'Action',
    onClick: () => console.info('Action button clicked.'),
};

export const Neutral: Story = () => (
    <>
        <GlobalBanner
            actionButton={actionButton}
            label="Neutral."
            type="neutral"
            dismissable
        >
            Neutral global banner.
        </GlobalBanner>
    </>
);

export const Warning: Story = () => (
    <>
        <GlobalBanner
            actionButton={actionButton}
            label="Warning."
            type="warning"
            dismissable
        >
            Warning message.
        </GlobalBanner>
    </>
);

export const Alert: Story = () => (
    <>
        <GlobalBanner
            actionButton={actionButton}
            label="Alert."
            type="alert"
        >
            Alert message.
        </GlobalBanner>
    </>
);

export const Discovery: Story = () => (
    <>
        <GlobalBanner
            actionButton={actionButton}
            label="Discovery."
            type="discovery"
            dismissable
        >
            Info message.
        </GlobalBanner>
    </>
);
