<template>
	<view :style="{ paddingTop: statusBarHeight + 'px' }">
		<button @click="ToInvitationMatch">发布</button>
		<button @click="ToDetailRequest">拼车需求</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight
			}
		},
		methods: {
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
			}
		}
	}
</script>

<style>

</style>
