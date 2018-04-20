import { join } from 'path'
import { URL } from 'url'
import webpack from 'webpack'

import EntrypointPlugin from '../lib/entrypoint-plugin'

const isProd = process.env.NODE_ENV === 'production'
const rootDir = process.cwd()

const assetsBaseUrl = new URL(process.env.ASSETS_BASE_URL)
const publicPath = `${assetsBaseUrl}/`

export default {
  devtool: !isProd
    ? 'eval'
    : 'hidden-source-map',
  target: 'web',
  entry: [
    ...!isProd ? [
      `webpack-dev-server/client?${assetsBaseUrl.origin}/`,
      'webpack/hot/only-dev-server'
    ] : [],
    join(rootDir, 'client/index.js')
  ],
  output: {
    path: join(rootDir, 'dist'),
    publicPath,
    filename: !isProd
      ? '[name].js'
      : '[name].[chunkhash].js',
    chunkFilename: !isProd
      ? '[name].js'
      : '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /\/common\/chunks.js/,
      './client-chunks.js'
    ),
    ...!isProd ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ] : [
      new EntrypointPlugin(),
      new webpack.HashedModuleIdsPlugin()
    ]
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: assetsBaseUrl.hostname,
    port: assetsBaseUrl.port,
    publicPath,
    hot: true
  }
}
