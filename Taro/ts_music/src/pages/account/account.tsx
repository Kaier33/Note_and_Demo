import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


class Account extends Component {
    config: Config = {
        navigationBarTitleText: '账户'
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
                <Text>Account</Text>
            </View>
        )
    }
}


export default Account;
