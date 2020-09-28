import { DeviceContextProvider, ThemeWrapper } from '@equisoft/design-elements-react';
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
