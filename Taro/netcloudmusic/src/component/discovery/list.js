import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
class List extends Component {
    constructor() {
        super(...arguments)
    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='discovery-list recommend-musiclist'>
                <View className='title'>
                    <Text>{this.props.title}</Text>
                    <AtIcon value='chevron-right' size='18' color='#000'></AtIcon>
                </View>
                <View className='list'>
                    {
                        this.props.list.map((item, index) => {
                            return (
                                <View className='list-item' key={index}>
                                    <View className='cover' style={{
                                        background: "url(" + (item.picUrl || item.cover) + ")", backgroundPosition: "center",
                                        backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                    }} ></View>
                                    <View className='text'>{item.name}</View>
                                </View>

                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

export default List
