import { StorybookConfig } from '@storybook/react-webpack5';
import * as path from 'path';

const config: StorybookConfig = {
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    features: {
        storyStoreV7: true,
    },
    staticDirs: ['../public'],
    typescript: {
        check: true,
        checkOptions: {
            typescript: {
                configFile: path.resolve(__dirname, '../tsconfig.json'),
            },
        },
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json')
        },
    },
    stories: [
        '../stories/**/*.@(stories.tsx|mdx)',
    ],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-actions',
        '@storybook/addon-controls',
        '@storybook/addon-links',
    ],
    webpackFinal: async (config) => ({
        ...config,
        resolve: {
            ...config.resolve,
            fallback: {
                ...config.resolve?.fallback,
                assert: require.resolve('assert/'),
            },
        },
    }),
    babel: (options) => ({
        ...options,
        presets: [
            ...options.presets,
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                    useBuiltIns: true,
                },
                'preset-react-jsx-transform',
            ],
            ['@babel/preset-typescript'],
        ],
    }),
    docs: {
        autodocs: true,
        defaultName: 'Doc'
    },
    core: {
        disableTelemetry: true,
    },
};

export default config;
