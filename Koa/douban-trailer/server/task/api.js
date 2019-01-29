// const api = 'http://api.douban.com/v2/movie/subject/1764796'
// http://api.douban.com/v2/movie/30329046 这种更全面
// 爬到的粗数据, 在这里经过精加工. 这里请求的接口是 电影详情
const rp = require('request-promise-native')
const mongoose  = require('mongoose')
const Movie = mongoose.model('Movie')       // 拿到电影型
const Category = mongoose.model('Category') // 分类模型
async function fetchMovie(item) {     // 请求电影详情
  const url = `http://api.douban.com/v2/movie/${item.doubanId}`
  let result = await rp(url) // 传过来的是字符串. 要转义
  let body
  try {
    body = JSON.parse(result)
  } catch (err) {
    console.log(err)
  }
  return body
}

;(async () => {
  let movies = await Movie.find({
    $or: [ // 或 条件查询
      { summary: { $exists: false } }, // 数据是刚加的,还没被精加工的
      { summary: null },
      { year: { $exists: false } },
      { summary: ''},
      { title: '' },
    ]
  })

  for (let i = 0; i<movies.length; i++) {
  // for (let i = 0; i < [movies[0]].length; i++) { // 调试就用一条. 接口有访问限制
    let movie = movies[i] // movie表中某一条数据
    let movieData = await fetchMovie(movie)
    if (movieData) {
      let tags = movieData.tags || []
      
      movie.tags = movie.tags || []
      movie.summary = movieData.summary
      movie.title = movieData.alt_title ||  movieData.title || ''
      movie.rawTitle = movieData.title || ''

      if (movieData.attrs) { // 分类, 注意的是, 豆瓣的api经常变
        movie.movieTypes = movieData.attrs.movie_type || []
        movie.year = movieData.attrs.year[0] || 2333

        for(let i = 0; i < movie.movieTypes.length; i++) { // 遍历电影类型
          let item = movie.movieTypes[i]
          let cat = await Category.findOne({
            name: item
          })
          if (!cat) {
            cat = new Category({
              name: item,
              movies: [movie._id]
            })
          } else {
            if (cat.movies.indexOf(movie._id) === -1) {
              cat.movies.push(movie._id)
            }
          }
          await cat.save()
          
          if (!movie.category) {
            movie.category.push(cat._id)
          } else {
            if (movie.category.indexOf(cat._id) === -1) {
              movie.category.push(cat._id)
            }
          }
        }

        let dates = movieData.attrs.pubdate || []
        let pubdates = []

        dates.map(item => {
          if (item && item.split('(').length > 0) {
            let parts = item.split('(')
            let date = parts[0]
            let country = '未知'
            
            if (parts[1]) {
              country = parts[1].split(')')[0]
            }

            pubdates.push({
              date: new Date(date),
              country
            })
          }
        })

        movie.pubdate = pubdates
      }

      tags.forEach(tag => {
        movie.tags.push(tag.name)
      })
      console.log(movie)
      await movie.save()
    }
  }
})()

  // const data = [ 
  // { doubanId: 3878007,
  //   title: '海王',
  //   rate: 7.8,
  //   poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2541280047.jpg' 
  // },
  // { doubanId: 26425063,
  //   title: '无双',
  //   rate: 8.1,
  //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2535096871.jpg' 
  // }]
  // data.map(async item => {
  //   let res = await fetchMovie(item)
  //   try {
  //     res = JSON.parse(res)
  //     console.log(res.summary)
  //   }catch (err) {
  //     console.log(err)
  //   }
  // })