const Koa = require('koa')
const {resolve} = require('path')
const serve = require('koa-static') // koa 本地静态资源文件服务器
const app = new Koa()
app.use(serve(resolve(__dirname, './')))
app.listen(4466, () => {
    console.log('App listening on port 4466!')
})