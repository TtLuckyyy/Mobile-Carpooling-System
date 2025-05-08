<template>
  <view>
    <PageHeader backText="我的拼车邀请" backUrl="/pages/driver/driver_search" />

    <view v-if="tripListItems.length > 0">
      <TripList
        v-for="(item, index) in tripListItems"
        :key="index"
        :item="item"
      />
    </view>

    <view v-else class="empty-tips">
      <text>您暂时还没有拼车邀请哦</text>
    </view>
  </view>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import TripList from "@/components/TripList.vue";

export default {
  components: {
    PageHeader,
    TripList,
  },
  data() {
    return {
      tripListItems: [
        {
          startAt: this.todayAt("10:00"),
          startLoc: "同济大学（嘉定校区）",
          endLoc: "静安嘉里中心",
          status: "ONGOING",
          phone: "13900000001",
          price: 0,
        },
        {
          startAt: "2024-06-24 10:00",
          startLoc: "同济大学（嘉定校区）",
          endLoc: "静安嘉里中心",
          status: "ONGOING",
          phone: "13900000002",
          price: 0,
        },
        {
          startAt: "2024-06-24 10:00",
          startLoc: "同济大学（嘉定校区）",
          endLoc: "静安嘉里中心",
          status: "ONGOING",
          phone: "13900000003",
          price: 0,
        },
      ],
    };
  },
  methods: {
    todayAt(timeStr) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd} ${timeStr}`;
    },
  },
};
</script>

<style scoped>
.empty-tips {
  text-align: center;
  margin-top: 100rpx;
  color: #999;
  font-size: 16px;
}
</style>