const path = require('path');
const webpack = require('webpack');

const srcdir = path.resolve(__dirname, 'src/main/frontend');

const entries = {
  index: path.join(srcdir, 'entry/index.js'),
  demo: path.join(srcdir, 'entry/demo.js'),
};

module.exports = {
  entry: entries,
  output: {
    publicPath: '/static/bundle/',
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: 'expose-loader?jQuery',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [srcdir, 'node_modules'],
    mainFields: ['browser', 'main', 'module'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        common: {
          chunks: 'initial',
          name: 'common',
          test: (chunks) =>
            chunks.resource && !/^.*\.(css|scss)$/.test(chunks.resource) && /node_modules/.test(chunks.context),
        },
        vendor: {
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
    }),
  ],
};
