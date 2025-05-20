<template>
  <view class="container">
    <!-- 悬浮头部 -->
    <PageHeader backText="当前订单" backUrl="/pages/customer/customer_new" />
    
    <!-- 地图容器 -->
    <map
      id="map"
      class="map-area"
      :style="{ height: '70%' }"
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
    
    <!-- 订单取消详情 -->
    <view class="floating-details">
      <view class="detail-card">
        <view class="title-section">
          <view class="title">订单取消成功</view>
          <view class="fee-note">无需支付手续费</view>
        </view>

        <view class="subtitle">订单已取消，您可以重新拼车。</view>

        <view class="time-section">
          <view style="font-size: 14px; margin-right: 10px;">🕒</view>
          <view class="time">{{ formattedTime }}</view>
        </view>

        <view class="location-section">
          <view class="location-item">
            <view class="dot green"></view>
            <view class="location-text" style="margin-bottom: 10px;">{{ orderInfo.startLoc }}</view>
          </view>
          <view class="location-item">
            <view class="dot red"></view>
            <view class="location-text"style="margin-bottom: 5px;">{{ orderInfo.endLoc }}</view>
          </view>
        </view>

        <view class="btn" @click="goToCustomer">重新拼车</view>
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
        startLoc: '',
        endLoc: '',
        startAt: null
      },
      isLoading: false,
      error: null,
      longitude: app.globalData.my_location_longitude,
      latitude: app.globalData.my_location_latitude,
      api_key: app.globalData.api_key,
      scale: 16,
      markers: [],
      polyline: [],
      mapContext: null,
      startPoint: null,
      endPoint: null,
      currentLocation: null
    };
  },
  computed: {
    ...mapState(['userID', 'rideRequest', 'rideOrder']),
    formattedTime() {
      const date = this.orderInfo.startAt ? new Date(this.orderInfo.startAt) : new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}年${month}月${day}日 ${hours}:${minutes}`;
    }
  },
  created() {
    this.orderInfo.startLoc = this.rideOrder.startLoc || '';
    this.orderInfo.endLoc = this.rideOrder.endLoc || '';
    this.orderInfo.startAt = this.rideOrder.startAt || null;
    this.initializeMapRoute();
  },
  methods: {
    ...mapActions(['setOrderId']),
    async initializeMapRoute() {
      try {
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
        this.markers = [];
        this.polyline = [];
        this.getCurrentLocation();
      }
    },
    onMapReady() {
      this.mapContext = uni.createMapContext('map', this);
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
      let allPoints = [];
      this.markers.forEach(marker => {
        allPoints.push({
          longitude: marker.longitude,
          latitude: marker.latitude
        });
      });
      this.polyline.forEach(line => {
        line.points.forEach(point => {
          allPoints.push(point);
        });
      });

      const bounds = this.calculateBounds(allPoints);
      const centerLng = (bounds.minLng + bounds.maxLng) / 2;
      const centerLat = (bounds.minLat + bounds.maxLat) / 2;

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
      const padding = 0.2;
      const paddedDeltaLng = deltaLng * (1 + padding);
      const paddedDeltaLat = deltaLat * (1 + padding);
      const metersPerPixel = (paddedDeltaLng * 111319 + paddedDeltaLat * 110574) / widthInPx;
      const baseZoomLevel = 17;
      let scale = baseZoomLevel - Math.log(metersPerPixel) / Math.LN2;
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
          that.markers = [
            ...that.markers.filter(marker => marker.id !== 3),
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
      // Placeholder for compatibility
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
        }
      }, 1000);
    },
    goToCustomer() {
	  uni.switchTab({
	    url: './customer_new',
	  });
    }
  }
}
</script>

<style>
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
  padding: 20px 25px 15px 25px;
  display: flex;
  flex-direction: column;
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

.deleted-btn {
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

.marker-icon {
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

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.title {
  font-weight: bold;
  font-size: 24px;
}

.fee-note {
  font-size: 12px;
  color: #ccc;
}

.subtitle {
  color: #666;
  font-size: 24rpx;
  margin-bottom: 10px;
}

.time-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.time-icon {
  font-size: 28rpx;
  margin-right: 10rpx;
}

.time {
  font-weight: bold;
  font-size: 28rpx;
}

.location-section {
  margin-bottom: 10px;
  margin-left: 3px;
}

.location-item {
  display: flex;
  align-items: center;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.green {
  background-color: var(--color-green);
}

.red {
  background-color: var(--color-orange);
}

.location-text {
  font-weight: 400;
  font-size: 14px;
}

.btn {
  background-color: var(--color-green);
  color: #fff;
  font-weight: bold;
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  display: fecha;
  align-items: center;
  justify-content: center;
}
</style>