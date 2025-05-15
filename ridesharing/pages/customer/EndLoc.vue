<template>
	<PageHeader backText="选择行程终点" backUrl="/pages/customer/customer_new" />
	<div>
		<view class="block input-place">
			<view class="input-wrapper">
				<!-- 包裹 end-icon 和 input -->
				<view class="input-container">
					<view class="icon end-icon"></view>
					<input 
						v-model="end_loc" 
						placeholder="您要到哪儿去" 
						class="start-loc-input"
						confirm-type="done" 
						@confirm="sendEndLoc" 
					/>
				</view>
				<uni-icons type="clear" size="20" class="clear-icon" @click="clearInput"></uni-icons>
			</view>
			<view class="address">
				<view class="address-unit" @click="homeAddress ? setHomeCompanyEndLocation('home') : showNoAddressToast()">
					<uni-icons type="home" size="24" color="var(--color-darkgrey)"></uni-icons> 
					<view class="address-option">
						<view style="display: flex; flex-direction: column; gap:2px;"> 
							<text style="font-size: 16px; font-weight: bold;">家</text>
							<text class="small-text" v-if="homeAddress">{{ homeAddress }}</text>
							<text class="small-text" v-else @click="navigateToAddressSetting()">设置家的地址</text>
						</view>
					</view>
				</view>
				<view class="vertical-divider"></view> 
				<view class="address-unit" @click="companyAddress ? setHomeCompanyEndLocation('company') : showNoAddressToast()">
					<uni-icons type="shop" size="24" color="var(--color-darkgrey)"></uni-icons> 
					<view class="address-option">
						<view style="display: flex; flex-direction: column; gap:2px;"> 
							<text style="font-size: 16px; font-weight: bold;">公司</text>
							<text class="small-text" v-if="companyAddress">{{ companyAddress }}</text>
							<text class="small-text" v-else @click="navigateToAddressSetting()">设置公司地址</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block location-list">
			<LocationList title="历史记录" :locations="history" :start="true" @location-selected="handleLocationSelect" />
		</view>
		<view class="block location-list">
			<LocationList title="热门目的地" :locations="hot_end_loc" :start="false" @location-selected="handleLocationSelect" />
		</view>
	</div>
</template>

<script>
import LocationList from "../../components/LocationList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { mapState, mapActions } from 'vuex';

