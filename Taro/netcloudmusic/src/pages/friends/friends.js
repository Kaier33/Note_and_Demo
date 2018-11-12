import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text ,Image } from '@tarojs/components'

import FRIENDPAGE from '../../asset/images/firend.png'
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
      <View className='friendPage'>
        <Image src={FRIENDPAGE}></Image>
      </View>
    )
  }
}

export default Friends
