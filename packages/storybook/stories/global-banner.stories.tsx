import { GlobalBanner } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';

export default {
    title: 'Feedback/GlobalBanner',
    component: GlobalBanner,
    decorators: [DeviceContextDecorator],
};

export const GlobalBanners: Story = () => (
    <>
        <GlobalBanner type="error">ERROR! Lorem ipsum dolor sit amet</GlobalBanner>
        <br />
        <GlobalBanner type="warning">
            WARNING! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
        </GlobalBanner>
        <br />
    </>
);
