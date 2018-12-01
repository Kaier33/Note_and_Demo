import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem, } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

//pic
import FM from '../../asset/images/discovery/FM.png'
import MUSICLIST from '../../asset/images/discovery/musicList.png'
import PHB from '../../asset/images/discovery/phb.png'
import TJ from '../../asset/images/discovery/tj.png'

// component
import TopSearch from '../../component/discovery/top_search'  //顶部搜索
import List from '../../component/discovery/list'             //列表
import StartBG from '../../component/startapp_bg/start_page'  //启动页


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

interface State {
  searchValue: String,
  loading: boolean,
  currentTab: Number,
  selfhoodBanners: [],
  recommendMusicList: [],
  newsong: [],
  djprogram: [],
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '发现'
  }
  state: State = {
    searchValue: '',
    loading: false,
    currentTab: 0,
    selfhoodBanners: [], //轮播1
    recommendMusicList: [], //推荐歌单,
    newsong: [], // 最新音乐
    djprogram: [], //主播电台
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
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
