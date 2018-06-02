const path = require('path')

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [], // if want to add antd lib, please add here
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
  publicPath: '/', // need to update public/index.html script and link path
  hash: true, // http://localhost:8000/#/
}
