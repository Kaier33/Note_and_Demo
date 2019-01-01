const { readFile, readFileSync } =require('fs')

setImmediate(() => console.log('[阶段3.immediate] immediate 回调1'))
setImmediate(() => console.log('[阶段3.immediate] immediate 回调2'))
setImmediate(() => console.log('[阶段3.immediate] immediate 回调3'))

Promise.resolve().then(()=>{
  console.log('[ ...待切入下一阶段 ] promise 回调1')
  setImmediate(() => console.log('[阶段3.immediate] promise 回调1 增加的 immediate 回调4'))
})

readFile('../../package.json','utf-8', _ => {
  console.log('[阶段2... I/O回调] 读文件回调1')

  readFile('./video.mp4','utf-8', _ => {
    console.log('[阶段2... I/O回调] 读文件回调2')

    setImmediate(() => console.log('[阶段3.immediate] 读文件回调2 增加的 immediate 回调4'))
  })

  setImmediate(()=>{
    console.log('[阶段3.immediate] immediate 回调4')

    Promise.resolve().then(()=>{
      console.log('[ ...待切入下一阶段 ] promise 回调2')
      process.nextTick(()=>{
        console.log('[... 待切入下一阶段] promise 回调2 增加的nextTick 回调5')
      })
    })
    .then(()=>{
      console.log('[ ...待切入下一阶段 ] promise 回调3')
    })
  })

  setImmediate(()=>{
    console.log('[阶段3.immediate] immediate 回调6')
    process.nextTick(()=>{
      console.log('[... 待切入下一阶段] immediate 回调6 增加的nextTick 回调7')
    })
    console.log("[ ...待切入下一阶段 ] 这里正在同步阻塞的读一个大文件")
    const video = readFileSync('./video.mp4', 'utf-8')
    process.nextTick(()=>{
      console.log('[... 待切入下一阶段] immediate 回调6 增加的nextTick 回调8')
    })
    readFile('../../package.json', 'utf-8', _ =>{
      console.log('[阶段2... I/O回调] 读文件回调3')
      setImmediate(() => console.log('[阶段3.immediate] 读文件回调3 增加的 immediate 回调6'))
      setTimeout(()=>console.log("[阶段1... 读文件回调3 增加的 定时器回调8]", 0))
    })
  })
  process.nextTick(()=> {
    console.log('[... 待切入下一阶段] 读文件回调1 增加的 nextTick 回调6')
  })

  setTimeout(() => console.log('[阶段1 ... 定时器] 定时器 回调5'), 0) 
  setTimeout(() => console.log('[阶段1 ... 定时器] 定时器 回调6'), 0) 
}) 

// 有可能time 优先于immediate, 有时候 node启动事件循环时, 定时器函数有可能还没被检测到
setTimeout(() => console.log('[阶段1 ... 定时器] 定时器 回调1'), 0) 
setTimeout(() => {
  console.log('[阶段1 ... 定时器] 定时器 回调2')
  process.nextTick(()=> { // 要进入下一阶段前, 会先执行完当前阶段的 microtask
    console.log('[... 待切入下一阶段] nextTick 回调5')
  })
}, 0)
setTimeout(() => console.log('[阶段1 ... 定时器] 定时器 回调3'), 0)
setTimeout(() => console.log('[阶段1 ... 定时器] 定时器 回调4'), 0)

process.nextTick(()=> console.log('[... 待切入下一阶段] nextTick 回调1'))
process.nextTick(()=> {
  console.log('[... 待切入下一阶段] nextTick 回调2')
  process.nextTick(()=> console.log('[... 待切入下一阶段] nextTick 回调4'))
})
process.nextTick(()=> console.log('[... 待切入下一阶段] nextTick 回调3'))