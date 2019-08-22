const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'},
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: {loader: require.resolve('awesome-typescript-loader')},
      }
    ]
  }
};
