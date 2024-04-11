import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';
import { Decorator, Preview } from '@storybook/react';

injectMainCss();

const decorators: Decorator[] = [
    Story => (
        <DesignSystem>
            <Story />
        </DesignSystem>
    ),
];

const preview: Preview = {
    decorators,
    parameters: {
        controls: {
            exclude: ['key', 'ref'],
            expanded: true,
            sort: 'alpha',
        },
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
        options: {
            storySort: {
                order: ['Introduction', 'Getting started', 'Foundations', 'Components', ['*', 'Deprecated'], 'Patterns', 'Atoms', 'Changelog'],
            },
        },
    },
};

export default preview;
