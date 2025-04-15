<template>
	<div class="container">
		<header>
			<uni-icons type="back" size="24" class="back-icon" @click="goBack"></uni-icons>
			<span class="status-dot"></span>
			<view class="input-wrapper">
			<input 
				v-model="start_loc" 
				placeholder="您要到哪去" 
				class="start-loc-input"
				confirm-type="done" 
				@confirm="sendStartLoc" 
				@input="handleInput"
			/>
			<uni-icons			
			  type="clear"
			  size="20"
			  class="clear-icon"
			  @click="clearInput"
			></uni-icons>
			</view>
		</header>
		<!-- 建议地址列表 -->
		<view
		  v-if="suggestions.length > 0"
		  class="suggestion-list"
		>
		  <view
			v-for="(item, index) in suggestions.slice(0, 7)"
			:key="index"
			class="suggestion-item"
			@click="selectSuggestion(item)"
		  >
			<div class="sug-info">
			  <span class="sug-name">{{ item.name }}</span>
			  <span class="sug-address">{{ item.address }}</span>
			</div>
			<span class="sug-distance">{{ item.distance }} km</span>
		  </view>
		</view>
		<view class="address-settings">
			<!-- 家 按钮 -->
			<view class="address-option" @click="setHomeCompanyStartLocation('home')">
				<uni-icons type="home" size="24"></uni-icons> 家
			</view>
			<!-- 家的地址 按钮 -->
			<view class="address-option address-text" @click="navigateToAddressSetting()">
				<text class="desc small-text">{{ homeAddress || '设置家的地址' }}</text>
			</view>
		
			<!-- 公司 按钮 -->
			<view class="address-option" @click="setHomeCompanyStartLocation('company')">
				<uni-icons type="shop" size="24"></uni-icons> 公司
			</view>
			<!-- 公司的地址 按钮 -->
			<view class="address-option address-text" @click="navigateToAddressSetting()">
				<text class="desc small-text">{{ companyAddress || '设置公司地址' }}</text>
			</view>
		</view>

		<!-- 复用 LocationList 组件 -->
		<LocationList title="历史记录" :locations="history" @location-selected="handleLocationSelect" />
		<LocationList v-for="(city, index) in cities" :key="index" :title="city.name" :locations="city.stations" @location-selected="handleLocationSelect" />
	</div>
</template>

