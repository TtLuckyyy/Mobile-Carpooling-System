<template>
  <view class="container">
    <!-- 🔙 返回按钮 -->
    <view class="back-button" @click="goBack">
      <uni-icons type="back" size="24" color="#333"></uni-icons>
      <text class="back-text">返回</text>
    </view>

    <!-- 标题和装饰线 -->
    <view class="header">
      <text class="title">用户信息登记</text>
      <view class="title-line"></view>
    </view>

    <!-- 表单项 -->
    <view class="form-card">
      <!-- 用户名 -->
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

      <!-- 邮箱 -->
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

      <!-- 用户头像 -->
      <view class="form-item">
        <view class="item-header">
          <uni-icons type="image" size="18" color="#666" class="icon"></uni-icons>
          <text class="label">用户头像</text>
        </view>
        <view class="avatar-upload">
          <view v-if="avatar" class="avatar-preview">
            <image :src="avatar" class="avatar-image" mode="aspectFit" />
          </view>
          <button class="upload-btn" @click="openUploadDialog">上传头像</button>
        </view>
      </view>

      <!-- 常用居住地址 -->
      <view class="form-item">
        <view class="item-header">
          <uni-icons type="location" size="18" color="#666" class="icon"></uni-icons>
          <text class="label">常用居住地址</text>
        </view>
        <input 
          v-model="home_address" 
          class="input" 
          placeholder="请输入常用居住地址"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 常用公司地址 -->
      <view class="form-item">
        <view class="item-header">
          <uni-icons type="location" size="18" color="#666" class="icon"></uni-icons>
          <text class="label">常用公司地址</text>
        </view>
        <input 
          v-model="company_address" 
          class="input" 
          placeholder="请输入常用公司地址"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 提交按钮 -->
      <button 
        @click="submitForm" 
        class="submit-button"
        hover-class="submit-button-hover"
      >
        立即提交
      </button>
    </view>
  </view>

  <!-- 上传图片弹窗 -->
  <view class="upload-mask" v-if="showUploadDialog">
    <view class="upload-box">
      <view class="upload-title">上传头像</view>
      <view class="upload-area">
        <view class="upload-placeholder" v-if="!uploadedImage" @click="chooseImage">
          <text>点击上传图片</text>
        </view>
        <image v-else :src="uploadedImage" class="uploaded-image" mode="aspectFit" />
      </view>
      <view class="upload-btns">
        <view class="cancel" @click="closeUploadDialog">取消</view>
        <view class="confirm" @click="confirmUpload">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      username: '',
      email: '',
      avatar: '', // 用于存储头像 URL
      home_address: '',
      company_address: '',
      showError: false,
      showUploadDialog: false, // 控制上传图片弹窗
      uploadedImage: '', // 存储上传的图片路径
    }
  },
  computed: {
    ...mapState(['userID']) // 假设 userID 是在 Vuex 里存的
  },
  onLoad() {
    if (this.userID && this.userID !== '未登录用户') {
      this.fetchUserInfo() // 页面加载时获取数据
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.switchTab({ url: '/pages/my/my' })
    },

    // 获取用户信息，加载到表单
    fetchUserInfo() {
      uni.request({
        url: `http://localhost:8083/carsharing/get-user-info?userID=${this.userID}`, // 改成你的后端接口
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data && res.data.data) {
            const userInfo = res.data.data
            this.username = userInfo.username || ''
            this.email = userInfo.email || ''
            this.avatar = userInfo.avatar || ''
            this.home_address = userInfo.home_address || ''
            this.company_address = userInfo.company_address || ''
          } else {
            uni.showToast({ title: '加载用户信息失败', icon: 'none' })
          }
        },
        fail: () => {
          uni.showToast({ title: '网络错误，请重试', icon: 'none' })
        }
      })
    },

    // 打开上传头像弹窗
    openUploadDialog() {
      this.showUploadDialog = true
    },

    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.uploadedImage = res.tempFilePaths[0]
        },
        fail: err => {
          uni.showToast({ title: '选择图片失败', icon: 'none' })
        }
      })
    },

    // 关闭上传弹窗
    closeUploadDialog() {
      this.showUploadDialog = false
      this.uploadedImage = ''
    },

    // 确认上传图片
    confirmUpload() {
      this.avatar = this.uploadedImage // 更新头像字段
      this.showUploadDialog = false
    },

    // 提交表单
    submitForm() {
      if (!this.username || !this.email) {
        this.showError = true
        uni.vibrateShort() // 震动提示
        return
      }

      // 发送更新请求
      uni.request({
        url: `http://localhost:8083/carsharing/update-user-info`, // 改成你的后端接口
        method: 'POST',
        data: {
          userID: this.userID,          // 带上 userID
          username: this.username,
          email: this.email,
          avatar: this.avatar,
          home_address: this.home_address,
          company_address: this.company_address
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data.success) {
            uni.showToast({ title: '更新成功', icon: 'success' })
          } else {
            uni.showToast({ title: '更新失败', icon: 'none' })
          }
        },
        fail: () => {
          uni.showToast({ title: '网络错误，请重试', icon: 'none' })
        }
      })
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
.upload-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.upload-box {
  background: #fff;
  width: 600rpx;
  padding: 40rpx;
  border-radius: 20rpx;
  box-sizing: border-box;
}

.upload-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.upload-area {
  display: flex;
  justify-content: center;
  margin-bottom: 30rpx;
}

.upload-placeholder {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #999;
}

.uploaded-image {
  width: 200rpx;
  height: 200rpx;
}

.upload-btns {
  display: flex;
  justify-content: space-between;
}

.cancel, .confirm {
  width: 48%;
  text-align: center;
  padding: 20rpx 0;
  border-radius: 12rpx;
  font-size: 30rpx;
}

.cancel {
  background-color: #eee;
  color: #333;
}

.confirm {
  background-color: #3ea87a;
  color: #fff;
}

</style>