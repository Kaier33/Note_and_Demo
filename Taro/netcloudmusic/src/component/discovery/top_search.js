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
                <View className='taro-img'>
                    <Image src={TOPLISTEN}></Image>
                </View>
                <View>
                    <Input className='search' type='text' placeholder='网易云音乐233'></Input>
                </View>
                <View className='taro-img'>
                    <Image src={MUSICPLAYING}></Image>
                </View>
            </View>
        )
    }
}

export default TopSearch
