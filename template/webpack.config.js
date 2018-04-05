const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ip = require("ip");

module.exports = {
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "example")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue|js$/,
        enforce: "pre",
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "eslint-loader",
            options: {
              formatter: require("eslint-friendly-formatter")
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  performance: {
    hints: false
  }
};

// 库发布
if (process.env.NODE_ENV === "release") {
  module.exports = Object.assign(module.exports, {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "lib"),
      filename: "{{name}}.js",
      libraryTarget: "umd"
    },
    plugins: [
      new webpack.BannerPlugin("{{name}} v1.0.0 (http://www.agree.com.cn/)"),
      new UglifyJSPlugin({
        sourceMap: false
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ]
  });
}

// 开发阶段
if (process.env.NODE_ENV === "development") {
  module.exports = Object.assign(module.exports, {
    entry: {
      app: "./example/main.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].js",
      publicPath: "/",
      libraryTarget: "umd"
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      host: ip.address(),
      inline: true,
      disableHostCheck: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        inject: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("app.css")
    ]
  });
}

// 演示例子打包
if (process.env.NODE_ENV === "production") {
  module.exports = Object.assign(module.exports, {
    entry: {
      app: "./example/main.js",
      vendor: ["vue", "vue-router"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[hash].js",
      publicPath: "./"
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        inject: true
      }),
      new UglifyJSPlugin({
        sourceMap: false
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new ExtractTextPlugin("css/app.css"),
      new CleanWebpackPlugin(["dist"]),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "static"),
          to: "static",
          ignore: [".*"]
        }
      ])
    ]
  });
}
