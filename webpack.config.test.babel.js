let nodeExternals = require('webpack-node-externals')
let webpackConfig = require('./webpack.config.babel.js')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'source-map',
  module: webpackConfig.module
}
