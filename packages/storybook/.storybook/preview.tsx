import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';
import { Decorator, Parameters, Preview } from '@storybook/react';

injectMainCss();

const decorators: Decorator[] = [
    Story => (
        <DesignSystem>
            <Story />
        </DesignSystem>
    ),
];

const parameters: Parameters = {
    docs: {
        container: DocsContainer,
        page: DocsPage,
        source: {
            type: 'dynamic',
            excludeDecorators: true,
        },
        controls: {
            sort: 'alpha',
        },
    },
};

const preview: Preview = {
    decorators,
    parameters,
};

export default preview;
