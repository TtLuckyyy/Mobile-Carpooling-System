<template>
	<view :style="{ paddingTop: statusBarHeight + 'px' }">
		车主
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
			
		}
	}
</script>

<style>

</style>
