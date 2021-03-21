const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DoneWebpackPlugin = require('done-webpack-plugin');
const fs = require('fs');
const {ProvidePlugin} = require("webpack");

module.exports = merge(baseConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../wwwroot/dist/prod'),
		publicPath: '/dist/prod/',
		filename: '[name].bundle.[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
		library: 'Quiz'
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserJsPlugin({}),
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						'default',
						{
							discardComments: { removeAll: true }
						}
					]
				}
			})
		],
		runtimeChunk: 'single',
		moduleIds: 'deterministic',
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
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.[contenthash].css'
		}),
		new ProvidePlugin({
			$: "jquery",
			jquery: "jQuery",
			"window.jQuery": "jquery"
		}),		
		new DoneWebpackPlugin(stats => {
			fs.writeFileSync(
				path.join(__dirname, 'stats.json'),
				JSON.stringify(
					stats.toJson({
						all: false,
						assets: true
					})
				)
			);
		})
	]
});
