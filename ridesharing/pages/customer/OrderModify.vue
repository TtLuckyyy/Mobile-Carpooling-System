
<template>
  <!-- 模板部分保持不变，与之前相同 -->
  <cover-view>
    <!-- 悬浮头部 -->
    <PageHeader_cover backText="当前订单" backUrl="/pages/customer/customer" />
    
    <!-- 地图容器 -->
    <cover-view class="map-container">
      <web-view src="/static/map.html" @message="handleMapMessage"></web-view>
      <cover-view class="floating-details">
        <cover-view class="detail-card">
          <!-- 顶部举报按钮 -->
          <cover-view class="report-btn">
            <cover-image src="/static/report-icon.png" class="report-icon"></cover-image>
            <cover-view class="report-text">举报投诉</cover-view>
          </cover-view>
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
              <cover-view class="publish-button-container">
				  <cover-view class="time-selector" :class="{'has-time': selectedTime}" @click="showTimePicker">
				    <cover-view class="time-text" @click="showTimePicker">{{formattedTime}} 点击修改时间</cover-view>
				    <cover-view class="time-line" @click="showTimePicker" v-show="!selectedTime"></cover-view>
				  </cover-view>
                <cover-view class="publish-button" @click="publishDemand">完成修改</cover-view>
              </cover-view>
            </cover-view>
          </cover-view>

        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>
<script>
import PageHeader_cover from "@/components/PageHeader_cover.vue";
import { mapState, mapActions } from 'vuex';
export default {
  components: {
	  PageHeader_cover,
  },
  computed: {
      ...mapState(['rideRequest','rideOrder']),
	  formattedTime() {
	        const date = this.rideRequest.startAt;
	        const month = String(date.getMonth() + 1).padStart(2, '0');
	        const day = String(date.getDate()).padStart(2, '0');
	        const hour = String(date.getHours()).padStart(2, '0');
	        const minute = String(date.getMinutes()).padStart(2, '0');
	        return `${month}月${day}日 ${hour}:${minute}`;
	      }
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
	  }
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
	
	ToStartLoc() {
		console.log("Start location clicked");
	  uni.navigateTo({
	    url: '/pages/customer/StartLoc',
	    animationType: 'slide-in-right',
	    animationDuration: 300,
	  });
	},
	
	ToEndLoc() {
	  uni.navigateTo({
	    url: '/pages/customer/EndLoc',
	    animationType: 'slide-in-right',
	    animationDuration: 300,
	  });
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
	  this.setStartAt(new Date(targetTime.toISOString()));
	},
	
	async publishDemand() {
	  try {
	    const requestData = {
	      startLoc: this.rideRequest.startLoc,
	      endLoc: this.rideRequest.endLoc,
	      startAt: this.rideRequest.startAt,
	    };
	
	    const response = await uni.request({
	      url: `http://localhost:8083/carsharing/modify-request?orderId=${this.rideOrder.orderID}`,
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
  }
}
</script>
<style>
.map-container {
  width: 100%;
  height: calc(100vh - 60px);
  margin-top: 60px;
  position: relative;
}

.floating-details {
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

.detail-card {
  width: 95%;
  max-width: 400px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.report-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.report-icon {
  width: 18px;
  height: 18px;
}

.report-text {
  font-size: 12px;
  color:var(--color-blue);
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
.second-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.publish-button-container {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
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
  width: 40%;
  min-width: 70px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-green);
  box-sizing: border-box;
  transition: all 0.2s ease;
  line-height: 1;
  margin-left: auto; 
}
.time-selector {
  width: 50%;
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
  box-sizing: border-box;
  margin-left: 0;
}

.time-line {
  width: 100%;
  height: 1px;
  background-color: var(--color-grey);
}

</style>
