import Taro, {
  Component
} from '@tarojs/taro'
import Index from './pages/index'


import './app.scss'

class App extends Component {
  // pages下面引用各个首页组件
  config = {
    pages: [
      'pages/index/index',
      'pages/discovery/discovery',
      'pages/mine/mine',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'taro知乎',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#2A8CE5",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./asset/images/index.png",
          selectedIconPath: "./asset/images/index_focus.png"
        }, {
          pagePath: "pages/discovery/discovery",
          text: "发现",
          iconPath: "./asset/images/discovery.png",
          selectedIconPath: "./asset/images/discovery_focus.png"
        },
        {
          pagePath: "pages/mine/mine",
          text: "我的",
          iconPath: "./asset/images/burger.png",
          selectedIconPath: "./asset/images/burger_focus.png"
        }
      ]
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return ( <
      Index / >
    )
  }
}

Taro.render( < App / > , document.getElementById('app'))
