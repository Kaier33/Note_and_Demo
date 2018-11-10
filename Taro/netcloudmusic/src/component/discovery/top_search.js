import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'

class TopSearch extends Component {
    constructor(){
        super(...arguments)

    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='top-search-body'>
                <View className='identify'></View>
                <View>
                    <Input className='search' type='text' placeholder='网易云音乐'></Input>
                </View>
                <View className='music-playing'></View>
            </View>
        )
    }
}

export default TopSearch
