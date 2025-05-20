<template>
  <view class="order-complete-card-cover">
    <view class="order-complete-card">
      <view class="header">
        <view class="status">拼车订单已完成</view>
        <view class="income">
          <view>收入</view>
          <view class="amount">{{ income }}</view>
          <view>元</view>
        </view>
      </view>

      <view class="passenger-info">
        <cover-image class="avatar" :src="avatarUrl" mode="aspectFill" />
        <view class="details">
          <view class="name-rating">
            <view class="name">尾号{{ phoneTail }}</view>
          </view>
          <view class="time">{{ orderTime }}</view>
        </view>
      </view>

      <view class="trip-details">
        <view class="location-item">
          <view class="dot green"></view>
          <view class="location-text">{{ startLocation }}</view>
        </view>
        <view class="line-connector"></view>
        <view class="location-item">
          <view class="dot red"></view>
          <view class="location-text">{{ endLocation }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'OrderCompleteCard',
  props: {
    income: {
      type: [String, Number],
      default: '0.0'
    },
    avatarUrl: {
      type: String,
      default: '/static/default_avatar.png' 
    },
    phoneTail: {
      type: String,
      default: '0000'
    },
    orderTime: {
      type: String,
      default: '今天 00:00 - 00:00'
    },
    startLocation: {
      type: String,
      default: '起点'
    },
    endLocation: {
      type: String,
      default: '终点'
    }
  }
}
</script>

<style lang="scss" scoped>
.order-complete-card-cover {
  width: 100%;
  box-sizing: border-box;
}

.order-complete-card {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin: 0;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.status {
  font-size: 36rpx;
  font-weight: bold;
  color: $uni-success;
  flex: 0 0 auto;
}

.income {
  display: flex;
  align-items: baseline;
  font-size: 32rpx;
  color: #333;
  flex: 0 0 auto;
}

.income .amount {
  font-size: 44rpx;
  font-weight: bold;
  color: #FF7F50;
  margin: 0 4rpx;
}

.passenger-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  background-color: #f0f0f0;
}

.details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.name-rating {
  display: flex;
  align-items: baseline;
  margin-bottom: 8rpx;
}

.name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.time {
  font-size: 26rpx;
  color: #666;
}

.trip-details {
  position: relative;
}

.location-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  padding-left: 30rpx;
  position: relative;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.green {
  background-color: #00C853;
}

.red {
  background-color: #FF5252;
}

.location-text {
  font-size: 28rpx;
  color: #333;
  flex-grow: 1;
}

.line-connector {
  position: absolute;
  left: 7rpx;
  top: 35rpx;
  height: calc(100% - 70rpx);
  width: 2rpx;
  background-color: #ccc;
  border-left: 2rpx dashed #ccc;
}

.trip-details .location-item:first-child {
  margin-bottom: 24rpx;
}

.trip-details .location-item:last-child {
  margin-bottom: 0;
}
</style> 