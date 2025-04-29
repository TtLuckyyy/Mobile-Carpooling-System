<template>
  <view class="app-container">
    <view class="main-content">
      <!-- 搜索表单 -->
      <view class="search-form-container">
        <view class="location-tabs">
          <view class="tab" :class="{ active: activeTab === '市内' }" @click="activeTab = '市内'">市内</view>
          <view class="tab" :class="{ active: activeTab === '城际' }" @click="activeTab = '城际'">城际</view>
        </view>

        <view class="search-form">
          <view class="input-group">
            <view class="dot green"></view>
            <input type="text" v-model="startLocation" placeholder="您的出发地" class="form-input" />
          </view>
          <view class="input-group">
            <view class="dot orange"></view>
            <input type="text" v-model="endLocation" placeholder="您的目的地" class="form-input" />
          </view>

          <view class="location-tags">
            <view class="tag" v-for="(tag, index) in locationTags" :key="index" @click="selectLocation(tag)">
              {{ tag }}
            </view>
          </view>

          <view class="time-picker" @click="showTimePicker">
            <text class="clock-icon">🕘</text>
            <text>{{ formattedTime }}</text>
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
          <view class="nav-card-count">
            <text class="count-number">{{ invitationCount }}</text>
            <text class="count-unit">条</text>
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
  </view>
</template>

<script>
import InvitationList from "@/components/InvitationList.vue";

export default {
  components: { InvitationList },
  data() {
    return {
      activeTab: '市内',
      activeRouteTab: '市内路线',
      startLocation: '',
      endLocation: '',
      selectedTime: new Date(),
      locationTags: ['上海南站', '虹桥1', '虹桥2', '浦东3', '浦东4'],
      invitationCount: 3,
      tripListItems: [],
    }
  },
  computed: {
    formattedTime() {
      const now = this.selectedTime;
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
    selectLocation(tag) {
      if (!this.startLocation) {
        this.startLocation = tag;
      } else if (!this.endLocation) {
        this.endLocation = tag;
      } else {
        this.startLocation = tag;
      }
    },
    showTimePicker() {
      uni.showDatePicker({
        date: this.selectedTime.toISOString(),
        success: (res) => {
          this.selectedTime = new Date(res.date);
        }
      });
    },
    searchRides() {
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
          url: 'http://localhost:8083/carsharing/get-all-invitations',
          method: 'GET',
          header: { 'Content-Type': 'application/json' }
        });
		console.log(response);
        if (response.data.history && response.data.history.length > 0) {
                  this.tripListItems = response.data.history.map(item => ({
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
    }
  },
  onLoad() {
    this.getRides();
  }
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
  background-color: #3ea87a;
}

.dot.orange {
  background-color: #f17a3d;
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
</style>