const Dotenv = require('dotenv-webpack');

module.exports = (webpackConfig) => {
  webpackConfig.plugins.push(new Dotenv());
  return webpackConfig;
}
