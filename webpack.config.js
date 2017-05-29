const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestReplacePlugin = require('webpack-manifest-replace-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: '[name]-[chunkhash].js',
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
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'src/main/webapp/'),
        from: '**/*.+(jsp|html|htm)',
        to: path.resolve(__dirname, 'target/prepare')
      }
    ]),
    new ManifestPlugin({
      fileName: 'rev-manifest.json',
      basePath: '/static/bundle/'
    }),
    new ManifestReplacePlugin({
      basedir: path.resolve(__dirname, 'target/prepare'),
      src: '**/*.+(jsp|html|htm)',
      manifestFilename: 'rev-manifest.json'
    })
  ]
});
