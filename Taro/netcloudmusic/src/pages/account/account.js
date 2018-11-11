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
  onSubmit() {
    console.log(this.state)
    const { user, password } = this.state;
    Taro.request({
      url: `https://music.kaier33.top/login/cellphone?phone=${user}&password=${password}`,
    }).then(res => {
      // console.log(res)
      if (res.statusCode == 200) {
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
            <AtButton onClick={this.onSubmit.bind(this)}>提交</AtButton>
          </AtForm>
        </View>
      </View>
    )
  }
}

export default Account
