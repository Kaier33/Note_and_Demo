import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'

import WXMAP from '../../component/WxMap/wx_map'
import H5Map from '../../component/H5Map/h5_map'
import './friends.scss'

class Friends extends Component {

  config = {
    navigationBarTitleText: '朋友'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loadMapTimer: null,
      loadstatus: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {

  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidMount() {
    // console.log('start')
    Taro.showLoading({ title: 'loading' })
    if (process.env.TARO_ENV === 'h5') {
      this.MapLoad(this.initMap)
    } else {
      Taro.hideLoading()
    }
  }
  initMap(status) {
    Taro.hideLoading()
    if (!status) {
      alert('地图脚本加载失败,请您在网络环境良好的地方刷新网页重新加载...')
    } else {
      this.setState({
        loadstatus: true
      })
    }
  }

  MapLoad(initMap) {
    let that = this;

    if (typeof BMap !== 'undefined') {
      that.initMap(true)
      return
    }

    this.state.loadMapTimer = setTimeout(() => {
      window.onBMapCallback = null
      that.initMap(false)
    }, 10000)

    window.onBMapCallback = function () {
      console.log('百度地图脚本初始化成功...')
      clearInterval(that.state.loadMapTimer)
      that.setState({
        loadstatus: true,
        loadMapTimer: null
      })
      that.initMap(true)
    }
    const Ak = 'Wdwynu86rCrk0vPv4ifIOFFnWi12fyEn'
    let scriptElm = document.createElement('script')
    scriptElm.setAttribute('type', 'text/javascript')
    scriptElm.setAttribute("src", `http://api.map.baidu.com/api?v=3.0&ak=${Ak}&callback=onBMapCallback`)
    document.body.appendChild(scriptElm)

  }

  render() {
    return (
      <View className='friendPage'>
        {/* <Text>Wdwynu86rCrk0vPv4ifIOFFnWi12fyEn</Text> */}
        {process.env.TARO_ENV === 'weapp' ? <WXMAP /> : ''}
        {process.env.TARO_ENV === 'h5' ? <H5Map loadstatus={this.state.loadstatus} /> : ''}
      </View>
    )
  }
}

export default Friends
