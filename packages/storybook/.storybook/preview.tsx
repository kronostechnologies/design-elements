import { DesignSystem, injectMainCss } from '@equisoft/design-elements-react';
import { DocsContainer } from '@storybook/blocks';
import { Decorator, Preview } from '@storybook/react';
import { ModernViewport } from '@storybook/addon-viewport';
import { i18nDecorator } from './i18n-decorator';

injectMainCss();

const decorators: Decorator[] = [
    i18nDecorator,
    (Story, { globals }) => (
        <DesignSystem
            language={globals.language}
            staticDevice={globals.staticDevice}
            themeCustomization={globals.themeCustomization}
        >
            <Story/>
        </DesignSystem>
    ),
];

const viewportOptions: Record<string, ModernViewport> = {
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
        staticDevice: {
            type: 'string',
        },
        themeCustomization: {
            name: 'Theme',
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
                order: [
                    'Introduction',
                    'Getting started',
                    'Foundations',
                    'Components',
                    [
                        '*',
                        'Core',
                        'Deprecated',
                    ],
                    'Patterns',
                    'Atoms',
                    'Changelog',
                ],
            },
        },
        viewport: {
            options: viewportOptions,
        },
    },
};

export default preview;
