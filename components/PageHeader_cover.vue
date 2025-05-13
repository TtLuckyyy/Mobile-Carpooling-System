<template>
  <cover-view class="floating-buttons">
    <cover-view class="header">
      <cover-view class="back-btn" @click="handleBack">
        <cover-image src="/static/left-arrow.png" @click="handleBack"></cover-image>
        <cover-view class="back-text" @click="handleBack">{{ backText }}</cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  name: "PageHeader_cover",
  props: {
    backText: {
      type: String,
      default: "返回"
    },
    backUrl: {
      type: String,
      default: "/pages/customer/customer"
    }
  },
  data() {
    return {}
  },
  methods: {
    handleBack() {
      uni.switchTab({
        url: this.backUrl
      });
    }
  }
}
</script>

<style>
.floating-buttons {
  position: fixed;
  top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 9999;
  pointer-events: auto;
}

.header {
  width: 95%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 1px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  padding: 15px 10px;
}

.back-btn cover-image {
  width: 18px;
  height: 18px;
}

.back-text {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
  margin-left: 10px;
}
</style>