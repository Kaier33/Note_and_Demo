import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'


// import './account.scss'

class Account extends Component {

  config = {
    navigationBarTitleText: '账号'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
          账号
      </View>
    )
  }
}

export default Account
