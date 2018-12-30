const puppeteer = require('puppeteer')
const url = `https://movie.douban.com/subject/`
const videoBase = `https://movie.douban.com/trailer/`
const doubanId = '26147417'

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time);
})

;(async () =>{
  console.log('start visit the target videos page')
  const browser = await puppeteer.launch({  // 启动puppeteer
    args: ['-no-sandbox'], //启动非沙箱模式
    dumpio: false
  })

  const page = await browser.newPage() // 开启一个新页面
  await page.goto(url+doubanId, { // 跳转指定url
    waitUntil: 'networkidle2' // 当网络空闲时,说明网页已经加载完毕了.
  })

  await sleep(2000) // 防止上面的网页没完全加载完

  const result = await page.evaluate(() => {
    let $ = window.$
    let it = $('.related-pic-video')
    if (it && it.length > 0) {
      let link = it.attr('href')
      let cover = it.css('background-image').slice(5,-2)
      return {
        link,
        cover
      }
    }
    return {}
  })
  
  let video 
  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await sleep(2000)
    video = await page.evaluate(()=>{
      let $ = window.$
      let it = $('source')
      if (it && it.length > 0) {
        return it.attr('src')
      }
      return ''
    })
  }

  const data = {
    video,
    doubanId,
    "cover" : result.cover
  }
  
  browser.close()
  process.send(data) // 发送数据
  process.exit(0)          // 退出进程
})()