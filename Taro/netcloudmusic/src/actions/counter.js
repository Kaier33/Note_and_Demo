import {
  ADD,
  MINUS,
  BANNERS,
  FIRSTUP
} from '../constants/counter'

import Taro from '@tarojs/taro'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

export const setBanner = (_data) => {
  return {
    type: BANNERS,
    data: _data
  }
}

export const firstUp = () => {
  return {
    type: FIRSTUP
  }
}

export function asyncBanner() {
  return dispatch => {
    Taro.showLoading({
      title: 'loading'
    });
    return Taro.request({
        url: 'https://music.kaier33.top/netcloud/banner'
      })
      .then(res => {
        Taro.hideLoading()
        console.log('bannerlist')
        if (res.statusCode == 200) {
          dispatch(setBanner(res.data.banners))
        }
      })
  }
}

// 异步的action
export function asyncAdd() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
