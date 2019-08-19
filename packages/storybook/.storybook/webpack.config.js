const path = require('path');

// module.exports = async ({ config, mode }) => {
//   config.module.rules.push([{
//     test: /\.scss$/,
//     use: ['style-loader', 'css-loader', 'sass-loader'],
//     include: path.resolve(__dirname, '../'),
//   }, {
//     test: /\.(ts|tsx)$/,
//     use: {loader: require.resolve('awesome-typescript-loader')},
//   }
//   ]);

//   config.resolve.extensions.push('.ts', '.tsx');
//   return config;
// };

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // style-loader
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader',
          },
          // sass-loader
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
