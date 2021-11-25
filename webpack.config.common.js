const path = require('path');
const webpack = require('webpack');

const srcdir = path.resolve(__dirname, 'src/main/frontend');

const entries = {
  index: path.join(srcdir, 'entry/index.tsx'),
  demo: path.join(srcdir, 'entry/demo.tsx'),
};

module.exports = {
  entry: entries,
  output: {
    publicPath: '/static/bundle/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    modules: [srcdir, 'node_modules'],
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
};
