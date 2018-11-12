import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './start_page.scss'
import BG from '../../asset/images/startBG.png'

class StartPage extends Component {
    constructor() {
        super(...arguments)
    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='startBG'>
                <Image src={BG}></Image>
            </View>
        )
    }
}

export default StartPage
