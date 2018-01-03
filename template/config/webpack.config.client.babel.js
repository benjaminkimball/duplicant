import dotenv from 'dotenv'
import { join } from 'path'
import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'

const isProd = process.env.NODE_ENV === 'production'

dotenv.config({ silent: isProd })

export default {
  devtool: isProd ? 'source-map' : 'eval',
  target: 'web',
  entry: {
    client: [
      ...!isProd ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:5001',
        'webpack/hot/only-dev-server'
      ] : [],
      join(process.cwd(), 'client/index.js')
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'styled-components']
  },
  output: {
    path: isProd ? join(process.cwd(), 'dist') : join(process.cwd(), '.build'),
    publicPath: 'http://0.0.0.0:5001/assets/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    ...!isProd ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ] : [
      new ManifestPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: ['vendor'] }),
      new webpack.optimize.CommonsChunkPlugin({ name: ['bootstrap'], minChunks: Infinity })
    ]
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: '0.0.0.0',
    port: '5001',
    publicPath: 'http://0.0.0.0:5001/assets/',
    hot: true
  }
}
