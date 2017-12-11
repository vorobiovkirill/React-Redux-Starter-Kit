const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

const config = {

	devtool: 'source-map',

	entry: {
		main: [
			'babel-polyfill',
			'./src/scripts/index.js',
		],
		vendor: [
			'react',
			'redux',
			'react-redux',
			'redux-thunk',
			'lodash',
			'classnames',
			'semantic-ui-react',
			'whatwg-fetch',
			'prop-types',
		],
	},

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
		 * @link https://github.com/hyunchulkwak/webpack-simple-progress-plugin
		 */
		new SimpleProgressPlugin(),

		/**
		 * @link https://webpack.js.org/plugins/no-emit-on-errors-plugin/
		 */
		new webpack.NoEmitOnErrorsPlugin(),

		/**
		 * @link https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
		 */
		new webpack.optimize.OccurrenceOrderPlugin(),

		/**
		 * @link https://webpack.js.org/plugins/commons-chunk-plugin/
		 */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/vendor.js',
			minChunks: Infinity,
		}),

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

		/**
		 * @link http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
		 */
		new UglifyJsPlugin({
			parallel: true,
			uglifyOptions: {
				ie8: false,
				ecma: 6,
				warnings: true,
				mangle: true,
				output: {
					comments: false,
					beautify: false,
				},
			},
			warnings: true,
		}),

		/**
		 * @link https://github.com/NMFR/optimize-css-assets-webpack-plugin
		 */
		new OptimizeCssAssetsPlugin(),
	],

};

module.exports = config;
