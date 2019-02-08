import passport from 'koa-passport' // 针对Koa封装的passprot
import LocalStrategy from 'passport-local' // passport本地策略

import UserModel from '../../dbs/models/users' // user表

// 注册策略 - 在使用 passport.authenticate('策略', ...) 的时候，会执行对应注册的策略
passport.use(new LocalStrategy(async function(username, password, done){ 
  console.log("*****这里的是注册策略事件*****")
  console.log(username)
  console.log(password)
  let where = {
    username
  }
  let result = await UserModel.findOne(where) // 先是否有这个用户

  if (result !=null) { // 有的话
    if (result.password === password) { // 判断密码是否相等
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户名不存在')
  }
}))

// ctx.login()请求触发
// 查到用户通过验证, 登录成功之后, 把用户数据序列 后存储在session中
passport.serializeUser(function(user, done) {
  console.log("触发了session序列化")
  done(null, user)
})
// 反序列化session
passport.deserializeUser(function(user, done) {
  console.log("触发session反序列化啦")
  return done(null, user)
})

export default passport