<script>
import LocationList from "../../components/LocationList.vue";
import { mapState, mapActions } from 'vuex';
export default {
	components: { LocationList },
	computed: {
	    ...mapState(['userID']) // 读取 Vuex 里的 userID
	  },
	data() {
		return {
			homeAddress: "",
			companyAddress: "",
			start_loc: "",
			history: [],
			suggestions: [],
			showSuggestions: false,
			ak:'qUvnqoxw0awJluKPaBmcvUam4wQYOHF7',
			cities: [
				{
					name: "上海市",
					stations: [
						{ name: "上海交通大学", address: "", distance:0  },
						{ name: "同济大学（嘉定校区）", address: "", distance:0 },
						{ name: "外滩观景大道", address: "", distance: 0 },
						{ name: "复旦大学附属华山医院", address: "", distance: 0 },
						{ name: "虹桥国际机场", address: "", distance: 0 },
						{ name: "上海迪士尼乐园", address: "", distance: 0},
					],
				}
		  ],
        };
    },
	onLoad() {
	    this.fetchAddresses();
	},
	methods: {
		async handleInput(e) {
			const keyword = e.detail.value;
			if (!keyword) {
				this.suggestions = [];
				this.showSuggestions = false;
				return;
			}
		
			// 请求百度地图 suggestion 接口
			try {
				const res = await uni.request({
					url: `https://api.map.baidu.com/place/v2/suggestion`,
					method: 'GET',
					data: {
						query: keyword,
						region: '上海', // 你也可以使用当前定位城市
						output: 'json',
						ak: this.ak
					}
				});
				if (res.data.status === 0) {
					this.suggestions = await Promise.all(res.data.result.map(async (item) => {
					      // 获取地址和坐标
					      let { address, lat, lng } = await this.getAddressAndCoordinatesByName(item.name);
					
					      // 获取当前定位
					      let currentLocation = await this.getCurrentLocation();
					
					      // 计算距离
					      let distance = await this.calculateDistance(currentLocation.lat, currentLocation.lng, lat, lng);
					
					      return {
					        name: item.name,
					        address: address,    // 获取的地址
					        distance: Math.round(distance)   // 计算的距离
					      };
					}));
					this.showSuggestions = true;
				} else {
					console.warn('百度 Suggestion 接口失败:', res.data.message);
					this.suggestions = [];
					this.showSuggestions = false;
				}
			} catch (err) {
				console.error('请求失败:', err);
				this.suggestions = [];
			}
		},
		selectSuggestion(item) {
			this.start_loc = item.name;
			this.suggestions = [];
			this.showSuggestions = false;
			this.sendStartLoc(item.name);
		},
		clearInput() {
			this.start_loc = '';
			this.suggestions = [];
			this.showSuggestions = false;
		},
		async fetchAddresses() {
		     try {
		       const response = await uni.request({
		         url: `http://localhost:8083/carsharing/get-user-addresses?userId=1`, // 直接拼接参数
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
		setHomeCompanyStartLocation(type) {
			if (type === 'home' && this.homeAddress) {
				this.start_loc = this.homeAddress;
				this.setStartLoc(this.start_loc);
			} else if (type === 'company' && this.companyAddress) {
				this.start_loc = this.companyAddress;
				this.setStartLoc(this.start_loc);
			} else {
				uni.showToast({
					title: `没有${type === 'home' ? '家庭' : '公司'}地址`,
					icon: 'none'
				});
			}
		},
		navigateToAddressSetting() {
			uni.switchTab({url: '/pages/my/my'});
		},
		async fetchHistory() {
		    try {
		        const response = await uni.request({
		          url: `http://localhost:8083/carsharing/get-start-loc-history?userId=1`, // 直接拼接参数
		          method: 'GET',
		          header: {
		            'Content-Type': 'application/json'
		          }
		        });
			if (response.data.status === 'success') {
		
			  let historyNames = response.data.history.slice(0, 5); // 取出前五条历史记录名称
		
			  let records = [];
		
			  for (let i = 0; i < historyNames.length; i++) {
				let name = historyNames[i];		
				// 获取地址和经纬度
				let { address, lat, lng } = await this.getAddressAndCoordinatesByName(name);
		
				// 获取当前位置
				let currentLocation = await this.getCurrentLocation();
		
				// 计算距离
				let distance = await this.calculateDistance(currentLocation.lat, currentLocation.lng, lat, lng);
		
				// 构造记录项
				records.push({
				  name,
				  address,
				  distance
				});
			  }
		
			  this.history = records;
			} else {
			  console.warn('没有历史记录');
			}
		    } catch (error) {
		        console.error('获取历史记录失败:', error);
		    }
		},
		
		// 根据名称获取详细地址和经纬度
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
		// 获取当前定位
		async getCurrentLocation() {
		    try {
		        const locationResponse = await uni.getLocation({ type: 'gcj02' }); // 获取当前坐标，gcj02 坐标系
		        return { lat: locationResponse.latitude, lng: locationResponse.longitude };
		    } catch (error) {
		        console.error('获取当前位置失败:', error);
		        return { lat: 0, lng: 0 }; // 若获取失败，返回默认坐标
		    }
		},
		// 计算两点之间的距离（使用 Haversine 公式）
		async calculateDistance(lat1, lng1, lat2, lng2) {
		    const toRad = (angle) => angle * (Math.PI / 180);
		    const R = 6371; // 地球半径 (km)
		    const dLat = toRad(lat2 - lat1);
		    const dLng = toRad(lng2 - lng1);
		    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
		        Math.sin(dLng / 2) * Math.sin(dLng / 2);
		    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		    return R * c; // 返回距离，单位为 km
		},
		async getLocationInfoByName(name) {
		    try {
		        // 获取目标地点的坐标和地址
		        const target = await this.getAddressAndCoordinatesByName(name);
		        
		        // 获取当前位置坐标
		        const current = await this.getCurrentLocation();
		        
		        // 计算距离
		        const distance = await this.calculateDistance(
		            current.lat, current.lng,
		            target.lat, target.lng
		        );
		
		        // 返回格式化结果
		        return {
		            name: name,
		            address: target.address,
		            distance: Math.round(distance) // 四舍五入到整数公里
		        };
		    } catch (error) {
		        console.error('处理地点信息失败:', error);
		        return {
		            name: name,
		            address: '获取失败',
		            distance: 0
		        };
		    }
		},
		...mapActions(['setStartLoc']),
		sendStartLoc(location) {
			this.setStartLoc(location);
			uni.switchTab({
			    url: 'customer'
			  });
		},
		handleLocationSelect(location) {
			this.start_loc = location; // 更新输入框内容
			this.sendStartLoc(location); // 自动提交
		},
		goBack() {
			uni.switchTab({url: 'customer'});
		},
	},		  
	async mounted() {
		this.fetchHistory(); 
		for (let city of this.cities) {
		        for (let station of city.stations) {
		            const info = await this.getLocationInfoByName(station.name);
					station.address=info.address;
		            station.distance = info.distance;  // 更新站点的距离
		        }
		    }
	}
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
	/* 使 name 和 address 纵向排列 */
	.sug-info {
	  display: flex;
	  flex-direction: column;
	  width: 75%; /* 让 name + address 占据 75% 的宽度 */
	}
	
	/* name 大小适中 */
	.sug-name {
	  font-size: 16px;
	  font-weight: bold;
	}
	
	/* address 在 name 下方 */
	.sug-address {
	  font-size: 12px;
	  color: #666666;
	  margin-top: 3px; /* 添加一点间距 */
	}
	
	/* 距离保持在右侧 */
	.sug-distance {
	  font-size: 12px;
	  color: #666666;
	  width: 25%; /* 让 distance 继续占据 25% 的宽度 */
	  text-align: right;
	}
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #da713c;
  border-radius: 50%;
  margin-right: 5px;
}
.start-loc-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.address-settings {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.address-option {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 让文本和图标分开 */
    min-height: 50px;
    padding: 10px;
}

.address-option.address-text {
    flex-grow: 1;  /* 让文本部分自动占满 */
}
.back-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
}
.small-text {
    font-size: 12px; /* 设置较小的字体 */
    color: #666666; /* 深灰色 */
}

.clear-icon {
  position: absolute;
  right: 20rpx; /* 靠近输入框右侧 */
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  z-index: 10;
}

.suggestion-list {
  position: absolute;
  top: 110rpx; /* 根据 header 实际高度可调 */
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
header {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 控制间距 */
}
</style>
