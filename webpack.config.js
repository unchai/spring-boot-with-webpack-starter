const path = require('path');
const glob = require('glob');
const fs = require('graceful-fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.config.common');

function ManifestReplacePlugin(options) {
  this.pluginOptions = options;
}

ManifestReplacePlugin.prototype.apply = function (compiler) {
  var pluginOptions = this.pluginOptions;

  compiler.plugin('done', function () {
    var manifest = require(path.join(this.options.output.path, pluginOptions.manifestFilename));

    glob(path.join(pluginOptions.basedir, pluginOptions.src), (err, files) => {
      files.forEach((file) => {
        fs.readFile(file, 'utf8', function (err, data) {
          if (err) return console.log(err);

          var result = data;
          for (var prop in manifest) {
            result = result.replace(new RegExp(prop, 'gm'), manifest[prop]);
          }

          fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
          });
        });
      });
    });
  });
};

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
    new ManifestPlugin({
      fileName: 'rev-manifest.json',
      basePath: '/static/bundle/'
    }),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'src/main/webapp/'),
        from: '**/*.+(jsp|html|htm)',
        to: path.resolve(__dirname, 'target/prepare')
      }
    ]),
    new ManifestReplacePlugin({
      basedir: path.resolve(__dirname, 'target/prepare'),
      src: '**/*.+(jsp|html|htm)',
      manifestFilename: 'rev-manifest.json'
    })
  ]
});
