const prerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = prerenderSPAPlugin.PuppeteerRenderer
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new prerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          indexPath: path.join(__dirname, 'dist', 'index.html'),
          routes: ['/', '/about'],
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
          },
          renderer: new Renderer({
            maxConcurrentRoutes: 4,
            renderAfterDocumentEvent: 'custom-render-trigger',
            headless: false,
            inject: {
              foo: 'bar'
            },
            // 官网那里写了并不推荐使用, 而网上很多教程都写了这点~~ 
            // renderAfterTime: 5000
          })
        })
      ]
    }
  }
}