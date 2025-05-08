<template>
  <cover-view class="ride-info-card">
    <!-- Top Section: Detour Info -->
    <cover-view class="top-section">
      <cover-view class="detour-info">
        <cover-view class="percentage">{{ detourPercentage }}%</cover-view>
        <cover-view class="detour-text">顺路</cover-view>
      </cover-view>
      <cover-view class="extra-info">
        <cover-view>多走</cover-view>
        <cover-view class="value">{{ extraDistance }}公里</cover-view>
        <cover-view>, 多花</cover-view>
        <cover-view class="value">{{ extraTime }}分钟</cover-view>
      </cover-view>
    </cover-view>

    <!-- Middle Section: Driver Info -->
    <cover-view class="middle-section">
      <cover-view class="driver-main-info">
        <cover-image :src="avatarUrl" class="avatar"></cover-image>
        <cover-view class="driver-text-details">
          <cover-view class="driver-name-rating-line">
            <cover-view class="driver-name">尾号{{ phoneTail }}</cover-view>
            <cover-view class="rating-container">
              <cover-view class="driver-rating">{{ rating }}</cover-view>
              <cover-view class="rating-text">分</cover-view>
            </cover-view>
          </cover-view>
          <cover-view class="order-time">{{ orderTime }}</cover-view>
        </cover-view>
      </cover-view>
      <cover-view class="phone-action" @tap="makePhoneCall">
        <cover-image src="/static/phone-icon.png" class="phone-icon"></cover-image> 
      </cover-view>
    </cover-view>

    <!-- Trip Details Section -->
    <cover-view class="trip-details-section">
      <cover-view class="location-item">
        <cover-view class="dot green"></cover-view>
        <cover-view class="location-text-group">
          <cover-view class="location-name">{{ startLocation }}</cover-view>
          <cover-view class="location-distance">{{ startDistance }}</cover-view>
        </cover-view>
      </cover-view>
      <cover-view class="location-separator"></cover-view>
      <cover-view class="location-item">
        <cover-view class="dot red"></cover-view>
        <cover-view class="location-text-group">
          <cover-view class="location-name">{{ endLocation }}</cover-view>
          <cover-view class="location-distance">{{ endDistance }}</cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>
<script>
export default {
  name: 'RideInfoCard',
  props: {
    detourPercentage: {
      type: [String, Number],
      default: '85'
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
      default: '/static/default-avatar.png' // Provide a default avatar path
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
      default: '时间未提供'
    },
    startLocation: {
      type: String,
      default: '起点未提供'
    },
    startDistance: {
      type: String, // Includes unit e.g., "20.3km"
      default: '0km'
    },
    endLocation: {
      type: String,
      default: '终点未提供'
    },
    endDistance: {
      type: String, // Includes unit e.g., "10.5km"
      default: '0km'
    }
  },
  methods: {
    makePhoneCall() {
      // Implement phone call functionality, e.g., uni.makePhoneCall
      console.log('Phone call action triggered for driver ' + this.phoneTail);
      // Example: You might need to fetch the full phone number
      // uni.makePhoneCall({ phoneNumber: 'ACTUAL_PHONE_NUMBER_HERE' });
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
  margin-right: 10rpx;
}
.rating-container {
  display: flex;
  align-items: baseline;
}
.driver-rating {
  font-size: 24rpx;
  color: #FFC107; /* Gold color for rating */
  font-weight: bold;
}
.rating-text {
  font-size: 24rpx;
  color: #FFC107;
  margin-left: 2rpx;
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
  /* For potential truncation if needed, but cover-text might not support ellipsis well */
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
}
.location-distance {
  font-size: 26rpx;
  color: #777777;
  margin-left: 16rpx;
  flex-shrink: 0;
}
.location-separator {
  /* This is a visual cue, a real dotted line is tricky with cover-view. */
  /* We can simulate it with a very short, dashed border on a cover-view, */
  /* or rely on the spacing from the parent flex container. */
  /* For simplicity, I'm relying on the gap in .trip-details-section. */
  /* If a visual line is strictly needed, it's more complex. */
  /* Example for a very basic visual (might not look like image's dotted line): */
  height: 20rpx; /* Height of the space for the dotted line */
  margin-left: 7rpx; /* Align with dots */
  /* border-left: 2rpx dashed #cccccc; */ /* Dashed line attempt - often not well supported */
}

</style> 