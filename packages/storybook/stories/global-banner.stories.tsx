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

export const GlobalBanners: Story = () => (
    <>
        <GlobalBanner
            actionButton={actionButton}
            label="Neutral."
            type="neutral"
            dismissable
        >
            Neutral global banner.
        </GlobalBanner>
        <br />
        <GlobalBanner
            actionButton={actionButton}
            label="Alert."
            type="alert"
        >
            Alert message.
        </GlobalBanner>
        <br />
        <GlobalBanner
            actionButton={actionButton}
            label="Warning."
            type="warning"
            dismissable
        >
            Warning message.
        </GlobalBanner>
        <br />
        <GlobalBanner
            actionButton={actionButton}
            label="Discovery."
            type="discovery"
            dismissable
        >
            Info message.
        </GlobalBanner>
        <br />
        <GlobalBanner
            actionButton={actionButton}
            label="Default."
            dismissable
        >
            Default global banner.
        </GlobalBanner>
    </>
);

export const WithActionButton: Story = () => (
    <GlobalBanner
        actionButton={actionButton}
        label="With action button."
        type="warning"
    >
        Press action button or click ignore button to dismiss.
    </GlobalBanner>
);

export const WithSecondaryActionButton: Story = () => (
    <GlobalBanner
        actionButton={actionButton}
        secondaryActionButton={{
            label: 'Secondary action',
            onClick: () => console.info('clicked secondary action button'),
        }}
        label="With action button."
        type="warning"
    >
        Press action button or click ignore button to dismiss.
    </GlobalBanner>
);

export const WithDismissButton: Story = () => (
    <GlobalBanner
        label="Without dismiss button."
        type="warning"
        dismissable
    >
        Cannot dismiss me.
    </GlobalBanner>
);

export const WithOnDismissCallback: Story = () => (
    <GlobalBanner
        label="With dismiss button and onDismiss callback."
        type="neutral"
        onDismiss={() => console.info('onDismiss callback !')}
        dismissable
    >
        You can dismiss me and onDismiss callback will be called
    </GlobalBanner>
);
