// 引入 芒果丝
// 使用mongoose提供的定义模型的函数schema 来定义模型 
// 对数据类型变化比较大. 使用 mixed 
// unique 用来保证唯一性, 比如用户名,邮箱,手机之类的

const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // 加密用
const Schema = mongoose.Schema // 定义数据类型用的
const Mixed = Schema.Types.Mixed // 把它理解成ts的any
const SALT_WORK_FACTOR = 10 // 构建盐的权重值, 越大 复杂度越高,性能损耗也高  
const MAX_LOGIN_ATTEMPTS = 5 // 登录错误次数
const LOCK_TIME = 2 * 60 * 60 * 1000 // 账户锁定时间

const userSchema = new Schema({ // 定义schema
  userName: {
    required: true,
    unique: true,
    type: String
  },
  email: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 芒果丝提供了 虚拟字段 , 它不会存入数据库, 每次都会进过一个get方法
// 判断是否账户锁定了
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

userSchema.pre('svae', function (next){ // pre是一个数据保存前的一个hook, 可以理解成中间件, next用于继续执行下去
  if (this.isNew) { // 判断是否是新数据
    this.meta.createdAt = this.meta.updatedAt = new Date() // 新数据添加更新时间
  } else {
    this.meta.updatedAt = new Date() // 老数据只更新 update时间
  }
  next()
})

// 让密码在保存之前进行 加密处理
userSchema.pre('svae', function (next){
  // 判断密码是否被修改
  if (!this.isModified('password')) return next()

  // 构建盐值
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    // 拿到salt之后, 就可以之后通过hash + salt的方式来进行加密了(加盐加密)
    bcrypt.hash(this.password, salt,  function(error, hash) {
      if (error) return next(error)
      this.password = hash
      next()
    })
  })
})

// 实例方法. methods 是具有 修改数据的能力
userSchema.methods = {
  /** 
   * @description     比较密码
   * @param _password 网站传过来的密码
   * @param password  数据库中的密码 
   * @return Boolearn
   */
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (err) reject(err)
        else resolve(isMatch)
      })
    })
  },

  /** 
   * @description    判断用户是不是超过了登录次数来进行锁定
   * @return Boolearn
   */
  incLoginAttempts: (user) => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }

        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME // 如果登录超过5次, 且用户没被锁定
          }
        }
        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

// 创建model 模型, 那么整个项目中就可以直接引用这个User了
mongoose.model('User', userSchema)