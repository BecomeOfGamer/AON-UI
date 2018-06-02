const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'], // for debug
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
