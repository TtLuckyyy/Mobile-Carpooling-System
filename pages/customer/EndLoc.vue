<template>
	<div class="container">
		<header>
			<uni-icons type="back" size="24" class="back-icon" @click="goBack"></uni-icons>
			<span class="status-dot"></span>
			<input 
				v-model="end_loc" 
				placeholder="您要到哪去" 
				class="end-loc-input"
				confirm-type="done" 
				@confirm="sendEndLoc" 
			/>
		</header>

		<view class="address-settings">
			<!-- 家 按钮 -->
			<view class="address-option" @click="setHomeCompanyEndLocation('home')">
				<uni-icons type="home" size="24"></uni-icons> 家
			</view>
			<!-- 家的地址 按钮 -->
			<view class="address-option address-text" @click="navigateToAddressSetting()">
				<text class="desc small-text">{{ homeAddress || '设置家的地址' }}</text>
			</view>
		
			<!-- 公司 按钮 -->
			<view class="address-option" @click="setHomeCompanyEndLocation('company')">
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
import { mapState, mapActions } from 'vuex'

export default {
	components: { LocationList },
	computed: {
	    ...mapState(['userID']) // 读取 Vuex 里的 userID
	  },
	data() {
		return {
			homeAddress: "",
			companyAddress: "",
			end_loc: "",
			history: [],
			cities: [
				{
					name: "上海市",
					stations: [
						{ name: "同济大学嘉定校区", address: "杨浦区四平路1239号", distance: 18 },
						{ name: "同济大学四平校区", address: "嘉定区曹安公路4800号", distance: 8 },
						{ name: "外滩", address: "黄浦区中山东一路", distance: 12 },
						{ name: "复旦大学附属华山医院本部", address: "静安区乌鲁木齐中路12号", distance: 36 },
						{ name: "上海城隍庙", address: "黄浦区方浜中路249号", distance: 29 },
						{ name: "上海迪士尼乐园", address: "浦东新区川沙镇黄赵路310号", distance: 18 },
					],
				}
		  ],
        };
    },
	onLoad() {
	    this.fetchAddresses();
	},
	methods: {
		async fetchAddresses() {
		      try {
		        const response = await uniRequest.get(`/api/addresses/${this.userId}`);
		        this.homeAddress = response.data.home;
		        this.companyAddress = response.data.company;
		      } catch (error) {
		        console.error('获取地址失败:', error);
		      }
		    },
		setHomeCompanyEndLocation(type) {
			if (type === 'home' && this.homeAddress) {
				this.end_loc = this.homeAddress;
				this.setEndLoc(this.end_loc);
			} else if (type === 'company' && this.companyAddress) {
				this.end_loc = this.companyAddress;
				this.setEndLoc(this.end_loc);
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
		            url: '/api/get-history', // 后端接口地址
		            method: 'GET',
		            data: { userID: this.userID }, 
		            header: { 'Content-Type': 'application/json' }
		        });
		
		        if (response.statusCode === 200 && response.data.length > 0) {
		            let records = response.data.slice(0, 5); // 获取最多五条记录
		
		            for (let i = 0; i < records.length; i++) {
		                // 根据name获取详细地址并解析经纬度
		                let { address, lat, lng } = await this.getAddressAndCoordinatesByName(records[i].name);
		
		                // 获取当前定位
		                let currentLocation = await this.getCurrentLocation();
		
		                // 计算距离
		                let distance = await this.calculateDistance(currentLocation.lat, currentLocation.lng, lat, lng);
		
		                // 更新历史记录
		                records[i].address = address;
		                records[i].distance = distance;
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
		        const baiduResponse = await uni.request({
		            url: `https://api.map.baidu.com/geocoding/v3/?ak=你的百度地图AK&address=${name}&output=json`,
		            method: 'GET'
		        });
		
		        if (baiduResponse.statusCode === 200 && baiduResponse.data.status === 0) {
		            const address = baiduResponse.data.result.formatted_address || '未知地址';
		            const lat = baiduResponse.data.result.location.lat;  // 纬度
		            const lng = baiduResponse.data.result.location.lng;  // 经度
		
		            return { address, lat, lng };
		        } else {
		            return { address: '地址获取失败', lat: 0, lng: 0 }; // 如果获取失败，返回默认值
		        }
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
		...mapActions(['setEndLoc']),
		sendEndLoc(location) {
			this.setEndLoc(this.end_loc);
		},
		handleLocationSelect(location) {
			this.end_loc = location; // 更新输入框内容
			this.sendEndLoc(location); // 自动提交
		},
		goBack() {
			uni.navigateBack(); // 返回上一页
		},
	},
	mounted() {
		this.fetchHistory(); 
	}
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #da713c;
  border-radius: 50%;
  margin-right: 5px;
}
.end-loc-input {
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
header {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 控制间距 */
}
</style>
