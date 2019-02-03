const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const {
    resolve
} = require('path')
const {
    connect,
    initSchemas
} = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

mongoose.set('useCreateIndex', true) // 解决一个warn问题

;(async () => {
    await connect()
    initSchemas() // 引入所有的模型
    //   require('./task/movie') // 自动执行
    //   require('./task/api')
    const app = new Koa()
    await useMiddlewares(app)

    app.listen(4455, () => {
        console.log('App listening on port 4455!')
    })
})()


// // koa-router的固定用法
// app
//     .use(router.routes())
//     .use(router.allowedMethods()) // 允许使用基本的方法

// app.use(views(resolve(__dirname, './views'), {
//     extension: 'pug'
// }));

// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         you: "Luke",
//         me: 'Kaier'
//     })
// })