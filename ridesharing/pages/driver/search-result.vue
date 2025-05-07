<template>
	<PageHeader backText="顺路订单" backUrl="/pages/driver/driver_search" />
	<view class="page-container">
		<view class="trip-info">
			<view class="route">
				<text>同济大学嘉定校区图书馆 → 静安嘉里中心</text>
			</view>
			<view class="trip-details">
				<text>今天17:10 | 可载3人</text>
			</view>
		</view>
		
		<view class="action-buttons">
			<button class="btn primary">自动抢单</button>
			<button class="btn">修改行程</button>
			<button class="btn">取消行程</button>
		</view>
		
		<view class="filter-options">
			<view class="filter-row">
				<text>智能排序</text>
				<text class="active">时间</text>
			</view>
			<view class="filter-row">
				<text>愿摊高速费</text>
				<text>独享</text>
				<text>前后一小时内</text>
				<text>起点5公里内</text>
			</view>
		</view>
		
		<view class="order-list">
			<view class="order-card" v-for="(order, index) in orders" :key="index">
				<view class="order-header">
					<text class="match-rate">85%顺路</text>
					<text class="time-range">今天 10:55~11:00</text>
				</view>
				<view class="location-info">
					<text>距你2.9km</text>
					<text>汽车港</text>
					<text>黄浦区 上海市交通大学...</text>
				</view>
				<view class="passenger-info">
					<text>1人</text>
					<text>拼座</text>
					<text>已预付</text>
					<text>愿意协商高速费</text>
				</view>
				<view class="price">45.8元</view>
			</view>
		</view>
		
		<view class="tab-bar">
			<text>车主</text>
			<text class="active">拼车广场</text>
			<text>我的</text>
		</view>
	</view>
</template>

<script>
	import PageHeader from "@/components/PageHeader.vue";
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {
			PageHeader
		},
		data() {
			return {
				orders: [
					{},
					{},
					{} // Three identical orders as shown in the prototype
				]
			}
		}
	}
</script>

<style>
	.page-container {
		padding: 20rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	.time-display {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin: 20rpx 0;
	}
	
	.trip-info {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.route {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	
	.trip-details {
		font-size: 28rpx;
		color: #666;
	}
	
	.action-buttons {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0;
	}
	
	.btn {
		flex: 1;
		margin: 0 10rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
	}
	
	.btn.primary {
		background-color: #1aad19;
		color: white;
	}
	
	.filter-options {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 15rpx;
	}
	
	.filter-row text {
		margin-right: 20rpx;
		font-size: 26rpx;
		color: #666;
		padding: 5rpx 10rpx;
	}
	
	.filter-row .active {
		color: #1aad19;
		font-weight: bold;
	}
	
	.order-list {
		margin-bottom: 80rpx;
	}
	
	.order-card {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.order-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15rpx;
	}
	
	.match-rate {
		color: #1aad19;
		font-weight: bold;
	}
	
	.time-range {
		color: #666;
	}
	
	.location-info {
		margin-bottom: 15rpx;
	}
	
	.location-info text {
		display: block;
		font-size: 28rpx;
		color: #333;
		margin-bottom: 5rpx;
	}
	
	.passenger-info {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 15rpx;
	}
	
	.passenger-info text {
		margin-right: 15rpx;
		font-size: 26rpx;
		color: #666;
	}
	
	.price {
		font-size: 32rpx;
		font-weight: bold;
		text-align: right;
		color: #ff5a5f;
	}
	
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		padding: 20rpx 0;
		border-top: 1rpx solid #eee;
	}
	
	.tab-bar text {
		font-size: 28rpx;
		color: #666;
	}
	
	.tab-bar .active {
		color: #1aad19;
		font-weight: bold;
	}
</style>