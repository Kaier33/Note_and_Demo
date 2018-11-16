import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'

import WXMAP from '../../component/wxmap/wxmap'
import H5Map from '../../component/h5map/h5map'
import './friends.scss'

class Friends extends Component {

    config = {
        navigationBarTitleText: '朋友'
    }
    constructor() {
        super(...arguments)
        this.state = {
            loadMapTimer: null,
            loadstatus: false,
            //wxmap
            point: null,
            mapCtx: null,
            markers: [{
                id: 1,
                latitude: 22.53,
                longitude: 113.93,
                name: '深圳某地'
            }],
            longitude: 113.93,
            latitude: 22.53,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {

    }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        // console.log('start')
        Taro.showLoading({ title: 'loading' })
        if (process.env.TARO_ENV === 'h5') {
            this.MapLoad(this.initMap)
        } else if (process.env.TARO_ENV === 'weapp') {
            Taro.hideLoading()
            let mapCtx = Taro.createMapContext('wxMap')
            this.setState((prve, next) => {
                return { mapCtx }
            })
        }
    }

    initMap(status) {
        Taro.hideLoading()
        if (!status) {
            alert('地图脚本加载失败,请您在网络环境良好的地方刷新网页重新加载...')
        } else {
            this.setState({
                loadstatus: true
            })
        }
    }

    MapLoad(initMap) {
        let that = this;

        if (typeof BMap !== 'undefined') {
            that.initMap(true)
            return
        }

        this.state.loadMapTimer = setTimeout(() => {
            window.onBMapCallback = null
            that.initMap(false)
        }, 10000)

        window.onBMapCallback = function () {
            console.log('百度地图脚本初始化成功...')
            clearInterval(that.state.loadMapTimer)
            that.setState({
                loadstatus: true,
                loadMapTimer: null
            })
            that.initMap(true)
        }
        const Ak = 'Wdwynu86rCrk0vPv4ifIOFFnWi12fyEn'
        let scriptElm = document.createElement('script')
        scriptElm.setAttribute('type', 'text/javascript')
        scriptElm.setAttribute("src", `http://api.map.baidu.com/api?v=3.0&ak=${Ak}&callback=onBMapCallback`)
        document.body.appendChild(scriptElm)

    }

    onGetLocal() {
        Taro.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log('获取地点')
                console.log(res)
            }
        }).then((res) => {

            this.setState({
                longitude: res.longitude,
                latitude: res.latitude
            })

        })
    }

    onMoveToCenterLocal() {
        console.log('move')
        this.state.mapCtx.moveToLocation();
        
    }

    onShowstate() {
        console.log(this.state)
    }


    render() {
        const WXMAPDOM = (
            <View>
                <Map id='wxMap'
                    style={{ width: '100%', height: '40vh' }}
                    showLocation
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    markers={this.state.markers}
                >
                </Map>
                <View>
                    <Text>{this.state.longitude}</Text>
                </View>
                <View>
                    <Text>{this.state.latitude}</Text>
                </View>
                <Button onClick={this.onGetLocal.bind(this)}>get local o</Button>
                <Button onClick={this.onMoveToCenterLocal.bind(this)}>moveToCenterLocal</Button>
                <Button onClick={this.onShowstate.bind(this)}>showstate</Button>
            </View>
        )

        return (
            <View className='friendPage'>
                {/* <Text>Wdwynu86rCrk0vPv4ifIOFFnWi12fyEn</Text> */}
                {process.env.TARO_ENV === 'weapp' ? WXMAPDOM : ''}
                {/* {process.env.TARO_ENV === 'weapp' ?
                    <WXMAP
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        markers={this.state.markers}
                        mapCtx={this.state.mapCtx}
                        onGetLocal={this.onGetLocal.bind(this)}
                        onMoveToCenterLocal={this.onMoveToCenterLocal.bind(this)}
                        onShowstate={this.onShowstate.bind(this)}
                    /> : ''} */}

                {process.env.TARO_ENV === 'h5' ? <H5Map loadstatus={this.state.loadstatus} /> : ''}
            </View>
        )
    }
}

export default Friends




// import Taro, { Component } from '@tarojs/taro'
// import { View, Button, Text, Image } from '@tarojs/components'

// import WXMAP from '../../component/wxmap/wxmap'
// import H5Map from '../../component/h5map/h5map'
// import './friends.scss'

// class Friends extends Component {

//   config = {
//     navigationBarTitleText: '朋友'
//   }
//   constructor() {
//     super(...arguments)
//     this.state = {
//       loadMapTimer: null,
//       loadstatus: false,
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log(this.props, nextProps)
//   }

//   componentWillUnmount() {

//   }

//   componentDidShow() { }

//   componentDidHide() { }

//   componentDidMount() {
//     // console.log('start')
//     Taro.showLoading({ title: 'loading' })
//     if (process.env.TARO_ENV === 'h5') {
//       this.MapLoad(this.initMap)
//     } else {
//       Taro.hideLoading()
//     }
//   }
//   initMap(status) {
//     Taro.hideLoading()
//     if (!status) {
//       alert('地图脚本加载失败,请您在网络环境良好的地方刷新网页重新加载...')
//     } else {
//       this.setState({
//         loadstatus: true
//       })
//     }
//   }

//   MapLoad(initMap) {
//     let that = this;

//     if (typeof BMap !== 'undefined') {
//       that.initMap(true)
//       return
//     }

//     this.state.loadMapTimer = setTimeout(() => {
//       window.onBMapCallback = null
//       that.initMap(false)
//     }, 10000)

//     window.onBMapCallback = function () {
//       console.log('百度地图脚本初始化成功...')
//       clearInterval(that.state.loadMapTimer)
//       that.setState({
//         loadstatus: true,
//         loadMapTimer: null
//       })
//       that.initMap(true)
//     }
//     const Ak = 'Wdwynu86rCrk0vPv4ifIOFFnWi12fyEn'
//     let scriptElm = document.createElement('script')
//     scriptElm.setAttribute('type', 'text/javascript')
//     scriptElm.setAttribute("src", `http://api.map.baidu.com/api?v=3.0&ak=${Ak}&callback=onBMapCallback`)
//     document.body.appendChild(scriptElm)

//   }

//   render() {
//     return (
//       <View className='friendPage'>
//         {/* <Text>Wdwynu86rCrk0vPv4ifIOFFnWi12fyEn</Text> */}
//         {process.env.TARO_ENV === 'weapp' ? <WXMAP /> : ''}
//         {process.env.TARO_ENV === 'h5' ? <H5Map loadstatus={this.state.loadstatus} /> : ''}
//       </View>
//     )
//   }
// }

// export default Friends
