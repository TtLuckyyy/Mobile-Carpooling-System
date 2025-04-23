<template>
  <view>
    <view class="block">
      <view class="left">
        <!-- 出发时间 -->
        <text style="font-size: 16px; font-weight: bold;">
          <text>出发时间</text>
          <text style="margin-left: 10px;">{{ formatDateTime(item.startAt) }}</text>
        </text>
        <view class="location-row">
          <!-- 起止地点和虚线 -->
          <view class="location-section">
            <view class="location-item">
              <uni-icons type="circle-filled" size="16" color="var(--color-green)"></uni-icons>
              <text class="location-text">{{ item.startLoc }}</text>
            </view>

            <view class="dashed-line"></view>

            <view class="location-item">
              <uni-icons type="circle-filled" size="16" color="var(--color-orange)"></uni-icons>
              <text class="location-text">{{ item.endLoc }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 状态标签 -->
      <view class="right">
        <text class="status-text" :class="'status-' + item.status">
          {{
            item.status === 'ONGOING' ? '进行中' :
            item.status === 'COMPLETED' ? '已完成' :
            item.status === 'CANCELLED' ? '已取消' : ''
          }}
        </text>
      </view>

      <!-- 金额显示在右边且垂直居中 -->
      <text class="amount-on-right">
        <text class="price-number">{{ item.price.toFixed(2) }}</text>
        <text class="price-unit">元</text>
      </text>

      <!-- 手机尾号独立一行，放置在block底部 -->
      <view class="phone-section">
        <text class="phone-text">尾号 {{ item.phone.slice(-4) }}</text>
        <uni-icons type="phone" size="18" color="var(--color-blue)" class="phone-icon" />
      </view>
    </view>
  </view>
</template>

<script>
import { formatDateTime } from '@/utils/functions/formatDateTime';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  name: "TripList",
  methods: {
    formatDateTime
  }
}
</script>

<style>
.block {
  background-color: #ffffff;
  padding: 15px 20px;
  margin: 10px 15px;
  border-radius: 10px;
  font-family: "Microsoft YaHei";
  display: flex;
  flex-direction: column; /* 修改为纵向布局 */
  justify-content: space-between;
  align-items: flex-start;
  height: auto;
  position: relative; /* 用于定位子元素 */
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1; /* 确保左侧内容占满空间 */
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute; /* 将右侧部分绝对定位 */
  top: 15px; /* 状态栏距离顶部的距离 */
  right: 20px; /* 状态栏距离右边的距离 */
}

.location-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.location-section {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  flex-grow: 1;
}

.location-item {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.location-text {
  padding-left: 10px;
  font-size: 14px;
}

.dashed-line {
  height: 18px;
  border-left: 1px dashed #ccc;
  margin-left: 7px;
  position: relative;
  z-index: 0;
}

.phone-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 0;
}

.phone-text {
  font-size: 14px;
  color: #666;
}

.phone-icon {
  margin-top: 2px;
}

/* 状态标签 */
.status-text {
  padding: 6px 12px;
  border-radius: 10rpx;
  font-size: 14px;
  color: white;
  margin-bottom: 6px;
}

/* 状态颜色样式 */
.status-ONGOING {
  background-color: var(--color-green);
}
.status-COMPLETED {
  background-color: var(--color-orange);
}
.status-CANCELLED {
  background-color: var(--color-grey);
}

.amount-on-right {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.price-number {
  color: var(--color-red);
  font-size: 30px;
}

.price-unit {
  color: var(--color-blue);
  font-size: 16px;
  margin-left: 2px;
}

</style>