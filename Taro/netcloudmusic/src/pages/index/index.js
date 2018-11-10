import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input, Swiper, SwiperItem } from '@tarojs/components'
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
            showStartPage: true,
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
        document.getElementsByClassName('at-tabs__body')[0].classList.add('t300')
        //send request
        setTimeout(() => {
            this.setState({
                showStartPage: false
            })
        }, 1000)

    }

    render() {
        const startPage = (<View className='startBG' ></View>)
        const tabList = [{ title: '个性推荐' }, { title: '主播电台' }]
        return (
            <View>
                {
                    this.state.showStartPage ? 'true' : ''
                }
                <View className='discovery-container'>
                    {/* 搜索 */}
                    <TopSearch></TopSearch>
                    {/* swiper1 */}
                    <Swiper
                        className='selfhoodSwiper'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        circular
                        indicatorDots
                    >
                        <SwiperItem>
                            <View className='item-container'>
                                <View className='item' style={{
                                    background: "url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1903030856,2725637177&fm=26&gp=0.jpg')", backgroundPosition: "center",
                                    backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                }}></View>
                            </View>
                        </SwiperItem>

                        <SwiperItem>
                            <View className='item-container'>
                                <View className='item' style={{
                                    background: "url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3843701180,1765791208&fm=26&gp=0.jpg')", backgroundPosition: "center",
                                    backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                }}
                                ></View>
                            </View>
                        </SwiperItem>

                        <SwiperItem>
                            <View className='item-container'>
                                <View className='item' style={{
                                    background: "url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3818605926,3125793153&fm=26&gp=0.jpg')", backgroundPosition: "center",
                                    backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                }}
                                ></View>
                            </View>
                        </SwiperItem>
                    </Swiper>
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
            </View >
        )
    }
}

export default Index
