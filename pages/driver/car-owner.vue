<template>
	<view class="auth-container">
		<!-- 顶部标题栏 + 返回按钮 -->
		<view class="header">
			<view class="back-icon" @click="goBack">‹</view>
			<text class="title">私家车拼车车主认证</text>
		</view>

		<!-- 城市显示（固定为上海市） -->
		<view class="city-display">
			<text class="city-label">接单城市</text>
			<view class="city-box">
				<text class="city-name">{{ selectedCity }}</text>
			</view>
		</view>

		<!-- 实名认证卡片 -->
		<view class="auth-card">
			<view class="row">
				<view class="left">
					<text class="label">实名认证</text>
					<text class="desc" v-if="!realNameCertified" @click="openAuthDialog">点击进行实名认证</text>
					<view v-else>
						<text class="desc">{{ realName }} {{ idNumberDisplay }}</text>
						<text class="subdesc">年龄要求：18–70周岁</text>
					</view>
				</view>
				<text class="verified" v-if="realNameCertified">✔ 已认证</text>
			</view>

			<!-- 上传项 -->
			<view class="row" v-for="(item, index) in uploadItems" :key="index">
				<view class="left">
					<text class="label">{{ item.label }}</text>
					<text class="desc">{{ item.desc }}</text>
				</view>
				<text class="verified" v-if="item.certified">✔ 已认证</text>
				<view class="upload-btn" v-else @click="openUploadDialog(index)">去上传</view>
			</view>
		</view>

		<!-- 协议 -->
		<view class="agreement">
			<checkbox-group @change="handleProtocolChange">
				<view class="checkbox-line">
					<checkbox value="protocol1" :checked="agreeProtocol1" />
					请阅读并同意 <text class="link" @click="showAgreement">《拼好车车主协议》</text>（必选）
				</view>
				<view class="checkbox-line">
					<checkbox value="protocol2" :checked="agreeProtocol2" />
					同意成为拼车车主并同意 <text class="link" @click="showAgreement">《拼好车车主协议》</text>
				</view>
			</checkbox-group>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-area">
			<button class="submit-btn" :disabled="isSubmitting" @click="submit">确认上传</button>
		</view>

		<!-- 协议弹窗 -->
		<view class="agreement-mask" v-if="showAgreementDialog">
			<view class="agreement-box">
				<view class="agreement-title">拼好车车主协议</view>
				<scroll-view class="agreement-content" scroll-y>
					<view class="content-text">
						<view class="section">
							<text class="section-title">一、协议目的</text>
							<text class="section-text">
								本协议旨在规范拼好车平台车主的服务行为，保障车主和乘客的合法权益，促进平台的健康发展。
							</text>
						</view>
						<view class="section">
							<text class="section-title">二、服务要求</text>
							<text class="section-text">
								1. 车主需年满18周岁且不超过70周岁，持有有效驾驶证，并确保车辆符合平台要求（7座及以下）。\n
								2. 车主需提供真实有效的身份信息，包括姓名、身份证号、驾驶证、行驶证等。\n
								3. 车主应遵守交通规则，确保行车安全，不得从事违法行为。
							</text>
						</view>
						<view class="section">
							<text class="section-title">三、费用与结算</text>
							<text class="section-text">
								1. 车主通过平台接单后，费用由乘客支付，平台将按约定比例与车主结算。\n
								2. 车主需遵守平台的收费标准，不得私自向乘客收取额外费用。
							</text>
						</view>
						<view class="section">
							<text class="section-title">四、责任与义务</text>
							<text class="section-text">
								1. 车主应对乘客的安全负责，确保服务过程中不发生安全事故。\n
								2. 如因车主原因导致服务纠纷，车主需承担相应责任，平台有权暂停或终止其服务资格。
							</text>
						</view>
						<view class="section">
							<text class="section-title">五、其他条款</text>
							<text class="section-text">
								1. 本协议自车主同意之日起生效。\n
								2. 平台有权根据法律法规或运营需要调整协议内容，调整后将通过平台通知车主。
							</text>
						</view>
					</view>
				</scroll-view>
				<view class="agreement-btns">
					<view class="close-btn" @click="hideAgreement">关闭</view>
				</view>
			</view>
		</view>

		<!-- 上传图片弹窗 -->
		<view class="upload-mask" v-if="showUploadDialog">
			<view class="upload-box">
				<view class="upload-title">上传{{ currentUploadItem ? currentUploadItem.label : '' }}</view>
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
	</view>
