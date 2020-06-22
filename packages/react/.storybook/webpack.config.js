const path = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin()],
    },

    module: {
        rules: [
            {
                test: /.svg$/,
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: {
                            removeViewBox: false
                        }
                    }
                },
            },
            {
                test: /.tsx$/,
                loader: 'react-docgen-typescript-loader',
                options: {
                    shouldExtractLiteralValuesFromEnum: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.stories.tsx?$/,
                use: [{ loader: '@storybook/source-loader' }],
                enforce: 'pre',
                include: path.resolve(__dirname, '../src/')
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: false,
                        ignoreDiagnostics: [7005]
                    }
                }],
            },
            {
                test: /\.mdx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-transform-react-jsx'],
                        },
                    },
                    {
                        loader: '@mdx-js/loader',
                        options: {
                            compilers: [createCompiler({})],
                        },
                    },
                ]
            },
        ]
    }
};
