/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
  context: `${__dirname}/build/client`,
  target: 'web',
  mode: NODE_ENV,
  entry: {
    bundle: './entry.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist/public`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/client/index.html`,
    }),
    // copy server files out to the dist directory
    new CopyPlugin([
      { from: `${__dirname}/build/server`, to: `${__dirname}/dist` },
    ]),
  ],
};
