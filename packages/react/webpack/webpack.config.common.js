const path = require('path');
const pkg = require('../package');

module.exports = {
    entry: './src/index.ts',
    externals: Object.keys(pkg.peerDependencies),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {loader: 'awesome-typescript-loader'},
                    {loader: 'react-docgen-typescript-loader'},
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
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'umd'
    },
};
