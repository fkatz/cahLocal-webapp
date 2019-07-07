// vue.config.js
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
module.exports = {
  // options...
  chainWebpack: config => config.plugins.delete('named-chunks'),
  configureWebpack: {
    plugins: [
      new SWPrecacheWebpackPlugin({
        cacheId: 'caym',
        filename: 'service-worker.js',
        staticFileGlobs: [
          'dist/**/*.{js,css}',
          'manifest.json',
          '/'
        ],
        minify: true,
        stripPrefix: 'dist/',
        dontCacheBustUrlsMatching: /\.\w{6}\./
      })
    ]},
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
