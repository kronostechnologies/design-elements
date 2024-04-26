const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function getConfig(file) {
    const prefix = 'APP_CONFIG';
    const prefixRegexp = new RegExp(`^${prefix}_`, 'i');
    const envFiles = [file];

    const processEnv = Object.fromEntries(
        Object.entries(process.env).filter(([key]) => prefixRegexp.test(key)),
    );

    const environment = envFiles
        .map((fileName) => path.resolve(process.cwd(), fileName))
        .map((fileName) => dotenv.config({ path: fileName }).parsed)
        .reduce((mergedConfigs, config) => Object.assign(mergedConfigs, config, processEnv), {});

    return Object.fromEntries(
        Object.entries(environment)
            .map(([key, value]) => ([key.replace(prefixRegexp, ''), value])),
    );
}

module.exports = (env = null) => ({
    entry: './src/browser/index.ts',
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

    plugins: [
        new HtmlWebpackPlugin({
            templateParameters: getConfig(env ? `.env.${env}` : '.env'),
            template: 'src/browser/index.html',
        }),
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            buffer: false,
            events: false,
            stream: false,
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../../dist'),
        publicPath: process.env.APP_CONFIG_PUBLIC_PATH || '/',
        libraryTarget: 'umd',
    },
});
