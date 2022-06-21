const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'app')
}

module.exports = {
  mode: process.env.NODE_ENV,
  watch: true,
  devtool:
    process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          ecma: 10,
          mangle: true,
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ]
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/](node_modules)[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all'
    //     }
    //   },
    //   name: false
    // }
  },
  entry: {
    bg: `${PATHS.source}/bg/index.js`,
    popup: `${PATHS.source}/popup/index.js`
  },
  output: {
    path: PATHS.build,
    filename: '[name]/bundle.js'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'source/')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous',
            presets: [['@babel/preset-env', { useBuiltIns: 'usage' }]],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        exclude: [
          /serp\.less/,
          `${PATHS.source}/options/components/`,
          `${PATHS.source}/style.less`
        ],
        use: [
          // 'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(less|css)$/,
        include: [
          /serp\.less/,
          `${PATHS.source}/options/components/`,
          `${PATHS.source}/style.less`
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:6]'
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|eot|otf|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 500000
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['app']
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'static' }]
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/styles.css'
    }),
    new ESLintPlugin({
      eslintPath: 'eslint'
    })
  ]
}
