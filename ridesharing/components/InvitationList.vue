<template>
  <view @click="handleItemClick">
    <view class="block">
      <view class="time-text">{{ formatDateTime(item.startAt) }}</view>

      <view class="location-row">
        <view class="location-section">
          <view class="location-item">
            <uni-icons type="circle-filled" size="14" color="var(--color-green)" />
            <text class="location-text">{{ item.startLoc }}</text>
          </view>

          <view class="dashed-line"></view>

          <view class="location-item">
            <uni-icons type="circle-filled" size="14" color="var(--color-orange)" />
            <text class="location-text">{{ item.endLoc }}</text>
          </view>
        </view>

        <text class="amount-on-right">
          <text class="price-number">{{ item.price.toFixed(2) }}</text>
          <text class="price-unit">元</text>
        </text>
      </view>

      <view class="tags-row">
        <view class="tag">1人</view>
        <view class="tag">{{ item.exclusive ? '独享' : '拼座' }}</view>
        <view class="tag">{{ paymentStatus }}</view>
        <view v-if="item.highway" class="tag tag-blue">愿意协商高速费</view>
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
  computed: {
    paymentStatus() {
      if (this.item.status === 'PENDING' || this.item.status === 'ONGOING') return '未支付';
      if (this.item.status === 'COMPLETED') return '已支付';
      if (this.item.status === 'CANCELLED') return '已取消';
      return '';
    }
  },
  methods: {
    formatDateTime,
    handleItemClick() {
      if (!this.item.id) {
        uni.showToast({
          title: '订单ID不存在',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: `/pages/driver/RideInfoDisplayPage?id=${this.item.id}`
      });
    }
  }
}
</script>

<style scoped>
/* 邻接样式：字体大小、加粗、颜色一一对应 */
.block {
  background: #fff;
  padding: 15px 20px;
  margin: 10px 15px;
  border-radius: 10px;
  font-family: "Microsoft YaHei";
  display: flex;
  flex-direction: column;
  position: relative;
}

.time-text {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.location-row {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}

.location-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.location-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.location-text {
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
}

.dashed-line {
  height: 18px;
  border-left: 1px dashed #ccc;
  margin: 4px 12px;
}

.amount-on-right {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  display: flex;
  align-items: center;
}

.price-number {
  color: var(--color-red);
  font-size: 30px;
  font-weight: bold;
}

.price-unit {
  color: var(--color-blue);
  font-size: 16px;
  font-weight: bold;
  margin-left: 2px;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  gap: 8px;
}

.tag {
  background: #f5f5f5;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 5px;
  color: #666;
}

.tag-blue {
  background-color: #e0f0ff;
  color: #007aff;
}
</style>