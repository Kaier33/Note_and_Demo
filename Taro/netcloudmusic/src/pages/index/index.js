import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { asyncBanner, firstUp } from '../../actions/counter'

import './index.scss'

//pic
import FM from '../../asset/images/discovery/FM.png'
import MUSICLIST from '../../asset/images/discovery/musicList.png'
import PHB from '../../asset/images/discovery/phb.png'
import TJ from '../../asset/images/discovery/tj.png'

// component
import TopSearch from '../../component/discovery/top_search'  //顶部搜索
import List from '../../component/discovery/list'             //列表

@connect((store) => ({
    store
}), (dispatch) => ({
    asyncBanner() {
        return dispatch(asyncBanner())
    },
    firstUp() {
        dispatch(firstUp())
    }
}))
class Index extends Component {
    config = {
        navigationBarTitleText: '发现'
    }

    constructor() {
        super(...arguments)
        this.state = {
            searchValue: '',
            loading: false,
            currentTab: 0,
            selfhoodBanners: [], //轮播1
            recommendMusicList: [], //推荐歌单,
            newsong: [], // 最新音乐
            djprogram: [], //主播电台
        }
    }
    // methods
    handleSwitchTabs(value) {
        this.setState({
            currentTab: value
        })
    }
    handleRecommend() {
        Taro.navigateTo({ url: '/pages/topsong/topsong' })
    }
    send() {
        this.props.asyncBanner();
    }
    look() {
        console.log(this.props.store)
    }
    commonRequest(opt) {
        if (process.env.TARO_ENV === 'h5' && window.localStorage.getItem(opt.winstorevalue)) {
            this.setState({
                [opt.target]: JSON.parse(window.localStorage.getItem(opt.winstorevalue))
            })
        } else {
            if (Taro.getStorageSync(opt.wxstorevalue)) {
                this.setState({
                    [opt.target]: Taro.getStorageSync(opt.wxstorevalue)
                })
            } else {
                // send request
                Taro.request({
                    url: opt.url
                }).then(res => {
                    console.log('send')
                    console.log(res)
                    if (res.statusCode == 200) {
                        process.env.TARO_ENV === 'h5' && window.localStorage.setItem(opt.winstorevalue, JSON.stringify(res.data.result ? res.data.result : res.data.data))
                        process.env.TARO_ENV === 'weapp' && Taro.setStorage({ key: opt.wxstorevalue, data: res.data.result ? res.data.result : res.data.data })
                        this.setState({
                            [opt.target]: res.data.result ? res.data.result : res.data.data
                        })
                    }
                })
            }
        }
    }

    // lifecycle