</template>

<script>
export default {
  data() {
    return {
      selectedCity: '上海市', // 固定为上海市
      uploadItems: [
        { label: '驾驶证', desc: '准驾车型：至少包含A1, A2, A3, B1, B2, C1, C2', certified: false },
        { label: '行驶证', desc: '本人车辆或亲友车辆均可认证', certified: false },
        { label: '车辆照片', desc: '使用真实照片，座位数7座及以下', certified: false }
      ],
      realNameCertified: false,
      realName: '',
      idNumber: '',
      showAgreementDialog: false, // 控制协议弹窗显示
      showUploadDialog: false, // 控制上传弹窗显示
      currentUploadIndex: null, // 当前上传的项的索引
      uploadedImage: '', // 存储上传的图片路径
      agreeProtocol1: false, // 第一个协议勾选状态
      agreeProtocol2: false, // 第二个协议勾选状态
      isSubmitting: false // 防止重复点击
    };
  },
  computed: {
    currentUploadItem() {
      return this.currentUploadIndex !== null ? this.uploadItems[this.currentUploadIndex] : null;
    },
    idNumberDisplay() {
      if (!this.idNumber) return '';
      return this.idNumber.slice(0, 1) + '*'.repeat(this.idNumber.length - 2) + this.idNumber.slice(-1);
    },
    isAllCertified() {
      return this.realNameCertified && this.uploadItems.every(item => item.certified);
    },
    isAllAgreed() {
      return this.agreeProtocol1 && this.agreeProtocol2;
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    openAuthDialog() {
      uni.showModal({
        title: '实名认证 - 姓名',
        content: '请输入您的姓名',
        showCancel: true,
        editable: true,
        placeholderText: '请输入姓名',
        success: res => {
          if (res.confirm && res.content) {
            this.realName = res.content.trim();
            if (!this.realName) {
              uni.showToast({
                title: '姓名不能为空',
                icon: 'none'
              });
              return;
            }
            uni.showModal({
              title: '实名认证 - 身份证号',
              content: '请输入您的身份证号',
              showCancel: true,
              editable: true,
              placeholderText: '请输入身份证号',
              success: res2 => {
                if (res2.confirm && res2.content) {
                  this.idNumber = res2.content.trim();
                  // 验证长度
                  if (this.idNumber.length !== 18) {
                    uni.showToast({
                      title: '身份证号必须为18位',
                      icon: 'none'
                    });
                    return;
                  }
                  // 正则表达式验证身份证号格式
                  const idNumberRegex = /^[1-9]\d{16}(\d|X)$/i;
                  if (!idNumberRegex.test(this.idNumber)) {
                    uni.showToast({
                      title: '身份证号格式不正确',
                      icon: 'none'
                    });
                    return;
                  }
                  if (this.realName && this.idNumber.length === 18) {
                    this.realNameCertified = true;
                  } else {
                    uni.showToast({
                      title: '请输入有效信息',
                      icon: 'none'
                    });
                  }
                }
              }
            });
          } else if (res.confirm && !res.content) {
            uni.showToast({
              title: '姓名不能为空',
              icon: 'none'
            });
          }
        }
      });
    },
    showAgreement() {
      this.showAgreementDialog = true;
    },
    hideAgreement() {
      this.showAgreementDialog = false;
    },
    openUploadDialog(index) {
      this.currentUploadIndex = index;
      this.uploadedImage = ''; // 重置上传图片
      this.showUploadDialog = true;
    },
    closeUploadDialog() {
      this.showUploadDialog = false;
      this.currentUploadIndex = null;
      this.uploadedImage = '';
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.uploadedImage = res.tempFilePaths[0];
        },
        fail: err => {
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          });
        }
      });
    },
    confirmUpload() {
      if (this.currentUploadIndex !== null) {
        this.uploadItems[this.currentUploadIndex].certified = true; // 标记为已认证
      }
      this.closeUploadDialog();
    },
    handleProtocolChange(e) {
      const values = e.detail.value; // 获取勾选的值数组
      this.agreeProtocol1 = values.includes('protocol1');
      this.agreeProtocol2 = values.includes('protocol2');
      // 调试：打印勾选状态
      console.log('agreeProtocol1:', this.agreeProtocol1, 'agreeProtocol2:', this.agreeProtocol2);
    },
    submit() {
      if (this.isSubmitting) return; // 防止重复点击
      this.isSubmitting = true;

      if (!this.isAllCertified) {
        uni.showToast({
          title: '请完成所有认证和上传',
          icon: 'none'
        });
        this.isSubmitting = false;
        return;
      }

      if (!this.isAllAgreed) {
        uni.showToast({
          title: '请同意所有协议',
          icon: 'none'
        });
        this.isSubmitting = false;
        return;
      }

      // 保存认证状态为已认证
      uni.setStorageSync('isAuthenticated', true);  // 认证状态保存到本地

      // 所有条件满足，跳转到 driver_search 页面
      uni.navigateTo({
        url: '/pages/driver/driver_search', // 修正路径
        success: res => {
          console.log('跳转成功:', res);
        },
        fail: err => {
          console.error('跳转失败:', err);
          uni.showToast({
            title: '跳转失败，请检查路径',
            icon: 'none'
          });
          this.isSubmitting = false;
        },
        complete: () => {
          // 无论成功或失败，complete 都会执行
          this.isSubmitting = false;
        }
      });
    }
  },
  
  // 页面加载时检查认证状态
  onLoad() {
    // 检查是否已经认证过
    const isAuthenticated = uni.getStorageSync('isAuthenticated');

    if (isAuthenticated) {
      // 如果已认证，跳过认证页面，直接跳转到 driver_search 页面
      uni.switchTab({
        url: '/pages/driver/driver_search'
      });
    }
  }
};
</script>

