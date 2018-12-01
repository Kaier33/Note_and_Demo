import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


class Mine extends Component {
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
                <Text>Mine</Text>
            </View>
        )
    }
}


export default Mine;
