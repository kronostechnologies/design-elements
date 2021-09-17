import { GlobalBanner } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';

export default {
    title: 'Feedback/GlobalBanner',
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
            label="Alert."
            type="alert"
        >
            Alert message.
        </GlobalBanner>
        <br />
        <GlobalBanner
            label="Warning."
            type="warning"
        >
            Warning message.
        </GlobalBanner>
        <br />
        <GlobalBanner
            label="Info."
            type="info"
        >
            Info message.
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
