import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './mine.scss'
class Mine extends Component {

  config = {
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
      <View>
        <View className='minePage'></View>
      </View>
    )
  }
}

export default Mine
