import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


class Test extends Component {
    config: Config = {
        navigationBarTitleText: 'test'
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
                <Text>233</Text>
            </View>
        )
    }
}


export default Test;
