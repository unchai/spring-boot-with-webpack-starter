/**
 * For REAL production mode webpack config
 **/
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
      path: path.join(__dirname, 'build/prepare/BOOT-INF/classes/static/bundle'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: debug }}
          ],
        },
        {
          test: /\.(ts|tsx)$/,
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
        new CssMinimizerPlugin({
          minimizerOptions: {
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
        outputDir: path.resolve(__dirname, 'build/prepare/BOOT-INF/classes/templates'),
      }),
    ],
  });

  if (analyze) {
    webpackConfig.plugins.push(new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin());
  }

  return webpackConfig;
};
