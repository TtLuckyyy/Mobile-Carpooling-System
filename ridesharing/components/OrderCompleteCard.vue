<template>
  <cover-view class="order-complete-card-cover">
    <cover-view class="order-complete-card">
      <cover-view class="header">
        <cover-view class="status">拼车订单已完成</cover-view>
        <cover-view class="income">
          <cover-view>收入</cover-view>
          <cover-view class="amount">{{ income }}</cover-view>
          <cover-view>元</cover-view>
        </cover-view>
      </cover-view>

      <cover-view class="passenger-info">
        <cover-image class="avatar" :src="avatarUrl" mode="aspectFill" />
        <cover-view class="details">
          <cover-view class="name-rating">
            <cover-view class="name">尾号{{ phoneTail }}</cover-view>
            <cover-view class="rating">{{ rating }}分</cover-view>
          </cover-view>
          <cover-view class="time">{{ orderTime }}</cover-view>
        </cover-view>
      </cover-view>

      <cover-view class="trip-details">
        <cover-view class="location-item">
          <cover-view class="dot green"></cover-view>
          <cover-view class="location-text">{{ startLocation }}</cover-view>
          <cover-view class="distance">{{ startDistance }}km</cover-view>
        </cover-view>
        <cover-view class="line-connector"></cover-view>
        <cover-view class="location-item">
          <cover-view class="dot red"></cover-view>
          <cover-view class="location-text">{{ endLocation }}</cover-view>
          <cover-view class="distance">{{ endDistance }}km</cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
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
    rating: {
      type: [String, Number],
      default: '5.0'
    },
    orderTime: {
      type: String,
      default: '今天 00:00 - 00:00'
    },
    startLocation: {
      type: String,
      default: '起点'
    },
    startDistance: {
      type: [String, Number],
      default: '0.0'
    },
    endLocation: {
      type: String,
      default: '终点'
    },
    endDistance: {
      type: [String, Number],
      default: '0.0'
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
  width: 100%; /* 确保占据父元素宽度 */
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin: 0; /* 移除外边距，使其填充父元素 */
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
  color: #FF7F50; /* 橙色 */
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
  background-color: #f0f0f0; /* 占位背景色 */
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
  margin-right: 10rpx;
}

.rating {
  font-size: 24rpx;
  color: #FFD700; /* 金色 */
  padding: 2rpx 8rpx;
  border-radius: 6rpx;
}

.time {
  font-size: 26rpx;
  color: #666;
}

.trip-details {
  position: relative; /* For line connector positioning */
}

.location-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  padding-left: 30rpx; /* Space for dot and line */
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
  background-color: #00C853; /* 鲜绿色 */
}

.red {
  background-color: #FF5252; /* 鲜红色 */
}

.location-text {
  font-size: 28rpx;
  color: #333;
  flex-grow: 1;
}

.distance {
  font-size: 26rpx;
  color: #888;
  margin-left: 16rpx;
  flex-shrink: 0;
}

.line-connector {
  position: absolute;
  left: 7rpx; /* (16rpx dot width / 2) - (2rpx line width / 2) approx */
  top: calc(16rpx + 8rpx + 8rpx); /* Approx position between the dots */
  bottom: calc(16rpx + 8rpx + 8rpx); /* Adjust based on actual spacing */
  width: 2rpx;
  background-color: #ccc;
  border-left: 2rpx dashed #ccc;
  /* The height will be dynamic based on content, but if items have fixed height: */
  /* height: calc(100% - (16rpx + 8rpx + 8rpx) * 2); */ /* Approximate height */
}

/* Ensure the line connector is between the two dots */
.trip-details .location-item:first-child {
  margin-bottom: 24rpx; /* Increase space for the line */
}

.trip-details .location-item:last-child {
  margin-bottom: 0;
}

/* Adjust line connector height more accurately if possible, or use JS if dynamic height is complex */
/* This CSS attempts to place it. More precise line might need adjustments based on exact content heights */
.trip-details .line-connector {
   top: 35rpx; /* Approximate start below the first dot's center */
   height: calc(100% - 70rpx); /* Approximate height between dots */
}
</style> 