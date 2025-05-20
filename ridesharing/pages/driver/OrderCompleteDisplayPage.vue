<template>
  <view class="container">
    <!-- 悬浮头部 -->
    <PageHeader backText="订单已完成" backUrl="/pages/driver/driver_search" />
    
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
      <OrderCompleteCard
        :income="orderInfo.income"
        :avatarUrl="orderInfo.avatarUrl"
        :phoneTail="orderInfo.phoneTail"
        :rating="orderInfo.rating"
        :orderTime="orderInfo.orderTime"
        :startLocation="orderInfo.startLocation"
        :startDistance="orderInfo.startDistance"
        :endLocation="orderInfo.endLocation"
        :endDistance="orderInfo.endDistance"
      />
    </view>
  </view>
</template>

<script>
import OrderCompleteCard from '@/components/OrderCompleteCard.vue';
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    OrderCompleteCard,
    PageHeader
  },
  data() {
    const app = getApp();
    return {
      orderInfo: {
        income: "0",
        avatarUrl: '/static/default-avatar.png',
        phoneTail: "0000",
        rating: null,
        orderTime: "未知时间",
        startLocation: "未知地点",
        startDistance: "0",
        endLocation: "未知地点",
        endDistance: "0"
      },
      longitude: app.globalData.my_location_longitude || 116.397428,
      latitude: app.globalData.my_location_latitude || 39.90923,
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
              title: this.orderInfo.startLocation,
              iconPath: "/static/point_start.png",
              width: 24,
              height: 24
            },
            {
              id: 2,
              longitude: endLngLat[0],
              latitude: endLngLat[1],
              title: this.orderInfo.endLocation,
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
    async initializeMapRoute() {
      try {
        if (this.orderInfo.startLocation && this.orderInfo.endLocation) {
          this.startPoint = await this.geocodeAddress(this.orderInfo.startLocation);
          this.endPoint = await this.geocodeAddress(this.orderInfo.endLocation);
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
    handleMapMessage(e) {
      console.log("Map message from OrderCompleteDisplayPage:", e);
    }
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptOrderData', (data) => {
      this.orderInfo = {
        income: data.income || "0",
        avatarUrl: data.avatarUrl || '/static/default-avatar.png',
        phoneTail: data.phoneTail || "0000",
        rating: data.rating != null ? Number(data.rating) : null,
        orderTime: data.orderTime || "未知时间",
        startLocation: data.startLocation || "未知地点",
        startDistance: data.startDistance || "0",
        endLocation: data.endLocation || "未知地点",
        endDistance: data.endDistance || "0"
      };
      this.initializeMapRoute();
    });
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
  z-index: 9999;
}
</style>