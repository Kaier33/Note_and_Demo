import Taro, { Component } from '@tarojs/taro'
import { View, Text , Map} from '@tarojs/components'

class WxMap extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            map: null,
            point: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        // Taro.getLocation(params).then(res=>{console.log(res)})
    }

    render() {
        return (
            <View>
                <Map style={{width:'100%',height:'100vh'}}></Map>
            </View>
        )
    }
}

export default WxMap
