

export default function test() {
    return (
        <View>
            {/* 轮播 */}
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
            {/* 推荐 */}
            <View className='list-item'>
                <View className='cover' ></View>
                <View className='text'>Vip专享,一周新歌推荐</View>
            </View>
            <View className='list-item'>
                <View className='cover'></View>
                <View className='text'>Vip专享,一周新歌推荐</View>
            </View>
            <View className='list-item'>
                <View className='cover'></View>
                <View className='text'>Vip专享,一周新歌推荐</View>
            </View>
            <View className='list-item'>
                <View className='cover'></View>
                <View className='text'>Vip专享,一周新歌推荐</View>
            </View>
            <View className='list-item'>
                <View className='cover'></View>
                <View className='text'>Vip专享,一周新歌推荐</View>
            </View>
            <View className='list-item'>
                <View className='cover'></View>
                <View className='text'>Vip专享,一周新歌推荐</View>
            </View>
            {/* list */}
            <View className='discovery-list recommend-musiclist'>
                <View className='title'>
                    <Text>推荐歌单</Text>
                    <AtIcon value='chevron-right' size='18' color='#000'></AtIcon>
                </View>
                <View className='list'>
                    {
                        this.state.recommendMusicList.map((item, index) => {
                            return (
                                <View className='list-item' key={index}>
                                    <View className='cover' style={{
                                        background: "url(" + item.picUrl + ")", backgroundPosition: "center",
                                        backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                    }} ></View>
                                    <View className='text'>{item.name}</View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}