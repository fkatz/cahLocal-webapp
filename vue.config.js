// vue.config.js
module.exports = {
  // options...
  chainWebpack: config => config.plugins.delete('named-chunks'),
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8484/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  runtimeCompiler: true,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
