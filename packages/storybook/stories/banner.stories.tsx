import { Banner } from '@equisoft/design-elements-react';
import * as React from 'react';

export default {
    title: 'Banner',
    component: Banner,
};

export const banners = () => (
    <>
        <Banner type="error">ERROR! Lorem ipsum dolor sit amet gfdsgsdfg fdsggsdgsf fdsgdfs</Banner><br/>
        <Banner type="warning">
            WARNING! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
        </Banner><br/>
    </>
);

export const mobile = () => (
    <>
        <Banner type="error" device="mobile">ERROR! Lorem ipsum dolor sit amet</Banner><br/>
        <Banner type="warning" device="mobile">
            WARNING! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
        </Banner><br/>
    </>
);
