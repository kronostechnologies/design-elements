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
    },
};

export default preview;
