const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

const config = {
  mode: "development",

  cache: false,

  devtool: "cheap-module-eval-source-map",

  entry: [
    "babel-polyfill",
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?reload=true",
    "./src/index.js"
  ],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    sourceMapFilename: "[file].map",
    chunkFilename: "[name].[chunkhash].chunk.js",
    publicPath: "/"
  },

  performance: {
    hints: false
  },

  stats: {
    children: false
  },

  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".json", ".css", ".sass", ".scss", ".html"]
  },

  /**
   * @link https://webpack.github.io/docs/webpack-dev-server.html
   */
  // devServer: {
  // 	contentBase: path.resolve(__dirname, 'src'),
  // 	compress: true,
  // 	historyApiFallback: true,
  // 	port: 8080,
  // 	inline: true,
  // 	open: true,
  // 	stats: {
  // 		colors: true,
  // 		hash: false,
  // 		version: false,
  // 		timings: false,
  // 		assets: false,
  // 		chunks: false,
  // 		modules: false,
  // 		reasons: false,
  // 		children: false,
  // 		source: false,
  // 		errors: true,
  // 		errorDetails: true,
  // 		warnings: false,
  // 		publicPath: false,
  // 	},
  // },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          //   {
          //     loader: "style-loader",
          //     options: {
          //       sourceMap: true,
          //       hmr: true
          //     }
          //   },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              precision: 8
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: "file-loader?name=[path][name].[ext]?[hash]"
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
        exclude: /node_modules/,
        use: "file-loader?limit=100000&name=assets/[name].[hash:8].[ext]"
      }
    ]
  },

  //   optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         js: {
  //           test: /\.(js|jsx)$/,
  //           name: "commons",
  //           chunks: "all",
  //           minChunks: 2
  //         },
  //         css: {
  //           name: "styles",
  //           test: /\.(sass|scss|css)$/,
  //           chunks: "all",
  //           enforce: true
  //         }
  //       }
  //     }
  //   },

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
     * @link https://github.com/webpack-contrib/mini-css-extract-plugin
     */
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css"
      //   chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      title: "My React App!!!!",
      template: "./src/index.html.ejs",
      inject: "body"
    }),

    /**
     * @link https://webpack.js.org/plugins/define-plugin/
     */
    // new webpack.DefinePlugin({
    // 	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // 	__DEVELOPMENT__: true,
    // 	__PRODUCTION__: false,
    // }),

    /**
     * @link https://www.npmjs.com/package/open-browser-webpack-plugin
     */
    new OpenBrowserPlugin({
      url: "http://localhost:8080/"
    })
  ]
};

module.exports = config;
