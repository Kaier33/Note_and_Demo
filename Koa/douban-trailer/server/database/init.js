// 引入
// 替换promise
// 暴露函数
// 判断是否是生产环境, 不是的话开启debug模式
// 连接数据库
// 地址
// 添加事件监听

const mongoose = require('mongoose')
const db = 'mongodb://localhost/test'
mongoose.Promise = global.Promise
exports.connect = () => {
  let maxConnectedTimes = 0
  return new Promise((reslove, reject) => { // 返回promise是为了确保引入方能在连接数据库之后进行操作
    if (process.env.NODE_ENV !== 'production') { // 开发环境开启debug模式
      mongoose.set('debug', true)
    }
    mongoose.connect(db, {
      useNewUrlParser: true
    })

    mongoose.connection.on('disconnected', () => { // 连接中断时, 比如网络中断,服务器重启
      if (maxConnectedTimes < 5) {
        maxConnectedTimes++
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了!')
      }
    })

    mongoose.connection.on('error', (err) => { // 连接发送错误时
      if (maxConnectedTimes < 5) {
        maxConnectedTimes++
        mongoose.connect(db)
      } else {
        reject(err)
      }
    })

    mongoose.connection.once('open', () => { // 只生效一次, 在连接成功的时候
      console.log('mongoDB connected successfully! ')
      // let catSchema = new mongoose.Schema({ // 定义模式schema
      //   name: String
      // })
      // // 事件必须在 编译模型前书写
      // catSchema.methods.speak = function () {
      //   console.log('喵喵喵~')
      // }
      // let Cat = mongoose.model('Cat', catSchema) // 模型

      // let Tom = new Cat({name: 'Tom'})
      // Tom.speak()

      // Tom.save().then(()=>{
      //    console.log('ok')
      // })



      reslove()
    })
  })

}