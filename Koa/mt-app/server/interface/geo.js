import Router from 'koa-router' // koa路由
import axios from '../interface/utils/axios' // axios

import MenusModel from '../dbs/models/menus'
import ProvinceModel from '../dbs/models/province'

let router = new Router({ prefix: '/geo'})

const sign = 'a3c9fe0782107295ee9f1709edd15218'

// 获取当前城市
router.get('/getPosition', async (ctx) => {
  let { status, data: {province, city} } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if ( status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 获取菜单
router.get('/menu', async (ctx) => {
  const menus = await MenusModel.find({})
  if (menus) {
    ctx.body = {
      code: 0,
      menu:menus[0].menu
    }
  } else {
    ctx.body = {
      code: 0,
      menu: []
    }
  }
})

// 获取省份
router.get('/province', async (ctx) => {
  let province  = await ProvinceModel.find({})
  if (province) {
    ctx.body = {
      code: 0,
      province : province.map(item => {
        return {
          id: item.id,
          name: item.value
        }
      })
    }
  } else {
    ctx.body = {
      code: -1,
      province: []
    }
  }
})

export default router
