<template>
  <view class="app-container">
	<view class="main-content" v-if="isdriver">
	  <!-- 搜索表单 -->
	  <view class="search-form-container">
		<view class="location-tabs">
		  <view class="tab" :class="{ active: activeTab === '市内' }" @click="activeTab = '市内'">市内</view>
		  <view class="tab" :class="{ active: activeTab === '城际' }" @click="activeTab = '城际'">城际</view>
		</view>

		<view class="search-form">
		  <view class="input-group"  @click="ToStartLoc">
			<view class="dot green"></view>
			<input type="text" v-model="startLocation" placeholder="您的出发地" class="form-input"/>
		  </view>
		  <view class="input-group"  @click="ToEndLoc">
			<view class="dot orange"></view>
			<input type="text" v-model="endLocation" placeholder="您的目的地" class="form-input"/>
		  </view>

		  <view class="location-tags">
			<view class="tag" v-for="(tag, index) in locationTags" :key="index" @click="selectLocation(tag)">
			  {{ tag }}
			</view>
		  </view>
		  
		<!-- 时间 + 座位数 统一样式 -->
		<view class="info-row">
		  <view class="info-box" @click="showTimePicker">
			<text class="icon">🕘</text>
			<text class="text">{{ formattedTime }}</text>
		  </view>
		  <view class="info-box" @click="showSeatPicker">
			<text class="icon">💺</text>
			<text class="text">座位数：{{ rideInvitation.seats  }} 个</text>
		  </view>
		</view>
		
	
		  <button class="search-button" @click="searchRides">发布并搜索</button>
		</view>
	  </view>

	  <!-- 导航卡片 -->
	  <view class="navigation-cards">
		<view class="nav-card invitation-card" @click="goToInvitations">
		  <view class="nav-card-content">
			<view class="nav-card-title">拼车邀请</view>
			<view class="nav-card-subtitle">正在寻找乘客</view>
		  </view>

		  <view class="nav-card-detail">详情 ></view>
		</view>

		<view class="nav-card trip-card" @click="goToMyTrips">
		  <view class="nav-card-content">
			<view class="nav-card-title">我的行程</view>
			<view class="nav-card-subtitle">历史拼车订单</view>
		  </view>
		  <view class="nav-card-detail">详情 ></view>
		</view>
	  </view>

	  <!-- 路线标签 -->
	  <view class="route-tabs">
		<view class="route-tab" :class="{ active: activeRouteTab === '市内路线' }" @click="activeRouteTab = '市内路线'">市内路线</view>
		<view class="route-tab" :class="{ active: activeRouteTab === '城际路线' }" @click="activeRouteTab = '城际路线'">城际路线</view>
	  </view>

	  <!-- 行程列表 -->
	  <view v-if="tripListItems.length > 0">
		<InvitationList v-for="(item, index) in tripListItems" :key="index" :item="item" />
	  </view>
	  <view v-else class="empty-tips">
		<text>暂无拼车邀请</text>
	  </view>
	</view>
	
	<view class="container"v-else>
		<view class="content-box" >
		  <view class="features">
		    <view class="feature-item">
		      <image src="/static/icon_order.png" class="feature-icon" />
		      <view class="feature-text">
		        <text class="title green">海量订单</text>
		        <text class="subtitle">出行随时接单</text>
		      </view>
		    </view>
		
		    <view class="feature-item">
		      <image src="/static/icon_safe.png" class="feature-icon" />
		      <view class="feature-text">
		        <text class="title blue">完全合规</text>
		        <text class="subtitle">注册接单无顾虑</text>
		      </view>
		    </view>
		
		    <view class="feature-item">
		      <image src="/static/icon_cash.png" class="feature-icon" />
		      <view class="feature-text">
		        <text class="title orange">快速提现</text>
		        <text class="subtitle">支付宝秒到账</text>
		      </view>
		    </view>
		  </view>
		
		  <!-- 立即成为车主按钮 -->
		  <view class="button-wrapper">
		    <view class="join-button" @click="goToAuthPage">
		      <text class="button-text">立即成为车主</text>
		    </view>
		  </view>
		</view>
	</view>
  </view>
</template>

<script>
import InvitationList from "@/components/InvitationList.vue";
import { mapState, mapActions } from 'vuex';

