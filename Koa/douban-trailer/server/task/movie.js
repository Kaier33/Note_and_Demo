const cp = require('child_process') // 子进程
const { resolve } = require('path') // 拼接路径
const mongoose  = require('mongoose')
const Movie = mongoose.model('Movie') // 拿到模型
;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list.js') // 拿脚本
  const child = cp.fork(script, []) // cp.fork返回一个子进程对象, 第一个参数为要执行的脚本, 第二个传了一个空参数
  let invoked = false // 标识用, 表示脚本是否被执行过

  child.on('error', err => {
    if (invoked) return 
    invoked = true
    console.log(err);
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let err = code === 0 ? null : new Error('exit code' + code)
    console.log(err)
  })

  child.on('message', data => {
    let result = data.result
    result.forEach(async item => {
      let movie = await Movie.findOne({ // 查询没有这个电影
        doubanId: item.doubanId
      })
      if (!movie) {                    // 如果数据库中没有 , 则添加数据
        movie = new Movie(item)        // 添加数据
        await movie.save()             // 存入表中
      }
      
    })
    // console.log(result)
  })
})()