<template>
  <view class="splash-container">
    <!-- 使用swiper组件 -->
    <swiper class="swiper" indicator-dots="true" autoplay="false" interval="5000" duration="300" circular="true">
      <!-- 第一个页面 -->
      <swiper-item class="page1">
        <view class="page-content">
          <text class="title">
            <text class="orange-text">连接</text><text class="green-text">你我</text>
          </text>
          <text class="title">
            <text class="orange-text">连接</text><text class="green-text">城市</text>
          </text>
          <image class="image" src="@/static/launch/welcome0.png" />
        </view>
      </swiper-item>
      <!-- 第二个页面 -->
      <swiper-item class="page2">
        <view class="page-content">
          <!-- 第一行：车主乘客一键切换 -->
          <text class="big-title">
            <text class="green-text">车主乘客</text><text class="small-green-text">一键切换！</text>
          </text>
          <!-- 第二行：出行更自由 -->
          <text class="small-title">
            <text class="orange-text">出行更</text><text class="big-orange-text">自由!</text>
          </text>
          <image class="image" src="@/static/launch/welcome1.png" />
          <button class="experience-button" @click="goToExperience">立即体验</button>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  methods: {
    goToExperience() {
      // 跳转到主页面或其他页面
      uni.reLaunch({
        url: '/pages/customer/customer' // 你想跳转的主页面
      });
    }
  }
}
</script>

<style scoped>
.splash-container {
  height: 100%;
  background-color: #f9f2dc; /* 背景色 */
}

.swiper {
  height: 100%;
}

.page-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  font-size: 32px;
  font-weight: bold;
  text-align: left; /* 确保文本左对齐 */
  margin-bottom: 20px;
}

.orange-text {
  color: #da713c; /* 橙色 */
  font-weight: bold;
}

.green-text {
  color: #5c9267; /* 绿色 */
}

.big-title {
  font-size: 32px; /* 字体大 */
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
}

.small-title {
  font-size: 16px; /* 字体小 */
  text-align: center;
  margin-bottom: 20px;
}

.big-orange-text {
  font-size: 32px; /* 字体大 */
  color: #da713c; 
  font-weight: bold;
}

.small-green-text{
	font-size: 16px; /* 字体小 */
	color: #5c9267;
	font-weight: bold;
}

.subtitle {
  font-size: 16px;
  color: #8f8e8d;
  margin-bottom: 40px;
  text-align: center;
}

.image {
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
}

.experience-button {
  width: 200px;
  height: 40px;
  background-color: #5c9267;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
}
</style>
