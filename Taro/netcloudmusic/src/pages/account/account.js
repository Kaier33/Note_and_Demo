import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { changeLoginStatus } from '../../actions/login'

import './account.scss'
import ICON from '../../asset/images/login.png'

@connect((store) => ({
  store
}), (dispatch) => ({
  changeLoginStatus() {
    dispatch(changeLoginStatus())
  }
}))
class Account extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      user: '',
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
      if(res.statusCode==200){
        Taro.showToast({title:'退出成功'})
      }
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
        console.log(res)
 
        if (res.statusCode == 200) {
          Taro.showToast({ title: '登录成功' })
          this.props.changeLoginStatus()
          Taro.setStorageSync('cookie', res.header['Set-Cookie'])
          Taro.navigateTo({
            url:'/pages/personal/personal'
          })
        
        } else {
          Taro.showToast({ title: '登录失败', icon: 'none' })
        }
      },
      err => { console.log('err') }
    ).catch(err => { console.log(err) })
  }

  lookredux() {
    console.log(this.props.store)
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
          <Image src={ICON} className='icon' />
          <AtForm>
            <AtInput
              name='value'
              title='账号'
              type='text'
              placeholder='你的手机号码'
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
            <AtButton onClick={this.quit.bind(this)}>退出登录</AtButton>
            <AtButton onClick={this.checkStatus.bind(this)}>查看登录状态a</AtButton>
            <AtButton onClick={this.lookredux.bind(this)}>查看redux登录状态</AtButton>
            {/* <AtButton onClick={this.mrtj.bind(this)}>个人每日推荐歌曲a</AtButton> */}
          </AtForm>
        </View>
      </View>
    )
  }
}

export default Account
