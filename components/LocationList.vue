<template>
  <div class="location-list">
    <h3>{{ title }}</h3>
    <div v-if="locations.length === 0" class="no-record">
      暂无地址记录
    </div>
    <div v-for="(loc, index) in locations" :key="index" class="location" @click="selectLocation(loc.name)">
      <div class="loc-info">
        <span class="loc-name">{{ loc.name }}</span>
        <span class="loc-address">{{ loc.address }}</span>
      </div>
      <span class="distance">{{ loc.distance }} km</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    locations: Array,
  },
  methods: {
    selectLocation(locationName) {
      this.$emit("location-selected", locationName);
    },
  },
};
</script>

<style scoped>
.location-list {
  margin-top: 10px;
}
.location {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  align-items: center;
}

/* 使 name 和 address 纵向排列 */
.loc-info {
  display: flex;
  flex-direction: column;
  width: 75%; /* 让 name + address 占据 75% 的宽度 */
}

/* name 大小适中 */
.loc-name {
  font-size: 16px;
  font-weight: bold;
}

/* address 在 name 下方 */
.loc-address {
  font-size: 12px;
  color: #666666;
  margin-top: 3px; /* 添加一点间距 */
}

/* 距离保持在右侧 */
.distance {
  font-size: 12px;
  color: #666666;
  width: 25%; /* 让 distance 继续占据 25% 的宽度 */
  text-align: right;
}

/* 没有地址记录时的样式 */
.no-record {
  text-align: center;
  color: #666666;
  font-size: 14px;
  padding: 20px;
}
</style>
