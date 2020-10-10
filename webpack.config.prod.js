/**
 * For REAL production mode webpack config
 **/
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const ManifestReplacePlugin = require('webpack-manifest-replace-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = (env = { debug: false, analyze: false }) => {
  const { debug, analyze } = env;
  const webpackConfig = merge(commonConfig, {
    mode: 'production',
    devtool: debug ? 'cheap-module-source-map' : false,
    output: {
      filename: '[name]-[chunkhash].js',
      path: path.join(__dirname, 'target/prepare/static/bundle'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules|src\/main\/frontend\/vendor/,
          use: 'babel-loader',
        },
      ],
    },
    performance: {
      hints: false,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: debug,
          terserOptions: {
            compress: {
              drop_console: !debug,
              drop_debugger: !debug,
              unused: true,
              dead_code: true,
            },
            output: {
              beautify: false,
              comments: false,
            },
            warnings: false,
          },
        }),
        new OptimizeCssnanoPlugin({
          sourceMap: debug,
          cssnanoOptions: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
      new ManifestReplacePlugin({
        include: path.resolve(__dirname, 'src/main/resources/templates'),
        test: /\.(jsp|html|htm)$/,
        outputDir: path.resolve(__dirname, 'target/prepare/WEB-INF/classes/templates'),
      }),
    ],
  });

  if (analyze) {
    webpackConfig.plugins.push(new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin());
  }

  return webpackConfig;
};
