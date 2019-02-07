const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'                    // 芒果丝
import bodyParser from 'koa-bodyparser'            // 解析http请求体
import session from 'koa-generic-session'          // 处理session
import Redis from 'koa-redis'                      // 连接Redis
import json from 'koa-json'                        // koa专门处理json的
         
import dbConfig from './dbs/config'                // 数据库等配置
import passport from './interface/utils/passport'  // 验证策略(session)

import users from './interface/user'               // users接口

const app = new Koa()

app.keys = ['mt', 'keyskeys'] // 加密cookie
app.proxy = true
app.use(session({
  key: 'mt', // 替换默认cookies的名称
  prefix: 'mt:uid', // 替换Redis下的前缀
  store: new Redis() // 一般只有端口是默认的话, 无需像mongoose那样写配置,就能连接到Redis, 注意要先开启Redis服务
}))

app.use(bodyParser({ // 解析http请求体, 不然原生的格式不方便使用
  extendTypes: ['json', 'form', 'text']
}))

app.use(json())

mongoose.connect(dbConfig.dbs, { // 注意要先开启mongoose服务
  useNewUrlParser: true
})
// passport 固定写法
app.use(passport.initialize())
app.use(passport.session())


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  
  // router
  app.use(users.routes()).use(users.allowedMethods()) // 常用写法

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
