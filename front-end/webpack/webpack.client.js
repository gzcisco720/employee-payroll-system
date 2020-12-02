const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const base = require('./webpack.base');

const isDev = process.env.NODE_ENV !== 'production';

const config = merge(base, {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.join(__dirname, '../client/index.tsx'),
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../client/index.html'),
      // favicon: path.resolve(__dirname, '../favicon.ico')
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!server.js']
    })
  ]
});

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:9000'
    }
  }
  config.plugins.push(new webpack.SourceMapDevToolPlugin())
}
module.exports = config;