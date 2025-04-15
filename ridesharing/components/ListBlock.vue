<template>
	<view class="block">
		<view class="up">
			<view class="up-left">
				<text style="font-size: 16px; font-weight: bold;">
				  <text>出发时间</text>
				  <text style="margin-left: 10px;">{{ formatDateTime(item.startAt) }}</text>
				</text>
				 
				<view class="location-section">
				    <view class="location-item">
						<uni-icons type="circle-filled" size="16" color="var(--color-green)"></uni-icons>
				        <text class="location-text">{{ item.startLoc }}</text>
				    </view>
				    <view class="location-item">
				        <uni-icons type="circle-filled" size="16" color="var(--color-orange)"></uni-icons>
				        <text class="location-text">{{ item.endLoc }}</text>
				    </view>
				</view>
				
				<text style="font-size: 14px; font-weight: bold;color: #878887;">
					起终点与您位置偏差{{item.offset}}km
				</text>
			</view>
			
			<view class="up-right">
				<view style="	display: flex; align-items: center; ">
					<image :src="item.avatar"  class="driver-avatar" mode="aspectFill"></image>
					<text class="car-plate">{{ formatCarPlate(item.verificationCarPlate) }}</text>
				</view>
				
				<view class="car_info">
					<text style="margin-right:5px ;">{{item.verificationColor}}</text>
					<text>|</text>
					<text style="margin-left:5px ;">{{item.verificationCarModel}}</text>
				</view>
				
				<view class="driver_info">
					<text style="margin-right:8px ; color: black;">{{item.realName}}</text>
					  <uni-rate  :value="item.rating"  size="14"  color="#bbb"  active-color="var(--color-yellow)" readonly ></uni-rate>
					<text style="margin-left:8px ;color: var(--color-yellow);">{{item.rating}}分</text>
				</view>
				
				<view class="price">
					<text style="font-size: 20px;color: var(--color-blue);font-weight:bold;">预估</text>
					<text style="font-size: 32px;color: var(--color-red);font-weight:bold;margin-left: 3px;margin-right: 3px;">{{item.price}}</text>
					<text style="font-size: 20px;color: var(--color-blue);font-weight:bold;">元</text>
				</view>
			</view>
		</view>
		
		<view class="line"></view>
		
		<view class="down">
			  <text 
			    class="seats"
			    :class="{
			      'seats-green': item.seats >= 3,
			      'seats-yellow': item.seats === 2,
			      'seats-red': item.seats === 1
			    }"
			  >
			    还可搭载{{item.seats}}人
			  </text>
			  
			  <text 
			      class="abutton"
			      :class="{ 'active': isPressed }"
			      @click="createOrder" :disabled="isPressed"
			      @touchstart="isPressed = true"
			      @touchend="isPressed = false"
			    >
			      选择
			    </text>
		</view>
	</view>
</template>

<script>
	import {formatDateTime} from '@/utils/functions/formatDateTime';
	import { mapState, mapActions } from 'vuex'
	export default {
		props: {
		  item: {
		    type: Object,
		    required: true
		  }
		},
		name: "ListBlock", // 给组件命名
		data() {
			return {
				isPressed: false
			}
		},
	    computed: {
		    ...mapState(['rideRequest']) // 获取Vuex中的rideRequest
	    },
		methods: {
			...mapActions(['setOrderId']),
			formatDateTime,
			formatCarPlate(plate) {
			    if (!plate) return '';
				
			    if (plate.length > 3) {
			        return `${plate.substring(0, 2)}·${plate.substring(2, 3)}****`;
			    }
			    return plate;
			},
			
			async createOrder() {
			  try {
				this.isPressed = true; // 防止重复点击
				
				// 构建请求数据
				const orderData = {
				  offer_id: this.item.id, // 拼车邀请的id
				  request_id: this.$store.state.rideRequest.requestID, // 拼车需求的id
				  price: this.item.price // 订单费用
				};
				
				// 发送创建订单请求
				const response = await uni.request({
				  url: `/create-order`, 
				  method: 'POST',
				  data: orderData,
				  header: {
					'Content-Type': 'application/json'
				  }
				});
				
				// 处理响应
				if (response[0] && response[0].statusCode === 200) {
				  const orderId = response[0].data.order_id;
				  
				  // 保存订单ID到Vuex
				  this.setOrderId(orderId);
				  
				  uni.showToast({
					title: '订单创建成功',
					icon: 'success'
				  });
				  
				  // 添加跳转到订单详情页的逻辑
				  // uni.navigateTo({ url: '/pages/order/detail' });
				} else {
				  throw new Error(response[0].data.message || '订单创建失败');
				}
			  } catch (error) {
				console.error('创建订单失败:', error);
				uni.showToast({
				  title: error.message || '创建订单失败',
				  icon: 'none'
				});
			  } finally {
				this.isPressed = false;
			  }
			}
		}
	}
</script>

<style>
.up{
	display: flex;
	flex-direction: row; /* 横向排列 */
	justify-content: space-between;
}
.block{
	background-color: #ffffff;
	padding:15px 20px 15px 20px;
	margin: 10px 15px 10px 15px;
	border-radius: 10px;
	font-family: "Microsoft YaHei";
}
.location-text{
	padding-left: 10px;
	font-size: 14px;
}
.location-item{
	display: flex;
	align-items: center; /* 垂直居中 */
	flex-direction: row; /* 横向排列 */
}

.location-section{
	display: flex;
	flex-direction: column;
	gap: 12px; /* 设置元素之间的间隔 */
	margin-top: 12px;
	margin-bottom: 12px;
}
.up-left{
	height: 100%;
}
.driver-avatar {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 6px;
}

.car-plate {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 2px; /* 增加字间距 */
}
.car_info{
	color: #989898;
	font-size: 11px;
	margin: 5px;
}
.up-right{
	display: flex;
	flex-direction: column;
	align-items: flex-end; /* 使内部元素右对齐 */
	height: 100%;
}
.driver_info{
	font-size: 12px;
	display: flex;
	flex-direction: row;
}
.price{
	padding-top: 18px;
}
.line {
	margin-top: 1px;
	margin-bottom: 8px;
	flex: 1;
	height: 1px;
	background-color: #ebedf0; /* 更浅的灰色 */
}
.seats{
	font-size: 14px;
	font-weight: bold;
	padding: 5px 10px 5px 10px;
	color: white;
	border-radius: 4px;
}
.seats-green {
  background-color: var(--color-green); /* 绿色 */
}

.seats-yellow {
  background-color: var(--color-yellow); /* 黄色 */
}

.seats-red {
  background-color: var(--color-red); /* 红色 */
}
.down{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.abutton {
  font-size: 14px;
  font-weight: bold;
  padding: 3px 25px;
  letter-spacing: 5px;
  border-radius: 4px;
  color: var(--color-green);
  border: 2px solid var(--color-green); /* 合并边框设置 */
  background-color: transparent; /* 可选：确保背景透明 */
  border-radius: 8px;
}

.abutton.active {
  background-color: var(--color-green);
  color: white;
}

</style>
