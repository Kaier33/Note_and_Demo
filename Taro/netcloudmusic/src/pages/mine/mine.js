import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text ,Image } from '@tarojs/components'

import './mine.scss'
import MINEPAGE from '../../asset/images/minepage.png'
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
      <View className='mine-page'>
        <Image src={MINEPAGE}></Image>
      </View>
    )
  }
}

export default Mine
