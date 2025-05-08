<template>
  <view :style="{ paddingTop: statusBarHeight + 'px' }">
    <!-- 地图容器 -->
    <view class="map-container">
      <web-view src="/static/map.html" @message="handleMapMessage"></web-view>
      <!-- 使用cover-view作为浮动按钮容器 -->
      <cover-view class="floating-buttons">
        <cover-view class="start_end_loc">
          <cover-view class="first-row">
            <cover-view class="location-row start" @click="ToStartLoc">
              <cover-view class="icon start-icon" @click="ToStartLoc"></cover-view>
              <cover-view class="location-text" @click="ToStartLoc">{{ rideRequest.startLoc ? rideRequest.startLoc : '你从哪上车' }}</cover-view>
            </cover-view>
            <cover-view class="location-row end" @click="ToEndLoc">
              <cover-view class="icon end-icon" @click="ToEndLoc"></cover-view>
              <cover-view class="location-text" @click="ToEndLoc">{{ rideRequest.endLoc ? rideRequest.endLoc : '你要到哪去' }}</cover-view>
            </cover-view>
          </cover-view>
          <cover-view class="second-row">
            <cover-view class="share-option">
              <ShareOption type="shared" :isSelected="selectedType === 'shared'" @select="handleSelect"/>
              <ShareOption type="exclusive" :isSelected="selectedType === 'exclusive'" @select="handleSelect"/>
            </cover-view>
            <cover-view class="publish-button-container">
              <cover-view class="time-selector" :class="{'has-time': selectedTime}" @click="showTimePicker">
                <cover-view class="time-text" @click="showTimePicker">{{ selectedTime || "一会出发？选择出发时间" }}</cover-view>
                <cover-view class="time-line" @click="showTimePicker" v-show="!selectedTime"></cover-view>
              </cover-view>
              <cover-view class="publish-button" @click="publishDemand">发布</cover-view>
            </cover-view>
          </cover-view>
        </cover-view>
		
		<cover-view class="order-request" v-if="currentOrders.length > 0">
			  <cover-view class="order-card"   @click="ToOrderDetail">
			    <cover-view class="order-header"  @click="ToOrderDetail">
			      <cover-view class="order-title" style="font-size: 18px;"  @click="ToOrderDetail">
					  <cover-view>正在</cover-view>
					  <cover-view style="color: var(--color-green);">进行中</cover-view>
					  <cover-view>的订单</cover-view>
				  </cover-view>
			      
			      <cover-view class="order-detail-btn" @click="ToOrderDetail">详情 >></cover-view>
			    </cover-view>
			    
				<cover-view class="order-content"  @click="ToOrderDetail">
					<cover-view class="order-distance"  @click="ToOrderDetail">
						<cover-view>剩余</cover-view> 
						<cover-view class="km" style="display: flex;flex-direction: row; align-items: flex-end;">
							<cover-view style="color: var(--color-red); font-size: 24px;">{{currentOrders[0].distance}}</cover-view>
							<cover-view style="color: var(--color-red); margin-left: 4px;">km</cover-view> 
						</cover-view>
					</cover-view>
					
					<cover-view class="driver-info" @click="ToOrderDetail">
					  <cover-view class="driver-rating">
					    <cover-view class="stars">★★★★★</cover-view>
						<cover-view class="driver-detail">
							<cover-view class="driver-name">{{currentOrders[0].driverName}}</cover-view>
							<cover-view class="driver-avator">{{currentOrders[0].avator}}</cover-view>
						</cover-view>
					  </cover-view>
					  <cover-view class="car-info"  @click="ToOrderDetail">
					    <cover-view class="car-plate">{{currentOrders[0].carPlate}}</cover-view>
					    <cover-view class="car-detail">🔍 {{currentOrders[0].carColor || '黑色'}} | {{currentOrders[0].carModel}}</cover-view>
					  </cover-view>
					</cover-view>
				</cover-view>
			  </cover-view>
			<cover-view class="request-info" @click="ToDetailRequest">
			  <cover-view class="request-title" @click="ToDetailRequest">
				  <cover-view >拼车</cover-view>
				  <cover-view style="color: var(--color-orange);">需求</cover-view>
			  </cover-view>
			  
			  <cover-view class="request-status" @click="ToDetailRequest">已发布待匹配</cover-view>
			  <cover-view class="request-detail" @click="ToDetailRequest">
				  <cover-view style="display: flex;flex-direction: row; align-items: flex-end;" @click="ToDetailRequest">
					  <cover-view class="request-count" @click="ToDetailRequest">{{requestnumber}}</cover-view>
					  <cover-view>条</cover-view>
				  </cover-view>
				  <cover-view class="order-detail-btn" @click="ToDetailRequest">详情 >></cover-view>
			  </cover-view>
			  
			</cover-view>
		</cover-view>
	  </cover-view>
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
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      currentLocation: null,
      startPoint: null,
      endPoint: null,
      selectedType: null,
      selectedTime: null,
      showTimePopup: false,
	  requestnumber:0,
	  ordersnumber:0,
	  currentOrders:[
		    //     {
		    //       id: 1,
		    //       distance: 10.5,
		    //       driverName: "张三",
		    //       driverRating: 4.8,
		    //       carModel: "特斯拉 Model",
		    //       carPlate: "京A12345",
		    //       startAt: "2025-04-21T10:00:00Z",
				  // avatar:"@/static/1.png"
		    //     },
		    //     {
		    //       id: 2,
		    //       distance: 5.2,
		    //       driverName: "李四",
		    //       driverRating: 4.6,
		    //       carModel: "比亚迪汉",
		    //       carPlate: "京B67890",
		    //       startAt: "2025-04-21T11:30:00Z",
		    //     },
		    //     {
		    //       id: 3,
		    //       distance: 7.8,
		    //       driverName: "王五",
		    //       driverRating: 4.9,
		    //       carModel: "宝马 5 系",
		    //       carPlate: "京C56789",
		    //       startAt: "2025-04-21T12:45:00Z",
		    //     }
	  ],
    };
  },
  computed: {
    ...mapState(['userID', 'rideRequest','rideOrder']),
  },
  onLoad() {
	this.getRequests();
	this.getCurrentOrder();
  },
  methods: {
    ...mapActions([
      'login',
      'logout',
      'setRequestId',
      'setStartLoc',
      'setEndLoc',
      'setStartAt',
      'toggleExclusive',
      'toggleHighway',
      'resetRideRequest',
	  'setOrderId',
    ]),

    handleMapMessage(e) {
      const { longitude, latitude, type, distance, duration } = e.detail.data;
      if (type === 'select') {
        if (!this.startPoint) {
          this.startPoint = [longitude, latitude];
          uni.showToast({
            title: `已记录起点: ${longitude}, ${latitude}`,
            icon: 'none',
          });
        } else if (!this.endPoint) {
          this.endPoint = [longitude, latitude];
          uni.showToast({
            title: `已记录终点: ${longitude}, ${latitude}`,
            icon: 'none',
          });
        }
      } else if (type === 'location') {
        this.currentLocation = [longitude, latitude];
        uni.showToast({
          title: `当前位置: ${longitude}, ${latitude}`,
          icon: 'none',
        });
      } else if (type === 'route') {
        uni.showToast({
          title: `距离: ${distance}m, 时长: ${Math.round(duration/60)}分钟`,
          icon: 'none',
        });
      }
    },

    getCurrentLocation() {
      const webview = this.$refs.webview;
      webview.evalJS('getCurrentPosition()');
    },

    startRoutePlanning() {
      if (!this.rideRequest.startLoc || !this.rideRequest.endLoc) {
        uni.showToast({
          title: '请先设置起点和终点',
          icon: 'none',
        });
        return;
      }
      const webview = this.$refs.webview;
      webview.evalJS(`planRoute(${this.rideRequest.startLoc[0]}, ${this.rideRequest.startLoc[1]}, ${this.rideRequest.endLoc[0]}, ${this.rideRequest.endLoc[1]})`);
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

        const response = await uni.request({
          url: 'http://localhost:8083/carsharing/post-request',
          method: 'POST',
          data: requestData,
          header: {
            'Content-Type': 'application/json',
          },
        });
		console.log(requestData);
        if (response.data.status === 'success') {
          const responseData = response.data;
          if (responseData.requestID) {
            this.setRequestId(responseData.requestID);
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
        animationDuration: 300,
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
    },
    showTimePicker() {
      uni.showActionSheet({
        itemList: ['15分钟后', '30分钟后', '1小时后', '自定义时间'],
        success: (res) => {
          if (res.tapIndex === 3) {
            this.showDateTimeInput();
          } else {
            const times = [15, 30, 60];
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
        showCancel: false, // 不显示取消按钮
        confirmButtonText: '确定', // 自定义确认按钮文字
        confirmButtonColor: '#007AFF', // 自定义确认按钮颜色
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
      this.setStartAt(targetTime.toISOString());

      uni.showToast({
        title: `已设置: ${formattedDate}`,
        icon: 'success'
      });
    },

    selectTime(minutesLater) {
      const now = new Date();
      const targetTime = new Date(now.getTime() + minutesLater * 60000);
      this.selectedTime = `${minutesLater}分钟后 (${targetTime.getHours()}:${targetTime.getMinutes().toString().padStart(2, '0')})`;
      this.setStartAt(targetTime.toISOString());
    },
	
	async getRequests() {
	  this.isLoading = true;
	  this.error = null;
	  
	  try {
		// 检查是否有用户ID
		// if (!this.userID) {
		//   throw new Error('用户未登录');
		// }
		
		const response = await uni.request({
		  url: 'http://localhost:8083/carsharing/get-requests?userId=1',
		  method: 'GET',
		  header: {
			'Content-Type': 'application/json'
		  }
		});
		
		// 处理响应数据
		if (response.data.status === 'success') {
		  const res = response.data.history;
		  console.log(res)
		  if (res && res.length > 0) {
			// 只统计 status 为 'pending' 的请求数量
			this.requestnumber = res.filter(request => request.status === 'PENDING').length;
		  } else {
			this.requestnumber = 0; // 没有请求时设为0
		  }
		} else { // 返回的 code 错误
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
	      url: `http://localhost:8083/carsharing/current-order?userId=${this.userID}`,
	      method: 'GET',
	      header: {
	        'Content-Type': 'application/json'
	      }
	    });
	    if (response.data.status === 'success') {
	      const res = response.data;
	      const now = new Date();
	      
		  console.log(res.orders);
	      if (res.orders && res.orders.length > 0) {
	        // 筛选出开始时间在当前时间之前的订单，并按开始时间降序排序
	        const pastOrders = res.orders
	          .filter(order => new Date(order.startAt) < now)
	          .sort((a, b) => new Date(b.startAt) - new Date(a.startAt));
	        console.log(pastOrders);
	        // 只取最近的一个订单
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
	
	ToOrderDetail(){
	  // 确保有当前订单数据
	  if(this.currentOrders.length > 0) {
		// 获取第一个订单的ID（根据你的数据结构）
		const orderid = this.currentOrders[0].id;
		console.log(orderid);//4
		// 调用Vuex action更新orderID
		this.setOrderId(orderid);
		console.log(this.rideOrder.orderID);
		
		// 如果需要跳转到详情页，可以在这里添加导航逻辑
		uni.navigateTo({
		  url: './OrderDetail', // 替换为你的订单详情页面路径
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

<style>
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.floating-buttons {
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 9999;
}

.button {
  background-color: #007AFF;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  width: 95%;
  max-width: 400px;
}

.start_end_loc {
  width: 95%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.location-row {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--color-lightyellow);
  border-radius: 8px;
}

.location-row.start {
  margin-bottom: 8px;
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
  color: black;
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

.publish-button-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  margin-left: 6px;
}

.publish-button {
  background-color: white;
  color: var(--color-green);
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  min-width: 70px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-green);
  box-sizing: border-box;
  transition: all 0.2s ease;
  line-height: 1;
}

.time-selector {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0px;
  margin-bottom: 8px;
  position: relative;
  flex-direction: column;
}

.time-text {
  font-size: 10px;
  color: var(--color-darkgrey);
  position: relative;
  display: inline-block;
  padding-bottom: 3px;
}

.time-line {
  width: 100%;
  height: 1px;
  background-color: var(--color-grey);
}

.time-selector.has-time .time-text {
  color: var(--color-green);
  font-weight: bold;
}
.order-request {
  height: 100px;
  width: 97%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  gap:5px;
  justify-content: space-between;
}

.order-card {
	font-family: "Microsoft YaHei";
	font-weight: bold;
	width: 60%;
	background-color: #ffffff;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	padding: 10px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.order-title {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  color:black;
}

.order-distance {
  font-size: 14px;
  color: var(--color-darkgrey);
}

.order-detail-btn {
  font-size: 12px;
  color: var(--color-lightgreen);
}

.driver-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 10px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.driver-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

.stars {
  color: #FFCC00;
  font-size: 14px;
}

.driver-name {
	color:var(--color-darkgrey);
  font-size: 12px;
  font-weight: bold;
}

.car-info {
  align-items: flex-end; /* 这将使子元素靠右对齐 */
  display: flex;
  flex-direction: column;
  gap: 8x;
}

.car-plate {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 2px;
}

.car-detail {
  font-size: 10px;
  color: var(--color-darkgrey);
}

.request-info {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  width: 30%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}
.request-title{
	font-size: 18px;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	color:black;
	align-items: flex-end;
}
.request-status{
	margin-top: 4px;
	font-size: 12px;
	color: var(--color-darkgrey);
	align-items: flex-end;
}
.request-detail{
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%; /* 确保宽度撑满父容器 */
}
.request-count {
  font-size: 36px;
  color: var(--color-red);
}



/* 左侧 "X条" 的容器 */
.request-detail > cover-view:first-child {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

/* 右侧 "详情" 文本 */
.request-detail > cover-view:last-child {
  font-size: 12px;
  color: var(--color-darkgrey); /* 可选：调整颜色 */
}
.no-order-message {
  text-align: center;
  font-size: 16px;
  color: #666;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 12px;
}
.order-content{
	margin-top: 4px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
web-view {
  width: 100%;
  height: 100%;
}
</style>