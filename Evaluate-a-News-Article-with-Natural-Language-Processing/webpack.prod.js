const webpack = require("webpack");
TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
path = require("path");

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
  devtool: false,
  output: {
    filename: "bundle.[contenthash].js", //file name
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
    clean: true,
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // Make sure the service worker takes control of the page
      skipWaiting: true, // Force the waiting service worker to become active
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|gif|svg|js|css|html)$/,
          handler: "StaleWhileRevalidate", // Use cache if available, and update in the background
          options: {
            cacheName: "assets-cache",
            expiration: {
              maxEntries: 100, // Cache a maximum of 100 assets
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache assets for 30 days
            },
          },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};
