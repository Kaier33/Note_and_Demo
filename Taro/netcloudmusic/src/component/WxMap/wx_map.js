import Taro, { Component } from '@tarojs/taro'
import { View, Text, Map, Button } from '@tarojs/components'

class WxMap extends Component {
    constructor() {
        super(...arguments)
        this.state = {
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
        // console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        // const that = this;
        let mapCtx = Taro.createMapContext('wxMap');
        this.setState((prve, next) => {
            return { mapCtx }
        })
        // Taro.getLocation({
        //     type: 'wgs84',
        //     success(res) {
        //         console.log('successa')
        //         // const latitude = res.latitude
        //         // const longitude = res.longitude
        //     },
        //     fail(err) {
        //         console.log('failed')
        //     }
        // }).then((res) => {
        //     console.log(res)
        //     that.setState({
        //         mapCtx
        //     }, () => {
        //         console.log(233)
        //         console.log(that.state.mapCtx)
        //         that.state.mapCtx.getCenterLocation({
        //             success: function (res) {
        //                 console.log(res)
        //             },
        //             fail: function (err) {
        //                 console.log('fail')
        //                 console.log(err)
        //             }
        //         })
        //     })
        // }, (err) => { console.log(err) }).catch(err => console.log(err))


    }
    getLocal() {
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

    moveToCenterLocal() {
        console.log('move')
        console.log(this.state.mapCtx.moveToLocation)
        this.state.mapCtx.moveToLocation();

        // let mappCtx = Taro.createMapContext('wxMap');
        // Taro.getLocation({
        //     type: 'wgs84',
        //     success: function (res) {
        //         console.log('获取地点')
        //         console.log(res)
        //     }
        // }).then((res) => {
        //     this.setState({
        //         longitude: res.longitude,
        //         latitude: res.latitude
        //     })
        // })

    }

    showstate() {
        console.log(this.state)
    }

    render() {
        return (
            <View>
                <Map id='wxMap'
                    style={{ width: '100%', height: '60vh' }}
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
                <Button onClick={this.getLocal.bind(this)}>get local o</Button>
                <Button onClick={this.moveToCenterLocal.bind(this)}>moveToCenterLocal</Button>
                <Button onClick={this.showstate.bind(this)}>showstate</Button>
            </View>
        )
    }
}

export default WxMap
