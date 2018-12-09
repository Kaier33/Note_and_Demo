const Koa = require('koa')
const app = new Koa()
const views =require('koa-views')
const {resolve} = require('path')

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}));

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: "Luke",
        me: 'Kaier'
    })
})

app.listen(4455, () => {
    console.log('App listening on port 4455!')
})