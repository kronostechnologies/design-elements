import { DeviceContextProvider, ThemeWrapper } from '@equisoft/design-elements-react';
// tslint:disable-next-line:no-import-side-effect
import '@equisoft/design-elements-web/style/body.scss';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import React from 'react';

export const decorators = [
    Story => (
        <DeviceContextProvider>
            <ThemeWrapper>
                <Story />
            </ThemeWrapper>
        </DeviceContextProvider>
    ),
];

export const parameters = {
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
};
