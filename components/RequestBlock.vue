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
					<text class="edit-text" @click="goToEdit(item.id)">修改</text>
				    <image src="/static/right-arrow-blue.png" class="right-arrow"@click="editRequest"></image>
				</view>
				<view class="edit-btn-placeholder" v-else></view>
				
				  <text class="status" :class="'status-' + item.status">
					{{ 
					  item.status === 'PENDING' ? '待接单' : 
					  item.status === 'MATCHED' ? '进行中' : 
					  item.status === 'COMPLETED' ? '已完成' : 
					  item.status === 'CANCELED' ? '已取消' : ''
					}}
				  </text>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDateTime} from '@/utils/functions/formatDateTime';
	export default {
		props: {
		  item: {
		    type: Object,
		    required: true
		  }
		},
		name: "RequestBlock", // 给组件命名
		data() {
			return {
				
			}
		},
		methods: {
			formatDateTime,
			goToEdit(id) {
			    this.$router.push({ name: 'editPage', query: { id } });
			  },
			editRequest() {
			//     // 1. 构建安全数据对象
			//     const payload = {
			//       // 必选字段
			//       startLoc: this.item.startLoc || '',
			//       endLoc: this.item.endLoc || '',
			//       startAt: this.item.startAt || '',
			      
			//       // 可选字段（带默认值）
			//       ...(this.item.id && { id: this.item.id }), // 仅当id存在时包含
			//       isExclusive: this.item.isExclusive ?? false, // Nullish coalescing
			//       negotiateHighwayFee: this.item.negotiateHighwayFee ?? false
			//     };
			
			//     // 2. 使用Vuex或Pinia（状态管理方案）
			//     this.$store.dispatch('request/startEdit', payload);
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
	flex-direction: row; /* 横向排列 */
	justify-content: space-between;
	align-items: stretch;   /* 默认值，子元素高度拉伸至父容器高度 */
	height: 81px;         /* 必须设置固定高度（或 min-height） */
}
.left{
	height: 100%;
}
.right{
	display: flex;
	flex-direction: column;
	align-items: flex-end; /* 使内部元素右对齐 */
	height: 100%;
	justify-content: space-between; /* 使第一个元素靠上，最后一个元素靠下 */
}
.location-text{
	padding-left: 10px;
	font-size: 14px;
}
.location-item{
	display: flex;
	align-items: center; /* 垂直居中 */
	flex-direction: row; /* 横向排列 */
}

.location-section{
	display: flex;
	flex-direction: column;
	gap: 12px; /* 设置元素之间的间隔 */
	margin-top: 12px;
}
.edit-btn{
	display: flex;
	align-items: center; /* 垂直居中 */
	flex-direction: row; /* 横向排列 */
	gap: 5px;
	padding:4px 0 0 0;
}
.right-arrow{
	height: 14px;
	width: 14px;
}
.edit-text{
	font-family: "Microsoft YaHei";
	font-size: 14px; /* 字号 */
	color:var( --color-blue);
}


.status {
  padding: 8rpx 16rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
  color: white;
}

/* 不同状态的具体样式 */
.status-PENDING {
  background-color: var(--color-orange); /* 待接单 - 橙色 */
}

.status-MATCHED {
  background-color: var(--color-green); /* 进行中 - 绿色 */
}

.status-COMPLETED {
  background-color: var(--color-blue); /* 已完成 - 蓝色 */
}

.status-CANCELED {
  background-color: var(--color-grey); /* 已取消 - 灰色 */
}
</style>
