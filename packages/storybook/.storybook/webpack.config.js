const path = require('path');

module.exports = {
    resolve: {
        alias: {
            react: path.resolve(__dirname, '../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
            'styled-components': path.resolve(__dirname, '../node_modules/styled-components'),
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
        ]
    }
};
