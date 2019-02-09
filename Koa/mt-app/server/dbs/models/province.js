import mongoose from 'mongoose'
const Schema = mongoose.Schema

const provinceSchema = new Schema({
  id : {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
})

export default mongoose.model('provinces', provinceSchema) // 创建并导出模型
