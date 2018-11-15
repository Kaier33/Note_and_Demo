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

  mrtj() {
    Taro.request({
      url: 'https://music.kaier33.top/netcloud/recommend/songs',
      header: { cookie: Taro.getStorageSync('cookie') },
      mode: 'cors',
      credentials: 'include',
    }).then(res => {
      console.log(res)
    })
  }

  grgd() {
    Taro.request({
      url: 'https://music.kaier33.top/netcloud/recommend/resource',
      header: { cookie: Taro.getStorageSync('cookie') },
      mode: 'cors',
      credentials: 'include',
    }).then(res => {
      console.log(res)
    })
  }

  checkStatus() {
    Taro.request({
      url: 'https://music.kaier33.top/netcloud/login/status',
      header: { cookie: Taro.getStorageSync('cookie') },
      mode: 'cors',
      credentials: 'include',
    }).then(res => {
      console.log(res)
    })
  }

  quit() {
    Taro.request({
      url: 'https://music.kaier33.top/netcloud/logout',
      header: { cookie: Taro.getStorageSync('cookie') },
      mode: 'cors',
      credentials: 'include',
    }).then(res => {
      console.log(res)
    })
  }

  cookie() {
    Taro.setStorageSync('test', '2333')
    console.log(Taro.getStorageSync('cookie'))
  }

  onSubmit() {
    // console.log(this.state)
    const { user, password } = this.state;
    Taro.request({
      url: `https://music.kaier33.top/netcloud/login/cellphone?phone=${user}&password=${password}`,
      mode: 'cors',
      credentials: 'include',
    }).then(
      res => {
        Taro.setStorageSync('cookie', res.header['Set-Cookie'])
        console.log(res)
      },
      err => { console.log('err') }
    ).catch(err => { console.log(err) })
    
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
            <AtButton onClick={this.onSubmit.bind(this)}>登录a</AtButton>
            <AtButton onClick={this.quit.bind(this)}>退出登录a</AtButton>
            <AtButton onClick={this.checkStatus.bind(this)}>查看登录状态a</AtButton>
            <AtButton onClick={this.mrtj.bind(this)}>个人每日推荐歌曲a</AtButton>
            <AtButton onClick={this.grgd.bind(this)}>个人每日推荐歌单a</AtButton>
            <AtButton onClick={this.cookie.bind(this)}>cookie</AtButton>
          </AtForm>
        </View>
      </View>
    )
  }
}

export default Account
