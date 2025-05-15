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
          
          <cover-view class="first-row">
			<cover-view class="first-item">
			  <cover-image :src="orderInfo.avatar || '/static/default-avatar.png'" class="avatar-icon"></cover-image>
			</cover-view>
            
            <cover-view class="second-item" style="display: flex;gap: 5px;align-items: flex-start;flex-direction: column;">
              <cover-view class="car-info"style="display: flex;align-items: flex-start;flex-direction: column;">
                <cover-view class="car-plate">{{ orderInfo.verificationCarPlate}}</cover-view>
                <cover-view class="car-detail">{{ carColor }} | {{ orderInfo.verificationCarModel}}</cover-view>
              </cover-view>
              
              <cover-view class="driver-info">
                <cover-view class="driver-name">{{ orderInfo.realName}}</cover-view>
                <cover-view class="driver-rating">{{ formatRating(orderInfo.rating) }}</cover-view>
              </cover-view>
            </cover-view>
			
			<cover-view class="third-item"  style="display: flex;gap: 5px;align-items: flex-end;flex-direction: column;">
			  <cover-view class="distance-info"  style="display: flex;gap: 5px;align-items: flex-end;flex-direction: column;">
				<cover-view style="font-size: 14px;color: var(--color-darkgrey);">总距离</cover-view>
			    <cover-view style="font-size: 30px;color: var(--color-red);">{{orderInfo.distance}}km</cover-view>
			  </cover-view>
			</cover-view>
          </cover-view>
          
          <!-- 路线信息 -->
			<cover-view class="route-info">
			  <cover-view class="icon start-icon"></cover-view>
			  <cover-view class="route-text-container">
				<cover-view class="route-from">{{ orderInfo.startLoc }}</cover-view>
			  </cover-view>
			  <cover-view class="route-separator">----------</cover-view>
			  <cover-view class="icon end-icon"></cover-view>
			  <cover-view class="route-text-container">
				<cover-view class="route-to">{{ orderInfo.endLoc }}</cover-view>
			  </cover-view>
			</cover-view>
          
          <!-- 取消按钮 - 添加v-if条件 -->
		  <cover-view style="display: flex;justify-content: center;" @click="handleCancelOrder">
			  <cover-view class="cancel-btn" @click="handleCancelOrder" v-if="countdown > 0">
			    <cover-view class="cancel-text" @click="handleCancelOrder">取消订单（{{ countdown }}s）</cover-view>
			  </cover-view>
		  </cover-view>

        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
