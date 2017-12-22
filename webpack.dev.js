const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = {

	devtool: 'cheap-module-eval-source-map',

	entry: './src/scripts/index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[name].[chunkhash].chunk.js',
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
		extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss', '.html'],
	},

	/**
	 * @link https://webpack.github.io/docs/webpack-dev-server.html
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'src'),
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
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.json$/,
				use: 'json-loader',
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader'],
				}),
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				exclude: /node_modules/,
				use: 'file-loader?name=[path][name].[ext]?[hash]',
			},
			{
				test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
				exclude: /node_modules/,
				use: 'file-loader?limit=100000&name=assets/[name].[hash:8].[ext]',
			},
		],
	},

	plugins: [

		/**
		 * @link https://webpack.js.org/plugins/hot-module-replacement-plugin/
		 */
		new webpack.HotModuleReplacementPlugin(),

		/**
		 * @link https://webpack.js.org/plugins/no-emit-on-errors-plugin/
		 */
		new webpack.NoEmitOnErrorsPlugin(),

		/**
		 * @link https://webpack.js.org/plugins/ignore-plugin/
		 */
		new webpack.IgnorePlugin(/\.json$/),

		new webpack.optimize.ModuleConcatenationPlugin(),

		/**
		 * @link https://github.com/webpack-contrib/extract-text-webpack-plugin
		 */
		new ExtractTextPlugin({
			filename: 'css/style.[hash].css',
		}),

		new HtmlWebpackPlugin({
			title: 'My React App!!!!',
			template: './src/index.html.ejs',
			inject: 'body',
		}),

		/**
		 * @link https://webpack.js.org/plugins/define-plugin/
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			__DEVELOPMENT__: true,
			__PRODUCTION__: false,
		}),

		/**
		 * @link https://www.npmjs.com/package/open-browser-webpack-plugin
		 */
		// new OpenBrowserPlugin({
		// 	url: 'http://localhost:8080/',
		// }),
	],

};

module.exports = config;
