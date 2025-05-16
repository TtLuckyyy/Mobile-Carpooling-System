<template>
  <view :style="{ paddingTop: statusBarHeight + 'px' }" class="container">
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

    <!-- 浮动按钮和订单请求部分 -->
    <view class="floating-buttons">
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
                <uni-icons type="person" color="var(--color-blue);" style="margin-right: 3px;"size="16"></uni-icons>
                座位人数
                <view class="modify-text" @click="showSeatsInput">(修改人数)</view>
              </view>
              <view class="seats-text">{{ selectedSeats + '人'}}</view>
            </view>
			<view class="highway-selector" :class="{ 'has-highway': highway }">
				<view style="color: var(--color-blue); font-size: 11px; font-weight: bold; display: flex; flex-direction: row; align-items: center;">
					<uni-icons type="flag" color="var(--color-blue);" style="margin-right: 3px;"size="16"></uni-icons>
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
		  <view class="publish-button" @click="publishDemand">立即发布</view>
        </view>
      </view>
	  <view class="order-request">
			<view class="order-card"   @click="ToOrderDetail">
				<view class="order-header"  @click="ToOrderDetail">
					<view class="order-title" style="font-size: 16px;"  @click="ToOrderDetail">
						  <view>正在</view>
						  <view style="color: var(--color-green);">进行中</view>
						  <view>的订单</view>
					</view>
					<view class="order-detail-btn" @click="ToOrderDetail" v-if="currentOrders.length > 0">详情 >></view>
				</view>
				<view class="order-content"  @click="ToOrderDetail" v-if="currentOrders.length > 0">
					<view class="order-distance"  @click="ToOrderDetail">
						<view style="margin-bottom:2px;">剩余</view> 
						<view class="km" style="display: flex;flex-direction: row; align-items: flex-end;">
							<view style="color: var(--color-red); font-size: 20px;">{{currentOrders[0].distance}}</view>
							<view style="color: var(--color-red); margin-left: 4px;">km</view> 
						</view>
					</view>
					<view class="driver-info" @click="ToOrderDetail">
					  <view class="car-plate">{{currentOrders[0].carPlate}}</view>
					  <view class="vertical-divider"></view> 
					  <view class="driver-rating">
						<view class="driver-detail" style="display: flex; flex-direction: row; align-items: center; gap:2px">
							<view class="stars">{{currentOrders[0].driverRating}}分</view>
							<view class="driver-name">{{currentOrders[0].driverName}}</view>
							<view class="driver-avator">{{currentOrders[0].avator}}</view>
						</view>
						<view class="car-detail">{{currentOrders[0].carColor || '黑色'}} | {{currentOrders[0].carModel}}</view>
					  </view>
					</view>
				</view>
				<view class="order-content no-orders" v-else>
				    当前没有进行中的订单
				</view>
			</view>
			<view class="request-info" @click="ToDetailRequest">
				<view class="request-detail" @click="ToDetailRequest">
				  <view style="display: flex;flex-direction: row; align-items: flex-end;gap:3px;" @click="ToDetailRequest">
					  <view class="request-count" @click="ToDetailRequest">{{requestnumber}}</view>
					  <view style="font-size: 16px; margin-bottom: 3px;">条</view>
				  </view>
				</view>
				<view style="width: 200px; display: flex;align-items: end; flex-direction: column;">
					<view class="request-title" @click="ToDetailRequest">
									  <view >拼车</view>
									  <view style="color: var(--color-orange);">需求</view>
					</view>
					<view class="request-status" @click="ToDetailRequest">已发布待匹配</view>
					<view class="order-detail-btn2" @click="ToDetailRequest">详情 >></view>
				</view>
			</view>
	  </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ShareOption from "@/components/ShareOption.vue";

