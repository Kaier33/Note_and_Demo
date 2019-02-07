import passport from 'koa-passport' // 针对Koa封装的passprot
import LocalStrategy from 'passport-local' // passport本地策略

import UserModel from '../../dbs/models/users' // user表

// 验证策略
passport.use(new LocalStrategy(async function(username, password, done){ 
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

// 每次请求的时候, 会从session中读取用户对象
// 查到用户通过验证, 登录成功之后, 把用户数据序列 后存储在session中
passport.serializeUser(function(user, done) {
  done(null, user)
})
// 反序列化session
passport.deserializeUser(function(user, done) {
  return done(null, user)
})

export default passport

