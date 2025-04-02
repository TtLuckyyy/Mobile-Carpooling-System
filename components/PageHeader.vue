<template>
	<view class="all">
		<view class="head-content">
			<view>
				<view class="back-btn" >
				    <image src="/static/left-arrow.png" class="left-arrow"@click="handleBack"></image>
				    <text class="back-text">{{ backText }}</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "PageHeader", // 给组件命名
		props: {
			backText: {
				type: String,
				default: "返回" // 默认值
			},
			backUrl: {
				type: String,
				default: "/pages/customer/customer" // 默认跳转到首页
			}
		},
		data() {
			return{}
		},
		methods: {
			handleBack() {
				// 使用父组件传递的 URL 进行跳转
				uni.switchTab({
					url: this.backUrl
				});
			}
		}
	}
</script>

<style>
.all{
  background-color: #f5f5f5;
}
.head-content {
  background-color: #ffffff;
}
.left-arrow{
	height: 18px;
	width: 18px;
}
.back-btn{
	display: flex;
	align-items: center; /* 垂直居中 */
	flex-direction: row; /* 横向排列 */
	gap: 20px;
	padding: 40px 10px 10px 10px;
}
.back-text{
	  font-family: "Microsoft YaHei";
	  font-weight: bold;
	  font-size: 18px; /* 字号 */
}
</style>
