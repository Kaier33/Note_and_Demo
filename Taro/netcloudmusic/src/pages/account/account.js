import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'


import './account.scss'

class Account extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      user: '18565765586',
      password: ''
    }
  }

  config = {
    navigationBarTitleText: '账号'
  }
  handleChangeUser(value) {
    this.setState({
      user: value
    })
  }
  handleChangePW(value) {
    this.setState({
      password: value
    })
  }
  aboutme() {
    Taro.request({
      url: 'https://music.kaier33.top/netcloud/recommend/resource',
      header: { cookie: Taro.getStorageSync('cookie')},
    }).then(res => {
      console.log(res)
    })
  }
  checkStatus() {
    Taro.request({
      url: 'https://music.kaier33.top/netcloud/login/status',
    }).then(res => {
      console.log(res)
    })
  }
  cookie(){
    Taro.setStorageSync('test','2333')
    console.log(Taro.getStorageSync('cookie'))
  }
  onSubmit() {
    console.log(this.state)
    const { user, password } = this.state;
    Taro.request({
      url: `https://music.kaier33.top/netcloud/login/cellphone?phone=${user}&password=${password}`,
    }).then(res => {
      console.log(res)
      if (res.statusCode == 200) {
        Taro.setStorageSync('cookie',res.header['Set-Cookie'])
        Taro.showToast({
          title: '登录成功',
          duration: 2000
        }).then(
          res => {
            Taro.navigateTo({ url: '/pages/topsong/topsong' })
          }
        )
      } else {
        Taro.showToast({
          title: '登录失败',
          duration: 2000
        })
      }
    })
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
        <View className='accountPage'>
          <AtForm>
            <AtInput
              name='value'
              title='账号'
              type='text'
              placeholder=''
              value={this.state.user}
              onChange={this.handleChangeUser.bind(this)}
            />
            <AtInput
              name='password'
              title='密码'
              type='password'
              placeholder=''
              value={this.state.password}
              onChange={this.handleChangePW.bind(this)}
            />
            <AtButton onClick={this.onSubmit.bind(this)}>登录</AtButton>
            <AtButton onClick={this.checkStatus.bind(this)}>查看登录状态</AtButton>
            <AtButton onClick={this.aboutme.bind(this)}>个人</AtButton>
            <AtButton onClick={this.cookie.bind(this)}>cookie</AtButton>
          </AtForm>
        </View>
      </View>
    )
  }
}

export default Account
