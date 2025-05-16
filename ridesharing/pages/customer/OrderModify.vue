<template>
  <view class="container">
    <!-- 悬浮头部 -->
    <PageHeader backText="修改拼车需求" backUrl="/pages/customer/RequestList" />
    
    <!-- 地图部分 -->
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
    <cover-view class="locate-button1" @click="getCurrentLocation"></cover-view>
    <cover-view class="locate-button2" @click="getCurrentLocation"></cover-view>

    <!-- 浮动详情部分 -->
    <view class="floating-details">
      <view class="start_end_loc">
        <view class="first-row">
          <view class="location-select" style="display: flex; flex-direction: column; width: 65%;">
            <view class="location-row start" @click="ToStartLoc">
              <view class="icon start-icon"></view>
              <view class="location-text" :class="{ 'selected': this.rideRequest.startLoc }">{{ this.rideRequest.startLoc ? this.rideRequest.startLoc : '您从哪儿上车' }}</view>
            </view>
            <view class="location-row end" @click="ToEndLoc">
              <view class="icon end-icon"></view>
              <view class="location-text" :class="{ 'selected': this.rideRequest.endLoc }">{{ this.rideRequest.endLoc ? this.rideRequest.endLoc : '您要到哪儿去' }}</view>
            </view>
          </view>
          <view class="time-seats-select" style="display: flex; flex-direction: column; width: 35%;">
            <view class="time-selector" :class="{ 'has-time': selectedTime }" @click="showTimePicker">
              <view style="color: var(--color-blue); font-size: 11px; font-weight: bold; display: flex; flex-direction: row;">
                <uni-icons type="compose" color="var(--color-blue);" style="margin-right: 3px;" size="16"></uni-icons>
                出发时间
                <view class="modify-text" @click="showTimePicker">(修改时间)</view>
              </view>
              <view class="time-text">{{ selectedTime }}</view>
            </view>
            <view class="seats-selector" :class="{ 'has-seats': selectedSeats }" @click="showSeatsInput">
              <view style="color: var(--color-blue); font-size: 11px; font-weight: bold; display: flex; flex-direction: row;">
                <uni-icons type="person" color="var(--color-blue);" style="margin-right: 3px;" size="16"></uni-icons>
                座位人数
                <view class="modify-text" @click="showSeatsInput">(修改人数)</view>
              </view>
              <view class="seats-text">{{ selectedSeats + '人' }}</view>
            </view>
            <view class="highway-selector" :class="{ 'has-highway': highway }">
              <view style="color: var(--color-blue); font-size: 11px; font-weight: bold; display: flex; flex-direction: row; align-items: center;">
                <uni-icons type="flag" color="var(--color-blue);" style="margin-right: 3px;" size="16"></uni-icons>
                愿意协商高速费
                <checkbox 
                  :checked="highway" 
                  @click="this.toggleHighway()"
                  style="margin-left: 4px;"
                ></checkbox>
              </view>
            </view>
          </view>
        </view>
        <view class="second-row">
          <view class="share-option">
            <ShareOption type="shared" :isSelected="selectedType === 'shared'" @select="handleSelect" />
            <ShareOption type="exclusive" :isSelected="selectedType === 'exclusive'" @select="handleSelect" />
          </view>
          <view class="publish-button" @click="publishDemand">修  改</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import { mapState, mapActions } from 'vuex';
import ShareOption from "@/components/ShareOption.vue";

