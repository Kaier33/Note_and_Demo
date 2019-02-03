const {
  controller,
  get,
  post,
  put
} = require('../lib/decorator')

const {
  getAllMovies,
  getMovieDetail,
  getRelativeMoives
} = require('../service/movie')

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  async getMovies(ctx, next) {
    const {
      type,
      year
    } = ctx.query
    const movies = await getAllMovies()
    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMoives(movie)

    ctx.body = {
      'data': {
        movie,
        relativeMovies
      },
      'success': true
    }
  }
}



// const Router = require('koa-router')
// const router = new Router() // 处理不同形式的HTTP请求. 如 get / post
// const router = new Router({
//   prefix: '/movies' // 相当于通用前缀, router.get('/movies/all') 就不用写/movies前缀了
// })

// router.get/post.请求路径.中间件(可选).回调 
// router.methods('routePath/params', async (ctx,next)=>{ } , async (ctx, next) => {})
// router.get('/movies', async (ctx, next) => {
//   const Movie = mongoose.model('Movie') // 放在这里是为了防止movie还没初始化完毕, 拿到movie这张表
//   const movies = await Movie.find({}).sort({
//     'meta.createdAt': -1 // 根据创建的时间, 从最近到最远
//   })
//   ctx.body = {
//     movies
//   }
// })


// router.get('/movies/:id', async (ctx, next) => {
//   const Movie = mongoose.model('Movie')
//   const id = ctx.params.id
//   const movie = await Movie.find({_id: id})
//   ctx.body = {
//     movie
//   }
// })

// module.exports = router