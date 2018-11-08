import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './mine.scss'

export default class Mine extends Component {
    config = {
        navigationBarTitleText: '我的',
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='mine-page'>
                <Text>我的主页</Text>
            </View>
        )
    }
}