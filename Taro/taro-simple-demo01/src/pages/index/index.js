import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtToast, AtActivityIndicator } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

	config = {
		navigationBarTitleText: '首页'
	}

	constructor() {
		super(...arguments)
		this.state = {
			searchValue: '',
			loading: false,
			list: []
		}
	}
	onChange(value) {
		this.setState({
			searchValue: value
		})
	}
	onSearchClick() {
		if (this.state.searchValue) {
			Taro.showToast({
				title: '大佬球球你帮我写个接口~',
				icon: 'success',
				duration: 2000
			})
		} else {
			Taro.showToast({
				title: '你什么都没填写',
				icon: 'none',
				duration: 2000
			})
		}

	}

	// 上拉刷新
	updateList() {
		if (this.state.loading) { return }
		this.setState({ loading: true }, () => {
			Taro.showLoading({ title: 'loading' })
			Taro.request({
				url: 'https://www.easy-mock.com/mock/5bdee454bc617620972b038e/taro_zhihu/questionList'
			}).then(res => {
				Taro.hideLoading()
				if (res.data.success) {
					this.setState({
						list: res.data.data,
						loading: false
					})
				}
			})
		})
	}
	// 下拉加载
	appendNextPageList() {
		if (this.state.loading) { return }
		this.setState({ loading: true }, () => {
			Taro.showLoading({ title: 'loading' })
			Taro.request({
				url: 'https://www.easy-mock.com/mock/5bdee454bc617620972b038e/taro_zhihu/questionList'
			}).then(res => {
				Taro.hideLoading()
				if (res.data.success) {
					this.setState({
						list: this.state.list.concat(res.data.data),
						loading: false
					})
				}
			})
		})

	}

	componentDidMount() {
		// send request
		this.setState({ loading: true })
		Taro.showLoading({ title: 'loading' })
		Taro.request({
			url: 'https://www.easy-mock.com/mock/5bdee454bc617620972b038e/taro_zhihu/questionList'
		}).then(res => {
			Taro.hideLoading()
			console.log(res)
			if (res.data.success) {
				this.setState({
					list: res.data.data,
					loading: false
				})
			}
		})
	}

	render() {
		return (
			<View className='index-container'>
				<View>
					<AtSearchBar
						showActionButton
						placeholder='与你分享我刚编的故事~'
						value={this.state.searchValue}
						onChange={this.onChange.bind(this)}
						onActionClick={this.onSearchClick.bind(this)}
					/>
				</View>
				<View>
					23333
				</View>
				{/* <ScrollView
					className='container'
					scrollY
					scrollWithAnimation
					scrollTop='0'
					lowerThreshold='20'
					upperThreshold='20'
					onScrolltoupper={this.updateList}
					onScrollToLower={this.appendNextPageList}
				>
					<View className='articlList'>

					</View>
				</ScrollView> */}

				{/* <AtActivityIndicator mode='center' content='加载中...'></AtActivityIndicator> */}

			</View>
		)
	}
}

