const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.bundle.js'
	},

	performance: {
		hints: false,
	},

	stats: {
		children: false,
	},

	/**
	 * @link https://webpack.github.io/docs/webpack-dev-server.html
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 8080,
		open: true,
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: false,
			publicPath: false,
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				// exlude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
		]
	},

	plugins: [

		new ExtractTextPlugin({
			filename: 'style.css'
		}),

		new HtmlWebpackPlugin({
			title: 'My React App',
			template: './src/index.html',
		})
	]

};

module.exports = config;
