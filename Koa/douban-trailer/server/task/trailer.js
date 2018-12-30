const cp = require('child_process') // 子进程
const { resolve } = require('path') // 拼接路径

;(async () => {
  const script = resolve(__dirname, '../crawler/video.js') // 拿脚本
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
    console.log(data)
  })
})()