<style scoped>
.auth-container {
	background-color: #fff;
	min-height: 100vh;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.header {
	position: relative;
	font-size: 36rpx;
	font-weight: bold;
	padding: 20rpx 0;
	text-align: center;
	border-bottom: 2rpx solid #f0f0f0;
}

.back-icon {
	position: absolute;
	left: 30rpx;
	top: 50%;
	transform: translateY(-50%);
	font-size: 48rpx;
	color: #333;
}

.city-display {
	margin-top: 40rpx;
	background-color: #f8f8f8;
	border-radius: 16rpx;
	padding: 24rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.city-label {
	font-size: 32rpx;
	color: #333;
}

.city-box {
	display: flex;
	align-items: center;
}

.city-name {
	font-size: 32rpx;
	color: #333;
}

.auth-card {
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-top: 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 30rpx;
	border-bottom: 1rpx solid #eee;
	margin-bottom: 30rpx;
}

.left {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.label {
	font-size: 32rpx;
	font-weight: bold;
	color: #000;
	margin-bottom: 8rpx;
}

.desc {
	font-size: 28rpx;
	color: #333;
	line-height: 40rpx;
}

.subdesc {
	font-size: 26rpx;
	color: #999;
	margin-top: 8rpx;
}

.verified {
	color: #16c26b;
	font-weight: bold;
	font-size: 28rpx;
}

.upload-btn {
	background-color: #f17a3d;
	color: #fff;
	font-size: 28rpx;
	padding: 10rpx 30rpx;
	border-radius: 12rpx;
	flex-shrink: 0;
}

/* 协议 */
.agreement {
	margin-top: 40rpx;
	font-size: 26rpx;
	color: #333;
}

.checkbox-line {
	margin-bottom: 24rpx;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.link {
	color: #1cbb7f;
	text-decoration: underline;
	margin-left: 10rpx;
}

.submit-area {
	margin-top: 50rpx;
	display: flex;
	justify-content: center;
}

.submit-btn {
	background-color: #3ea87a;
	color: #fff;
	font-size: 32rpx;
	padding: 22rpx 100rpx;
	border-radius: 100rpx;
}

.submit-btn[disabled] {
	background-color: #cccccc;
}

/* 协议弹窗 */
.agreement-mask {
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

.agreement-box {
	background: #fff;
	width: 80%;
	max-height: 80vh;
	padding: 40rpx;
	border-radius: 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.agreement-title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 30rpx;
}

.agreement-content {
	flex: 1;
	max-height: 60vh;
}

.content-text {
	padding-right: 20rpx;
}

.section {
	margin-bottom: 30rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.section-text {
	font-size: 28rpx;
	color: #666;
	line-height: 40rpx;
}

.agreement-btns {
	display: flex;
	justify-content: center;
	margin-top: 30rpx;
}

.close-btn {
	background-color: #3ea87a;
	color: #fff;
	font-size: 30rpx;
	padding: 20rpx 60rpx;
	border-radius: 12rpx;
}

/* 上传弹窗 */
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