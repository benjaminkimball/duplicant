import dotenv from 'dotenv'
import { join } from 'path'
import StartServerPlugin from 'start-server-webpack-plugin'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

const isProd = process.env.NODE_ENV === 'production'

dotenv.config({ silent: isProd })

export default {
  devtool: 'eval',
  target: 'node',
  watch: !isProd,
  entry: [
    'babel-polyfill',
    ...!isProd ? ['webpack/hot/poll?1000'] : [],
    join(process.cwd(), 'server/index.js')
  ],
  output: {
    path: isProd ? join(process.cwd(), 'dist') : join(process.cwd(), '.build'),
    filename: 'server.js'
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [{
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    ...!isProd ? [
      new StartServerPlugin('server.js'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ] : [
      new webpack.DefinePlugin({
        'process.env.MANIFEST': JSON.stringify(require('../dist/manifest.json'))
      }),
      new webpack.HashedModuleIdsPlugin()
    ]
  ]
}
