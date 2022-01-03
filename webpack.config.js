/**
 * For LOCAL development mode webpack config
 **/
const os = require('os');
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build/resources/main/static/bundle'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules|src\/main\/frontend\/vendor/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
});
