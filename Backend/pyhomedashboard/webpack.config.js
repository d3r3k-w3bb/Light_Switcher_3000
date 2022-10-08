const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
      "buffer": require.resolve('buffer/'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
  ]
};