/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
  context: `${__dirname}/build/client`,
  target: 'web',
  mode: NODE_ENV,
  entry: {
    bundle: './entry.jsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: `${__dirname}/dist/public`,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/client/index.html`,
    }),
    // copy server files out to the dist directory
    new CopyPlugin([{ from: `${__dirname}/build/server`, to: `${__dirname}/dist` }]),
  ],
};
