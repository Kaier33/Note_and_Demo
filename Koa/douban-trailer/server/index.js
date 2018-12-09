const Koa = require('koa')
const app = new Koa()
app.use(async(ctx, next) =>{
    ctx.body= '电影首页'
})

app.listen(4455, () => {
    console.log('App listening on port 4455!');
});