export default {
  components: { InvitationList },
  data() {
    return {
      activeTab: '市内',
      activeRouteTab: '市内路线',
	  startLocation: '',
	  endLocation: '',
      locationTags: ['上海南站', '虹桥1', '虹桥2', '浦东3', '浦东4'],
      invitationCount: 3,
      tripListItems: [],
	  isdriver:false,
	  seats: 1 ,
    }
  },
  computed: {
	...mapState(['userID', 'rideRequest','rideOrder',"rideInvitation"]),
    formattedTime() {
      const now = this.rideInvitation.startAt;
      const today = new Date();
      let prefix = '今天';
      if (now.getDate() !== today.getDate()) {
        prefix = `${now.getMonth() + 1}月${now.getDate()}日`;
      }
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${prefix}${hours}:${minutes}`;
    }
  },
  methods: {
	  ...mapActions([
		'setInvitationId'
	  ]),
	  goToAuthPage() {
	    uni.navigateTo({
	      url: '/pages/driver/car-owner'
	    });
	  },
    selectLocation(tag) {
      if (!this.startLocation) {
        this.startLocation = tag;
      } else if (!this.endLocation) {
        this.endLocation = tag;
      } else {
        this.startLocation = tag;
      }
    },
	showSeatPicker() {
	  uni.showActionSheet({
	    itemList: ['1 个', '2 个', '3 个', '4 个'],
	    success: (res) => {
	      this.rideInvitation.seats = res.tapIndex + 1;
	      uni.showToast({
	        title: `已设置为 ${this.rideInvitation.seats} 个座位`,
	        icon: 'success'
	      });
	    },
	    fail: () => {
	      uni.showToast({
	        title: '未选择座位数',
	        icon: 'none'
	      });
	    }
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
	selectTime(minutesLater) {
	  const now = new Date();
	  const targetTime = new Date(now.getTime() + minutesLater * 60000);
	  this.rideInvitation.startAt = targetTime;
	
	  uni.showToast({
		title: `已设置：${minutesLater}分钟后`,
		icon: 'success'
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
		  title: '时间无效',
		  icon: 'none'
		});
		return;
	  }
	
	  if (targetTime < now) {
		uni.showToast({
		  title: '不能选择过去的时间',
		  icon: 'none'
		});
		return;
	  }
	
	  this.rideInvitation.startAt = targetTime;
	
	  uni.showToast({
		title: '时间设置成功',
		icon: 'success'
	  });
	},
	async publishInvitation(){
		try {
		  const requestData = {
		    driverId: this.userID,
		    startLoc: this.rideInvitation.startLoc,
		    endLoc: this.rideInvitation.endLoc,
		    status: 'PENDING',
		    startAt: this.rideInvitation.startAt,
		    seats: this.rideInvitation.seats,
		  };
		
		  const response = await uni.request({
		    url: 'http://10.0.2.2:8083/carsharing/post-invitation',
		    method: 'POST',
		    data: requestData,
		    header: {
		      'Content-Type': 'application/json',
		    },
		  });

		  if (response.data.status === 'success') {
		    const responseData = response.data;

		    if (responseData.invitationID) {

		      this.setInvitationId(responseData.invitationID);
		      uni.showToast({
		        title: '发布成功',
		        icon: 'success',
		      });
		      this.goToSearchResult();
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
	goToSearchResult() {
		uni.navigateTo({ url: '/pages/driver/search-result' });
	},
    searchRides() {
		this.publishInvitation();
		// uni.navigateTo({ url: '/pages/driver/search-result' });
      //this.getRides();
    },
    goToInvitations() {
      uni.navigateTo({ url: '/pages/driver/invitations' });
    },
    goToMyTrips() {
      uni.navigateTo({ url: '/pages/driver/driverTripList' });
    },
    async getRides() {
      try {
        const response = await uni.request({
          url: 'http://10.0.2.2:8083/carsharing/get-all-invitations',
          method: 'GET',
          header: { 'Content-Type': 'application/json' }
        });
		console.log(response);
        if (response.data.history && response.data.history.length > 0) {
                  this.tripListItems = response.data.history.map(item => ({
					id:item.id,
                    startAt: item.startAt || '未知时间',
                    startLoc: item.startLoc || '未知',
                    endLoc: item.endLoc || '未知',
                    distance: item.distance,
                    price: item.price,
                    status: item.status || '',
                    exclusive: item.exclusive || false,
                    highway: item.highway || false
        }));
        } else {
          this.tripListItems = [];
        }
      } catch (error) {
        console.error('拉取失败:', error);
        uni.showToast({
          title: '拉取失败',
          icon: 'none'
        });
      }
    },
	async getUserInfo() {
	  try {
	    const response = await uni.request({
	      url: `http://10.0.2.2:8083/carsharing/my?userId=${this.userID}`,
	      method: 'GET',
	      header: { 'Content-Type': 'application/json' }
	    });
		console.log(response);
	    if (response.data.userInfo) {
			if(response.data.userInfo.role ==="driver"){
				this.isdriver = true;
			}
	    } else {
	      this.tripListItems = [];
	    }
		console.log(this.isdriver);
	  } catch (error) {
	    console.error('拉取失败:', error);
	    uni.showToast({
	      title: '拉取失败',
	      icon: 'none'
	    });
	  }
	}
  },
  onLoad() {
    this.getRides();
	this.getUserInfo();
  },
  onShow(){
	  this.getUserInfo();
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
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.main-content {
  padding: 50px 0 60px; /* 顶部增加间距，底部为tabBar留出空间 */
}

/* 搜索表单容器 */
.search-form-container {
  background-color: #fffbeb;
  margin: 0 15px;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* 位置标签 */
.location-tabs {
  display: flex;
  margin-bottom: 15px;
}

.tab {
  padding: 5px 10px;
  font-weight: bold;
  flex: 1;
  text-align: center;
  font-size: 18px;
  color: #aaa;
}

.tab.active {
  color: #000;
}

/* 搜索表单输入 */
.input-group {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.dot.green {
  background-color: var(--color-green);
}

.dot.orange {
  background-color: var(--color-orange);
}

.form-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.input-icon {
  font-size: 16px;
  color: #bbb;
}

/* 位置标签 */
.location-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 15px 0;
}

.tag {
  background-color: #f5f5f5;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: #666;
}

/* 时间选择器 */
.time-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
  font-size: 14px;
}

/* 搜索按钮 */
.search-button {
  width: 100%;
  background-color: #3ea87a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

/* 中间导航卡片 */
.navigation-cards {
  display: flex;
  margin: 15px;
  gap: 10px;
}

.nav-card {
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  position: relative;
  min-height: 80px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.nav-card-content {
  flex-grow: 1;
}

.nav-card-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 4px;
}

.nav-card-subtitle {
  font-size: 12px;
  color: #666;
}

.invitation-card {
  border-top: 3px solid #e74c3c;
}

.trip-card {
  border-top: 3px solid #3498db;
}

.nav-card-count {
  display: flex;
  align-items: center;
  color: #e74c3c;
}

.count-number {
  font-size: 32px;
  font-weight: bold;
  margin-right: 2px;
}

.count-unit {
  font-size: 14px;
}

.nav-card-detail {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #3498db;
}

/* 路线标签 */
.route-tabs {
  display: flex;
  margin: 15px 0;
  padding: 0 15px;
}

.route-tab {
  padding: 8px 0;
  margin-right: 20px;
  font-weight: bold;
  position: relative;
  font-size: 16px;
}

.route-tab.active {
  color: #000;
  border-bottom: 3px solid #000;
}

.route-tab:not(.active) {
  color: #999;
}

/* 空提示 */
.empty-tips {
  text-align: center;
  padding: 30px 0;
  color: #999;
  font-size: 14px;
}
/* 内容块 */
.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.features {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 80rpx;
}

.feature-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 30rpx;
}

.feature-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 44rpx;
  font-weight: bold;
}

.subtitle {
  font-size: 30rpx;
  color: #999;
  margin-top: 10rpx;
}

.green {
  color: #3ea87a;
}

.blue {
  color: #3a83ff;
}

.orange {
  color: #f17a3d;
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 80rpx;
}

.join-button {
  background-color: #c6db45;
  padding: 30rpx 120rpx;
  border-radius: 100rpx;
}

.button-text {
  color: #fff;
  font-size: 40rpx;
  font-weight: bold;
}

/* 超链接样式 */
.link-wrapper {
  margin-top: 10rpx;
}

.link-text {
  font-size: 28rpx;
  color: #3ea87a;
  text-decoration: underline;
  cursor: pointer;
}
.container {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>