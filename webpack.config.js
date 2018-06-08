const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (webpackConfig) => {
  webpackConfig.plugins.push(new CopyWebpackPlugin([{
    from: './src/assets',
    to: 'assets',
  }]))
  return webpackConfig
}