    componentWillReceiveProps(nextProps) {
        // console.log('update?')
        console.log(this.props, nextProps)
        // document.getElementsByClassName('at-tabs__body')[0].classList.add('t300')
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        console.log(this.$router)
        // document.getElementsByClassName('at-tabs__body')[0].classList.add('t300')
        if (this.$router.fullUrl == '/pages/index/index') {
            // console.log('我来了')
            console.log('仓库')
            console.log(this.props.store)
        }


        if (process.env.TARO_ENV === 'h5' && window.localStorage.getItem('bannerList')) {
            this.setState({
                selfhoodBanners: JSON.parse(window.localStorage.getItem('bannerList'))
            }, () => {
                setTimeout(() => {
                    this.props.firstUp()
                }, 2000)
            })

        } else {
            const banlist = this.props.store.counter.bannerList
            if (banlist.length > 0) {
                this.setState({
                    selfhoodBanners: banlist
                })
            } else {
                const WXbannerList = Taro.getStorageSync('bannerList')
                if (process.env.TARO_ENV === 'weapp' && WXbannerList) {
                    this.setState({
                        selfhoodBanners: WXbannerList,
                    }, () => {
                        this.props.firstUp()
                    })
                } else {
                    this.props.asyncBanner().then(() => {
                        console.log("***************")
                        console.log(this.props.store)
                        let resList = this.props.store.counter.bannerList
                        process.env.TARO_ENV === 'h5' && window.localStorage.setItem('bannerList', JSON.stringify(resList))
                        process.env.TARO_ENV === 'weapp' && Taro.setStorage({ key: 'bannerList', data: this.props.store.counter.bannerList })
                        this.setState({
                            selfhoodBanners: resList,
                        })
                        this.props.firstUp()
                    })
                }

                // Taro.showLoading({ title: 'loading' })
                // // banner
                // Taro.request({
                //     url: 'https://music.kaier33.top/netcloud/banner'
                // }).then(res => {
                //     Taro.hideLoading()
                //     // console.log('banner fetch')
                //     if (res.statusCode == 200) {
                //         this.setState({
                //             selfhoodBanners: res.data.banners,
                //             loading: false
                //         })
                //     }
                // })
            }
        }


        // 推荐音乐
        this.commonRequest({
            url: 'https://music.kaier33.top/netcloud/personalized?limit=6',
            target: 'recommendMusicList',
            wxstorevalue: 'wxrecommendMusicList',
            winstorevalue: 'recommendMusicList'
        })
        
        // 最新音乐 (虽然拿的是MV)
        this.commonRequest({
            url: 'https://music.kaier33.top/netcloud/mv/first?limit=6',
            target: 'newsong',
            wxstorevalue: 'wxnewsong',
            winstorevalue: 'newsong'
        })
        // 推荐电台
        this.commonRequest({
            url: 'https://music.kaier33.top/netcloud/personalized/djprogram?limit=6',
            target: 'djprogram',
            wxstorevalue: 'wxdjprogram',
            winstorevalue: 'djprogram'
        })

        // if (process.env.TARO_ENV === 'h5' && window.localStorage.getItem('recommendMusicList')) {
        //     this.setState({
        //         recommendMusicList: JSON.parse(window.localStorage.getItem('recommendMusicList'))
        //     })
        // } else {
        //     const wxrecommendMusicList = Taro.getStorageSync('wxrecommendMusicList')
        //     if (wxrecommendMusicList) {
        //         this.setState({
        //             recommendMusicList: wxrecommendMusicList
        //         })
        //     } else {
        //         // 推荐音乐
        //         Taro.request({
        //             url: 'https://music.kaier33.top/netcloud/personalized?limit=6'
        //         }).then(res => {
        //             console.log('推荐音乐')
        //             console.log(res)
        //             if (res.statusCode == 200) {
        //                 process.env.TARO_ENV === 'h5' && window.localStorage.setItem('recommendMusicList', JSON.stringify(res.data.result))
        //                 process.env.TARO_ENV === 'weapp' && Taro.setStorage({ key: 'wxrecommendMusicList', data: res.data.result })
        //                 this.setState({
        //                     recommendMusicList: res.data.result,
        //                 })
        //             }
        //         })
        //     }
        // }



        // if (process.env.TARO_ENV === 'h5' && window.localStorage.getItem('newsong')) {
        //     this.setState({
        //         newsong: JSON.parse(window.localStorage.getItem('newsong'))
        //     })
        // } else {
        //     const wxnewsong = Taro.getStorageSync('wxnewsong')
        //     if (process.env.TARO_ENV === 'weapp' && wxnewsong) {
        //         this.setState({
        //             newsong: wxnewsong
        //         })
        //     } else {
        //         //  最新音乐
        //         Taro.request({
        //             url: 'https://music.kaier33.top/netcloud/mv/first?limit=6'
        //         }).then(res => {
        //             console.log('最新音乐')
        //             console.log(res)
        //             if (res.statusCode == 200) {
        //                 process.env.TARO_ENV === 'h5' && window.localStorage.setItem('newsong', JSON.stringify(res.data.data))
        //                 process.env.TARO_ENV === 'weapp' && Taro.setStorage({ key: 'wxnewsong', data: res.data.data })
        //                 this.setState({
        //                     newsong: res.data.data,
        //                 })
        //             }
        //         })
        //     }
        // }


        // if (process.env.TARO_ENV === 'h5' && window.localStorage.getItem('djprogram')) {
        //     this.setState({
        //         djprogram: JSON.parse(window.localStorage.getItem('djprogram'))
        //     })
        // } else {
        //     const wxdjprogram = Taro.getStorageSync('wxdjprogram')
        //     if (process.env.TARO_ENV === 'weapp' && wxdjprogram) {
        //         this.setState({
        //             djprogram: wxdjprogram
        //         })
        //     } else {
        //         // 主播电台
        //         Taro.request({
        //             url: 'https://music.kaier33.top/netcloud/personalized/djprogram?limit=6'
        //         }).then(res => {
        //             console.log('主播电台')
        //             console.log(res)
        //             if (res.statusCode == 200) {
        //                 process.env.TARO_ENV === 'h5' && window.localStorage.setItem('djprogram', JSON.stringify(res.data.result))
        //                 process.env.TARO_ENV === 'weapp' && Taro.setStorage({ key: 'wxdjprogram', data: res.data.result })
        //                 this.setState({
        //                     djprogram: res.data.result,
        //                 })
        //             }
        //         })
        //     }
        // }



    }

    render() {
        const startPage = (<View className='startBG' ></View>)
        const tabList = [{ title: '个性推荐' }, { title: '主播电台' }]
        return (
            <View>
                {
                    this.props.store.counter.firstUp ? startPage : ''
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
                        autoplay
                    >
                        {
                            this.state.selfhoodBanners.map((item, index) => {
                                return (
                                    <SwiperItem key={index}>
                                        <View className='item-container'>
                                            <Image src={item.imageUrl}></Image>
                                            {/* <View className='item' style={{
                                                background: "url(" + item.imageUrl + ")", backgroundPosition: "center",
                                                backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                            }}></View> */}
                                        </View>
                                    </SwiperItem>
                                )
                            })
                        }
                    </Swiper>

                    {/* tabs */}
                    <AtTabs
                        className='ouch'
                        heigh={100}
                        current={this.state.currentTab} tabList={tabList} onClick={this.handleSwitchTabs.bind(this)}>
                        <AtTabsPane current={this.state.currentTab} index={0} >
                            <View className='classification'>
                                <View>
                                    <View className='category'>
                                        <Image src={FM}></Image>
                                    </View>
                                    <Text>私人FM</Text>
                                </View>
                                <View onClick={this.handleRecommend.bind(this)}>
                                    <View className='category'>
                                        <Image src={TJ}></Image>
                                    </View>
                                    <Text>每日推荐</Text>
                                </View>
                                <View>
                                    <View className='category'>
                                        <Image src={MUSICLIST}></Image>
                                    </View>
                                    <Text>歌单</Text>
                                </View>
                                <View>
                                    <View className='category'>
                                        <Image src={PHB}></Image>
                                    </View>
                                    <Text>排行版</Text>
                                </View>
                            </View>

                            <List list={this.state.recommendMusicList} title='推荐歌单'></List>
                            <List list={this.state.newsong} title='最新音乐'></List>
                            <List list={this.state.djprogram} title='主播电台'></List>

                        </AtTabsPane>
                        <AtTabsPane current={this.state.currentTab} index={1}>
                            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
                                <Button onClick={this.send.bind(this)}>send</Button>
                                <Button onClick={this.look.bind(this)}>look</Button>
                            </View>
                        </AtTabsPane>


                    </AtTabs>
                </View>
            </View >
        )
    }
}

export default Index
