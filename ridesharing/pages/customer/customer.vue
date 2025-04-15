<template>
	<view :style="{ paddingTop: statusBarHeight + 'px' }">
		<button @click="ToInvitationMatch">发布</button>
		<button @click="publishDemand">这个按钮用于后端测试发布需求和跳转</button>
		<button @click="ToDetailRequest">拼车需求</button>
		<button @click="ToStartLoc">你从哪上车</button>
		<button @click="ToEndLoc">你要到哪去</button>
		<view>{{ userID }}</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight
			}
		},
		computed: {
		    // 映射 Vuex state
		    ...mapState(['userID','rideRequest'])
		  },
		methods: {
			// 映射 Vuex actions
			...mapActions([
			  'login', 
			  'logout',
			  'setRequestId',
			  'setStartLoc',
			  'setEndLoc',
			  'setStartAt',
			  'toggleExclusive',
			  'toggleHighway',
			  'resetRideRequest'
			]),
			async publishDemand() {
			  try {
				// 获取当前 rideRequest 数据
				const requestData = {
				  passenger_id: this.userID,
				  start_loc: this.rideRequest.startLoc,
				  end_loc: this.rideRequest.endLoc,
				  status: 'pending',
				  start_at: this.rideRequest.startAt,
				  exclusive: this.rideRequest.exclusive,
				  highway: this.rideRequest.highway
				}
				
				// 发送请求到后端
				const response = await uni.request({
				  url: '/post-request', 
				  method: 'POST',
				  data: requestData,
				  header: {
					'Content-Type': 'application/json'
				  }
				})
				
				// 检查响应状态
				if (response.statusCode === 200 || response.statusCode === 201) {
				  const responseData = response.data
				  
				  // 将返回的 requestID 存储到 Vuex
				  if (responseData.requestID) {
					this.setRequestId(responseData.requestID)
					uni.showToast({
					  title: '发布成功',
					  icon: 'success'
					})
					
					// 跳转到详情页或其他页面
					this.ToInvitationMatch()
				  } else {
					throw new Error('未收到 requestID')
				  }
				} else {
				  throw new Error('请求失败')
				}
			  } catch (error) {
				console.error('发布失败:', error)
				uni.showToast({
				  title: '发布失败',
				  icon: 'none'
				})
			  }
			},
			ToInvitationMatch(){
				uni.navigateTo({
					url: './InvitationMatch', 
					animationType: 'slide-in-right', 
					animationDuration: 300 
				});
			},
			ToDetailRequest(){
				uni.navigateTo({
					url: './RequestList', 
					animationType: 'slide-in-right', 
					animationDuration: 300 
				});
			},
			ToStartLoc(){
				uni.navigateTo({
					url: './StartLoc', 
					animationType: 'slide-in-right', 
					animationDuration: 300 
				});
			},
			ToEndLoc(){
				uni.navigateTo({
					url: './EndLoc', 
					animationType: 'slide-in-right', 
					animationDuration: 300 
				});
			}
		}
	}
</script>

<style>

</style>
