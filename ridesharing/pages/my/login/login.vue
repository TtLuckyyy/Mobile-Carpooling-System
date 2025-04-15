<!-- pages/my/login/login.vue -->
<template>
  <view class="container" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="login-content">
	  <view class="title">验证码登录</view>
	  
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
            v-model="code"
            type="number"
            placeholder="请输入验证码"
            maxlength="6"
            class="input"
          />
          <button
            :class="['code-btn', isCounting ? 'disabled' : '']"
            :disabled="isCounting"
            @tap="getCode"
          >
            {{ codeBtnText }}
          </button>
        </view>
      </view>

	  <button class="login-btn" @tap="handleLogin">登录</button>


      <view class="links">
        <text @tap="navigateTo('/pages/my/login/passwordLogin')">密码登录</text>
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
      code: '',
      isCounting: false,
      countdown: 60
    }
  },
  computed: {
    codeBtnText() {
      return this.isCounting ? `${this.countdown}s后重新获取` : '获取验证码'
    }
  },
  methods: {
    async getCode() {
      if (!this.validatePhone()) {
        uni.showToast({ title: '请输入有效手机号', icon: 'none' })
        return
      }
      
      this.isCounting = true
      const timer = setInterval(() => {
        if (this.countdown <= 0) {
          clearInterval(timer)
          this.isCounting = false
          this.countdown = 60
          return
        }
        this.countdown--
      }, 1000)
      
      try {
        const res = await uni.request({
          url: '/api/sendCode',
          method: 'POST',
          data: { phone: this.phone }
        })
        uni.showToast({ title: '验证码已发送' })
      } catch (error) {
        uni.showToast({ title: '验证码已发送', icon: 'none' })
      }
    },

    validatePhone() {
      return /^1[3-9]\d{9}$/.test(this.phone)
    },

	handleLogin() {

	  if (!this.validatePhone() || !this.code) {
		uni.showToast({ title: '请填写完整信息', icon: 'none' })
		return
	  }

		uni.switchTab({
		  url: '/pages/my/my'
		})
	},

    navigateTo(url) {
      uni.navigateTo({ url })
    },
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
  color: #07c160; /* 绿色 */
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
}
/* 新增底部定位样式 */
.bottom-container {
  position: fixed;
  bottom: 60rpx;
  left: 0;
  right: 0;
  padding: 0 40rpx;
}
.prefix {
  width: 120rpx;
  color: #333;
  font-size: 32rpx;
}

.input {
  flex: 1;
  font-size: 32rpx;
  padding: 10rpx 0;
}

.code-btn {
  width: 200rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  color: #007AFF;
  background: #fff;
  border: 1px solid #007AFF;
  border-radius: 30rpx;
}

.code-btn.disabled {
  color: #999;
  border-color: #ddd;
}

.login-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: #007AFF;
  color: #fff;
  border-radius: 40rpx;
  font-size: 36rpx;
  margin: 40rpx 0;
}

.links {
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: #007AFF;
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