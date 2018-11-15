import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { changeLoginStatus } from '../../actions/login'

import './personal.scss'

@connect((store) => ({
    store
}), (dispatch) => ({
    changeLoginStatus() {
        dispatch(changeLoginStatus())
    }
}))
class Personal extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            user: '',
            password: ''
        }
    }

    config = {
        navigationBarTitleText: '个人中心',
    }


    checkStatus() {
        Taro.request({
            url: 'https://music.kaier33.top/netcloud/login/status',
            header: { cookie: Taro.getStorageSync('cookie') },
            mode: 'cors',
            credentials: 'include',
        }).then(res => {
            console.log(res)
        })
    }

    quit() {
        Taro.request({
            url: 'https://music.kaier33.top/netcloud/logout',
            header: { cookie: Taro.getStorageSync('cookie') },
            mode: 'cors',
            credentials: 'include',
        }).then(res => {
            console.log(res)
            if (res.statusCode == 200) {
                Taro.showToast({ title: '退出登录' })
                Taro.setStorageSync('cookie', '')
                this.props.changeLoginStatus()
                // Taro.switchTab({ url: '/pages/account/account' })
                Taro.redirectTo({ url: '/pages/account/account' })
            }
        })
    }

    cookie() {
        Taro.setStorageSync('test', '2333')
        console.log(Taro.getStorageSync('cookie'))
    }
    gohome() {
        Taro.redirectTo({
            url: '/pages/index/index'
        })
    }



    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)
    }

    componentWillMount() {
        console.log(this.props.store)
        if (!this.props.store.main.login_status) {
            Taro.showToast({ title: '请重新登录', icon: 'none' })
            Taro.redirectTo({url:'/pages/index/index'})
            // Taro.redirectTo({ url: '/pages/account/account' })
            return
        }
    }
    componentWillUnmount() {

    }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View>
                <View className='personalPage'>
                    <View>
                        <Text>个人中心</Text>
                    </View>
                    <View>
                        <AtButton onClick={this.gohome.bind(this)}>去首页</AtButton>
                        <AtButton onClick={this.checkStatus.bind(this)}>查看登录状态</AtButton>
                        <AtButton onClick={this.quit.bind(this)}>退出登录</AtButton>
                    </View>
                </View>
            </View>
        )
    }
}

export default Personal
