<template>
  <div class="location-list">
    <h3>{{ title }}</h3>
    <div v-for="(loc, index) in locations" :key="index" class="location" @click="selectLocation(loc.name)">
      <span class="loc-name">{{ loc.name }}</span>
      <span class="loc-address">{{ loc.address }}</span>
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
      this.$emit("location-selected", locationName); // 触发事件
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
}
.location:hover {
  background-color: #f0f0f0;
}
</style>
