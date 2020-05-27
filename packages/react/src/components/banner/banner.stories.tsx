import React, { ReactElement } from 'react';
import { DeviceContextProvider } from '../device-context-provider/device-context-provider';
import { Banner } from './banner';

export default {
    title: 'Banner',
    component: Banner,
    decorators: [(storyFn: () => ReactElement) => <DeviceContextProvider>{storyFn()}</DeviceContextProvider>],
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
