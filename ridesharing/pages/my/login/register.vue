<!-- pages/my/login/register.vue -->
<template>
  <view class="container" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="login-content">
      <!-- 标题 -->
      <view class="title">注册账户</view>

      <!-- 手机号输入 -->
      <view class="input-item">
        <text class="prefix">+86</text>
        <input
          v-model="phone"
          type="number"
          placeholder="请输入手机号码"
          maxlength="11"
          class="input"
          @input="validatePhone"
        />
      </view>

      <!-- 验证码输入 -->
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
	  
      <!-- 新增密码输入部分 -->
      <view class="input-item">
        <input
          v-model="newPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码（8-20位字母+数字）"
          class="input"
          maxlength="20"
        />
        <text
          class="iconfont"
          :class="showPassword ? 'icon-eye' : 'icon-eye-close'"
          @tap="togglePassword"
        ></text>
      </view>

      <view class="input-item">
        <input
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="请确认密码"
          class="input"
          maxlength="20"
        />
        <text
          class="iconfont"
          :class="showConfirmPassword ? 'icon-eye' : 'icon-eye-close'"
          @tap="toggleConfirmPassword"
        ></text>
      </view>
	  
      <!-- 确认按钮 -->
      <button class="confirm-btn" @tap="handleRegister">确认</button>
	  <view class="links">
	    <text @tap="navigateTo('/pages/my/login/login')">验证码登录</text>
	    <text @tap="navigateTo('/pages/my/login/passwordLogin')">密码登录</text>
	  </view>
	  <view class="bottom-container">
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
      phone: '',
      code: '',
      newPassword: '',
      confirmPassword: '',
      isCounting: false,
      countdown: 60,
      showPassword: false,
      showConfirmPassword: false
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

    // 密码可见切换
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    // 验证手机号格式
    validatePhone() {
      return /^1[3-9]\d{9}$/.test(this.phone)
    },
    // 验证密码强度
    validatePassword() {
      const reg = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/
      if (!reg.test(this.newPassword)) {
        uni.showToast({ title: '需包含字母和数字（8-20位）', icon: 'none' })
        return false
      }
      if (this.newPassword !== this.confirmPassword) {
        uni.showToast({ title: '两次密码输入不一致', icon: 'none' })
        return false
      }
      return true
    },
    async handleRegister() {
      // 验证手机号格式
      if (!this.validatePhone()) {
        uni.showToast({ title: '手机号格式错误', icon: 'none' });
        return;
      }
      
      // 验证验证码
      if (this.code.length < 4) {
        uni.showToast({ title: '验证码至少4位', icon: 'none' });
        return;
      }
    
      // 验证密码格式
      if (!this.validatePassword()) return;
    
      uni.showLoading({ title: '注册中...' });
    
      try {
        // 向后端发送注册请求
        const res = await uni.request({
          url: 'http://10.0.2.2:8083/carsharing/register',  
          method: 'POST',
          data: {
            phone: this.phone,  // 用户手机号
            password: this.newPassword,  // 用户密码
          }
        });
        // 后端返回响应处理：根据返回的状态码进行处理
        if (res.data.status === "success") {
          uni.showToast({ title: '注册成功', icon: 'success' });
          setTimeout(() => {
			uni.navigateTo({
			  url: '/pages/my/login/passwordLogin'
			});
          }, 1500);
        } else {
          uni.showToast({ title: '注册失败，请重试', icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '注册失败，请重试', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    navigateTo(url) {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style scoped>
/* 复用统一样式 */
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
}
/* 新增底部定位样式 */
.bottom-container {
  position: fixed;
  bottom: 60rpx;
  left: 0;
  right: 0;
  padding: 0 40rpx;
}
.login-content {
  flex: 1;
  width: 100%;
  padding: 0 40rpx;
  box-sizing: border-box;
}
.title {
  font-size: 40rpx;
  color: #07c160;
  text-align: left;
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
.iconfont {
  position: absolute;
  right: 20rpx;
  font-size: 40rpx;
  color: #999;
  z-index: 2;
}
.prefix {
  width: 120rpx;
  color: #333;
  font-size: 32rpx;
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
.input {
  flex: 1;
  font-size: 32rpx;
  padding: 10rpx 0;
  border: none !important;
  outline: none !important;
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

.confirm-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: #007AFF;
  color: #fff;
  border-radius: 40rpx;
  font-size: 36rpx;
  margin: 60rpx 0 30rpx;
}

.agreement {
  text-align: center;
  color: #999;
  font-size: 24rpx;
}

.link {
  color: #007AFF;
}
</style>