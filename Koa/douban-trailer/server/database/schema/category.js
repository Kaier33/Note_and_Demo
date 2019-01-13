// 引入 芒果丝
// 使用mongoose提供的定义模型的函数schema 来定义模型 
// 对数据类型变化比较大. 使用 mixed 

const mongoose = require('mongoose')
const Schema = mongoose.Schema         // 定义数据类型用的
const Mixed = Schema.Types.Mixed       // 把它理解成ts的any
const ObjectId = Schema.Types.ObjectId // 芒果丝的一种数据类型 

const categorySchema = new Schema({ // 定义schema
  name: {
    unique: true,
    type: String
  },
  movies: [{
    type: ObjectId,
    ref: 'Movie' // 指向关系, 让每一条关系的ref指向到 movie模型
  }],
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

categorySchema.pre('svae', next => { // pre是一个数据保存前的一个hook, next用于继续执行下去
  if (this.isNew) { // 判断是否是新数据
    this.meta.createdAt = this.meta.updatedAt = new Date() // 新数据添加更新时间
  } else {
    this.meta.updatedAt = new Date() // 老数据只更新 update时间
  }
  next()
})

// 创建model 模型, 那么整个项目中就可以直接引用这个category了
mongoose.model('Category', categorySchema)