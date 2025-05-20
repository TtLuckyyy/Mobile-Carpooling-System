<template>
  <view class="container">
    <!-- 悬浮头部 -->
    <PageHeader backText="当前订单" backUrl="/pages/customer/customer_new" />
    
	<!-- 地图容器 -->
	<map
		id="map"
		class="map-area"
		:style="{ height: countdown > 0 ? '64%' : '70%' }"
		:longitude="longitude"
		:latitude="latitude"
		:markers="markers"
		:polyline="polyline"
		:scale="scale"
		show-location
		@ready="onMapReady"
	></map>
	  
	<!-- 定位按钮 -->
	<cover-view class="locate-button1" @click="getCurrentLocation"></cover-view>
	<cover-view class="locate-button2" @click="getCurrentLocation"></cover-view>
		
      <view class="floating-details">
        <view class="detail-card">
          <view class="first-row">
            <view class="first-item">
              <image :src="orderInfo.avatar || '/static/default-avatar.png'" class="avatar-icon"></image>
            </view>
            
            <view class="second-item" style="display: flex;align-items: flex-start;flex-direction: column;">
              <view class="car-info" style="display: flex;align-items: flex-start;gap:3px;flex-direction: column;">
                <view class="car-plate">{{ orderInfo.verificationCarPlate}}</view>
                <view class="car-detail">{{ carColor }} | {{ orderInfo.verificationCarModel}}</view>
              </view>
              
              <view class="driver-info">
                <view class="driver-name">{{ orderInfo.realName}}</view>
                <view class="driver-rating">{{ formatRating(orderInfo.rating) }}</view>
              </view>
            </view>
            
            <view class="third-item" style="display: flex;gap: 20px;align-items: flex-end;flex-direction: column;margin-left: 20px;">
				<view class="report-btn">
				  <image src="/static/report-icon.png" class="report-icon"></image>
				  <view class="report-text">举报投诉</view>
				</view>
              <view class="distance-info" style="display: flex;align-items: flex-end;flex-direction: column;">
                <view style="font-size: 14px;color: var(--color-darkgrey);">总距离</view>
                <view style="font-size: 32px;color: var(--color-red); font-weight: bold;">{{orderInfo.distance}}km</view>
              </view>
            </view>
          </view>
          
          <!-- 路线信息 -->
          <view class="route-info">
            <view class="icon start-icon"></view>
            <view class="route-text-container">
              <view class="route-from">{{ orderInfo.startLoc }}</view>
            </view>
            <view class="route-separator">----------</view>
            <view class="icon end-icon"></view>
            <view class="route-text-container">
              <view class="route-to">{{ orderInfo.endLoc }}</view>
            </view>
          </view>
          
          <!-- 取消按钮 - 添加v-if条件 -->
          <view style="display: flex;justify-content: center;" @click="cancelOrder">
			  <view class="cancel-btn"  v-if="countdown > 0">
				<view class="cancel-text" >取消订单（{{ countdown }}s）</view>
			  </view>
