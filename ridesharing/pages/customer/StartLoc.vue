<template>
	<div class="container">
		<header>
			<uni-icons type="back" size="24" class="back-icon" @click="goBack"></uni-icons>
			<span class="status-dot"></span>
			<input 
				v-model="start_loc" 
				placeholder="您从哪上车" 
				class="start-loc-input"
				confirm-type="done" 
				@confirm="sendStartLoc" 
			/>
		</header>

		<div class="address-settings">
			<div class="address-option">
				<i class="el-icon-house"></i> 家
				<span class="desc">设置家的地址</span>
			</div>
			<div class="address-option">
				<i class="el-icon-office-building"></i> 公司
				<span class="desc">设置公司地址</span>
			</div>
		</div>

		<!-- 复用 LocationList 组件 -->
		<LocationList title="历史记录" :locations="history" @location-selected="handleLocationSelect" />
		<LocationList v-for="(city, index) in cities" :key="index" :title="city.name" :locations="city.stations" @location-selected="handleLocationSelect" />
	</div>
</template>

<script>
import LocationList from "../../components/LocationList.vue";
import { mapState, mapActions } from 'vuex'
export default {
	components: { LocationList },
	data() {
		return {
			start_loc: "",
			history: [
				{ name: "北京南站", address: "北京南站的详细地址", distance: 10 },
			],
			cities: [
				{
					name: "辽阳市",
					stations: [
						{ name: "辽阳站", address: "辽阳站的地址", distance: 12 },
						{ name: "灯塔站", address: "灯塔站的地址", distance: 18 },
					],
				},
				{
					name: "沈阳市",
					stations: [
						{ name: "沈阳站", address: "沈阳站的地址", distance: 10 },
						{ name: "沈阳北站", address: "沈阳北站的地址", distance: 13 },
						{ name: "沈阳南站", address: "沈阳南站的地址", distance: 20 },
					],
				},
		  ],
        };
    },
	methods: {
		...mapActions(['setStartLoc']),
		sendStartLoc(location) {
			const loc = location ||  this.start_loc; // 传入地址优先，否则用输入框内容
			this.setStartLoc(loc);
		},
		handleLocationSelect(location) {
			this.start_loc = location; // 更新输入框内容
			this.sendStartLoc(location); // 自动提交
		},
		goBack() {
			uni.navigateBack(); // 返回上一页
		},
	},
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: green;
  border-radius: 50%;
  margin-right: 5px;
}
.start-loc-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.address-settings {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.address-option {
  flex: 1;
  padding: 5px;
  background: #f5f5f5;
  border-radius: 5px;
  text-align: center;
  margin: 0px;
  cursor: pointer;
}
.address-option:hover {
  background: #e0e0e0;
}
.back-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
}
header {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 控制间距 */
}
</style>
