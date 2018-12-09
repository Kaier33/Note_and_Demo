const Koa = require('koa')
const app = new Koa()
const ejs = require("ejs")
const pug = require("pug")
const {
    htmlTpl,
    ejsTpl,
    pugTpl
} = require('./tpl/index')

app.use(async (ctx, next) => {
    ctx.type = "text/html; charset=utf-8"
    ctx.body = pug.render(pugTpl, {
        "you": "Luke",
        "me": "Kaier"
    })
})

app.listen(4455, () => {
    console.log('App listening on port 4455!')
})