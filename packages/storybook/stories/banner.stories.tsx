import { Banner } from '@equisoft/design-elements-react';
import React from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';

export default {
    title: 'Banner',
    component: Banner,
    decorators: [DeviceContextDecorator],
};

export const banners = () => (
    <>
        <Banner type="error">ERROR! Lorem ipsum dolor sit amet</Banner><br/>
        <Banner type="warning">
            WARNING! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
        </Banner><br/>
    </>
);