import PageHeader_cover from "@/components/PageHeader_cover.vue";
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    PageHeader_cover
  },
  data() {
    return {
      orderInfo: {
        avatar: '/static/default-avatar.png', // 司机头像
        verification_car_plate: "京A·D2345",              // 车牌号
        verification_car_model: "特斯拉 Model 3",        // 车型
        real_name: "张师傅",                            // 司机姓名
        rating: 4.8,                                    // 评分（1-5分）
        distance: "10.3km",                              // 距离
        price: 38.5,                                    // 预估价格
        start_loc: "北京市海淀区中关村大街1号",          // 起点
        end_loc: "北京市朝阳区建国路88号",               // 终点
        car_color: "黑色"                               // 车辆颜色（需映射到carColor）
      },
      countdown: 45, // 取消倒计时
      countdownTimer: null, // 倒计时定时器
      carColor: '黑色', // 默认车辆颜色
      isLoading: false, // 加载状态
      error: null // 错误信息
    }
  },
  computed: {
	...mapState(['userID', 'rideRequest','rideOrder']),
  },
  created() {
    this.fetchOrderInfo();
    this.startCountdown();
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
  methods: {
    async fetchOrderInfo() {
      this.isLoading = true;
      this.error = null;
      
      try {
		console.log(this.rideOrder.orderID);
        // 检查是否有订单ID
        if (!this.rideOrder.orderID) {
          throw new Error('未获取到订单ID');
        }
        
        const response = await uni.request({
		  url: `http://10.0.2.2:8083/carsharing/get-certain-order?orderId=${this.rideOrder.orderID}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);


        // 处理响应数据
        if (response.data.status === 'success') {
          this.orderInfo = response.data.history;
        } else {
          throw new Error(res.data.message || '获取订单信息失败');
        }
      } catch (error) {
        console.error('获取订单信息失败:', error);
        this.error = error.message || '获取订单信息失败';
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    
    async cancelOrder() {
      this.isLoading = true;
      this.error = null;
      
      try {
        // 检查是否有订单ID
        if (!this.orderId) {
          throw new Error('未获取到订单ID');
        }
        
        const response = await uni.request({
          url: 'http://10.0.2.2:8083/carsharing/cancel-order',
          method: 'POST',
          data: {
            order_id: this.orderId
          },
          header: {
            'Content-Type': 'application/json'
          }
        });
        
        const [error, res] = response;
        
        if (error) {
          throw error;
        }
        
        // 处理响应数据
        if (res.data.status === 'success') {
          uni.showToast({
            title: '订单已取消',
            icon: 'success'
          });
          // 返回上一页或其他操作
          uni.navigateBack();
        } else {
          throw new Error(res.data.message || '取消订单失败');
        }
      } catch (error) {
        console.error('取消订单出错:', error);
        this.error = error.message || '取消订单失败';
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    
    handleMapMessage(e) {
      // 处理地图消息
    },
    
    formatRating(rating) {
      if (!rating) return '暂无评分';
      const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
      return `${stars} ${rating.toFixed(1)}分`;
    },
    
    startCountdown() {
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.countdownTimer);
          // 倒计时结束后的逻辑
        }
      }, 1000);
    },
    
    handleCancelOrder() {
      uni.showModal({
        title: '确认取消订单',
        content: '您确定要取消当前订单吗？',
        success: (res) => {
          if (res.confirm) {
            this.cancelOrder();
          }
        }
      });
    }
  }
}
</script>

<style>
/* 样式部分保持不变，与之前相同 */
.price-info {
  font-size: 16px;
  color: #FF4D4F;
  text-align: center;
  margin: 10px 0;
  font-weight: bold;
}

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
  padding: 15px;
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

.avatar-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
}

.report-text {
  font-size: 12px;
  color:var(--color-blue);
}

.music-control {
  display: flex;
  justify-content: center;
  padding: 5px 0;
}

.music-symbol {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.car-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.car-plate {
  font-size: 30px;
  color: black;
  font-weight: bold; 
  margin-bottom: 5px;
  letter-spacing: 2px; /* 增加字间距 */
}

.car-detail {
  font-size: 14px;
  color: var(--color-darkgrey);
}

.driver-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.driver-name {
  font-size: 16px;
  font-weight: bold;
  color: darkgrey;
  margin-right: 10px;
  font-weight: bold;
}

.driver-rating {
  font-size: 14px;
  color: #FFCC00;
}

.route-info {
  display: flex;
  flex-direction: row;
  align-items: center; /* 保持垂直居中 */
  justify-content: center; /* 添加水平居中 */
  gap: 5px;
  margin-top: 10px;
  padding: 10px 0;
  width: 100%; /* 确保容器宽度 */
}

.route-text-container {
  max-width: 120px; /* 根据实际布局调整 */
  overflow: hidden;
}

.route-from, .route-to {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.route-separator {
  flex-shrink: 0; /* 防止分隔线被压缩 */
  font-size: 12px;
  color: var(--color-grey);
  margin-left: 5px;
  margin-right: 10px;
}

.cancel-btn {
	background-color: var(--color-red);
	border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center; /* 添加垂直居中 */
  margin-top: 10px;
  width: 70%; /* 确保宽度填满容器 */
  height: 30px;
}

.cancel-text {
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center; /* 确保文字居中 */
}

.first-row {
  display: flex;
  flex-direction: row; /* 横向排布 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 子元素之间的间距均匀分布 */
  padding: 8px 12px;
  border-radius: 8px;
}
.icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}

.start-icon {
  background-color: var(--color-green);
}

.end-icon {
  background-color: var(--color-orange);
}
web-view {
  width: 100%;
  height: 100%;
  display: block;
}
</style>