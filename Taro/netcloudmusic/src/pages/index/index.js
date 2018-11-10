import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import './index.scss'

// component
import TopSearch from '../../component/discovery/top_search'  //顶部搜索

class Index extends Component {
    config = {
        navigationBarTitleText: '发现'
    }

    constructor() {
        super(...arguments)
        this.state = {
            showStartPage: false,
            searchValue: '',
            loading: false,
            currentTab: 0,
            list: []
        }
    }
    // methods
    handleSwitchTabs(value) {
        this.setState({
            currentTab: value
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        //send request
        // setTimeout(() => {
        //   this.setState({
        //     showStartPage: false
        //   })
        // }, 2000)

    }

    render() {
        const startPage = (<View className='startBG' ></View>)
        const tabList = [{ title: '个性推荐' }, { title: '主播电台' }]
        return (
            <View>
                {
                    this.state.showStartPage ? startPage : ''
                }
                <View className='discovery-container'>
                    {/* 搜索 */}
                    <TopSearch></TopSearch>
                    {/* tabs */}
                    <AtTabs
                        heigh={100}
                        current={this.state.currentTab} tabList={tabList} onClick={this.handleSwitchTabs.bind(this)}>
                        <AtTabsPane current={this.state.currentTab} index={0} >
                            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.currentTab} index={1}>
                            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
                        </AtTabsPane>
                    </AtTabs>
                </View>
            </View>
        )
    }
}

export default Index
