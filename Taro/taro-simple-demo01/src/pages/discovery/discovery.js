import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './discovery.scss'

export default class Discovery extends Component {

    config = {
        navigationBarTitleText: '发现'
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='index'>
                <Text>发现</Text>
            </View>
        )
    }
}

