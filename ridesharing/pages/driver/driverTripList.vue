<template>
	<view>
		<PageHeader backText="我的行程" backUrl="/pages/driver/driver_search" />
		
		<view v-if="tripListItems.length > 0">
			<TripList v-for="(item, index) in tripListItems" :key="index" :item="item" />
		</view>

		<view v-else class="empty-tips">
			<text>您暂时还没有过行程哦</text>
		</view>
		
	</view>
</template>

<script>
	import PageHeader from "@/components/PageHeader.vue";
	import TripList from "@/components/TripList.vue";
	export default {
		components: {
			PageHeader,
			TripList
		},
		data() {
			return {
				requestnumber:0,
				tripListItems: [
					{
					  startAt: "2024-04-22 14:30",
					  startLoc: "北京市海淀区",
					  endLoc: "北京市朝阳区",
					  status: 'ONGOING', 
					  phone: "13812345678",
					  price: 20.00
					},
					{
					  startAt: "2024-04-22 14:30",
					  startLoc: "北京市海淀区",
					  endLoc: "北京市朝阳区",
					  status: "CANCELLED", 
					  phone: "13812345678",
					  price: 20.79
					},
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
				console.log(2);


			    //if (!this.userID) {
			    //  throw new Error('用户未登录');
			    //}
			    
			    const response = await uni.request({
			      //url: `http://10.0.2.2:8083/carsharing/get-driver-trip-list?userId=${this.userID}`,
			      url: `http://10.0.2.2:8083/carsharing/get-driver-trip-list?userId=2`, // 直接拼接参数
			      method: 'GET',
			      header: {
			        'Content-Type': 'application/json'
			      }
			    });
			    console.log(response);
			    // 处理响应数据
			    if (response.data.status === 'success') {
			      const res = response.data.history;
			      console.log(res);
			      if (res && res.length > 0) {
			        this.tripListItems = res.map(item => ({
			          startAt: item.startAt || '未知时间',
			          startLoc: item.startLoc || ['未知位置'],
			          endLoc: item.endLoc || ['未知位置'],
			          status: item.status || '未知状态',
					  phone:item.phone||'xxxx',
					  price:item.price||0.00,
			        }));
			        this.requestnumber = res.length;
			      } else {
			        this.tripListItems = [];
			        this.requestnumber = 0;
			      }
			    } else {
			      throw new Error(response.data.message || '获取请求列表失败');
			    }
			  } catch (error) {
			    console.error('获取请求列表失败:', error);
			    this.error = error.message || '获取请求列表失败';
			    this.tripListItems = [];
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
