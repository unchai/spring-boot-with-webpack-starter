const path = require('path');
const webpack = require('webpack');
const srcdir = path.resolve(__dirname, 'src/main/webapp');

const entries = {
	'index': srcdir + '/static/entries/index.js'
};

module.exports = {
	entry: entries,
	output: {
		filename: '[name].js',
		publicPath: '/static/bundle'
	},
	module: {
		loaders: [
			{
				test: /\.(jsp|html|htm)$/,
				loader: 'raw-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	]
};

process.noDeprecation = true;
