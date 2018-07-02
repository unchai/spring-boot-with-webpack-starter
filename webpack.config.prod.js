const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestReplacePlugin = require('webpack-manifest-replace-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'target/prepare/WEB-INF/classes/static/bundle'),
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            unused: true,
            dead_code: true,
          },
          output: {
            beautify: false,
            comments: false,
          },
          warnings: false,
        },
      }), new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
        },
      })],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[contenthash].css'}),
    new ManifestReplacePlugin({
      include: path.resolve(__dirname, 'src/main/resources/templates'),
      test: /\.(jsp|html|htm)$/,
      outputDir: path.resolve(__dirname, 'target/prepare/WEB-INF/classes/templates'),
    }),
  ],
};
