import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text,Audio } from '@tarojs/components'
import { AtNavBar, AtIcon } from 'taro-ui'

import './player.scss'
class PlayerPage extends Component {
    config = {
        navigationBarTitleText: 'player'
    }
    constructor() {
        super(...arguments)
        this.state = {
            allList: []
        }
    }
    back() {
        // Taro.navigateTo({ url: '/pages/index/index' })
        Taro.navigateBack();
    }
    handleClick() {
        console.log(233)
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        // https://music.kaier33.top/netcloud/top/song?type=0&limit=20
        // Taro.showLoading({ title: 'loading' })
        // Taro.request({
        //     url: 'https://music.kaier33.top/netcloud/top/song'
        // }).then(res => {
        //     Taro.hideLoading()
        //     console.log('新歌速递 typeAll')
        //     // console.log(res)
        //     if (res.statusCode == 200) {
        //         this.setState({
        //             allList: res.data.data.slice(0, 20)
        //         }, () => {
        //             console.log(this.state.allList)
        //         })
        //     }
        // })
    }
    render() {
        return (
            <View className='PlayerPage'>
                <AtNavBar
                    onClickRgIconSt={this.handleClick}
                    onClickLeftIcon={this.back}
                    color='#000'
                    title='网易云音乐'
                    leftText='返回'
                    rightFirstIconType='sound'
                />
                <Audio
                    src='http://m10.music.126.net/20181112013936/321e35cd37180ddd54331a0b5086718e/ymusic/2242/0271/8dd1/b6da3ffc8d2561b321284004c81da136.mp3?id=1293886117.mp3'
                    controls={true}
                    autoplay={false}
                    loop={false}
                    muted={true}
                    initialTime='30'
                    id='video'
                />
            </View>
        )
    }
}

export default PlayerPage
