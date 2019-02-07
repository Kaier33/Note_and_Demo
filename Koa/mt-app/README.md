# mt-app
> 美团 nuxt+koa 项目 

## 目录结构说明
```catalog  
├── assets                          // 资源集合
├── components                      // 组件
├── layout                          // 布局
├── middleware                      // 中间件
├── pages                           // 主视图(路由)
├── plugins                         // 插件
├── server                          // node层的代码
    ├── dbs                         // 数据库相关
        ├── models                  // 模型
        ├── config                  // 数据库配置
    ├── interface                   // 接口相关
        ├── utiles                  // 工具函数
├── static                          // 静态资源
├── store                           // vuex
└── nuxt.config.js                  // nuxt配置相关
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
