const webpack = require("webpack");
const resolve = require("path").resolve;
const CompressionPlugin = require("compression-webpack-plugin");

const config = {

  entry: {
    home: __dirname + '/js/home.js',
  },
  output: {

    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [

          "style-loader",

          "css-loader",

          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: {

          loader: "url-loader",
          options: {

            limit: 1000000,
          },
        },
      },

    ],
  }
};
module.exports = (env, argv) => {

  if (argv.mode === "development") {

    config.output.path = resolve("../../static/public/")
    config.output.clean = {
      keep: "sitemap.xml", // Keep these assets under 'ignored/dir'.
    }
   // config.devtool = "source-map"
    config.watch = true
  }
  if (argv.mode === 'production') {
    config.output.clean = {
      keep: "sitemap.xml", // Keep these assets under 'ignored/dir'.
    }
    config.output.path = resolve("../../static/public")
  }

  return config
}
