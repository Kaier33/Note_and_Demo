import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


class Video extends Component {
    config: Config = {
        navigationBarTitleText: '我的'
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='index'>
                <Text>Video</Text>
            </View>
        )
    }
}


export default Video;
