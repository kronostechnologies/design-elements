import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import React from 'react';

injectMainCss();

export const decorators = [
    Story => (
        <DesignSystem>
            <Story />
        </DesignSystem>
    ),
];

export const parameters = {
    docs: {
        container: DocsContainer,
        page: DocsPage,
        source: {
            type: 'dynamic',
            excludeDecorators: true,
        },
    },
};
