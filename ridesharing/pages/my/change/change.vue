<template>
  <view class="container">
    <!-- 新增标题和装饰线 -->
    <view class="header">
      <text class="title">用户信息登记</text>
      <view class="title-line"></view>
    </view>

    <!-- 表单项增加图标和错误提示 -->
    <view class="form-card">
      <view class="form-item">
        <view class="item-header">
          <uni-icons type="person" size="18" color="#666" class="icon"></uni-icons>
          <text class="label">用户名<text class="required">*</text></text>
        </view>
        <input 
          v-model="username" 
          class="input" 
          placeholder="请输入用户名"
          placeholder-class="placeholder"
          :class="{error: showError && !username}"
        />
        <text v-if="showError && !username" class="error-msg">用户名不能为空</text>
      </view>

      <!-- 类似结构应用于其他表单项 -->
      <!-- 邮箱项 -->
      <view class="form-item">
        <view class="item-header">
          <uni-icons type="email" size="18" color="#666" class="icon"></uni-icons>
          <text class="label">邮箱</text>
        </view>
        <input 
          v-model="email" 
          class="input" 
          placeholder="请输入邮箱"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 电话项 -->
      <view class="form-item">
        <view class="item-header">
          <uni-icons type="phone" size="18" color="#666" class="icon"></uni-icons>
          <text class="label">电话<text class="required">*</text></text>
        </view>
        <input 
          v-model="phone" 
          class="input" 
          placeholder="请输入电话"
          placeholder-class="placeholder"
          type="number"
          :class="{error: showError && !phone}"
        />
        <text v-if="showError && !phone" class="error-msg">电话不能为空</text>
      </view>

      <!-- 地址项 -->
      <view class="form-item">
        <view class="item-header">
          <uni-icons type="location" size="18" color="#666" class="icon"></uni-icons>
          <text class="label">地址</text>
        </view>
        <input 
          v-model="address" 
          class="input" 
          placeholder="请输入详细地址"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 按钮增加动效 -->
      <button 
        @click="submitForm" 
        class="submit-button"
        hover-class="submit-button-hover"
      >
        立即提交
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      phone: '',
      address: '',
      showError: false
    }
  },
  methods: {
    submitForm() {
      if (!this.username || !this.phone) {
        this.showError = true
        uni.vibrateShort() // 增加震动反馈
        return
      }
      // 提交逻辑...
    }
  }
}
</script>

<style>
/* 新增渐变背景 */
.container {
  padding: 30rpx;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 标题样式 */
.header {
  margin-bottom: 60rpx;
  text-align: center;
}
.title {
  font-size: 44rpx;
  color: #2c3e50;
  font-weight: 600;
  letter-spacing: 2rpx;
}
.title-line {
  width: 80rpx;
  height: 6rpx;
  background: #21ba45;
  margin: 20rpx auto;
  border-radius: 3rpx;
}

/* 表单卡片效果 */
.form-card {
  background: #fff;
  padding: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.1);
}

.form-item {
  margin-bottom: 40rpx;
}

.item-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.icon {
  margin-right: 15rpx;
}

.label {
  font-size: 32rpx;
  color: #34495e;
  font-weight: 500;
}

.required {
  color: #e74c3c;
  margin-left: 8rpx;
}

.input {
  width: 100%;
  height: 90rpx;
  padding: 0 20rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 12rpx;
  font-size: 30rpx;
  transition: all 0.3s;
}

.input.error {
  border-color: #e74c3c;
}

.input:focus {
  border-color: #21ba45;
  box-shadow: 0 0 10rpx rgba(33,186,69,0.2);
}

.placeholder {
  color: #bdc3c7;
  font-size: 30rpx;
}

.error-msg {
  color: #e74c3c;
  font-size: 26rpx;
  margin-top: 10rpx;
  display: block;
}

/* 按钮美化 */
.submit-button {
  background: linear-gradient(135deg, #21ba45, #18a940);
  color: white;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  font-size: 36rpx;
  letter-spacing: 2rpx;
  box-shadow: 0 10rpx 20rpx rgba(33,186,69,0.3);
  transition: all 0.3s;
}

.submit-button-hover {
  transform: translateY(-2rpx);
  box-shadow: 0 15rpx 30rpx rgba(33,186,69,0.4);
}
</style>