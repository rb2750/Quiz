const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		quiz: './Scripts/quiz/index.ts',
		styles: './wwwroot/scss/index.scss'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				enforce: 'pre'
			},
			{
				test: /\.(ts|js)$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				exclude: /node_modules/,
				options: {
					emitError: true,
					emitWarning: false,
					configFile: './.eslintrc'
				}
			},
			{
				test: /\.(ts|js)$/,
				exclude: /(node_modules)/,
				use: 'babel-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: './Webpack/postcss.config.js'
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							// Prefer `dart-sass`
							implementation: require('sass'),
							sassOptions: {
								includePaths: [
									path.resolve(__dirname, '../node_modules/@syncfusion'),
									path.resolve(__dirname, '../node_modules/@fortawesome')
								]
							}
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpe?g|gif|woff|woff2|eot|ttf|otf|ico|webp)(\?.*)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.json', '.scss']
	}
};
