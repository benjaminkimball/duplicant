import dotenv from 'dotenv'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { join } from 'path'
import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import S3Plugin from 'webpack-s3-plugin'

const isProd = process.env.NODE_ENV === 'production'

dotenv.config({ silent: isProd })

export default {
  devtool: isProd ? 'source-map' : 'eval',
  target: 'web',
  entry: {
    embedded: [
      'es6-promise/auto',
      ...!isProd ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:5001',
        'webpack/hot/only-dev-server'
      ] : [],
      join(process.cwd(), 'client/embedded.js')
    ],
    hosted: [
      'es6-promise/auto',
      ...!isProd ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:5001',
        'webpack/hot/only-dev-server'
      ] : [],
      join(process.cwd(), 'client/hosted.js')
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'reselect',
      join(process.cwd(), 'vendor/analytics.js')
    ]
  },
  output: {
    path: isProd ? join(process.cwd(), 'dist') : join(process.cwd(), '.build'),
    publicPath: `${isProd ? process.env.CDN_BASE_URL : 'http://0.0.0.0:5001'}/assets/`,
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              'sass-loader',
              {
                loader: 'postcss-loader',
                options: {
                  indent: 'postcss',
                  plugins: () => [
                    require('autoprefixer')({ flexbox: 'no-2009' }),
                    require('postcss-flexbugs-fixes')
                  ]
                }
              }
            ]
          })
          : [
            'style-loader',
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'sass-loader'
          ],
        include: [join(process.cwd(), 'client')]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_BASE_URL': JSON.stringify(process.env.APP_BASE_URL),
      'process.env.CDN_BASE_URL': JSON.stringify(process.env.CDN_BASE_URL),
      'process.env.COOKIE_DOMAIN': JSON.stringify(process.env.COOKIE_DOMAIN),
      'process.env.PROXY_BASE_URL': JSON.stringify(process.env.PROXY_BASE_URL),
      'process.env.SEGMENT_WRITE_KEY': JSON.stringify(process.env.SEGMENT_WRITE_KEY)
    }),
    ...!isProd ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ] : [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new ManifestPlugin(),
      new S3Plugin({
        basePath: 'assets',
        include: /\.(css|js|map)$/,
        progress: true,
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        },
        s3UploadOptions: { Bucket: 'nav-static' }
      }),
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
