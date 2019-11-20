const path = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
            'styled-components': path.resolve(__dirname, '../node_modules/styled-components'),
        }
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
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
