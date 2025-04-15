<template>
  <view :style="{ paddingTop: statusBarHeight + 'px' }">
    <!-- 地图容器 -->
    <view class="map-container">
      <web-view src="/static/map.html" @message="handleMapMessage"></web-view>
      <!-- 使用cover-view作为浮动按钮容器 -->
      <cover-view class="floating-buttons">
        <cover-view class="button" @click="ToStartLoc">你从哪上车</cover-view>
        <cover-view class="button" @click="ToEndLoc">你要到哪去</cover-view>
        <cover-view class="button" @click="publishDemand">发布需求</cover-view>
        <cover-view class="button" @click="ToDetailRequest">拼车需求</cover-view>
        <cover-view class="button" @click="ToInvitationMatch">邀请匹配</cover-view>
<!--        <cover-view class="button" @click="getCurrentLocation">获取当前位置</cover-view>
        <cover-view class="button" @click="startRoutePlanning">规划路径</cover-view> -->
      </cover-view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      currentLocation: null,
      startPoint: null,
      endPoint: null
    };
  },
  computed: {
    ...mapState(['userID', 'rideRequest']),
  },
  methods: {
    ...mapActions([
      'login',
      'logout',
      'setRequestId',
      'setStartLoc',
      'setEndLoc',
      'setStartAt',
      'toggleExclusive',
      'toggleHighway',
      'resetRideRequest',
    ]),

    // 处理 web-view 传回的消息
    handleMapMessage(e) {
      const { longitude, latitude, type, distance, duration } = e.detail.data;
      if (type === 'select') {
        // 仅记录点击位置，用于路径规划演示
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

    // 获取当前位置
    getCurrentLocation() {
      const webview = this.$refs.webview;
      webview.evalJS('getCurrentPosition()');
    },

    // 规划路径
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

    async publishDemand() {
      try {
        const requestData = {
          passenger_id: this.userID,
          start_loc: this.rideRequest.startLoc,
          end_loc: this.rideRequest.endLoc,
          status: 'pending',
          start_at: this.rideRequest.startAt,
          exclusive: this.rideRequest.exclusive,
          highway: this.rideRequest.highway,
        };

        const response = await uni.request({
          url: '/post-request',
          method: 'POST',
          data: requestData,
          header: {
            'Content-Type': 'application/json',
          },
        });

        if (response.statusCode === 200 || response.statusCode === 201) {
          const responseData = response.data;
          if (responseData.requestID) {
            this.setRequestId(responseData.requestID);
            uni.showToast({
              title: '发布成功',
              icon: 'success',
            });
            this.ToInvitationMatch();
          } else {
            throw new Error('未收到 requestID');
          }
        } else {
          throw new Error('请求失败');
        }
      } catch (error) {
        console.error('发布失败:', error);
        uni.showToast({
          title: '发布失败',
          icon: 'none',
        });
      }
    },

    ToInvitationMatch() {
      uni.navigateTo({
        url: './InvitationMatch',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },

    ToDetailRequest() {
      uni.navigateTo({
        url: './RequestList',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },

    ToStartLoc() {
      uni.navigateTo({
        url: './StartLoc',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },

    ToEndLoc() {
      uni.navigateTo({
        url: './EndLoc',
        animationType: 'slide-in-right',
        animationDuration: 300,
      });
    },
  },
};
</script>

<style>
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

/* 浮动按钮组样式 */
.floating-buttons {
 position: fixed;
/*  top: 20px;
  left: 10px;
  right: 10px; */
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  z-index: 9999;
}

/* 单个按钮样式 */
.button {
 background-color: #007AFF;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

web-view {
  width: 100%;
  height: 100%;
}
</style>