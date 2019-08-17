'use strict'

const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

let main = ['./src/site.js']
let common = ['./src/common.js']
let devtool

let plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: ['main'],
    inject: 'body'
  }),
  new HtmlWebpackPlugin({
    template: './src/error.html',
    chunks: ['common'],
    inject: 'body',
    filename: 'error.html'
  })
]

module.exports = {
  context: path.resolve(__dirname),

  entry: {
    'main': main,
    'common': common
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },

  output: {
    // Output path is set in main.js
    publicPath: '/',
    filename: '[name].[hash].js'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: [{ loader: 'babel-loader' }] },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnv({ browsers: 'last 2 versions' }),
              cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
            ]
          }
        }, 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.yml$/,
        loader: path.resolve('./loaders/radar-yaml-loader.js')
      },
      {
        test: /\.(png|jpg|ico)$/,
        exclude: /node_modules/,
        use: [{ loader: 'file-loader?name=images/[name].[ext]&context=./src/images' }]
      },
      {
        test: require.resolve('jquery'),
        use: [{ loader: 'expose-loader', options: 'jQuery' }, { loader: 'expose-loader', options: '$' }]
      },
      {
        test: require.resolve('./src/data'),
        use: {
          loader: 'val-loader',
          options: {
            // This is only used by webpack-dev-server, and is overridden in main.js
            data: require('./example-data.json')
          }
        }
      }
    ]
  },

  plugins: plugins,

  devtool: devtool,

  devServer: {
    host: '0.0.0.0',
    port: 8080
  }
}
