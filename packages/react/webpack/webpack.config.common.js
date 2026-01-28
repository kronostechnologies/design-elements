const path = require('path');
const ReactDocgenTypescriptPlugin = require('react-docgen-typescript-plugin').default;
const pkg = require('../package');

const enableDocgen = process.env.DISABLE_REACT_DOCGEN !== 'true';

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
                            'prefixIds',
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            buffer: false,
            events: false,
            stream: require.resolve('stream-browserify'),
        },
    },
    plugins: [
        enableDocgen && new ReactDocgenTypescriptPlugin({
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        }),
    ].filter(Boolean),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'umd',
    },
};
