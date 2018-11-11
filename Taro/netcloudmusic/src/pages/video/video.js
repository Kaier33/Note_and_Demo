import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './video.scss'

class Video extends Component {

  config = {
    navigationBarTitleText: '视频'
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
        <View className='videoPage'></View>
      </View>
    )
  }
}

export default Video
