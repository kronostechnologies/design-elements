const path = require('path');
const ReactDocgenTypescriptPlugin = require('react-docgen-typescript-plugin').default;
const pkg = require('../package');

module.exports = {
    entry: {
        bundle: './src/index.ts',
        theme: './src/theme.ts',
    },
    externals: Object.keys(pkg.peerDependencies),
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'css-loader',
                ],
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
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'react-onclickoutside': path.resolve(__dirname, '../patches/react-onclickoutside'), // TODO: Remove once https://github.com/Pomax/react-onclickoutside/pull/324 is released
        },
        fallback: {
            buffer: false,
            events: false,
            stream: require.resolve('stream-browserify'),
        },
    },
    plugins: [
        new ReactDocgenTypescriptPlugin({
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'umd',
    },
};
