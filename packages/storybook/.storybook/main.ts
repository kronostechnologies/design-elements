import * as path from 'path';
import PnpWebpackPlugin from 'pnp-webpack-plugin';

module.exports = {
    typescript: {
        check: true,
        checkOptions: {
            configFile: path.resolve(__dirname, '../tsconfig.json'),
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
    webpackFinal: (config) => {
        config.resolve.plugins.push(PnpWebpackPlugin);
        // @ts-ignore
        config.resolveLoader.plugins.push(PnpWebpackPlugin.moduleLoader(module));

        return config;
    },
};
