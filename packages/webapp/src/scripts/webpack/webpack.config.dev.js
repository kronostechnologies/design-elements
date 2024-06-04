const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common('dev'), {
    mode: 'development',
    devServer: {
        compress: true,
        host: '0.0.0.0',
        hot: true,
        open: false,
        port: 22222,
        static: {
            directory: 'public',
            watch: true,
        },
    },
});