export default {
  components: {
    PageHeader,
    ShareOption
  },
  data() {
    const app = getApp();
    const now = new Date();
    const currentTime = `${now.getFullYear()}年${(now.getMonth() + 1).toString().padStart(2, '0')}月${now.getDate().toString().padStart(2, '0')}日 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      longitude: app.globalData.my_location_longitude,
      latitude: app.globalData.my_location_latitude,
      api_key: app.globalData.api_key,
      scale: 16,
      markers: [],
      polyline: [],
      mapContext: null,
      currentLocation: null,
      startPoint: null,
      endPoint: null,
      selectedTime: currentTime,
      currentTime: now,
      selectedSeats: 1,
      selectedType: null,
      highway: null,
      id: 0,
    };
  },
  computed: {
    ...mapState(['rideRequest', 'rideOrder', 'current_change_request_id']),
  },
  async onShow() {
	  console.log('接收到的id:', this.current_change_request_id);
	  this.id = this.current_change_request_id;
	  await this.fetchRideData();
	  // console.log("完成1");
	  await this.resetGlobal();
	  // console.log("完成2");
	},
  methods: {
    ...mapActions([
      'login',
      'logout',
      'setRequestId',
      'setStartLoc',
      'setEndLoc',
      'setStartAt',
      'setExclusive',
      'toggleHighway',
      'resetRequest',
      'setOrderId',
      'setHighway',
	  'setCurrentChangeRequestId',
    ]),
    async fetchRideData() {
	  if(this.id != this.rideRequest.requestID){
		  try {
		    const response = await uni.request({
		      url: `http://10.0.2.2:8083/carsharing/get-certain-request?requestId=${this.id}`,
		      method: 'GET',
		      header: {
		        'Content-Type': 'application/json',
		      },
		    });
		    if (response.data.status === 'success') {
		      const data = response.data.data[0];
		      
		      // 处理时间，转换为东八区并格式化
		  		  const string = data.startAt;
		  		  const normalizedDateStr = `${string}Z`;
		  		  const startAt = new Date(normalizedDateStr);
		  		  console.log(normalizedDateStr);
		      startAt.setHours(startAt.getHours() - 8); // 加上8小时
		  		  
		      const year = startAt.getFullYear();
		      const month = (startAt.getMonth() + 1).toString().padStart(2, '0');
		      const day = startAt.getDate().toString().padStart(2, '0');
		      const hours = startAt.getHours().toString().padStart(2, '0');
		      const minutes = startAt.getMinutes().toString().padStart(2, '0');
		      this.selectedTime = `${year}年${month}月${day}日 ${hours}:${minutes}`;
		      
		  		  startAt.setHours(startAt.getHours() + 8);
		      this.setRequestId(this.id);
		      this.setStartLoc(data.startLoc);
		      this.setEndLoc(data.endLoc);
		      this.setStartAt(startAt.toISOString());
		      this.setExclusive(data.exclusive);
		      this.setHighway(data.highway);
		  		  this.highway = data.highway;
		      this.selectedType = data.exclusive ? 'exclusive' : 'shared';
		      this.selectedSeats = 1; // 假设后端返回座位数，默认为1
		  
		    } else {
		      throw new Error('获取行程数据失败');
		    }
		  } catch (error) {
		    console.error('获取行程数据失败:', error);
		    uni.showToast({
		      title: '获取行程数据失败',
		      icon: 'none',
		    });
		  }
	  }
    },
    onMapReady() {
      this.mapContext = uni.createMapContext('map', this);
      this.getCurrentLocation();
    },
    async resetGlobal() {
		if (this.rideRequest.requestID != this.current_change_request_id) {
		    this.resetRequest(this.current_change_request_id);
				const now = new Date();
				const currentTime = `${now.getFullYear()}年${(now.getMonth() + 1).toString().padStart(2, '0')}月${now.getDate().toString().padStart(2, '0')}日 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
				this.selectedTime = currentTime;
				this.currentTime = now;
				this.selectedSeats = 1;
		}
		else{
			try {
			  const hasStart = this.rideRequest.startLoc;
			  const hasEnd = this.rideRequest.endLoc;
			
			  if (hasStart && !hasEnd) {
			    this.startPoint = await this.geocodeAddress(this.rideRequest.startLoc);
			    this.longitude = this.startPoint[0];
			    this.latitude = this.startPoint[1];
			    this.scale = 16;
			    this.markers = [{
			      id: 1,
			      latitude: this.startPoint[1],
			      longitude: this.startPoint[0],
			      width: 24,
			      height: 24,
			      iconPath: '/static/point_start.png',
			    }];
			    this.polyline = [];
			    if (this.mapContext) {
			      this.mapContext.moveToLocation({
			        longitude: this.startPoint[0],
			        latitude: this.startPoint[1],
			      });
			    }
			  } else if (!hasStart && hasEnd) {
			    this.endPoint = await this.geocodeAddress(this.rideRequest.endLoc);
			    this.longitude = this.endPoint[0];
			    this.latitude = this.endPoint[1];
			    this.scale = 16;
			    this.markers = [{
			      id: 2,
			      latitude: this.endPoint[1],
			      longitude: this.endPoint[0],
			      width: 24,
			      height: 24,
			      iconPath: '/static/point_end.png',
			    }];
			    this.polyline = [];
			    if (this.mapContext) {
			      this.mapContext.moveToLocation({
			        longitude: this.endPoint[0],
			        latitude: this.endPoint[1],
			      });
			    }
			  } else if (hasStart && hasEnd) {
						// console.log("都有");
			    this.startPoint = await this.geocodeAddress(this.rideRequest.startLoc);
			    this.endPoint = await this.geocodeAddress(this.rideRequest.endLoc);
			    await this.getDrivingRoute(this.startPoint, this.endPoint);
			  } else {
			    this.markers = [];
			    this.polyline = [];
			    this.getCurrentLocation();
			  }
			} catch (error) {
			  console.error('地址解析失败:', error);
			  uni.showToast({
			    title: '地址解析失败，请检查地址',
			    icon: 'none',
			    duration: 2000,
			  });
			  this.markers = [];
			  this.polyline = [];
			  this.getCurrentLocation();
			}
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
          },
        });
      });
    },
    async getDrivingRoute(startLngLat, endLngLat) {
      if (!startLngLat || !endLngLat) return;

      try {
        const url = `https://restapi.amap.com/v3/direction/driving?key=${this.api_key}&origin=${startLngLat[0]},${startLngLat[1]}&destination=${endLngLat[0]},${endLngLat[1]}&strategy=0`;
        
        const response = await uni.request({
          url: url,
          method: 'GET',
        });

        if (response.data.status === "1" && response.data.route) {
          const pathSteps = response.data.route.paths[0].steps;

          this.markers = [
            {
              id: 1,
              longitude: startLngLat[0],
              latitude: startLngLat[1],
              title: this.rideRequest.startLoc,
              iconPath: "/static/point_start.png",
              width: 24,
              height: 24,
            },
            {
              id: 2,
              longitude: endLngLat[0],
              latitude: endLngLat[1],
              title: this.rideRequest.endLoc,
              iconPath: "/static/point_end.png",
              width: 24,
              height: 24,
            },
          ];

          this.polyline = pathSteps.map(step => ({
            points: step.polyline.split(';').map(coord => {
              const [lng, lat] = coord.split(',').map(Number);
              return {
                longitude: lng,
                latitude: lat,
              };
            }),
            color: '#517aff',
            width: 10,
            dottedLine: false,
          }));

          this.adjustMapView();
        } else {
          throw new Error('路径规划失败');
        }
      } catch (error) {
        console.error('路线规划错误:', error);
        uni.showToast({
          title: '路线规划失败',
          icon: 'none',
        });
      }
    },
    adjustMapView() {
      let allPoints = [];

      this.markers.forEach(marker => {
        allPoints.push({
          longitude: marker.longitude,
          latitude: marker.latitude,
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
        maxLat,
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
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: (res) => {
          console.log('定位成功:', res);
          this.currentLocation = res;
          this.longitude = res.longitude;
          this.latitude = res.latitude;
          this.scale = 16;
          this.markers = [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 24,
            height: 24,
            iconPath: '/static/current_location.png',
          }];
          if (this.mapContext) {
            this.mapContext.moveToLocation({
              longitude: res.longitude,
              latitude: res.latitude,
            });
          }
        },
        fail: (err) => {
          console.log('定位失败:', err);
          uni.showToast({
            title: '获取地址失败，将导致部分功能不可用',
            icon: 'none',
            duration: 2000,
          });
        },
      });
    },
    ToStartLoc() {
		this.setCurrentChangeRequestId(this.id);
      uni.navigateTo({
        url: '/pages/customer/StartLoc',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },
    ToEndLoc() {
		this.setCurrentChangeRequestId(this.id);
      uni.navigateTo({
        url: '/pages/customer/EndLoc',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },
    handleSelect(type) {
      this.selectedType = type;
      if (type === 'shared') {
        this.setExclusive(false);
      } else {
        this.setExclusive(true);
      }
    },
    showTimePicker() {
      uni.showActionSheet({
        itemList: ['当前时间', '15分钟后', '30分钟后', '1小时后', '自定义时间'],
        success: (res) => {
          if (res.tapIndex === 4) {
            this.showDateTimeInput();
          } else {
            const times = [0, 15, 30, 60];
            this.selectTime(times[res.tapIndex]);
          }
        },
      });
    },
    showDateTimeInput() {
      const now = new Date();
      const currentDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      uni.showModal({
        title: '自定义出发时间',
        content: `当前时间: ${currentDateTime}\n请输入出发时间(YYYY-MM-DD HH:MM)`,
        editable: true,
        placeholderText: '例如: ' + this.getTomorrowDate(),
        showCancel: false,
        confirmButtonText: '确定',
        confirmButtonColor: '#007AFF',
        success: (res) => {
          if (res.confirm) {
            this.validateAndSetDateTime(res.content);
          }
        },
      });
    },
    getTomorrowDate() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getDate().toString().padStart(2, '0')} 09:00`;
    },
    validateAndSetDateTime(dateTimeStr) {
      const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
      if (!dateTimeRegex.test(dateTimeStr)) {
        uni.showToast({
          title: '格式不正确，请使用YYYY-MM-DD HH:MM格式',
          icon: 'none',
        });
        return;
      }

      const [_, year, month, day, hours, minutes] = dateTimeStr.match(dateTimeRegex);
      const targetTime = new Date(year, month - 1, day, hours, minutes);
      const now = new Date();

      if (isNaN(targetTime.getTime())) {
        uni.showToast({
          title: '日期时间无效',
          icon: 'none',
        });
        return;
      }

      if (targetTime < now) {
        uni.showToast({
          title: '时间已过，请选择未来的时间',
          icon: 'none',
        });
        return;
      }

      const formattedDate = `${year}年${month}月${day}日 ${hours}:${minutes}`;
      this.selectedTime = formattedDate;
      this.setStartAt(targetTime.toISOString());

      uni.showToast({
        title: `已设置: ${formattedDate}`,
        icon: 'success',
      });
    },
    selectTime(minutesLater) {	  
	  // const now = new Date();
	  this.currentTime.setHours(this.currentTime.getHours() + 8); // 加上8小时
	  const targetTime1 = new Date(this.currentTime.getTime() + minutesLater * 60000);
	  this.currentTime.setHours(this.currentTime.getHours() - 8); 
	  
	  const targetTime2 = new Date(this.currentTime.getTime() + minutesLater * 60000);
	  const hours = targetTime2.getHours().toString().padStart(2, '0');
	  const minutes = targetTime2.getMinutes().toString().padStart(2, '0');
	  if (minutesLater === 0) {
	    this.selectedTime = `${this.currentTime.getFullYear()}年${(this.currentTime.getMonth() + 1).toString().padStart(2, '0')}月${this.currentTime.getDate().toString().padStart(2, '0')}日 ${hours}:${minutes}`;
	  } else {
	    this.selectedTime = `${minutesLater}分钟后 (${hours}:${minutes})`;
	  }
	  this.setStartAt(targetTime1.toISOString());
    },
    showSeatsInput() {
      uni.showModal({
        title: '选择座位人数',
        content: '请输入需要的座位数（1-7）',
        editable: true,
        placeholderText: '例如: 2',
        showCancel: false,
        confirmButtonText: '确定',
        confirmButtonColor: '#007AFF',
        success: (res) => {
          if (res.confirm) {
            this.validateAndSetSeats(res.content);
          }
        },
      });
    },
    validateAndSetSeats(seatsStr) {
      const seats = parseInt(seatsStr);
      if (isNaN(seats) || seats < 1 || seats > 7) {
        uni.showToast({
          title: '请输入1-7之间的有效人数',
          icon: 'none',
        });
        return;
      }
      this.selectedSeats = seats;
      uni.showToast({
        title: `已设置: ${seats}人`,
        icon: 'success',
      });
    },
    async publishDemand() {
      try {
        const requestData = {
          startLoc: this.rideRequest.startLoc,
          endLoc: this.rideRequest.endLoc,
          startAt: this.rideRequest.startAt,
		  requestId:this.id,
          exclusive: this.rideRequest.exclusive,
          highway: this.rideRequest.highway,
        };
		console.log(requestData);
        const response = await uni.request({
          url: `http://10.0.2.2:8083/carsharing/modify-request`,
          method: 'POST',
          data: requestData,
          header: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.status === 'success') {
          uni.showToast({
            title: '修改成功',
            icon: 'success',
          });
          uni.navigateBack({
            delta: 1,
          });
        } else {
          // throw new Error('请求失败');
        }
      } catch (error) {
        console.error('修改失败:', error);
        uni.showToast({
          title: '修改失败',
          icon: 'none',
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

.floating-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

.start_end_loc {
  width: 93%;
  background-color: #ffffff;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 15px 15px 5px 15px;
  display: flex;
  flex-direction: column;
}

.first-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.location-select {
  display: flex;
  flex-direction: column;
  width: 65%;
}

.location-row {
  margin-left: 5px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--color-lightgrey);
  border-radius: 8px;
  box-shadow: 0 2px 6px var(--color-grey);
}

.location-row.start {
  margin-bottom: 12px;
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

.location-text {
  color: var(--color-darkgrey);
  font-size: 14px;
  flex: 1;
  font-weight: bold;
}

.location-text.selected {
  color: black;
}

.time-seats-select {
  display: flex;
  flex-direction: column;
  width: 35%;
}

.time-selector {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.seats-selector {
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  gap: 1px;
}

.time-text,
.seats-text {
  font-size: 10px;
  position: relative;
  display: inline-block;
  margin-left: 19px;
  color: var(--color-orange);
  font-weight: bold;
}

.modify-text {
  color: var(--color-darkgrey);
  margin-left: 8px;
  text-decoration: underline;
  cursor: pointer;
}

.highway-selector {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
}

checkbox {
  transform: scale(0.8);
}

.second-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.share-option {
  display: flex;
  flex-direction: row;
}

.publish-button {
  margin: 6px 6px;
  background-color: var(--color-red);
  padding: 8px 16px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 23px;
  justify-content: center;
}
</style>