module.exports = async ({ config, mode }) => {
    const isDevMode = mode !== 'PRODUCTION';

    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
            ]
        },
        {
            test: /\.(ts|tsx)$/,
            loader: 'awesome-typescript-loader',
            options: { errorsAsWarnings: isDevMode }
        }
    );

    return config;
};
