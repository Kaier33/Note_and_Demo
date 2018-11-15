import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'

class H5Map extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            map: null,
            point: null,
            geoc: null,
            geolocation: null
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() { }

    mapInit() {
        let mapDom = document.getElementsByClassName('mapContainer')
        let map = new BMap.Map(mapDom[mapDom.length - 1]);
        let point = new BMap.Point(113.950374, 22.5437);
        let marker = new BMap.Marker(point);
        map.centerAndZoom(point, 15);
        map.addOverlay(marker);
        const content = `<div>
            <p>地址 : 中国广东省深圳市南山区南海大道3688号 </p>
        </div>`
        let infoWindow = new BMap.InfoWindow(content, {
           width:260
        })
        marker.openInfoWindow(infoWindow)
        marker.addEventListener('click', function () {
            marker.openInfoWindow(infoWindow)
        })

    }
    render() {
        return (
            <View>
                {/* <View className='mapContainer' style={{ width: '100%', height: '100vh', boxSizing: 'border-box' }}></View> */}
                <View className='mapContainer' style={{ width: '100%', height: '100vh', boxSizing: 'border-box' }}></View>
                {this.props.loadstatus ? this.mapInit() : ''}
            </View>
        )
    }
}

export default H5Map
