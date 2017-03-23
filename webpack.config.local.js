const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
	devtool: 'cheap-module-source-map',
	output: {
		path: path.resolve(__dirname, 'target/deploy/static/bundle'),
	}
});
