const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SimpleProgressPlugin = require("webpack-simple-progress-plugin");

const config = {
  mode: "production",

  devtool: "source-map",

  entry: {
    main: ["./src/index.js"],
    vendor: [
      "react",
      "redux",
      "react-redux",
      "redux-thunk",
      "lodash",
      "classnames",
      "semantic-ui-react",
      "whatwg-fetch",
      "prop-types"
    ]
  },

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
    extensions: [".js", ".jsx", ".css", ".sass", ".scss", ".html"]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          //   {
          //     loader: "style-loader"
          //   },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
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

  optimization: {
    splitChunks: {
      cacheGroups: {
        js: {
          test: /\.(js|jsx)$/,
          name: "commons",
          chunks: "all",
          minChunks: 7
        },
        css: {
          name: "styles",
          test: /\.(sass|scss|css)$/,
          chunks: "all",
          enforce: true
        }
      }
    }
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
     * @link https://webpack.js.org/plugins/module-concatenation-plugin/
     */
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
      inject: "body",
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
        minifyURLs: true
      }
    }),

    /**
     * @link https://webpack.js.org/plugins/commons-chunk-plugin/
     */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   filename: "js/vendor.js",
    //   minChunks: Infinity,
    //   children: true
    // }),

    /**
     * @link http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    // new UglifyJsPlugin(),

    /**
     * @link https://webpack.js.org/plugins/define-plugin/
     */
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify(
    //     process.env.NODE_ENV || "production"
    //   ),
    //   __DEVELOPMENT__: false,
    //   __PRODUCTION__: true
    // }),

    /**
     * @link https://github.com/NMFR/optimize-css-assets-webpack-plugin
     */
    new OptimizeCssAssetsPlugin()
  ]
};

module.exports = config;
