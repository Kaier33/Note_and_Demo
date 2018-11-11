const config = {
  projectName: 'netcloudmusic',
  date: '2018-11-10',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    }
  },
  defineConstants: {
  },
  weapp: {
    module: {
      postcss: {
        // 小程序端样式引用本地资源内联
        url: {
          enable: true,
          config: {
            limit: 20240 // 设定转换尺寸上限
          }
        }
      }
    }
  },
  h5: {
    publicPath: './',
    staticDirectory: 'asset',
    module: {
      // rules: [
      //   {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [
      //       {
      //         loader: 'url-loader',
      //         options: {
      //           limit: 8192
      //         }
      //       }
      //     ]
      //   }
      // ],
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
