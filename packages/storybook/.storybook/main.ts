import * as path from 'path';

module.exports = {
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
        },
    },
    stories: [
        '../stories/0-intro.stories.mdx',
        '../stories/**/*.stories.@(tsx|mdx)',
    ],
    addons: [
        '@storybook/preset-scss',
        '@storybook/addon-docs',
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
    babel: async (options) => ({
        ...options,
        presets: [
            ...options.presets,
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                },
                'preset-react-jsx-transform',
            ],
        ],
    }),
    core: {
        builder: 'webpack5',
    },
};
