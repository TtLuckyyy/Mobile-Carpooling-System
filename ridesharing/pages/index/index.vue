<template>
	<view :style="{ paddingTop: statusBarHeight + 'px' }">
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
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
