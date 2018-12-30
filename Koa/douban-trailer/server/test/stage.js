const { readFile } =require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const yy = new EE()

yy.on('event', ()=>{
  console.log("粗大事啦!")
})

setTimeout(()=>{
  console.log(' 0 毫秒后执行的定时器回调')
}, 0)

setTimeout(()=>{
  console.log(' 100 毫秒后执行的定时器回调')
}, 100)

setTimeout(()=>{
  console.log(' 200 毫秒后执行的定时器回调')
}, 200)

readFile('../../package.json', 'utf-8', _ =>{
  console.log('完成文件 1 读操作的回调')
})

readFile('../../index.html', 'utf-8', _ =>{
  console.log('完成文件 2 读操作的回调')
})

setImmediate(() => {
  console.log('immediate 立即回调')
})

process.nextTick(()=>{
  console.log('process.nextTick 的回调')
})

Promise.resolve()
  .then(() => {
    yy.emit('event')

    process.nextTick(()=>{
      console.log('process.nextTick 的第2个回调')
    })

    console.log('Promise 的第一次回调')
  })
  .then(()=>{
    console.log('promise 的第二次回调') // 当前的promise回调执行完毕后, 之前还有一个nextTick,优先执行
  })