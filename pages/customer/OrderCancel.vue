
<template>
  <!-- 模板部分保持不变，与之前相同 -->
  <cover-view>
    <!-- 悬浮头部 -->
    <PageHeader_cover backText="当前订单" backUrl="/pages/customer/customer" />
    
    <!-- 地图容器 -->
    <cover-view class="map-container">
      <web-view src="/static/map.html" @message="handleMapMessage"></web-view>
      <cover-view class="floating-details">
        <cover-view class="detail-card">
          <!-- 顶部举报按钮 -->
          <cover-view class="report-btn">
            <cover-image src="/static/report-icon.png" class="report-icon"></cover-image>
            <cover-view class="report-text">举报投诉</cover-view>
          </cover-view>
          <cover-view class="start_end_loc">
          <OrderCancelSuccess
            :time="formattedTime"
            :start="rideRequest.startLoc"
            :end="rideRequest.endLoc"
          />
          </cover-view>

        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>
<script>
import PageHeader_cover from "@/components/PageHeader_cover.vue";
import OrderCancelSuccess from '@/components/OrderCancelSuccess.vue'
import { mapState, mapActions } from 'vuex';
export default {
  components: {
	  PageHeader_cover,
    OrderCancelSuccess
  },
  computed: {
      ...mapState(['rideRequest']),
	  formattedTime() {
	        const date = this.rideRequest.startAt;
	        const year = date.getFullYear();
	        const month = String(date.getMonth() + 1).padStart(2, '0');
	        const day = String(date.getDate()).padStart(2, '0');
	        return `${year}年${month}月${day}日`;
	      }
    },
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
	  }
	},
  methods: {
	handleMapMessage(e) {
	  const { longitude, latitude, type, distance, duration } = e.detail.data;
	  if (type === 'select') {
	    if (!this.startPoint) {
	      this.startPoint = [longitude, latitude];
	      uni.showToast({
	        title: `已记录起点: ${longitude}, ${latitude}`,
	        icon: 'none',
	      });
	    } else if (!this.endPoint) {
	      this.endPoint = [longitude, latitude];
	      uni.showToast({
	        title: `已记录终点: ${longitude}, ${latitude}`,
	        icon: 'none',
	      });
	    }
	  } else if (type === 'location') {
	    this.currentLocation = [longitude, latitude];
	    uni.showToast({
	      title: `当前位置: ${longitude}, ${latitude}`,
	      icon: 'none',
	    });
	  } else if (type === 'route') {
	    uni.showToast({
	      title: `距离: ${distance}m, 时长: ${Math.round(duration/60)}分钟`,
	      icon: 'none',
	    });
	  }
	},
	
	getCurrentLocation() {
	  const webview = this.$refs.webview;
	  webview.evalJS('getCurrentPosition()');
	},
	
	startRoutePlanning() {
	  if (!this.rideRequest.startLoc || !this.rideRequest.endLoc) {
	    uni.showToast({
	      title: '请先设置起点和终点',
	      icon: 'none',
	    });
	    return;
	  }
	  const webview = this.$refs.webview;
	  webview.evalJS(`planRoute(${this.rideRequest.startLoc[0]}, ${this.rideRequest.startLoc[1]}, ${this.rideRequest.endLoc[0]}, ${this.rideRequest.endLoc[1]})`);
	},
  }
}
</script>
<style>
.map-container {
  width: 100%;
  height: calc(100vh - 60px);
  margin-top: 60px;
  position: relative;
}

.floating-details {
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

.detail-card {
  width: 95%;
  max-width: 400px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.report-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.report-icon {
  width: 18px;
  height: 18px;
}

.report-text {
  font-size: 12px;
  color:var(--color-blue);
}
.start_end_loc {
  width: 95%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