<!-- 			  <view class="deleted-btn" v-else>
				  <view class="cancel-text" >已取消</view>
			  </view> -->
          </view>
        </view>
      </view>
  </view>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    PageHeader
  },
  data() {
    const app = getApp();
    return {
      orderInfo: {
        avatar: '/static/default-avatar.png', // 司机头像
        verificationCarPlate: "京A·D2345", // 车牌号
        verificationCarModel: "特斯拉 Model 3", // 车型
        realName: "张师傅", // 司机姓名
        rating: null, // 评分（初始为null，等待后端数据）
        distance: "10.3", // 距离
        price: 38.5, // 预估价格
        startLoc: "北京市海淀区中关村大街1号", // 起点
        endLoc: "北京市朝阳区建国路88号", // 终点
        carColor: "黑色" // 车辆颜色（需映射到carColor）
      },
      countdown: 45, // 取消倒计时
      countdownTimer: null, // 倒计时定时器
      carColor: '黑色', // 默认车辆颜色
      isLoading: false, // 加载状态
      error: null, // 错误信息
      longitude: app.globalData.my_location_longitude,
      latitude: app.globalData.my_location_latitude,
      api_key: app.globalData.api_key,
      scale: 16,
      markers: [],
      polyline: [],
      mapContext: null,
      startPoint: null,
      endPoint: null,
      currentLocation: null ,// 存储当前位置
    };
  },
  computed: {
    ...mapState(['userID', 'rideRequest', 'rideOrder']),
  },
  created() {
    this.fetchOrderInfo();
    this.startCountdown();
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
  methods: {
    ...mapActions(['setOrderId']),
    async fetchOrderInfo() {
      this.isLoading = true;
      this.error = null;

      try {
        // 检查是否有订单ID
        if (!this.rideOrder.orderID) {
          throw new Error('未获取到订单ID');
        }

        const response = await uni.request({
          url: `http://10.0.2.2:8083/carsharing/get-certain-order?orderId=${this.rideOrder.orderID}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);

        // 处理响应数据
        if (response.data.status === 'success') {
          this.orderInfo = {
            ...response.data.history,
            rating: response.data.history.rating != null ? Number(response.data.history.rating) : null
          };
          console.log('Updated orderInfo.rating:', this.orderInfo.rating); // 调试日志
		  this.rideOrder.startLoc = this.orderInfo.startLoc;
		  this.rideOrder.endLoc = this.orderInfo.endLoc;
		  this.rideOrder.startAt = this.orderInfo.startAt;
          // 初始化地图路线
          await this.initializeMapRoute();
        } else {
          throw new Error(response.data.message || '获取订单信息失败');
        }
      } catch (error) {
        console.error('获取订单信息失败:', error);
        this.error = error.message || '获取订单信息失败';
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    async initializeMapRoute() {
      try {
        // 检查起点和终点是否存在
        if (this.orderInfo.startLoc && this.orderInfo.endLoc) {
          this.startPoint = await this.geocodeAddress(this.orderInfo.startLoc);
          this.endPoint = await this.geocodeAddress(this.orderInfo.endLoc);
          await this.getDrivingRoute(this.startPoint, this.endPoint);
        } else {
          throw new Error('起点或终点地址缺失');
        }
      } catch (error) {
        console.error('初始化地图路线失败:', error);
        uni.showToast({
          title: '加载路线失败，请检查地址',
          icon: 'none',
          duration: 2000
        });
        // 重置地图到默认位置
        this.markers = [];
        this.polyline = [];
        this.getCurrentLocation();
      }
    },
    onMapReady() {
      this.mapContext = uni.createMapContext('map', this);
      // 确保地图加载后显示路线
      if (this.startPoint && this.endPoint) {
        this.getDrivingRoute(this.startPoint, this.endPoint);
      }
    },
    async geocodeAddress(address) {
      return new Promise((resolve, reject) => {
        const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(address)}&output=json&key=${this.api_key}`;
        uni.request({
          url: geocodeUrl,
          method: 'GET',
          success: (res) => {
            if (res.data.status === "1" && res.data.geocodes && res.data.geocodes.length > 0) {
              const location = res.data.geocodes[0].location.split(',');
              const lngLat = [parseFloat(location[0]), parseFloat(location[1])];
              resolve(lngLat);
            } else {
              reject('地理编码失败：未找到该地点');
            }
          },
          fail: (error) => {
            reject(`地理编码请求失败：${error}`);
          }
        });
      });
    },
    async getDrivingRoute(startLngLat, endLngLat) {
      if (!startLngLat || !endLngLat) return;

      try {
        const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;

        const response = await uni.request({
          url: url,
          method: 'GET'
        });

        if (response.data.status === "1" && response.data.route) {
          const pathSteps = response.data.route.paths[0].steps;

          // 设置标记点
          this.markers = [
            {
              id: 1,
              longitude: startLngLat[0],
              latitude: startLngLat[1],
              title: this.orderInfo.startLoc,
              iconPath: "/static/point_start.png",
              width: 24,
              height: 24,
            },
            {
              id: 2,
              longitude: endLngLat[0],
              latitude: endLngLat[1],
              title: this.orderInfo.endLoc,
              iconPath: "/static/point_end.png",
              width: 24,
              height: 24
            }
          ];

          // 生成路径
          this.polyline = pathSteps.map(step => ({
            points: step.polyline.split(';').map(coord => {
              const [lng, lat] = coord.split(',').map(Number);
              return {
                longitude: lng,
                latitude: lat
              };
            }),
            color: '#517aff',
            width: 10,
            dottedLine: false
          }));

          // 调整地图视图
          this.adjustMapView();
        } else {
          throw new Error('路径规划失败');
        }
      } catch (error) {
        console.error('路线规划错误:', error);
        uni.showToast({
          title: '路线规划失败',
          icon: 'none'
        });
      }
    },
    adjustMapView() {
      // 收集所有点（包括标记点和路径点）
      let allPoints = [];

      // 添加标记点
      this.markers.forEach(marker => {
        allPoints.push({
          longitude: marker.longitude,
          latitude: marker.latitude
        });
      });

      // 添加路径点
      this.polyline.forEach(line => {
        line.points.forEach(point => {
          allPoints.push(point);
        });
      });

      // 计算边界框
      const bounds = this.calculateBounds(allPoints);

      // 设置地图中心点为起点和终点的中间位置
      const centerLng = (bounds.minLng + bounds.maxLng) / 2;
      const centerLat = (bounds.minLat + bounds.maxLat) / 2;

      // 设置地图中心点和缩放级别
      this.longitude = centerLng;
      this.latitude = centerLat;
      this.scale = this.calculateScale(bounds);
    },
    calculateBounds(points) {
      let minLng = Infinity;
      let maxLng = -Infinity;
      let minLat = Infinity;
      let maxLat = -Infinity;

      points.forEach(p => {
        minLng = Math.min(minLng, p.longitude);
        maxLng = Math.max(maxLng, p.longitude);
        minLat = Math.min(minLat, p.latitude);
        maxLat = Math.max(maxLat, p.latitude);
      });

      return {
        minLng,
        maxLng,
        minLat,
        maxLat
      };
    },
    calculateScale(bounds) {
      const systemInfo = uni.getSystemInfoSync();
      const widthInPx = systemInfo.windowWidth;

      const deltaLng = bounds.maxLng - bounds.minLng;
      const deltaLat = bounds.maxLat - bounds.minLat;

      // 添加 padding 防止贴边
      const padding = 0.2;
      const paddedDeltaLng = deltaLng * (1 + padding);
      const paddedDeltaLat = deltaLat * (1 + padding);

      // 每个经度约 111319 米，每个纬度约 110574 米
      const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;

      // 缩放级别估算
      const baseZoomLevel = 17;
      let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;

      // 返回合理范围内的 scale
      return Math.max(3, Math.min(18, Math.floor(scale)));
    },
    getCurrentLocation() {
      const that = this;
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: function (res) {
          that.currentLocation = res;
          that.longitude = res.longitude;
          that.latitude = res.latitude;
          that.scale = 16;
          // 添加当前位置标记
          that.markers = [
            ...that.markers.filter(marker => marker.id !== 3), // 移除旧的当前位置标记
            {
              id: 3,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 24,
              height: 24,
              iconPath: '/static/current_location.png'
            }
          ];
          if (that.mapContext) {
            that.mapContext.moveToLocation({
              longitude: res.longitude,
              latitude: res.latitude
            });
          }
        },
        fail: function (err) {
          console.log('定位失败:', err);
          uni.showToast({
            title: '获取位置失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    async cancelOrder() {
      this.isLoading = true;
      this.error = null;

      try {
		  console.log(this.rideOrder.orderID);
        // 检查是否有订单ID
        if (!this.rideOrder.orderID) {
          throw new Error('未获取到订单ID');
        }

        const response = await uni.request({
          url: `http://10.0.2.2:8083/carsharing/cancel-order?id=${this.rideOrder.orderID}`,
          method: 'DELETE',
          header: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.status === 'success') {
          uni.showToast({
            title: '订单已取消',
            icon: 'success'
          });

		  uni.navigateTo({
		    url: './OrderCancel',
		    animationType: 'slide-in-right',
		    huntingDuration: 300,
		  });
        } else {
          throw new Error(response.data.message || '取消订单失败');
        }
      } catch (error) {
        console.error('取消订单出错:', error);
        this.error = error.message || '取消订单失败';
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    handleMapMessage(e) {
      // 移除web-view相关逻辑，保留为空以保持方法存在
    },
    formatRating(rating) {
      if (rating == null || isNaN(Number(rating))) {
        return '暂无评分';
      }
      const numRating = Number(rating);
      const stars = '★'.repeat(Math.floor(numRating)) + '☆'.repeat(5 - Math.floor(numRating));
      return `${stars} ${numRating.toFixed(1)}分`;
    },
    startCountdown() {
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.countdownTimer);
          // 倒计时结束后的逻辑
        }
      }, 1000);
    },
  }
}
</script>

<style>
.price-info {
  font-size: 16px;
  color: #FF4D4F;
  text-align: center;
  margin: 10px 0;
  font-weight: bold;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.map-area {
  width: 100%;
}

.locate-button1 {
  position: absolute;
  bottom: 485rpx;
  right: 20rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
  border: 2px black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.locate-button2 {
  position: absolute;
  bottom: 492rpx;
  right: 27rpx;
  width: 24rpx;
  height: 24rpx;
  border-radius: 12rpx;
  background-color: var(--color-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.locate-button1:active {
  transform: scale(0.95);
}

.floating-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

.scroll-view {
  height: 100%;
}

.detail-card {
  width: 93%;
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px 15px 15px 15px;
  display: flex;
  flex-direction: column;
}

.report-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  padding-top: 10px;
}

.report-icon {
  width: 18px;
  height: 18px;
}

.avatar-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-top: 10px;
}

.report-text {
  font-size: 12px;
  color: var(--color-blue);
}

.music-control {
  display: flex;
  justify-content: center;
  padding: 5px 0;
}

.music-symbol {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.car-info {
  display: flex;
  flex-direction: column;
  align-items: center;
/*  gap: 5px; */
}

.car-plate {
  font-size: 30px;
  color: black;
  font-weight: bold;
  letter-spacing: 1px;
}

.car-detail {
  font-size: 14px;
  color: var(--color-darkgrey);
}

.driver-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.driver-name {
  font-size: 14px;
  color: var(--color-darkgrey);
  margin-right: 10px;
}

.driver-rating {
  font-size: 14px;
  color: #FFCC00;
}

.route-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 0px;
  width: 100%;
}

.route-text-container {
  width: 140px;
  overflow: hidden;
}

.route-from,
.route-to {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.route-separator {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-grey);
  margin-left: 5px;
  margin-right: 10px;
}

.cancel-btn {
  background-color: var(--color-blue);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  width: 90%;
  height: 40px;
}

.deleted-btn{
	background-color: var(--color-grey);
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 4px;
	width: 90%;
	height: 40px;
}

.cancel-text {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.first-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 5px 10px;
}

.icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}

.start-icon {
  background-color: var(--color-green);
}

.end-icon {
  background-color: var(--color-orange);
}
</style>
```