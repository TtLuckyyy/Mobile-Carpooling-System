<template>
  <cover-view class="container">
		<cover-view class="title-section">
		  <cover-view class="title">订单取消成功</cover-view>
		  <cover-view class="fee-note">无需支付手续费</cover-view>
		</cover-view>

		<cover-view class="subtitle">订单已取消，您可以重新拼车。</cover-view>

		<cover-view class="time-section">
		  <cover-view class="icon">🕒</cover-view>
		  <cover-view class="time">{{ time }}</cover-view>
		</cover-view>

		<cover-view class="location-section">
		  <cover-view class="location-item">
			<cover-view class="dot green"></cover-view>
			<cover-view class="location-text">{{ start }}</cover-view>
		  </cover-view>
		  <cover-view class="location-item">
			<cover-view class="dot red"></cover-view>
			<cover-view class="location-text">{{ end }}</cover-view>
		  </cover-view>
		</cover-view>

		<cover-view class="btn" @tap="goToCustomer">重新拼车</cover-view>
  </cover-view>
</template>

<script>
export default {
  name: 'OrderCancelSuccess',
  props: {
    time: String,
    start: String,
    end: String
  },
  methods: {
      goToCustomer() {
        uni.switchTab({
          url: '/pages/customer/customer', // 注意开头斜杠
          fail: (err) => {
            console.error('跳转失败：', err)
          }
        })
      }
	}
}
</script>

<style scoped>
.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.title {
  font-weight: bold;
  font-size: 54rpx;
}

.fee-note {
  font-size: 24rpx;
  color: #ccc;
}

.subtitle {
  color: #666;
  font-size: 24rpx;
  margin-bottom: 20rpx;
}

.time-section {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.icon {
  font-size: 28rpx;
  margin-right: 10rpx;
}

.time {
	font-weight: bold;
  font-size: 28rpx;
}

.location-section {
  margin-bottom: 30rpx;
}

.location-item {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.green {
  background-color: #00aa00;
}

.red {
  background-color: #cc0000;
}

.location-text {
	font-weight: bold;
  font-size: 28rpx;
}

.btn {
  background-color: #669966;
  color: #fff;
  font-weight: bold;
  border-radius: 12rpx;
  padding: 20rpx;
  text-align: center;
  margin-top: 20rpx;
  display: flex;              /* 使用 flexbox */
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
}

</style>
