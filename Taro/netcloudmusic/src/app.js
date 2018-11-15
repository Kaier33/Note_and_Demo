import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index/index'


import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/friends/friends',
      'pages/index/index',
      'pages/video/video',
      'pages/mine/mine',
      'pages/topsong/topsong',
      'pages/account/account',
      'pages/player/player',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: 'red',
      navigationBarTitleText: 'NetCloudMusic',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: "#626567",
      selectedColor: "red",
      backgroundColor: "#FBFBFB",
      borderStyle: "#C7C2C6",
      list: [{
        // pagePath: "pages/index/index",
        pagePath: "pages/friends/friends",
        text: "发现",
        iconPath: "./asset/images/tabBar/discovery2.png",
        selectedIconPath: "./asset/images/tabBar/discovery1.png"
      }, {
        pagePath: "pages/video/video",
        text: "视频",
        iconPath: "./asset/images/tabBar/video2.png",
        selectedIconPath: "./asset/images/tabBar/video1.png"
      },
      {
        pagePath: "pages/mine/mine",
        text: "我的",
        iconPath: "./asset/images/tabBar/music2.png",
        selectedIconPath: "./asset/images/tabBar/music1.png"
      },
      {
        pagePath: "pages/friends/friends",
        text: "朋友",
        iconPath: "./asset/images/tabBar/friend2.png",
        selectedIconPath: "./asset/images/tabBar/friend1.png"
      },
      {
        pagePath: "pages/account/account",
        text: "账号",
        iconPath: "./asset/images/tabBar/account2.png",
        selectedIconPath: "./asset/images/tabBar/account1.png"
      }
      ]
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
