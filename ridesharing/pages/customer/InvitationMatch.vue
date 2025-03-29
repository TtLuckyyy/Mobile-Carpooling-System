<template>
	<view>
		<PageHeader backText="行程匹配的私家车邀请" backUrl="/pages/customer/customer" />
		
		<view v-if="listBlockItems.length > 0">
			<ListBlock v-for="(item, index) in listBlockItems" :key="index" :item="item" />
		</view>
		  
		<view v-else class="empty-tips">
			<text>暂时没有与您行程匹配的车主</text>
			<text>已将您的需求发布</text>
			<text>请耐心等待~</text>
		</view>
	</view>
</template>

<script>
	import PageHeader from "@/components/PageHeader.vue";
	import ListBlock from "@/components/ListBlock.vue";
	export default {
		mounted() {
		    this.publishDemand();
		},
		components: {
			PageHeader,
			ListBlock
		},
		data() {
			return {
				listBlockItems: [
					{
						startAt: '2023-05-15 08:30',
						startLoc: '北京市海淀区中关村',
						endLoc: '北京市朝阳区国贸',
						seats: 3,
						username: '张师傅',
						carPlate: '京A12345',
						price: 45.00,
						offset:1.2,
						avatar: '/static/logo.png',
						car_color:'黑色',
						car_model:'奥迪A6',
						rating:4.3,
					},
					{
						startAt: '2023-05-15 09:15',
						startLoc: '北京市海淀区五道口',
						endLoc: '北京市西城区金融街',
						seats: 2,
						username: '李师傅',
						carPlate: '京B67890',
						price: 35.50,
						offset:3.2,
						avatar: '/static/logo.png',
						car_color:'白色',
						car_model:'本田雅阁',
						rating:5.0,
					},
					],
			}
		},
		onLoad() {
			// this.getMatchedOrders();
		},
		methods: {
			// 获取匹配订单
			getMatchedOrders() {
				uni.request({
					url: 'https://example.com/api/matched-orders', // 需替换为实际API地址
					method: 'GET',
					success: (res) => {
						if (res.statusCode === 200) {
							this.listBlockItems = res.data.list_matched.map(item => ({
								startAt: item.start_at,
								startLoc: item.start_loc,
								endLoc: item.end_loc,
								seats: item.seats,
								username: item.username,
								carPlate: item.verification_car_plate,
								price: item.price,
								offset:item.offset,
								avatar: item.avatar || '/static/logo.png' ,// 后端返回的头像路径
								car_color:item.verification_color,
								car_model:item.verification_ar_model,
								rating:item.rating,
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
			publishDemand() {
			    //执行发布需求逻辑;
			},
		}
	}
</script>

<style>
.empty-tips {
  display: flex;
  flex-direction: column; /* 元素垂直排列 */
  align-items: center;    /* 水平居中 */
  justify-content: center; /* 垂直居中（如果需要） */
  padding: 30px;
  text-align: center;     /* 文字内容居中 */
  color:#bbbbbb;
  font-size: 18px;
  line-height: 2; /* 相对值，根据字体大小自动计算 */
  font-family: "Microsoft YaHei";
}
</style>