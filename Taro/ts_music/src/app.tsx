import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/video/video',
      'pages/mine/mine',
      'pages/account/account',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#626567",
      selectedColor: "red",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/index",
        text: "发现",
        iconPath: "./asset/images/tabBar/discovery2.png",
        selectedIconPath: "./asset/images/tabBar/discovery1.png"
      }, {
        pagePath: "pages/video/video",
        text: "视频",
        iconPath: "./asset/images/tabBar/video2.png",
        selectedIconPath: "./asset/images/tabBar/video1.png"
      }, {
        pagePath: "pages/mine/mine",
        text: "我的",
        iconPath: "./asset/images/tabBar/music2.png",
        selectedIconPath: "./asset/images/tabBar/music1.png"
      }, {
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
