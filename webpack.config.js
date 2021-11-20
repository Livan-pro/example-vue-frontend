const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => ({
  mode: argv.mode,
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "assets/[name].bundle.js",
    path: path.resolve(__dirname, argv.mode === "production" ? "build" : "dev"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "Выбор решения",
      template: "src/template.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/img", to: "assets/img" }],
    }),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl:
        argv.mode === "production"
          ? "https://raw.githubusercontent.com/Livan-pro/example-vue-frontend/main/public/api"
          : "api",
    }),
  },
});
