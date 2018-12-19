const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const developmentConfig = require('./webpack.config.local');
const productionConfig = require('./webpack.config.prod');

const srcdir = path.resolve(__dirname, 'src/main/frontend');

const entries = {
  'index': path.join(srcdir, 'entry/index.js'),
  'demo': path.join(srcdir, 'entry/demo.js'),
};

const commonConfig = {
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
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    occurrenceOrder: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        common: {
          chunks: 'initial',
          name: 'common',
          test: chunks => chunks.resource
            && !/^.*\.(css|scss)$/.test(chunks.resource)
            && /node_modules/.test(chunks.context),
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

module.exports = (env) => env === 'development'
  ? webpackMerge(commonConfig, developmentConfig)
  : webpackMerge(commonConfig, productionConfig);
