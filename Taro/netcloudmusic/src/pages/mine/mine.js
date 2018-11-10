import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

// import './mine.scss'
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
          我的页面
      </View>
    )
  }
}

export default Mine
