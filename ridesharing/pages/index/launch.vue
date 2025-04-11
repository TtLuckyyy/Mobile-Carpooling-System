<template>
  <view class="splash-page">
    <text class="title">拼  好  车</text>
    <text class="subtitle">你的出行省钱指南</text>
	<image class="logo" src="@/static/launch/start.png" />
    <view class="footer">
      <text class="footer-text">一路同行，美好随行</text>
      <text class="version">V1.0.0</text>
    </view>
  </view>
</template>

<script>
export default {
  onShow() {
    // 在启动页显示2秒后跳转到主页面
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/index/welcome' // 你想跳转的主页面
      });
    }, 2000); // 启动页显示2秒
  }
}
</script>

<style scoped>
.splash-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-color: #f9f2dc; /* 适合的背景色 */
}

.logo {
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
}

.title {
  font-size: 32px;
  color: #5c9267; /* 绿色 */
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #8f8e8d;
  margin-bottom: 40px;
}

.footer {
  position: absolute;
  bottom: 20px;
  text-align: center;
  display: flex;
  flex-direction: column; /* 让内容垂直排列 */
  align-items: center; /* 内容居中 */
}

.footer-text {
  font-size: 14px;
  color: #da713c; /* 橙色 */
  margin-bottom: 5px;
}

.version {
  font-size: 12px;
  color: #8f8e8d;
}
</style>
