<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			api_key:"82cf2479ddcf7f456d7edf241abd5ab6",
			my_location_longitude : 121.215252, 
			my_location_latitude : 31.286054,
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	/* 全局颜色变量定义 */
	:root {
	  --color-green: #5c9267;      // 主绿色
	  --color-orange: #da713c;      // 主橙色
	  --color-blue: #517aff;      // 主蓝色
	  --color-red: #d44240;      // 主红色
	  --color-yellow: #F9CE45;
	  --color-grey:#d8d8d8;
	  --color-lightgrey:#f5f5f5;
	  --color-darkgrey:#989898;
	  --color-lightyellow: #f8f6e8;
	  --color-lightgreen:#bacb5b;
	}
	page {
	  background-color: #f4f4f4;
	}
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	
</style>
