import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './friends.scss'

class Friends extends Component {

  config = {
    navigationBarTitleText: '朋友'
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
        <View className='friendPage'></View>
      </View>
    )
  }
}

export default Friends
