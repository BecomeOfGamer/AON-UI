const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (webpackConfig) => {
  webpackConfig.plugins.push(new CopyWebpackPlugin([{
    from: './src/assets',
    to: 'assets',
  }]))
  webpackConfig.plugins.push(new CopyWebpackPlugin([{
    from: './src/skill',
    to: 'skill',
  }]))
  webpackConfig.plugins.push(new CopyWebpackPlugin([{
    from: './src/buff',
    to: 'buff',
  }]))
  return webpackConfig
}
