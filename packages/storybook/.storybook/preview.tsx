import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { Decorator, Preview } from '@storybook/react';
import { DocsContainer } from "@storybook/blocks";

injectMainCss();

const decorators: Decorator[] = [
    Story => (
        <DesignSystem>
            <Story />
        </DesignSystem>
    ),
];

const viewportOptions = {
    mobile: {
        name: 'Mobile',
        styles: {
            height: '834px',
            width: '480px',
        },
        type: 'mobile',
    },
    tablet: {
        name: 'Tablet',
        styles: {
            height: '834px',
            width: '1023px',
        },
        type: 'tablet',
    },
};

const preview: Preview = {
    decorators,
    parameters: {
        controls: {
            exclude: ['key', 'ref'],
            expanded: true,
            sort: 'alpha',
        },
        docs: {
            /*
             * The default container is set explicitly to prevent a bug that causes the "Show code/Hide code"
             * button of stories in the .mdx file to do nothing. It can be removed once the bug is fixed.
             */
            container: DocsContainer,
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
        viewport: {
            options: viewportOptions,
        },
        initialGlobals: {
            viewport: { value: 'responsive', isRotated: false },
        },
    },
};

export default preview;
