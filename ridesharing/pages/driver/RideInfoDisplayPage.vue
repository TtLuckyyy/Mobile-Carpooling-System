<template>
  <view class="container">
    <!-- 悬浮头部 -->
    <PageHeader backText="需求详情" backUrl="/pages/driver/driver_search" />
    
    <!-- 地图容器 -->
    <map
      id="map"
      class="map-area"
      :longitude="longitude"
      :latitude="latitude"
      :markers="markers"
      :polyline="polyline"
      :scale="scale"
      show-location
      @ready="onMapReady"
    ></map>
    
    <!-- 定位按钮 -->
    <cover-view class="locate-button1" @tap="getCurrentLocation"></cover-view>
    <cover-view class="locate-button2" @tap="getCurrentLocation"></cover-view>
    
    <!-- 浮动详情 -->
    <view class="floating-details">
      <!-- RideInfoCard -->
      <view class="ride-info-card-shell">
        <RideInfoCard
          :detourPercentage="rideData.detourPercentage"
          :extraDistance="rideData.extraDistance"
          :extraTime="rideData.extraTime"
          :avatarUrl="rideData.avatarUrl"
          :phoneTail="rideData.phoneTail"
          :rating="rideData.rating"
          :orderTime="rideData.orderTime"
          :startLocation="rideData.startLocation"
          :startDistance="rideData.startDistance"
          :endLocation="rideData.endLocation"
          :endDistance="rideData.endDistance"
        />
      </view>

      <!-- 底部操作栏 -->
      <view class="bottom-action-bar">
        <view class="action-income-display">
          <view>收入</view>
          <view class="income-amount">{{ rideData.price }}</view>
          <view>元</view>
        </view>
        <view 
          class="action-button" 
          :class="{ 'accepting': isAccepting }" 
          @tap="handleAcceptOrder"
        >
          {{ isAccepting ? `订单进行中(${countdown}s)` : '接单' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import RideInfoCard from '@/components/RideInfoCard.vue';
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    RideInfoCard,
    PageHeader
  },
  data() {
    const app = getApp();
    return {
      requestId: null,
      countdown: 10,
      isAccepting: false,
      rideData: {
        detourPercentage: null,
        extraDistance: null,
        extraTime: null,
        avatarUrl: null,
        phoneTail: null,
        rating: null,
        orderTime: null,
        startLocation: null,
        startDistance: null,
        endLocation: null,
        endDistance: null,
        price: null,
      },
      longitude: app.globalData.my_location_longitude || 116.397428,
      latitude: app.globalData.my_location_latitude || 39.90923,
      api_key: 'YylCDEyDLCtKCqASXVz7mXtoXLTHsn6D',
      scale: 16,
      markers: [],
      polyline: [],
      mapContext: null,
      startPoint: null,
      endPoint: null,
      currentLocation: null
    };
  },
  methods: {
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
              title: this.rideData.startLocation,
              iconPath: "/static/point_start.png",
              width: 24,
              height: 24
            },
            {
              id: 2,
              longitude: endLngLat[0],
              latitude: endLngLat[1],
              title: this.rideData.endLocation,
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
      return new Promise((resolve, reject) => {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: (res) => {
            this.currentLocation = res;
            this.longitude = res.longitude;
            this.latitude = res.latitude;
            this.scale = 16;
            this.markers = [
              ...this.markers.filter(marker => marker.id !== 3),
              {
                id: 3,
                latitude: res.latitude,
                longitude: res.longitude,
                width: 24,
                height: 24,
                iconPath: '/static/current_location.png'
              }
            ];
            if (this.mapContext) {
              this.mapContext.moveToLocation({
                longitude: res.longitude,
                latitude: res.latitude
              });
            }
            resolve([res.latitude, res.longitude]);
          },
          fail: (err) => {
            console.log('定位失败:', err);
            uni.showToast({
              title: '获取位置失败',
              icon: 'none',
              duration: 2000
            });
            reject(err);
          }
        });
      });
    },
    async calculateDistance(lat1, lng1, lat2, lng2) {
      const toRad = (angle) => angle * (Math.PI / 180);
      const R = 6371; // 地球半径 (km)
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // 计算距离，单位为 km
      return parseFloat(distance.toFixed(3)); // 保留三位小数并返回数字类型
    },
    async initializeMapRoute() {
      try {
        if (this.rideData.startLocation && this.rideData.endLocation) {
          this.startPoint = await this.geocodeAddress(this.rideData.startLocation);
          this.endPoint = await this.geocodeAddress(this.rideData.endLocation);
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
    handleAcceptOrder() {
      if (this.isAccepting) return;
      
      this.isAccepting = true;
      this.countdown = 10;
      
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
          uni.navigateTo({
            url: '/pages/driver/OrderCompleteDisplayPage',
            success: (res) => {
              res.eventChannel.emit('acceptOrderData', {
                startLocation: this.rideData.startLocation,
                endLocation: this.rideData.endLocation,
                orderTime: this.rideData.orderTime,
                phoneTail: this.rideData.phoneTail,
                avatarUrl: this.rideData.avatarUrl,
                income: this.rideData.price
              });
            }
          });
        }
      }, 1000);
    },
    async fetchOrderDetails() {
      try {
        const response = await uni.request({
          url: `http://10.0.2.2:8083/carsharing/get-certain-request?requestId=${this.requestId}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });

        const responseData = response.data;
        console.log(responseData);
        if (responseData && responseData.data && responseData.data.length > 0) {
          // Fetch start location coordinates
          let extraDistance = null;
          if (responseData.data[0].startLoc) {
            try {
              const startCoords = await this.geocodeAddress(responseData.data[0].startLoc);
              const currentLocation = await this.getCurrentLocation();
              extraDistance = await this.calculateDistance(
                currentLocation[0], currentLocation[1], // Current lat, lng
                startCoords[1], startCoords[0]         // Start location lat, lng
              );
            } catch (error) {
              console.error('计算额外距离失败:', error);
              extraDistance = '未知';
            }
          }

          this.rideData = {
            detourPercentage: responseData.data[0].detourPercentage || null,
            extraDistance: extraDistance,
            extraTime: responseData.data[0].extraTime || null,
            avatarUrl: responseData.data[0].avatar || '/static/default-avatar.png',
            phoneTail: responseData.data[0].phone ? responseData.data[0].phone.slice(-4) : '0000',
            rating: responseData.data[0].rating != null ? Number(responseData.data[0].rating) : null,
            orderTime: responseData.data[0].startAt || '未知时间',
            startLocation: responseData.data[0].startLoc || '未知地点',
            startDistance: responseData.data[0].startDistance || null,
            endLocation: responseData.data[0].endLoc || '未知地点',
            endDistance: responseData.data[0].endDistance || null,
            price: responseData.data[0].price || '0',
            exclusive: responseData.data[0].exclusive,
            highway: responseData.data[0].highway
          };
          await this.initializeMapRoute();
        } else {
          uni.showToast({
            title: '获取订单详情失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取订单详情失败:', error);
        uni.showToast({
          title: '获取订单详情失败',
          icon: 'none'
        });
      }
    },
    handleMapMessage(e) {
      console.log("Map message from RideInfoDisplayPage.vue:", e);
    }
  },
  onLoad(options) {
    if (options.id) {
      this.requestId = options.id;
      console.log(this.requestId);
      this.fetchOrderDetails();
    } else {
      uni.showToast({
        title: '订单ID不存在',
        icon: 'none'
      });
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.map-area {
  width: 100%;
  height: 70%;
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
  z-index: 10;
}

.ride-info-card-shell {
  width: 100%;
  box-sizing: border-box;
}

.bottom-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20rpx;
  margin-top: 2px;
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.action-income-display {
  display: flex;
  align-items: baseline;
  font-size: 30rpx;
  color: #333333;
  margin-left: 20rpx;
}

.income-amount {
  font-size: 40rpx;
  font-weight: bold;
  color: #FF7F50;
  margin: 0 6rpx;
}

.action-button {
  padding: 16rpx 70rpx;
  border-radius: 30rpx;
  font-size: 28rpx;
  font-weight: bold;
  text-align: center;
  line-height: normal;
  background-color: #4CAF50;
  color: #ffffff;
  transition: all 0.3s ease;
}

.action-button.accepting {
  background-color: #FFA500;
  pointer-events: none;
}
</style>