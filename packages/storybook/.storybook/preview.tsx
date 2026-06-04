import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { DocsContainer, type DocsContainerProps } from '@storybook/blocks';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { Decorator, Preview } from '@storybook/react';
import { PropsWithChildren, useEffect, useState } from 'react';

injectMainCss();

const decorators: Decorator[] = [
    (Story, context) => (
        <DesignSystem language={context.globals.locale}>
            <Story />
        </DesignSystem>
    ),
];

const preview: Preview = {
    decorators,
    globalTypes: {
        locale: {
            name: 'Locale',
            description: 'Locale',
            toolbar: {
                dynamicTitle: true,
                icon: 'globe',
                items: [
                    { value: 'en', title: 'English' },
                    { value: 'fr', title: 'Français' },
                ],
            },
        },
    },
    initialGlobals: {
        locale: 'fr',
    },
    parameters: {
        controls: {
            exclude: ['key', 'ref'],
            expanded: true,
            sort: 'alpha',
        },
        docs: {
            container: ({ children, ...props }: PropsWithChildren<DocsContainerProps>) => {
                const locale = props.context.store.userGlobals.globals.locale;

                return (
                    <DocsContainer {...props}>
                        <DesignSystem language={locale}>
                            {children}
                        </DesignSystem>
                    </DocsContainer>
                );
            },
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
                order: ['Introduction',
                    'Getting started',
                    'Foundations',
                    'Components',
                    ['*', 'Core', 'Deprecated'],
                    'Patterns',
                    'Atoms',
                    'Changelog'],
            },
        },
    },
};

export default preview;
