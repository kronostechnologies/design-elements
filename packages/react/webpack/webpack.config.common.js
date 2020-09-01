const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const pkg = require('../package');

module.exports = {
    entry: './src/index.ts',
    externals: Object.keys(pkg.peerDependencies),
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'to-string-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'to-string-loader',
                    'css-loader',
                ],
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
                test: /\.tsx?$/,
                use: [
                    { loader: 'ts-loader' },
                ],
                exclude: /node_modules/,
            },
            {
                test: /.svg$/,
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: {
                            removeViewBox: false,
                        },
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
        alias: {
            'react-onclickoutside': path.resolve(__dirname, '../patches/react-onclickoutside'), // TODO: Remove once https://github.com/Pomax/react-onclickoutside/pull/324 is released
        },
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'umd',
    },
};
