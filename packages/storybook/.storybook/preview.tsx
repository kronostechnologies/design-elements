import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { Decorator, Preview } from '@storybook/react';
import { DocsContainer, type DocsContainerProps } from '@storybook/blocks';
import { PropsWithChildren } from 'react';

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
            container: ({ children, ...props }: PropsWithChildren<DocsContainerProps>) => (
                <DocsContainer {...props}>
                    <DesignSystem>
                        {children}
                    </DesignSystem>
                </DocsContainer>
            ),
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
                order: ['Introduction', 'Getting started', 'Foundations', 'Components', ['*', 'Core', 'Deprecated'], 'Patterns', 'Atoms', 'Changelog'],
            },
        },
    },
};

export default preview;
