const prerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = prerenderSPAPlugin.PuppeteerRenderer
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new prerenderSPAPlugin({
          /*编译后的html需要存放的路径*/
          staticDir: path.join(__dirname, 'dist'),
          /*需要预渲染的路由路径 页面过多，可能导致预处理不成功，可分批次打包*/
          routes: ['/', '/about'],
          renderer: new Renderer({
            renderAfterDocumentEvent: "render-event",
            /*渲染时显示浏览器窗口。用于调试。*/
            headless: false,
            inject: {
              foo: 'bar'
            },
            /*延时渲染 如果页面有从接口获取的数据，最好加上延时渲染*/
            captureAfterTime: 5000
          })
        })
      ]
    }
  }
}