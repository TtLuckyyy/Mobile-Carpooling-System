<template>
	<view>
		<PageHeader backText="我的拼车需求" backUrl="/pages/customer/customer" />
		
		<view v-if="RequestBlockItems.length > 0">
			<RequestBlock v-for="(item, index) in RequestBlockItems" :key="index" :item="item" />
		</view>
		  
		<view v-else class="empty-tips">
			<text>您暂时还未发布过拼车需求哦</text>
		</view>
		
	</view>
</template>

<script>
	import PageHeader from "@/components/PageHeader.vue";
	import RequestBlock from "@/components/RequestBlock.vue";
	export default {
		components: {
			PageHeader,
			RequestBlock
		},
data() {
			return {
				RequestBlockItems: [
					{
						startAt: '2023-05-15 08:30',
						startLoc: '北京市海淀区中关村',
						endLoc: '北京市朝阳区国贸',
						status:'pending',
					},
					{
						startAt: '2023-05-15 09:15',
						startLoc: '北京市海淀区五道口',
						endLoc: '北京市西城区金融街',
						status:'completed',
					},
					],
			}
		},
		onLoad() {
			// this.getRequests();
		},
		methods: {
			// 获取匹配订单
			getRequests() {
				uni.request({
					url: 'https://example.com/api/get-requests', // 需替换为实际API地址
					method: 'GET',
					success: (res) => {
						if (res.statusCode === 200) {
							this.RequestBlockItems = res.data.requests.map(item => ({
								startAt: item.start_at,
								startLoc: item.start_loc,
								endLoc: item.end_loc,
								status:item.status,
							}));
						} else {
							console.error('请求失败:', res);
						}
					},
					fail: (err) => {
						console.error('网络请求失败:', err);		
					}
				});
			},
		}
	}
</script>

<style>

</style>
