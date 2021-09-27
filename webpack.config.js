const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  const prod = process.env.NODE_ENV === "production";
  const mode = prod ? "production" : "development";
  const devtool = prod ? "hidden-source-map" : "eval";
  const cssLoader = [];
  const plugins = [];
  if (prod) {
    cssLoader.push(MiniCssExtractPlugin.loader, "css-loader", "sass-loader");
    plugins.push(new HtmlWebpackPlugin({ template: "./index.html" }), new MiniCssExtractPlugin());
  } else {
    cssLoader.push("style-loader", "css-loader", "sass-loader");
    plugins.push(new HtmlWebpackPlugin({ template: "./index.html" }));
  }
  return {
    mode,
    devtool,
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["> 10% in KR"],
                  },
                  debug: true,
                },
              ],
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: cssLoader,
        },
      ],
    },
    output: {
      path: path.join(__dirname, "public"),
      filename: "app.js",
    },
    plugins,
  };
};
