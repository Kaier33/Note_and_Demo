import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({ // 定义 user schema
  username : {
    type: String,
    unique: true,  // 唯一性
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

export default mongoose.model('user', userSchema) // 创建并导出模型
