<template>
  <view :style="{ paddingTop: statusBarHeight + 'px' }">
    <!-- 返回按钮 - 强制跳转到指定页面 -->
    <view class="back-button" @click="goToSpecificPage">
      <text>← 返回首页</text>
    </view>
	<!-- 登录按钮 -->
	<view class="login-button" @click="goToLoginPage">
	  <text>登录</text>
	</view>
    <view class="content">
      我的个人页面
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0
    }
  },
  methods: {
    goToSpecificPage() {
	  uni.switchTab({ 
	      url: '/pages/customer/customer' 
	    });
    },
	goToLoginPage() {
	  uni.navigateTo({
		  url: '/pages/my/login/login'
	    });
	}
  },
}
</script>

<style>
.back-button {
  padding: 15px;
  font-size: 16px;
  color: #007AFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  margin-top: var(--status-bar-height);
}
.login-button {
  padding: 15px;
  font-size: 16px;
  color: #007AFF;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  margin-top: var(--status-bar-height);
}
.content {
  margin-top: 50px;
  padding: 20px;
}
</style>