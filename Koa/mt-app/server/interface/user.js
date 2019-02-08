import Router from 'koa-router' // koa路由
import Redis from 'koa-redis'   // 操作redis. 比如多个用户同时注册, 记录不用用户的验证码, 用Redis来存取和对应各自用户的验证码
import nodemailer from 'nodemailer' // node 发邮件用的
 
import UserModel from '../dbs/models/users' // 用户模型, 用来操作user表的
import Passport from '../interface/utils/passport' // 验证
import axios from '..//interface/utils/axios' // axios

import Config from '../dbs/config' // 各个配置. 芒果, Redis, 邮箱

let router = new Router({ // 先加个前缀
  prefix: '/users'
})

let Store = new Redis().client // 获取Redis客户端, 用来操作Redis的

// 注册接口
router.post('/signup', async (ctx) =>{
  const {username, password, email, code} = ctx.request.body
  // 先验证 验证码
  if (code) {
                                    // 为了便于区分, Redis前缀(自己定义的) 代表各自的作用
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')     // 获取存储中Redis中的用户的验证码code, 用hahs去存
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 获取存在的redis中的过期时间

    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期, 请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else { // 防止那种绕过前端的验证的
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  // 验证 用户和密码
  let user = await UserModel.find({
    username
  })
  if (user.length) { // 查得到代表了被注册了
    ctx.body = {
      code : '-1',
      msg: '该用户名已被使用'
    }
    return 
  }

  // create 成功会写入数据库, 等同于去new Model后 Model.save()
  let nuser = await UserModel.create({
    username,
    password,
    email
  })

  if (nuser) { // 如果创建成功了
    let res = await axios.post('/users/signin', {username, password})
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code : -1,
      msg: '注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status){
    console.log('****登录接口的调用策略****')
    console.log(user) // 这里的user便是session中取的
    console.log(info)
    if (err) {
      ctx.body ={
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功'
        }
        // login 是passport这个中间件挂载在ctx上的,注意 app.use的顺序
        // https://segmentfault.com/a/1190000011557953
        // https://segmentfault.com/q/1010000017403695
        return ctx.login(user)
      } else { // 如果没有这个用户
        //  console.log("木有这个用户")
         ctx.body = {
           code: 1,
           msg: info
         }
      }
    }
  })(ctx, next)  // 固定写法
})

// 验证码接口
router.post('/verify',async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire > 0) { // 存在, 且过期
    ctx.body = {
      code: -1,
      msg: '请求过于频繁, 一分钟内一次'
    }
    return false
  }
  // https://nodemailer.com/smtp/ 文档
  let transporter = nodemailer.createTransport({
    host: Config.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Config.smtp.user,
      pass: Config.smtp.pass
    }
  })

  let ko = {
    code: Config.smtp.code(), //随机code
    expire: Config.smtp.expire(), // 过期时间
    email:ctx.request.body.email, // 接受方
    user: ctx.request.body.username // 接收方名字
  }
  
  // 发送信息配置https://nodemailer.com/message/
  let mailOptions = {
    from: `"认证邮件" <${Config.smtp.user}>`, // 谁发送的
    to: ko.email, // 接收方
    subject: 'MT 注册码',
    html: `您在MT中注册, 您的注册码是${ko.code}`
  }
  
  // 发送
  await transporter.sendMail(mailOptions, (err, info) =>{
    if (err) {
      return console.log('error')
    }else {
      // hmset支持对一个key 连续写入多个
      Store.hmset(`nodemail:${ko.user}`,'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送, 可能会有延迟, 有效期1分钟'
  }
})

// 退出接口
router.get('/exit', async(ctx ,next) =>{
  // logout也是portport挂载的
  await ctx.logout()
  // isAuthenticated藏得略深, 甚至是文档上面都没写, 检查是否处于登录状态
  // https://github.com/jaredhanson/passport/blob/2327a36e7c005ccc7134ad157b2f258b57aa0912/lib/http/request.js
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '注销成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '账户退出失败'
    }
  }
})

// 获取用户
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    // passport验证成功后, 会把用户信息放在session下
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      code: 0,
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }  
})

export default router