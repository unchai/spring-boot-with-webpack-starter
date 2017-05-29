const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'target/prepare/static/bundle'),
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),
    new ManifestPlugin({
      fileName: 'rev-manifest.json',
      basePath: '/static/bundle/'
    })
  ]
});
