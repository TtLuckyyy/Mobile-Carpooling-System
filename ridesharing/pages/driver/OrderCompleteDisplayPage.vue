<template>
  <cover-view>
    <!-- 悬浮头部 -->
    <PageHeader_cover backText="订单详情" backUrl="/pages/customer/customer" /> 
    
    <!-- 地图容器 -->
    <cover-view class="map-container">
      <web-view src="/static/map.html" @message="handleMapMessage"></web-view>
      <cover-view class="floating-details">
        <OrderCompleteCard
          :income="orderInfo.income"
          :avatarUrl="orderInfo.avatarUrl"
          :phoneTail="orderInfo.phoneTail"
          :rating="orderInfo.rating"
          :orderTime="orderInfo.orderTime"
          :startLocation="orderInfo.startLocation"
          :startDistance="orderInfo.startDistance"
          :endLocation="orderInfo.endLocation"
          :endDistance="orderInfo.endDistance"
        />
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
import OrderCompleteCard from '@/components/OrderCompleteCard.vue';
import PageHeader_cover from "@/components/PageHeader_cover.vue"; // 新增导入

export default {
  components: {
    OrderCompleteCard,
    PageHeader_cover // 注册组件
  },
  data() {
    return {
      orderInfo: {
        income: "54.4",
        avatarUrl: '/static/default-avatar.png', // Replace with your actual avatar path
        phoneTail: "6789",
        rating: "5.0",
        orderTime: "今天 16:00 - 17:00",
        startLocation: "同济大学 (嘉定校区)",
        startDistance: "20.3",
        endLocation: "静安嘉里中心",
        endDistance: "10.5"
      }
    };
  },
  methods: {
    handleMapMessage(e) {
      // 处理地图消息，可以根据需要实现
      console.log("Map message from 1.vue:", e);
    }
  }
}
</script>

<style>
/* 从 OrderDetail.vue 复制的样式，用于布局地图和悬浮卡片 */
.map-container {
  width: 100%;
  /* 假设 PageHeader_cover 高度为 60px */
  height: calc(100vh - 60px); 
  margin-top: 60px; 
  position: relative;
}

.floating-details {
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

web-view {
  width: 100%;
  height: 100%;
  display: block;
}

/* 如果需要页面占满 */
/*
page, cover-view {
  height: 100%;
  overflow: hidden; 
}
*/
</style>