export default {
	components: { 
		LocationList,
		PageHeader
	},
	computed: {
		...mapState(['userID','rideRequest','current_change_request_id']) 
	},
	data() {
		return {
			homeAddress: null,
			companyAddress: null,
			end_loc: "",
			history: [],
			suggestions: [],
			showSuggestions: false,
			// ak: 'qUvnqoxw0awJluKPaBmcvUam4wQYOHF7',
			// ak:'EtqTJ1MT40bg44IsZf2fFe2eJmCD2l2e',
			ak: 'b2gVyjseS5Wx4a1STxi6PDdNRGWakAP9',
			hot_end_loc: [],
		};
	},
	onLoad() {
		this.fetchAddresses();
		this.fetchHistory();
		this.fetchHot();
		if(this.current_change_request_id == this.rideRequest.requestID){
			if(this.rideRequest.endLoc){
				this.end_loc = this.rideRequest.endLoc;
			}
		}
	},
	methods: {
		showNoAddressToast() {
			uni.showToast({
				title: '当前未设置',
				icon: 'none',
				duration: 2000,
			});
		},
		async getAddressAndCoordinatesByName(name) {
		    try {
		        // 请求百度地图API获取地址和经纬度
				const encodedAddress = encodeURIComponent(name);
		        const geoResp = await uni.request({
		          url: `https://api.map.baidu.com/geocoding/v3/?ak=${this.ak}&address=${encodeURIComponent(name)}&output=json`
		        });
		        const { lat, lng } = geoResp.data.result.location;
				const reverseResp = await uni.request({
				  url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${this.ak}&location=${lat},${lng}&output=json`
				});
				const address = reverseResp.data.result.formatted_address;
		            return { address, lat, lng };
		    } catch (error) {
		        console.error('获取地址和坐标失败:', error);
		        return { address: '地址获取失败', lat: 0, lng: 0 }; // 如果出错，返回默认值
		    }
		},
		clearInput() {
			this.end_loc = '';
			this.suggestions = [];
			this.showSuggestions = false;
		},
		async fetchAddresses() {
			try {
				const response = await uni.request({
					url: `http://10.0.2.2:8083/carsharing/get-user-addresses?userId=${this.userID}`,
					method: 'GET',
					header: {
						'Content-Type': 'application/json'
					}
				});
				this.homeAddress = response.data.homeAddress;
				this.companyAddress = response.data.companyAddress;
			} catch (error) {
				console.error('获取地址失败:', error);
			}
		},
		setHomeCompanyEndLocation(type) {
			if (type === 'home' && this.homeAddress) {
				this.end_loc = this.homeAddress;
				this.setEndLoc(this.end_loc);
				uni.navigateBack({
				  delta: 1 // 返回上一页
				});
			} else if (type === 'company' && this.companyAddress) {
				this.end_loc = this.companyAddress;
				this.setEndLoc(this.end_loc);
				uni.navigateBack({
				  delta: 1 // 返回上一页
				});
			} else {
				uni.showToast({
					title: `没有${type === 'home' ? '家庭' : '公司'}地址`,
					icon: 'none'
				});
			}
		},
		navigateToAddressSetting() {
			uni.switchTab({ url: '/pages/my/my' });
		},
		async fetchHistory() {
			try {
				const response = await uni.request({
					url: `http://10.0.2.2:8083/carsharing/get-end-loc-history?userId=${this.userID}`,
					method: 'GET',
					header: {
						'Content-Type': 'application/json'
					}
				});
				if (response.data.status === 'success') {
					let historyNames = [...new Set(response.data.history)].slice(0, 5);
					// console.log(historyNames);
					let records = [];
					for (let i = 0; i < historyNames.length; i++) {
						let name = historyNames[i];
						let { address, lat, lng } = await this.getAddressAndCoordinatesByName(name);
						// console.log(address, lat, lng);
						const currentLocation = await this.getCurrentLocation();
						let distance = await this.calculateDistance(currentLocation[0], currentLocation[1], lat, lng);
						if (address !== '地址获取失败') {
							records.push({
								name,
								address,
								distance
							});
						}
					}
					this.history = records;
				} else {
					console.warn('没有历史记录');
				}
			} catch (error) {
				console.error('获取历史记录失败:', error);
			}
		},
		async fetchHot() {
			try {
				const response = await uni.request({
					url: `http://10.0.2.2:8083/carsharing/get-end-loc-hot`,
					method: 'GET',
					header: {
						'Content-Type': 'application/json'
					}
				});
				if (response.data.status === 'success') {
					let hotLocNames = [...new Set(response.data.hotLoc)].slice(0, 10);
					// console.log(hotLocNames);
					let records = [];
					for (let i = 0; i < hotLocNames.length; i++) {
						let name = hotLocNames[i];
						let { address, lat, lng } = await this.getAddressAndCoordinatesByName(name);
						// console.log(address, lat, lng);
						const currentLocation = await this.getCurrentLocation();
						let distance = await this.calculateDistance(currentLocation[0], currentLocation[1], lat, lng);
						if (address !== '地址获取失败') {
							records.push({
								name,
								address,
								distance
							});
						}
					}
					this.hot_end_loc = records;
				} else {
					console.warn('没有热门目的地');
				}
			} catch (error) {
				console.error('获取热门目的地失败:', error);
			}
		},
		getCurrentLocation() {
			return new Promise((resolve) => {
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success(res) {
						resolve([res.latitude, res.longitude]);
					},
					fail(err) {
						console.log('定位失败:', err);
						uni.showToast({
							title: '获取当前地址失败，将导致部分功能不可用',
							icon: 'none',
							duration: 2000
						});
						resolve([0, 0]);
					}
				});
			});
		},
		async calculateDistance(lat1, lng1, lat2, lng2) {
			const toRad = (angle) => angle * (Math.PI / 180);
			const R = 6371;
			const dLat = toRad(lat2 - lat1);
			const dLng = toRad(lng2 - lng1);
			const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
				Math.sin(dLng / 2) * Math.sin(dLng / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const distance = R * c;
			return parseFloat(distance.toFixed(3));
		},
		...mapActions(['setEndLoc']),
		// sendEndLoc(location) {
		// 	this.setEndLoc(location);
		// 	uni.navigateBack({
		// 		delta: 1 // 返回上一页
		// 	});
		// },
		sendEndLoc() {
		  if (this.end_loc) { // 确保输入框不为空
		    this.setEndLoc(this.end_loc);
		    uni.navigateBack({
		      delta: 1 // 返回上一页
		    });
		  } else {
		    uni.showToast({
		      title: '请输入目的地',
		      icon: 'none',
		      duration: 2000
		    });
		  }
		},
		handleLocationSelect(location) {
			this.end_loc = location;
			this.sendEndLoc(location);
		},
	},
};
</script>

<style scoped>
.suggestion-item {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	border-bottom: 1px solid #ddd;
	cursor: pointer;
	align-items: center;
}
.sug-info {
	display: flex;
	flex-direction: column;
	width: 75%;
}
.sug-name {
	font-size: 16px;
	font-weight: bold;
}
.sug-address {
	font-size: 12px;
	color: #666666;
	margin-top: 3px;
}
.sug-distance {
	font-size: 12px;
	color: #666666;
	width: 25%;
	text-align: right;
}
.input-wrapper {
	position: relative;
	display: flex;
	align-items: center;
	background-color: var(--color-lightgrey);
	border-radius: 10px;
	padding: 0px 20px;
	width: 90%;
}
.start-loc-input {
	width: 70%;
	padding: 8px;
	font-weight: bold;
}
.address-settings {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
}
.address-option {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 50px;
	padding: 10px;
	margin-left: 5px;
}
.address-option.address-text {
	flex-grow: 1;
}
.back-icon {
	font-size: 20px;
	cursor: pointer;
	margin-right: 10px;
}
.small-text {
	font-size: 14px;
	color: var(--color-darkgrey);
}
.input-container {
	display: flex;
	align-items: center;
	flex-direction: row;
	flex: 1;
}
.clear-icon {
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	color: #999;
	z-index: 10;
}
.suggestion-list {
	position: absolute;
	top: 110rpx;
	left: 0;
	right: 0;
	max-width: 700rpx;
	margin: 0 auto;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 12rpx;
	z-index: 1000;
	max-height: 1000rpx;
	overflow-y: auto;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}
.suggestion-item:last-child {
	border-bottom: none;
}
.icon {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-right: 10px;
}
.start-icon {
	background-color: var(--color-green);
}
.end-icon {
	background-color: var(--color-orange);
}
.block {
	background-color: white;
	margin: 10px 10px;
	border-radius: 10px;
	padding: 10px 10px;
}
.input-place {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.location-list {
	padding-bottom: 4px;
}
.address {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.address-unit {
	width: 180px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 25px;
}
.vertical-divider {
	width: 1px;
	height: 48px;
	background-color: var(--color-grey);
}
</style>