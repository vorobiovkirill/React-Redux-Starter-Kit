const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

	entry: './src/scripts/index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/index.bundle.js',
		publicPath: '/',
	},

	performance: {
		hints: false,
	},

	stats: {
		children: false,
	},

	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules',
		],
		extensions: ['.js', '.jsx', '.sass', '.scss', '.html'],
	},

	/**
	 * @link https://webpack.github.io/docs/webpack-dev-server.html
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 8080,
		inline: true,
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
		},
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader',
				}),
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.(jpg|jpeg|gif|png|svg)$/,
				exclude: /node_modules/,
				use: 'url-loader?limit=100&name=img/[name].[ext]',
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				exclude: /node_modules/,
				use: 'url-loader?limit=1024&name=fonts/[name].[ext]',
			},
		],
	},

	plugins: [

		new webpack.optimize.ModuleConcatenationPlugin(),

		new ExtractTextPlugin({
			filename: 'css/style.[hash].css',
		}),

		new HtmlWebpackPlugin({
			title: 'My React App!!!!',
			template: './src/index.html.ejs',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),

		new webpack.HotModuleReplacementPlugin(),
	],

};

module.exports = config;
