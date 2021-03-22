const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {ProvidePlugin} = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, '../wwwroot/dist/dev'),
		publicPath: '/dist/dev/',
		filename: '[name].bundle.js',
		chunkFilename: '[name].[contenthash].js',
		libraryExport: 'default',
		library: 'Quiz',
		libraryTarget: 'umd'
	},
	plugins: [
		// new BundleAnalyzerPlugin({
		// 	analyzerPort: 9999
		// }),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css'
		}),
		new ProvidePlugin({
			$: "jquery",
			jquery: "jQuery",
			"window.jQuery": "jquery"
		}),
	],
	optimization: {
		usedExports: true,
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/i,
					name: 'vendor',
					chunks: 'all',
					priority: -10
				},
				commons: {
					name: 'common',
					chunks: 'all',
					reuseExistingChunk: true,
					minChunks: 2,
					priority: -20
				}
			}
		}
	},
	watch: true,
	watchOptions: {
		poll: 500,
		aggregateTimeout: 200,
		ignored: /node_modules/
	}
});
