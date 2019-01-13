const puppeteer = require('puppeteer')
const url = `https://movie.douban.com/tag/#/?sort=U&range=7,10&tags=`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time);
})

;(async () =>{
  console.log('start visit the target page')
  const browser = await puppeteer.launch({  // 启动puppeteer
    args: ['-no-sandbox'], //启动非沙箱模式
    dumpio: false,
    executablePath: '../../chrome-mac/Chromium.app/Contents/MacOS/Chromium', // chromium是自行下载的
  })

  const page = await browser.newPage() // 开启一个新页面
  await page.goto(url, { // 跳转指定url, 上面定义了
    waitUntil: 'networkidle2' // 当网络空闲时,说明网页已经加载完毕了.
  })

  await sleep(3000) // 防止上面的网页没完全加载完

  await page.waitForSelector('.more') // 一直等待页面出现这个.more的加载按钮元素出现之后

  for (let i = 0; i < 1; i++) {  // 只抓取2页的数据
    await sleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => { // 获取网页内容
    let $ = window.$ // 豆瓣网页有加载jq
    let items = $('.list-wp a')
    let links = []
    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('.title').text()
        let rate = Number(it.find('.rate').text())
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio') //小图换成高清大图
        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })

  browser.close()

  process.send({ result }) // 发送数据
  process.exit(0)          // 退出进程
})()