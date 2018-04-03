import { join } from 'path'
import { URL } from 'url'
import webpack from 'webpack'
// import S3Plugin from 'webpack-s3-plugin'

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
      // new S3Plugin({
      //   basePath: 'assets',
      //   exclude: /\.entrypoint|server\.js/,
      //   progress: false,
      //   s3Options: {
      //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      //   },
      //   s3UploadOptions: { Bucket: process.env.S3_BUCKET_NAME }
      // }),
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
