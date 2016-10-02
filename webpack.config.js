// const webpack = require('webpack');

module.exports = {
  entry: "./js/entry.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", '.jsx'],
  //   resolve : {
  //   alias: {
  //     // bind version of jquery-ui
  //     "jquery-ui": "jquery-ui/jquery-ui.js",
  //     // bind to modules;
  //     modules: path.join(__dirname, "node_modules")
  //   }
  },
  devtool: 'source-maps',
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     "$":"jquery",
  //     "jQuery":"jquery",
  //     "window.jQuery":"jquery"
  //   })]
};
