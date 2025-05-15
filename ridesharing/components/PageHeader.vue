<template>
  <view class="all">
    <view class="head-content">
      <view>
        <view class="back-btn">
          <image src="/static/left-arrow.png" class="left-arrow" @click="handleBack"></image>
          <text class="back-text">{{ backText }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    backText: {
      type: String,
      default: "返回"
    },
    backUrl: {
      type: String,
      default: "/pages/customer/customer_new"
    }
  },
  data() {
    return {
      // 定义 TabBar 页面路径列表
      tabBarPages: [
        '/pages/driver/driver',
        '/pages/customer/customer_new',
        '/pages/my/my'
      ]
    };
  },
  methods: {
    handleBack() {
      // 判断 backUrl 是否为 TabBar 页面
      if (this.tabBarPages.includes(this.backUrl)) {
        uni.switchTab({
          url: this.backUrl
        });
      } else {
        uni.navigateBack({
          delta: 1 // 返回上一页
        });
      }
    }
  }
}
</script>

<style>
.all {
  background-color: #f5f5f5;
}
.head-content {
  background-color: #ffffff;
}
.left-arrow {
  height: 18px;
  width: 18px;
}
.back-btn {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  padding: 40px 10px 10px 10px;
}
.back-text {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
}
</style>