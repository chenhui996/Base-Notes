const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.[contenthash].js",
    path: path.join(__dirname, "dist"),
  },
  // 根据不同模块进行不同的解析
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  // 解析 html
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
  ],
};
