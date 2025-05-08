<template>
  <cover-view class="page-cover-container">
    <!-- 悬浮头部 - 假设使用与1.vue相同的头部 -->
    <PageHeader_cover backText="行程详情" backUrl="/pages/customer/customer" /> 
    
    <!-- 地图容器 -->
    <cover-view class="map-container">
      <web-view src="/static/map.html" @message="handleMapMessage"></web-view>
      <cover-view class="floating-details">
        <!-- New wrapper for RideInfoCard -->
        <cover-view class="ride-info-card-shell">
          <RideInfoCard
            :detourPercentage="rideData.detourPercentage"
            :extraDistance="rideData.extraDistance"
            :extraTime="rideData.extraTime"
            :avatarUrl="rideData.avatarUrl"
            :phoneTail="rideData.phoneTail"
            :rating="rideData.rating"
            :orderTime="rideData.orderTime"
            :startLocation="rideData.startLocation"
            :startDistance="rideData.startDistance"
            :endLocation="rideData.endLocation"
            :endDistance="rideData.endDistance"
          />
        </cover-view>

        <!-- NEW BOTTOM ACTION BAR -->
        <cover-view class="bottom-action-bar">
          <cover-view class="action-income-display">
            <cover-view>收入</cover-view>
            <cover-view class="income-amount">{{ bottomBarIncome }}</cover-view>
            <cover-view>元</cover-view>
          </cover-view>
          <cover-view class="action-button accept-button" @tap="handleAcceptOrder">接单</cover-view>
        </cover-view>
        <!-- END NEW BOTTOM ACTION BAR -->

      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
import RideInfoCard from '@/components/RideInfoCard.vue';
import PageHeader_cover from "@/components/PageHeader_cover.vue"; // 新增导入

export default {
  components: {
    RideInfoCard,
    PageHeader_cover // 注册组件
  },
  data() {
    return {
      rideData: {
        detourPercentage: '85',
        extraDistance: '6',
        extraTime: '23',
        avatarUrl: '/static/default-avatar.png', // Replace with your actual avatar path
        phoneTail: '6789',
        rating: '5.0',
        orderTime: '今天 16:00 - 17:00',
        startLocation: '同济大学 (嘉定校区)',
        startDistance: '20.3km',
        endLocation: '静安嘉里中心',
        endDistance: '10.5km'
      },
      bottomBarIncome: '54.4' // New data property for income
    };
  },
  methods: {
    handleMapMessage(e) {
      // 处理地图消息，可以根据需要实现
      console.log("Map message from RideInfoDisplayPage.vue:", e);
    },
    handleAcceptOrder() {
      console.log('接单 button clicked');
      // Implement accept order logic here
    }
  },
  onLoad() {
    // Page load logic
    console.log('RideInfoDisplayPage loaded.');
  }
}
</script>

<style scoped>
.page-cover-container {
  /* 如果需要页面占满，可能需要设置 height: 100vh; overflow: hidden; */
  /* 与1.vue的根 cover-view 类似 */
}

.map-container {
  width: 100%;
  /* 假设 PageHeader_cover 高度为 60px (uni.upx) */
  /* 实际高度应根据 PageHeader_cover 调整 */
  height: calc(100vh - 60px); 
  margin-top: 60px; /* 与PageHeader_cover高度匹配 */
  position: relative;
}

web-view {
  width: 100%;
  height: 100%;
  display: block;
}

.floating-details {
  position: fixed;
  bottom: 20px; /* uni.upx 或 rpx */
  left: 10px;   /* uni.upx 或 rpx */
  right: 10px;  /* uni.upx 或 rpx */
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10; /* 确保在地图之上，具体值可能需要调整 */
}

.ride-info-card-shell {
  width: 100%; 
  box-sizing: border-box;
  /* background-color, border-radius, box-shadow are NOT here anymore */
  margin-top: 20rpx; /* Added top margin */
  margin-bottom: 20rpx; /* Added bottom margin */
}

/* Styles for the new bottom action bar */
.bottom-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20rpx; /* Changed from 20rpx 0 to 20rpx for all sides */
  margin-top: 20rpx; /* Adjusted from 10rpx for consistency */
  background-color: #ffffff; /* Added white background */
  border-radius: 24rpx;    /* Added border-radius */
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1); /* Added box-shadow */
}

.action-income-display {
  display: flex;
  align-items: baseline;
  font-size: 30rpx; /* Adjusted for balance */
  color: #333333;
   margin-left: 20rpx;
}

.income-amount {
  font-size: 40rpx; /* Adjusted for balance */
  font-weight: bold;
  color: #FF7F50; /* Orange/red color */
  margin: 0 6rpx; /* Adjusted margin */
}

.action-button {
  padding: 16rpx 70rpx;
  border-radius: 30rpx;
  font-size: 28rpx; 
  font-weight: bold;
  text-align: center;
  line-height: normal;
}

.accept-button {
  background-color: #4CAF50; /* Greenish */
  color: #ffffff;
}

/* 移除原有的 .page-container 样式，因为它不再是根元素 */
/*
.page-container {
  padding-top: 20rpx;
  background-color: #f7f7f7;
  min-height: 100vh;
}
*/
</style> 