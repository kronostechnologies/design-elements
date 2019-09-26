const path = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
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
