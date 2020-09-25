import * as path from 'path';

module.exports = {
    typescript: {
        check: true,
        checkOptions: {
            configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
        },
    },
    stories: ['../stories/**/*.stories.@(tsx|mdx)'],
    addons: [
        '@storybook/preset-scss',
        '@storybook/addon-docs',
    ],
    webpackFinal: (config) => {
        config.resolve.alias = {
            react: path.resolve(__dirname, '../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
            'react-router-dom': path.resolve(__dirname, '../node_modules/react-router-dom'),
            'styled-components': path.resolve(__dirname, '../node_modules/styled-components'),
        };

        return config;
    },
};
