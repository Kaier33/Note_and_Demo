const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket

// 资源管理相关的操作首先要构建BucketManager对象：
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg) // 七牛上传对象

// https://developer.qiniu.com/kodo/sdk/1289/nodejs#rs-fetch 
const uploadToQiniu = async (url, key) => { // key是给上传资源重命名用的
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, respBody, info) => { //调用七牛云的fetch功能
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({
            key
          })
        } else {
          reject(info)
        }
      }
    })
  })
}

;
(async () => {
  const movies = [{
    doubanId: 26147417,
    title: '神奇动物：格林德沃之罪',
    rate: 7.2,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2539424621.jpg',
    video: 'http://vt1.doubanio.com/201812302300/c552a2028ca62239c34bf760b3a3b758/view/movie/M/402370883.mp4',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2537142196.jpg?'
  }]
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log("开始传 video")
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log("开始传 cover")
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        console.log("开始传 poster")
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')
        if (videoData.key) movie.videoKey = videoData.key
        if (coverData.key) movie.coverKey = coverData.key
        if (posterData.key) movie.posterKey = posterData.key
        console.log(movie)
      } catch (err) {
        console.log(err)
      }
    }
  })
})()

const temp = {
  doubanId: 26147417,
  title: '神奇动物：格林德沃之罪',
  rate: 7.2,
  poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2539424621.jpg',
  video: 'http://vt1.doubanio.com/201812302300/c552a2028ca62239c34bf760b3a3b758/view/movie/M/402370883.mp4',
  cover: 'https://img3.doubanio.com/img/trailer/medium/2537142196.jpg?',
  videoKey:  'https:qiniu.kaier33.top/fj68sC1Wy6sTxSy3WMbJt.mp4',
  coverKey:  'https:qiniu.kaier33.top/oTQSmpI7_2tnQbF6TPdx5.jpg',
  posterKey: 'https:qiniu.kaier33.top/GyYlFVNjFhU_nT4sda8Pi.jpg'
}