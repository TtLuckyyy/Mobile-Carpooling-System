<template>
	<view class="search-container">
		<!-- 顶部筛选栏 -->
		<view class="filter-bar">
			<view class="city-picker">
				<text class="city-label">上海市</text>
				<text class="arrow">▼</text>
			</view>
			<view class="date-picker">
				<text class="date-label">今日16:50</text>
				<text class="arrow">▼</text>
			</view>
			<view class="action-btn">发布拼车需求</view>
		</view>

		<!-- 订单列表 -->
		<view class="order-list">
			<view class="order-header">
				<text class="header-text">市内接送</text>
				<text class="header-subtext">城际路线</text>
			</view>

			<view class="order-item" v-for="(order, index) in orders" :key="index">
				<view class="order-time">
					<text class="time-text">{{ order.date }} {{ order.timeRange }}</text>
				</view>
				<view class="order-details">
					<view class="distance">
						<text class="distance-text">约{{ order.distance }}km</text>
						<text class="distance-subtext">预计准点</text>
					</view>
					<view class="route">
						<view class="route-point">
							<view class="dot green"></view>
							<text class="point-text">{{ order.start }}</text>
						</view>
						<view class="route-point">
							<view class="dot orange"></view>
							<text class="point-text">{{ order.end }}</text>
						</view>
					</view>
					<view class="price">
						<text class="price-text">{{ order.price }}元</text>
					</view>
				</view>
				<view class="order-actions">
					<view class="action-btn">1人</view>
					<view class="action-btn">拼单</view>
					<view class="action-btn">已拍</view>
					<view class="action-btn primary">接受拼单请求</view>
				</view>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<view class="tab-bar">
			<view class="tab-item">
				<text class="tab-text">车辆</text>
			</view>
			<view class="tab-item active">
				<text class="tab-text">拼单</text>
			</view>
			<view class="tab-item">
				<text class="tab-text">消息</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orders: [
				{
					date: '3月17日',
					timeRange: '10:55-11:00',
					distance: '9.2km',
					start: '洋泾港',
					end: '上海市交通大学...',
					price: '45.8'
				},
				{
					date: '3月17日',
					timeRange: '10:55-11:00',
					distance: '9.2km',
					start: '洋泾港',
					end: '上海市交通大学...',
					price: '45.8'
				},
				{
					date: '3月17日',
					timeRange: '10:55-11:00',
					distance: '9.2km',
					start: '洋泾港',
					end: '车程',
					price: '45.8'
				}
			]
		};
	}
};
</script>

<style scoped>
.search-container {
	background-color: #f5f5f5;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.filter-bar {
	background-color: #fff;
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.city-picker, .date-picker {
	background-color: #f8f8f8;
	border-radius: 12rpx;
	padding: 10rpx 20rpx;
	display: flex;
	align-items: center;
}

.city-label, .date-label {
	font-size: 28rpx;
	color: #333;
}

.arrow {
	font-size: 28rpx;
	color: #999;
	margin-left: 10rpx;
}

.action-btn {
	background-color: #3ea87a;
	color: #fff;
	font-size: 28rpx;
	padding: 10rpx 20rpx;
	border-radius: 12rpx;
}

.order-list {
	flex: 1;
	padding: 20rpx 30rpx;
}

.order-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20rpx;
}

.header-text, .header-subtext {
	font-size: 32rpx;
	color: #333;
}

.order-item {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
}

.order-time {
	margin-bottom: 10rpx;
}

.time-text {
	font-size: 28rpx;
	color: #333;
}

.order-details {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.distance {
	display: flex;
	flex-direction: column;
}

.distance-text {
	font-size: 28rpx;
	color: #333;
}

.distance-subtext {
	font-size: 24rpx;
	color: #999;
}

.route {
	flex: 1;
	margin: 0 20rpx;
}

.route-point {
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
}

.dot {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	margin-right: 10rpx;
}

.dot.green {
	background-color: #16c26b;
}

.dot.orange {
	background-color: #f17a3d;
}

.point-text {
	font-size: 28rpx;
	color: #333;
}

.price {
	font-size: 36rpx;
	color: #ff4d4f;
	font-weight: bold;
}

.order-actions {
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
}

.action-btn {
	background-color: #f8f8f8;
	color: #333;
	font-size: 24rpx;
	padding: 10rpx 20rpx;
	border-radius: 12rpx;
}

.action-btn.primary {
	background-color: #3ea87a;
	color: #fff;
}

.tab-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	padding: 20rpx 0;
	border-top: 1rpx solid #eee;
}

.tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tab-text {
	font-size: 28rpx;
	color: #333;
}

.tab-item.active .tab-text {
	color: #ff4d4f;
}
</style>