// 引入 芒果丝
// 使用mongoose提供的定义模型的函数schema 来定义模型 
// 对数据类型变化比较大. 使用 mixed 

const mongoose = require('mongoose')
const Schema = mongoose.Schema   // 定义数据类型用的
const Mixed = Schema.Types.Mixed // 把它理解成ts的any

const movieSchema = new Schema({ // 定义schema
  doubanId: String,
  rate: Number,
  title: String,
  summary: String,
  video: String,
  poster: String,
  cover: String,

  videoKey: String,
  posterKey: String,
  coverKey: String,

  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,
  
  tags: [String],

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

// 创建model 模型, 那么整个项目中就可以直接引用这个movie了
mongoose.model('Movie', movieSchema)