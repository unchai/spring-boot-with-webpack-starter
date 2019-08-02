/**
 * For LOCAL development mode webpack config
 **/
const os = require('os');
const path = require('path');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const commonConfig = require('./webpack.config.common');

// eslint-disable-next-line new-cap
const happyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'target/deploy/static/bundle'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=css'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules|src\/main\/frontend\/vendor/,
        use: 'happypack/loader?id=js',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new HappyPack({
      id: 'js',
      threadPool: happyPackThreadPool,
      loaders: ['babel-loader'],
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyPackThreadPool,
      loaders: ['css-loader'],
    }),
  ],
});
