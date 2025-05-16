<template>
	<view>
		<view class="block">
			<view class="left">
				<text style="font-size: 16px; font-weight: bold;">
				  <text>出发时间</text>
				  <text style="margin-left: 10px;">{{ formatDateTime(item.startAt) }}</text>
				</text>
				 
				<view class="location-section">
				    <view class="location-item">
						<uni-icons type="circle-filled" size="16" color="var(--color-green)"></uni-icons>
				        <text class="location-text">{{ item.startLoc }}</text>
				    </view>
				    <view class="location-item">
				        <uni-icons type="circle-filled" size="16" color="var(--color-orange)"></uni-icons>
				        <text class="location-text">{{ item.endLoc }}</text>
				    </view>
				</view>
			</view>
			
			<view class="right">
				<view class="edit-btn" v-if="item.status === 'PENDING' || item.status === 'MATCHED'">
					<text class="delete-text" @click="deleteRequest">删除</text>
					<text class="edit-text">修改</text>
				    <image src="/static/right-arrow-blue.png" class="right-arrow" @click="editRequest"></image>
				</view>
				<view class="edit-btn-placeholder" v-else></view>
				
				  <text class="status" :class="'status-' + item.status">
					{{ 
					  item.status === 'PENDING' ? '待接单' : 
					  item.status === 'ONGOING' ? '进行中' : 
					  item.status === 'COMPLETED' ? '已完成' : 
					  item.status === 'CANCELLED' ? '已取消' : ''
					}}
				  </text>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDateTime} from '@/utils/functions/formatDateTime';
	import { mapState, mapActions } from 'vuex';
	export default {
		props: {
		  item: {
		    type: Object,
		    required: true
		  }
		},
		name: "RequestBlock",
		data() {
			return {
				isLoading: false,
				error: null
			}
		},
		methods: {
			...mapActions([
			  'setCurrentChangeRequestId',
			]),
			formatDateTime,
			async deleteRequest() {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除此拼车需求吗？',
					confirmText: '确定',
					cancelText: '取消',
					success: async (res) => {
						if (res.confirm) {
							this.isLoading = true;
							this.error = null;
							try {
								const response = await uni.request({
									url: `http://10.0.2.2:8083/carsharing/delete-request?id=${this.item.id}`,
									method: 'DELETE',
									header: {
										'Content-Type': 'application/json'
									}
								});
								if (response.data.status === 'success') {
									uni.showToast({
										title: '删除成功',
										icon: 'success',
										duration: 2000
									});
									// 通知父组件刷新列表
									this.$emit('request-deleted', this.item.id);
								} else {
									throw new Error(response.data.message || '删除请求失败');
								}
							} catch (error) {
								console.error('删除请求失败:', error);
								this.error = error.message || '删除请求失败';
								uni.showToast({
									title: this.error,
									icon: 'none',
									duration: 2000
								});
							} finally {
								this.isLoading = false;
							}
						}
					}
				});
			},
			goToEdit(id) {
			    uni.navigateTo({
					url: '/pages/customer/OrderModify',
					animationType: 'slide-in-right',
					huntingDuration: 300,
			    });
			},
			editRequest() {
				this.setCurrentChangeRequestId(this.item.id);
				this.goToEdit(this.item.id);
			}
		}
	}
</script>

<style>
.block{
	background-color: #ffffff;
	padding:15px 20px 15px 20px;
	margin: 10px 15px 10px 15px;
	border-radius: 10px;
	font-family: "Microsoft YaHei";
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	height: 81px;
}
.left{
	height: 100%;
}
.right{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	height: 100%;
	justify-content: space-between;
}
.location-text{
	padding-left: 10px;
	font-size: 14px;
}
.location-item{
	display: flex;
	align-items: center;
	flex-direction: row;
}
.location-section{
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 12px;
}
.edit-btn{
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: 5px;
	padding:4px 0 0 0;
}
.right-arrow{
	height: 14px;
	width: 14px;
}
.edit-text{
	font-family: "Microsoft YaHei";
	font-size: 14px;
	color:var(--color-blue);
}
.delete-text{
	font-size: 14px;
	color:var(--color-red);
	margin-right: 5px;
}
.status {
	padding: 8rpx 16rpx;
	border-radius: 10rpx;
	font-size: 24rpx;
	color: white;
}
.status-PENDING {
	background-color: var(--color-orange);
}
.status-ONGOING {
	background-color: var(--color-green);
}
.status-COMPLETED {
	background-color: var(--color-blue);
}
.status-CANCELLED {
	background-color: var(--color-grey);
}
</style>