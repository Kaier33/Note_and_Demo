import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtNavBar, AtIcon } from 'taro-ui'

import './topsong.scss'
class TopSong extends Component {
    config = {
        navigationBarTitleText: '新歌速递'
    }
    constructor() {
        super(...arguments)
        this.state = {
            allList: []
        }
    }
    backhome() {
        Taro.navigateTo({ url: '/pages/index/index' })
    }

    playmusic(e) {
        console.log(2222)
        console.log(e)
    }

    handleClick() {
        Taro.navigateTo({ url: '/pages/player/player' })
    }


    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        // https://music.kaier33.top/netcloud/top/song?type=0&limit=20
        if (window.localStorage.getItem('tempList')) {
            let tempList = JSON.parse(window.localStorage.getItem('tempList'))
            this.setState({
                allList: tempList
            })
        } else {
            Taro.showLoading({ title: 'loading' })
            Taro.request({
                url: 'https://music.kaier33.top/netcloud/top/song'
                // url: 'https://music.kaier33.top/netcloud/recommend/songs'
            }).then(res => {
                Taro.hideLoading()
                console.log('每日推荐 typeAll')
                // console.log(res)
                if (res.statusCode == 200) {
                    this.setState({
                        allList: res.data.data.slice(0, 20)
                        // allList: res.data.recommend.slice(0, 20)
                    }, () => {
                        window.localStorage.setItem("tempList", (JSON.stringify(this.state.allList)))
                        console.log(this.state.allList)
                    })
                }
            })
        }

    }
    render() {
        return (
            <View className='TopSongPage'>
                <AtNavBar
                    onClickRgIconSt={this.handleClick}
                    onClickLeftIcon={this.backhome}
                    color='#000'
                    title='网易云音乐'
                    leftText='返回'
                    rightFirstIconType='sound'
                />
                <View>
                    {
                        this.state.allList.map((item, index) => {
                            return (
                                <View className='music-list-item' key={index} onClick={this.playmusic.bind(this)} data-id={item.album} >
                                    <View className='cover' style={{
                                        background: "url(" + item.album.blurPicUrl + ")", backgroundPosition: "center",
                                        backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                    }}></View>
                                    <View className='info'>
                                        {/* <View className='song'>{item.name}</View>
                                        <View className='singer'>{item.artists[0].name}</View> */}
                                        <View className='song'>{item.album.name}</View>
                                        <View className='singer'>{item.album.company}</View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>

            </View>
        )
    }
}

export default TopSong
