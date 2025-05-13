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
				requestnumber:0,
				RequestBlockItems: [
					// {
					// 	startAt: '2023-05-15 08:30',
					// 	startLoc: '北京市海淀区中关村',
					// 	endLoc: '北京市朝阳区国贸',
					// 	status:'pending',
					// },
					// {
					// 	startAt: '2023-05-15 09:15',
					// 	startLoc: '北京市海淀区五道口',
					// 	endLoc: '北京市西城区金融街',
					// 	status:'completed',
					// },
					],
			}
		},
		onLoad() {
			this.getRequests();
		},
		methods: {
			async getRequests() {
			  this.isLoading = true;
			  this.error = null;
			  
			  try {
			    // 检查是否有用户ID
			    // if (!this.userID) {
			    //   throw new Error('用户未登录');
			    // }
			    
			    const response = await uni.request({
			      url: 'http://localhost:8083/carsharing/get-requests?userId=1',
			      method: 'GET',
			      header: {
			        'Content-Type': 'application/json'
			      }
			    });
				
			    // 处理响应数据
			    if (response.data.status === 'success') {
			      const res = response.data.history;
			      
			      if (res && res.length > 0) {
			        this.RequestBlockItems = res.map(item => ({
			          startAt: item.startAt || '未知时间',
			          startLoc: item.startLoc || ['未知位置'],
			          endLoc: item.endLoc || ['未知位置'],
			          status: item.status || '未知状态',
					  id: item.id
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
		}
	}
</script>

<style>

</style>
