<template>
  <view class="mine-page" :style="{ paddingTop: statusBarHeight + 'px' }">
    <!-- 用户信息栏 -->
    <view class="profile">
      <image class="avatar" :src="avatar" mode="aspectFill" />
      <view class="info">
        <text class="phone">{{ phone }}</text>
        <text class="mileage">里程值 <text class="green">{{ total_mileage }}</text>/60</text>
      </view>
    </view>

    <!-- 菜单项 -->
    <view class="menu-list">
      <view class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(index)">
        <view class="left">
          <text class="icon">{{ item.icon }}</text>
          <text class="text">{{ item.text }}</text>
        </view>
        <text class="arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      phone: '未知用户',
      total_mileage: 0,
      avatar: '/static/default_avatar.png',  // 默认头像
	  statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0,
      menuItems: [
        { icon: '🕒', text: '我的行程' },
        { icon: '🎟️', text: '优惠券' },
        { icon: '📝', text: '修改个人信息' },
        { icon: '🛡️', text: '账号与安全' },
        { icon: '🎧', text: '联系客服' },
        { icon: '⚙️', text: '设置' }
      ]
    }
  },
  computed: {
    ...mapState(['userID'])
  },
  watch: {
    userID(newVal) {
      if (newVal && newVal !== '未登录用户') {
        this.fetchUserInfo()
      }
    }
  },
  onLoad() {
    if (this.userID && this.userID !== '未登录用户') {
      this.fetchUserInfo()
    }
  },
  methods: {
    fetchUserInfo() {
      uni.request({
        url: `http://localhost:8083/carsharing/my?userID=${this.userID}`, // 修改为你的接口
        method: 'GET',
        success: (res) => {
          if (res.data.statue === "success" && res.data) {
            this.phone = res.data.phone || '未命名用户'
            this.total_mileage = res.data.total_mileage || 0
            this.avatar = res.data.avatar || '/static/default_avatar.png'
          } else {
            uni.showToast({ title: '用户信息加载失败', icon: 'none' })
          }
        },
        fail: () => {
          uni.showToast({ title: '网络错误', icon: 'none' })
        }
      })
    },
    handleMenuClick(index) {
      const pages = [
        '/pages/my/trip',
        '/pages/my/coupon',
        '/pages/my/change/change',
        '/pages/my/account',
        '/pages/my/support',
        '/pages/my/setting'
      ]
      uni.navigateTo({
        url: pages[index]
      })
    }
  }
}
</script>

<style scoped>
.mine-page {
  background-color: #f0f0f0; /* 👈 更统一柔和的背景 */
  padding-bottom: 100rpx;
  font-family: sans-serif;
  min-height: 100vh; /* 防止内容太短不满屏 */
}

.profile {
  display: flex;
  background-color: #f0f0f0; /* 👈 背景统一 */
  padding: 30rpx;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.info {
  margin-left: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.phone {
  font-size: 36rpx;
  font-weight: bold;
}

.mileage {
  font-size: 28rpx;
  color: #888888;
  margin-top: 10rpx;
}

.green {
  color: #5c9267;
}

.menu-list {
  margin-top: 20rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
  margin: 10px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.left {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 20rpx;
  font-size: 32rpx;
}

.text {
  font-size: 32rpx;
}

.arrow {
  font-size: 36rpx;
  color: #ccc;
}
</style>