export default {
  components: {
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
      addrDel: null,
      mapContext: null,
      currentLocation: null,
      startPoint: null,
      endPoint: null,
      selectedType: null,
      selectedTime: currentTime,
	  currentTime:now,
      selectedSeats: 1,
      requestnumber: 0,
      ordersnumber: 0,
      currentOrders: [],
	  highway: null,
    };
  },
  computed: {
    ...mapState(['userID', 'rideRequest', 'rideOrder', 'current_change_request_id']),
  },
  onLoad() {
	this.currentTime.setHours(this.currentTime.getHours() + 8); // 加上8小时
    this.setStartAt(this.currentTime.toISOString());
	this.currentTime.setHours(this.currentTime.getHours() - 8); // 加上8小时
	console.log(this.rideRequest.startAt);
  },
  onShow() {
	this.getRequests();
	this.getCurrentOrder();
    this.setCurrentChangeRequestId(0);
    this.resetGlobal();
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
      'resetRideRequest',
      'setOrderId',
      'setCurrentChangeRequestId',
      'resetRequest',
    ]),
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
		this.currentTime.setHours(this.currentTime.getHours() + 8); // 加上8小时
		this.setStartAt(this.currentTime.toISOString());
		this.currentTime.setHours(this.currentTime.getHours() - 8); // 加上8小时
		this.selectedSeats = 1;
      } else {
        try {
          // 检查起点和终点是否存在
          const hasStart = this.rideRequest.startLoc;
          const hasEnd = this.rideRequest.endLoc;
    
          if (hasStart && !hasEnd) {
            // 只有起点
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
              iconPath: '/static/point_start.png'
            }];
            this.polyline = []; // 清除路径
            if (this.mapContext) {
              this.mapContext.moveToLocation({
                longitude: this.startPoint[0],
                latitude: this.startPoint[1]
              });
            }
          } else if (!hasStart && hasEnd) {
            // 只有终点
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
              iconPath: '/static/point_end.png'
            }];
            this.polyline = []; // 清除路径
            if (this.mapContext) {
              this.mapContext.moveToLocation({
                longitude: this.endPoint[0],
                latitude: this.endPoint[1]
              });
            }
          } else if (hasStart && hasEnd) {
            // 起点和终点都存在，进行路线规划
            this.startPoint = await this.geocodeAddress(this.rideRequest.startLoc);
            this.endPoint = await this.geocodeAddress(this.rideRequest.endLoc);
            await this.getDrivingRoute(this.startPoint, this.endPoint);
          } else {
            // 起点和终点都不存在，重置到当前位置
            this.markers = [];
            this.polyline = [];
            this.getCurrentLocation();
          }
        } catch (error) {
          console.log('地址解析失败:', error);
          uni.showToast({
            title: '地址解析失败，请检查地址',
            icon: 'none',
            duration: 2000
          });
          // 失败时重置到当前位置
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
          // console.log('定位成功:', res);
          that.addrDel = res;
          that.longitude = res.longitude;
          that.latitude = res.latitude;
          that.scale = 16;
          that.markers = [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 24,
            height: 24,
            iconPath: '/static/current_location.png'
          }];
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
            title: '获取地址失败，将导致部分功能不可用',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    async publishDemand() {
      try {
        const requestData = {
          passengerId: this.userID,
          startLoc: this.rideRequest.startLoc,
          endLoc: this.rideRequest.endLoc,
          status: 'PENDING',
          startAt: this.rideRequest.startAt,
          exclusive: this.rideRequest.exclusive,
          highway: this.rideRequest.highway,
        };
		console.log(requestData);
        const response = await uni.request({
          url: 'http://10.0.2.2:8083/carsharing/post-request',
          method: 'POST',
          data: requestData,
          header: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.status === 'success') {
          const responseData = response.data;
          if (responseData.requestID) {
            this.setRequestId(responseData.requestID);
			this.requestnumber += 1;
			// 重置地图相关数据
			this.markers = [];
			this.polyline = [];
			this.longitude = getApp().globalData.my_location_longitude;
			this.latitude = getApp().globalData.my_location_latitude;
			this.scale = 16;
			this.startPoint = null;
			this.endPoint = null;
			
			// 重置选择的时间、座位和类型
			this.selectedTime = null;
			this.selectedSeats = null;
			this.selectedType = null;
			// 获取当前位置以居中地图
			this.getCurrentLocation();
			
			
            uni.showToast({
              title: '发布成功',
              icon: 'success',
            });
            this.ToInvitationMatch();
          } else {
            throw new Error('未收到 requestID');
          }
        } else {
          throw new Error('请求失败');
        }
      } catch (error) {
        console.error('发布失败:', error);
        uni.showToast({
          title: '发布失败',
          icon: 'none',
        });
      }
    },
    ToInvitationMatch() {
      uni.navigateTo({
        url: './InvitationMatch',
        animationType: 'slide-in-right',
        huntingDuration: 300,
      });
    },
    ToDetailRequest() {
      uni.navigateTo({
        url: './RequestList',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },
    ToStartLoc() {
      uni.navigateTo({
        url: './StartLoc',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },
    ToEndLoc() {
      uni.navigateTo({
        url: './EndLoc',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },
    handleSelect(type) {
      this.selectedType = type;
      if(type == 'shared'){
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
        }
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
        }
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
          icon: 'none'
        });
        return;
      }

      const [_, year, month, day, hours, minutes] = dateTimeStr.match(dateTimeRegex);
      const targetTime = new Date(year, month - 1, day, hours, minutes);
      const now = new Date();

      if (isNaN(targetTime.getTime())) {
        uni.showToast({
          title: '日期时间无效',
          icon: 'none'
        });
        return;
      }

      if (targetTime < now) {
        uni.showToast({
          title: '时间已过，请选择未来的时间',
          icon: 'none'
        });
        return;
      }

      const formattedDate = `${year}年${month}月${day}日 ${hours}:${minutes}`;
      this.selectedTime = formattedDate;
	  targetTime.setHours(this.currentTime.getHours() + 8); // 加上8小时
      this.setStartAt(targetTime.toISOString());

      uni.showToast({
        title: `已设置: ${formattedDate}`,
        icon: 'success'
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
        }
      });
    },
    validateAndSetSeats(seatsStr) {
      const seats = parseInt(seatsStr);
      if (isNaN(seats) || seats < 1 || seats > 7) {
        uni.showToast({
          title: '请输入1-7之间的有效人数',
          icon: 'none'
        });
        return;
      }
      this.selectedSeats = seats;
      uni.showToast({
        title: `已设置: ${seats}人`,
        icon: 'success'
      });
    },
    async getRequests() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await uni.request({
          url: `http://10.0.2.2:8083/carsharing/get-requests?userId=${this.userID}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
        if (response.data.status === 'success') {
          const res = response.data.history;
          if (res && res.length > 0) {
            this.requestnumber = res.filter(request => request.status === 'PENDING').length;
          } else {
            this.requestnumber = 0;
          }
        } else {
          throw new Error(response.data.message || '获取请求列表失败');
        }
      } catch (error) {
        console.error('获取请求列表失败:', error);
        this.error = error.message || '获取请求列表失败';
        this.requestnumber = 0;
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    async getCurrentOrder() {
      this.isLoading = true;
      this.error = null;
      try {
        if (!this.userID) {
          throw new Error('用户未登录');
        }
        const response = await uni.request({
          url: `http://10.0.2.2:8083/carsharing/current-order?userId=${this.userID}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
        if (response.data.status === 'success') {
          const res = response.data;
          const now = new Date();
          if (res.orders && res.orders.length > 0) {
            const pastOrders = res.orders
              .filter(order => new Date(order.startAt) < now)
              .sort((a, b) => new Date(b.startAt) - new Date(a.startAt));
            this.currentOrders = pastOrders.length > 0
              ? [{
                  id: pastOrders[0].id,
                  distance: pastOrders[0].distance,
                  driverName: pastOrders[0].realName,
                  driverRating: pastOrders[0].rating,
                  carModel: pastOrders[0].verificationCarModel || '未知车型',
                  carPlate: pastOrders[0].verificationCarPlate || '未知车牌',
                  startAt: pastOrders[0].startAt || '未知时间',
                  avatar: pastOrders[0].avatar,
                }]
              : [];
            this.ordersnumber = this.currentOrders.length;
          } else {
            this.ordersnumber = 0;
            this.currentOrders = [];
          }
        } else {
          throw new Error(response.data.message || '获取当前订单失败');
        }
      } catch (error) {
        console.error('获取当前订单失败:', error);
        this.error = error.message || '获取当前订单失败';
        this.ordersnumber = 0;
        this.currentOrders = [];
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    ToOrderDetail() {
      if (this.currentOrders.length > 0) {
        const orderid = this.currentOrders[0].id;
        this.setOrderId(orderid);
        uni.navigateTo({
          url: './OrderDetail',
          animationType: 'slide-in-right',
          animationDuration: 300
        });
      } else {
        uni.showToast({
          title: '没有可查看的订单',
          icon: 'none'
        });
      }
    },
  },
};
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
  height: 61%;
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

.locate-button:active {
  transform: scale(0.95);
}

.locate-icon {
  width: 24rpx;
  height: 24rpx;
}

.floating-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  z-index: 9999;
}

.first-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.start_end_loc {
  width: 95%;
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 15px 15px 5px 15px;
  display: flex;
  flex-direction: column;
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

.share-option {
  display: flex;
  flex-direction: row;
}

.second-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
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

.time-line {
  height: 1px;
  background-color: var(--color-grey);
  width: 100%;
}

.order-request {
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
}

.order-card {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  width: 60%;
  background-color: #ffffff;
  border-top-right-radius: 15px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px 10px 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-title {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  color: black;
}

.order-distance {
  display: flex;
  flex-direction: row;
  align-items: end;
  font-size: 12px;
  color: var(--color-darkgrey);
}

.order-detail-btn {
  font-size: 12px;
  color: var(--color-lightgreen);
}

.order-detail-btn2 {
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-lightgreen);
}

.driver-info {
  display: flex;
  margin-left:5px;
  flex-direction: row;
  align-items: center;
}

.driver-rating {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.stars {
  color: #FFCC00;
  font-size: 14px;
}

.driver-name {
  color: var(--color-darkgrey);
  font-size: 12px;
  font-weight: bold;
}

.car-info {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}

.car-plate {
  font-size: 20px;
  font-weight: bold;
}

.car-detail {
  font-size: 10px;
  color: var(--color-darkgrey);
  font-weight: 500;
}

.request-info {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  width: 30%;
  background-color: #ffffff;
  border-top-left-radius: 15px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  gap:6px;
}

.request-title {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  color: black;
  align-items: flex-end;
}

.request-status {
  font-size: 12px;
  color: var(--color-darkgrey);
  align-items: flex-end;
}

.request-detail {
  margin-left: 5px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
}

.request-count {
  font-size: 40px;
  color: var(--color-red);
}

.request-detail > view:first-child {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.request-detail > view:last-child {
  font-size: 12px;
  color: var(--color-darkgrey);
}

.order-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.no-orders {
  font-size: 14px;
  color: var(--color-darkgrey);
  text-align: center;
  padding: 10px;
  justify-content: center;
}

.vertical-divider {
  width: 1px;
  height: 32px;
  background-color: var(--color-grey);
  margin: 0px 6px;
}

.location-text.selected {
  color: black;
}

.highway-selector {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
}

checkbox {
  transform: scale(0.8);
}
</style>