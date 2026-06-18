import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { DocsContainer } from '@storybook/blocks';
import { Decorator, Preview } from '@storybook/react';
import { i18nDecorator } from './i18n-decorator';

injectMainCss();

const decorators: Decorator[] = [
    i18nDecorator,
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
                    { value: 'en-CA', title: 'English' },
                    { value: 'fr-CA', title: 'Français' },
                ],
            },
        },
    },
    initialGlobals: {
        locale: 'fr-CA',
    },
    parameters: {
        controls: {
            exclude: ['key', 'ref'],
            expanded: true,
            sort: 'alpha',
        },
        docs: {
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
