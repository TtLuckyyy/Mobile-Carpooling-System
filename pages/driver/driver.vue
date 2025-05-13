<template>
  <view :style="{ paddingTop: statusBarHeight + 'px' }" class="container">
    <view class="content-box">
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

      <!-- 已经是车主文字 -->
      <view class="link-wrapper">
        <text class="link-text" @click="goToDriverSearch">已经是车主</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight
    };
  },
  methods: {
    // 跳转到车主认证页面
    goToAuthPage() {
      uni.navigateTo({
        url: '/pages/driver/car-owner'
      });
    },
    // 跳转到车主搜索页面
    goToDriverSearch() {
      uni.navigateTo({
        url: '/pages/driver/driver_search'
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>