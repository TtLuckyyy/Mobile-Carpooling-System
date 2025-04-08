<template>
	<view class="auth-container">
		<!-- 顶部标题栏 + 返回按钮 -->
		<view class="header">
			<view class="back-icon" @click="goBack">‹</view>
			<text class="title">私家车拼车车主认证</text>
		</view>

		<!-- 城市选择 -->
		<view class="city-selector" @click="chooseCity">
			<text class="city-label">接单城市</text>
			<view class="city-box">
				<text class="city-name">{{ selectedCity }}</text>
				<text class="arrow">›</text>
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
				<view class="upload-btn">去上传</view>
			</view>
		</view>

		<!-- 协议 -->
		<view class="agreement">
			<view class="checkbox-line">
				<checkbox /> 请阅读并同意 <text class="link">《拼好车车主协议》</text>（必选）
			</view>
			<view class="checkbox-line">
				<checkbox /> 同意成为拼车车主并同意 <text class="link">《拼好车主协议》</text>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-area">
			<button class="submit-btn">确认上传</button>
		</view>

		<!-- 实名认证弹窗 -->
		<view class="popup-mask" v-if="showAuthDialog">
			<view class="popup-box">
				<view class="popup-title">实名认证</view>
				<input class="input" placeholder="请输入姓名" v-model="realName" />
				<input class="input" placeholder="请输入身份证号" v-model="idNumber" />
				<view class="popup-btns">
					<view class="cancel" @click="closeAuthDialog">取消</view>
					<view class="confirm" @click="confirmAuth">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedCity: '上海市',
			cityOptions: ['上海市', '北京市', '广州市', '深圳市', '杭州市'],
			uploadItems: [
				{ label: '驾驶证', desc: '准驾车型：至少包含A1, A2, A3, B1, B2, C1, C2' },
				{ label: '行驶证', desc: '本人车辆或亲友车辆均可认证' },
				{ label: '车辆照片', desc: '使用真实照片，座位数7座及以下' }
			],
			realNameCertified: false,
			realName: '',
			idNumber: '',
			showAuthDialog: false
		};
	},
	computed: {
		idNumberDisplay() {
			if (!this.idNumber) return '';
			return this.idNumber.slice(0, 1) + '*'.repeat(this.idNumber.length - 2) + this.idNumber.slice(-1);
		}
	},
	methods: {
		goBack() {
			uni.navigateBack();
		},
		chooseCity() {
			uni.showActionSheet({
				itemList: this.cityOptions,
				success: res => {
					this.selectedCity = this.cityOptions[res.tapIndex];
				}
			});
		},
		openAuthDialog() {
			this.showAuthDialog = true;
		},
		closeAuthDialog() {
			this.showAuthDialog = false;
		},
		confirmAuth() {
			if (this.realName && this.idNumber.length >= 6) {
				this.realNameCertified = true;
				this.showAuthDialog = false;
			} else {
				uni.showToast({
					title: '请输入有效信息',
					icon: 'none'
				});
			}
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

.city-selector {
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
	margin-right: 10rpx;
}

.arrow {
	font-size: 36rpx;
	color: #999;
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

/* 弹窗 */
.popup-mask {
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

.popup-box {
	background: #fff;
	width: 600rpx;
	padding: 40rpx;
	border-radius: 20rpx;
	box-sizing: border-box;
}

.popup-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
	text-align: center;
}

.input {
	border: 1rpx solid #ddd;
	padding: 20rpx;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
	font-size: 28rpx;
	width: 100%;
	box-sizing: border-box;
}

.popup-btns {
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
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
