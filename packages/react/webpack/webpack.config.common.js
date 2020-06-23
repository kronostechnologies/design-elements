const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const pkg = require('../package');

module.exports = {
    entry: './src/index.ts',
    externals: Object.keys(pkg.peerDependencies),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
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
                            removeViewBox: false
                        }
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'umd'
    },
};
