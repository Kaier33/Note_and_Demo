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
        // let mapCtx = Taro.createMapContext('wxMap');
        // this.setState((prve, next) => {
        //     return { mapCtx }
        // })
    }
    // getLocal() {
    //     Taro.getLocation({
    //         type: 'wgs84',
    //         success: function (res) {
    //             console.log('获取地点')
    //             console.log(res)
    //         }
    //     }).then((res) => {

    //         this.setState({
    //             longitude: res.longitude,
    //             latitude: res.latitude
    //         })
    //     })
    // }

    // moveToCenterLocal() {
    //     console.log('move')
    //     console.log(this.state.mapCtx.moveToLocation)
    //     this.state.mapCtx.moveToLocation();
    // }

    // showstate() {
    //     console.log(this.state)
    // }

    onGetLocal(){
        this.props.onGetLocal()
    }
    onMoveToCenterLocal(){
        // this.props.onMoveToCenterLocal()
        // console.log(this.props.mapCtx)
        this.setState({
            mapCtx:this.props.mapCtx
        })
    }
    onShowstate(){
        this.props.onShowstate()
    }
    ownstate(){
        let mapCtx = Taro.createMapContext('wxMap')
        mapCtx.moveToLocation()
        // this.setState((prve, next) => {
        //     return { mapCtx }
        // })
    }

    render() {
        return (
            <View>
                <Map id='wxMap'
                    style={{ width: '100%', height: '40vh' }}
                    showLocation
                    latitude={this.props.latitude}
                    longitude={this.props.longitude}
                    markers={this.props.markers}
                >
                </Map>
                <View>
                    <Text>{this.props.longitude}</Text>
                </View>
                <View>
                    <Text>{this.props.latitude}</Text>
                </View>
                <Button onClick={this.onGetLocal}>get local o</Button>
                <Button onClick={this.onMoveToCenterLocal}>moveToCenterLocal</Button>
                <Button onClick={this.onShowstate}>showstate</Button>
                <Button onClick={this.ownstate}>ownstate</Button>
                <Button onClick={this.move}>move</Button>

            </View>
        )
    }
}

export default WxMap;


//backup
// render() {
//     return (
//         <View>
//             <Map id='wxMap'
//                 style={{ width: '100%', height: '60vh' }}
//                 showLocation
//                 latitude={this.state.latitude}
//                 longitude={this.state.longitude}
//                 markers={this.state.markers}
//             >
//             </Map>
//             <View>
//                 <Text>{this.state.longitude}</Text>
//             </View>
//             <View>
//                 <Text>{this.state.latitude}</Text>
//             </View>
//             <Button onClick={this.getLocal.bind(this)}>get local o</Button>
//             <Button onClick={this.moveToCenterLocal.bind(this)}>moveToCenterLocal</Button>
//             <Button onClick={this.showstate.bind(this)}>showstate</Button>
//         </View>
//     )
// }
