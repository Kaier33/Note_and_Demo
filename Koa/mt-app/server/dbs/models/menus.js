import mongoose from 'mongoose'
const Schema = mongoose.Schema

const menusSchema = new Schema({ // 定义 user schema
  menu: [{
    name: String,
    food: String,
    child: [{
      title: String,
      child: [{
        type: String
      }]
    }]
  }]
})

export default mongoose.model('menus', menusSchema) // 创建并导出模型
