<!-- pages/my/login/passwordLogin.vue -->
<template>
  <view class="container" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="login-content">
      <view class="title">密码登录</view>

      <view class="input-group">
        <view class="input-item">
          <text class="prefix">+86</text>
          <input
            v-model="phone"
            type="number"
            placeholder="请输入手机号码"
            maxlength="11"
            class="input"
          />
        </view>

        <view class="input-item">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            class="input"
            @confirm="handleLogin"
          />
          <text
            class="iconfont"
            :class="showPassword ? 'icon-eye' : 'icon-eye-close'"
            @tap="togglePassword"
          ></text>
        </view>
      </view>
	  
      <button class="login-btn" @tap="handleLogin">登录</button>
	  
      <view class="switch-login">
        <text @tap="navigateTo('/pages/my/login/login')">验证码登录</text>
        <text @tap="navigateTo('/pages/my/login/forget')">忘记密码</text>
      </view>


	  <!-- 添加底部容器 -->
	  <view class="bottom-container">
	    <view class="footer">
		  <text>还没有账户？</text>
		  <text class="register" @tap="navigateTo('/pages/my/login/register')">立即注册</text>
	    </view>
	  
	    <view class="agreement">
		  登录即同意
		  <text class="link" @tap="navigateTo('/pages/agreement/user')">《用户协议》</text>
		  和
		  <text class="link" @tap="navigateTo('/pages/agreement/privacy')">《隐私政策》</text>
	    </view>
	  </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
	  statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0,
      phone: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },

    validateForm() {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        uni.showToast({ title: '请输入有效手机号', icon: 'none' })
        return false
      }
      if (!this.password.trim()) {
        uni.showToast({ title: '请输入密码', icon: 'none' })
        return false
      }
      return true
    },

    async handleLogin() {
      if (!this.validateForm()) return
      
      uni.showLoading({ title: '登录中...', mask: true })
      
      try {
        const res = await uni.request({
          url: '/api/login',
          method: 'POST',
          data: {
            phone: this.phone,
            password: this.password
          }
        })
        
        uni.hideLoading()
        if (res.data.statue === "success") {
          uni.switchTab({ url: '/pages/home/home' })
        } else {
          uni.showToast({ title: res.data.msg || '登录失败', icon: 'none' })
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({ title: '网络错误，请重试', icon: 'none' })
      }
    },
    navigateTo(url) {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
}

.login-content {
  flex: 1;
  width: 100%;
  padding: 0 40rpx;
  box-sizing: border-box;
}

.title {
  font-size: 40rpx;
  color: #07c160; /* 改为绿色 */
  text-align: left; /* 左对齐 */
  margin: 40rpx 0;
  padding-left: 20rpx;
}

.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
  border-bottom: 2rpx solid #eee;
  padding: 20rpx 0;
  position: relative;
}

.prefix {
  width: 120rpx;
  color: #333;
  font-size: 32rpx;
}
/* 新增底部定位样式 */
.bottom-container {
  position: fixed;
  bottom: 60rpx;
  left: 0;
  right: 0;
  padding: 0 40rpx;
}
.input {
  flex: 1;
  font-size: 32rpx;
  padding: 10rpx 0;
  border: none !important;
  outline: none !important;
}

.iconfont {
  font-size: 40rpx;
  color: #999;
  margin-left: 20rpx;
}

.switch-login {
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: #007AFF;
  margin: 30rpx 0 50rpx;
}

.login-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: #007AFF;
  color: #fff;
  border-radius: 40rpx;
  font-size: 36rpx;
  margin-bottom: 40rpx;
}

.footer {
  text-align: center;
  color: #666;
  font-size: 28rpx;
}

.register {
  color: #007AFF;
  margin-left: 10rpx;
}

.agreement {
  text-align: center;
  color: #999;
  font-size: 24rpx;
  margin-top: 40rpx;
}

.link {
  color: #007AFF;
}
</style>