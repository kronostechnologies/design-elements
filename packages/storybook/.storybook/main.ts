import { StorybookConfig } from '@storybook/react-webpack5';
import * as path from 'path';

const config: StorybookConfig = {
    framework: {
        name: getAbsolutePath('@storybook/react-webpack5'),
        options: {},
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
        getAbsolutePath('@storybook/addon-docs'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-actions'),
        getAbsolutePath('@storybook/addon-controls'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-toolbars'),
        getAbsolutePath('@storybook/addon-viewport'),
        getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    ],
    webpackFinal: async (config) => ({
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                // https://github.com/storybookjs/storybook/issues/12016#issuecomment-2040576735
                '@storybook/theming': path.dirname(require.resolve('@storybook/theming/package.json')),
            },
            fallback: {
                ...config.resolve?.fallback,
                assert: require.resolve('assert/'),
            },
        },
    }),
    babel: (options) => ({
        ...options,
        presets: [
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
        defaultName: 'Doc',
    },
    core: {
        disableTelemetry: true,
    },
    features: {
        viewportStoryGlobals: true,
    },
};

export default config;

function getAbsolutePath(value: string): any {
    return path.dirname(require.resolve(path.join(value, 'package.json')));
}
