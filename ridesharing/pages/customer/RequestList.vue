<template>
	<view>
		<PageHeader backText="我的拼车需求" backUrl="/pages/customer/customer" />
		
		<view v-if="RequestBlockItems.length > 0">
			<RequestBlock 
				v-for="(item, index) in RequestBlockItems" 
				:key="index" 
				:item="item" 
				@request-deleted="handleRequestDeleted" 
			/>
		</view>
		  
		<view v-else class="empty-tips">
			<text>您暂时还未发布过拼车需求哦</text>
		</view>
	</view>
</template>

<script>
	import PageHeader from "@/components/PageHeader.vue";
	import RequestBlock from "@/components/RequestBlock.vue";
	import { mapState, mapActions } from 'vuex';
	export default {
		components: {
			PageHeader,
			RequestBlock
		},
		data() {
			return {
				requestnumber: 0,
				RequestBlockItems: [],
				isLoading: false,
				error: null
			}
		},
		onShow() {
			this.getRequests();
		},
		computed: {
			...mapState(['userID', 'rideRequest', 'current_change_request_id']) 
		},
		methods: {
			async getRequests() {
				this.isLoading = true;
				this.error = null;
				try {
					const response = await uni.request({
						url: `http://10.0.2.2:8083/carsharing/get-requests?userId=${this.userID}`,
						method: 'GET',
						header: {
							'Content-Type': 'application/json'
						}
					});
					if (response.data.status === 'success') {
						const res = response.data.history;
						if (res && res.length > 0) {
							this.RequestBlockItems = res.map(item => ({
								startAt: item.startAt || '未知时间',
								startLoc: item.startLoc || '未知位置',
								endLoc: item.endLoc || '未知位置',
								status: item.status || '未知状态',
								id: item.id,
							}));
							this.requestnumber = res.length;
						} else {
							this.RequestBlockItems = [];
							this.requestnumber = 0;
						}
					} else {
						throw new Error(response.data.message || '获取请求列表失败');
					}
				} catch (error) {
					console.error('获取请求列表失败:', error);
					this.error = error.message || '获取请求列表失败';
					this.RequestBlockItems = [];
					this.requestnumber = 0;
					uni.showToast({
						title: this.error,
						icon: 'none'
					});
				} finally {
					this.isLoading = false;
				}
			},
			handleRequestDeleted(id) {
				// 刷新列表
				this.getRequests();
			}
		}
	}
</script>

<style>
.empty-tips {
	text-align: center;
	padding: 20px;
	font-size: 16px;
	color: var(--color-darkgrey);
}
</style>