import { CHANGE_LOGINSTATUS } from '../constants/counter'

import Taro from '@tarojs/taro'

export const changeLoginStatus = () => {
    return {
        type: CHANGE_LOGINSTATUS
    }
}


const setBanner = (_data) => {
    return {
        type: BANNERS,
        data: _data
    }
}



// 异步的action
function asyncAdd() {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 2000)
    }
}

function asyncBanner() {
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
