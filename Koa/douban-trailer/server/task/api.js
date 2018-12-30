// const api = 'http://api.douban.com/v2/movie/subject/1764796'
const rp = require('request-promise-native')

async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  let result = await rp(url)
  return result
}

;(async () => {
  const data = [ 
  { doubanId: 3878007,
    title: '海王',
    rate: 7.8,
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2541280047.jpg' 
  },
  { doubanId: 26425063,
    title: '无双',
    rate: 8.1,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2535096871.jpg' 
  }]

  data.map(async item => {
    let res = await fetchMovie(item)
    try {
      res = JSON.parse(res)
      console.log(res.summary)
    }catch (err) {
      console.log(err)
    }
  })
})()