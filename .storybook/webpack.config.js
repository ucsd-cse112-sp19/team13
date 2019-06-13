const path = require('path');
// const custom = require('../config/webpack.dev');

// module.exports = async ({ config, mode }) => {
//   return { ...config, module: { ...config.module, rules: custom.module.rules } };
// };

module.exports = {
  module: {
    rules: [
      // use the css loaders (first load the css, then inject the style)
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              module: true,
            },
          },
        ],
      },
      // use file loder for fonts
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader'
      },
    ]
  }
};