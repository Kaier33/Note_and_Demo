import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'

import TOPLISTEN from '../../asset/images/toplisten.png'
import MUSICPLAYING from '../../asset/images/musicPlaying.png'


class TopSearch extends Component {
    static options = {
        addGlobalClass: true
    }
    constructor() {
        super(...arguments)
    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='top-search-body'>
                <Image src={TOPLISTEN}></Image>
                {/* <View className='identify'></View> */}
                <View>
                    <Input className='search' type='text' placeholder='网易云音乐'></Input>
                </View>
                <Image src={MUSICPLAYING}></Image>
                {/* <View className='music-playing'></View> */}
            </View>
        )
    }
}

export default TopSearch
