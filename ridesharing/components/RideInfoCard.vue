<template>
  <view class="ride-info-card">
    <!-- Top Section: Detour Info -->
    <view class="top-section">
      <view class="detour-info" v-if="detourPercentage">
        <view class="percentage">{{ detourPercentage }}%</view>
        <view class="detour-text">顺路</view>
      </view>
      <view class="extra-info">
        <view>起点距离您目前约</view>
        <view class="value">{{ extraDistance }}公里</view>
        <view>,需</view>
        <view class="value">{{ extraTime }}分钟</view>
		<view>到达</view>
      </view>
    </view>

    <!-- Middle Section: Driver Info -->
    <view class="middle-section">
      <view class="driver-main-info">
        <cover-image :src="avatarUrl" class="avatar"></cover-image>
        <view class="driver-text-details">
          <view class="driver-name-rating-line">
            <view class="driver-name">尾号{{ phoneTail }}</view>
          </view>
          <view class="order-time">{{ orderTime }}</view>
        </view>
      </view>
      <view class="phone-action" @tap="makePhoneCall">
        <cover-image src="/static/phone-icon.png" class="phone-icon"></cover-image> 
      </view>
    </view>

    <!-- Trip Details Section -->
    <view class="trip-details-section">
      <view class="location-item">
        <view class="dot green"></view>
        <view class="location-text-group">
          <view class="location-name">{{ startLocation }}</view>
        </view>
      </view>
      <view class="location-separator"></view>
      <view class="location-item">
        <view class="dot red"></view>
        <view class="location-text-group">
          <view class="location-name">{{ endLocation }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'RideInfoCard',
  props: {
    detourPercentage: {
      type: [String, Number],
    },
    extraDistance: {
      type: [String, Number],
      default: '0'
    },
    extraTime: {
      type: [String, Number],
      default: '0'
    },
    avatarUrl: {
      type: String,
      default: '/static/default-avatar.png'
    },
    phoneTail: {
      type: String,
      default: '0000'
    },
    orderTime: {
      type: String,
      default: '时间未提供'
    },
    startLocation: {
      type: String,
      default: '起点未提供'
    },
    endLocation: {
      type: String,
      default: '终点未提供'
    }
  },
  methods: {
    makePhoneCall() {
      console.log('Phone call action triggered for driver ' + this.phoneTail);
    }
  }
}
</script>

<style scoped>
.ride-info-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  padding: 24rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  width: 100%;
  box-sizing: border-box;
}

/* Top Section */
.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #333333;
}
.detour-info {
  display: flex;
  align-items: baseline;
  flex: 0 0 auto;
}
.percentage {
  font-size: 36rpx;
  font-weight: bold;
  color: #4CAF50; /* Green color */
  margin-right: 4rpx;
}
.detour-text {
  font-size: 28rpx;
  color: #333333;
}
.extra-info {
  font-size: 24rpx;
  color: #555555;
  display: flex;
  align-items: baseline;
  flex: 0 0 auto;
}
.extra-info .value {
  font-weight: bold;
  margin: 0 4rpx;
  font-size: 32rpx;
  color: #333333;
}

/* Middle Section */
.middle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.driver-main-info {
  display: flex;
  align-items: center;
}
.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 16rpx;
  background-color: #f0f0f0; /* Placeholder bg */
}
.driver-text-details {
  display: flex;
  flex-direction: column;
}
.driver-name-rating-line {
  display: flex;
  align-items: baseline;
  margin-bottom: 8rpx;
}
.driver-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}
.phone-action {
  padding: 10rpx;
}
.phone-icon {
  width: 50rpx;
  height: 50rpx;
}

/* Order Time Section */
.order-time {
  font-size: 26rpx;
  color: #555555;
}

/* Trip Details Section */
.trip-details-section {
  display: flex;
  flex-direction: column;
  gap: 10rpx; /* Space between location items */
}
.location-item {
  display: flex;
  align-items: center;
}
.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 12rpx;
  flex-shrink: 0;
}
.green {
  background-color: #4CAF50;
}
.red {
  background-color: #F44336;
}
.location-text-group {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
.location-name {
  font-size: 28rpx;
  color: #333333;
  flex-grow: 1;
}
.location-separator {
  /* This is a visual cue, a real dotted line is tricky with view. */
  /* We can simulate it with a very short, dashed border on a view, */
  /* or rely on the spacing from the parent flex container. */
  /* For simplicity, I'm relying on the gap in .trip-details-section. */
  /* If a visual line is strictly needed, it's more complex. */
  /* Example for a very basic visual (might not look like image's dotted line): */
  height: 20rpx; /* Height of the space for the dotted line */
  margin-left: 7rpx; /* Align with dots */
  /* border-left: 2rpx dashed #cccccc; */ /* Dashed line attempt - often not well supported */
}

</style> 