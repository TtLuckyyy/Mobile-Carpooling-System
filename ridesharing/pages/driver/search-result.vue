<template>
  <PageHeader backText="顺路订单" backUrl="/pages/driver/driver_search" />
  <view class="page-container">
    <view class="trip-info">
      <view class="trip-details">
        <view class="route">
          <text>{{invitationInfo.start_loc}} → {{invitationInfo.end_loc}}</text>
        </view>
        <text>{{formatDateTime(invitationInfo.start_at)}} | 可载{{invitationInfo.seats}}人</text>
      </view>
      <view class="buttons">
        <view class="button">
          <image src="/static/lightning.png" class="image" @click="grabbing"></image>
          <view style="font-size: 14px;">自动抢单</view>
        </view>
        <view class="button">
          <image src="/static/edit.png" class="image" @click="grabbing"></image>
          <view style="font-size: 14px;">修改行程</view>
        </view>
        <view class="button">
          <image src="/static/delete.png" class="image" @click="grabbing"></image>
          <view style="font-size: 14px;">取消行程</view>
        </view>
      </view>
    </view>
    <!-- 下拉列表 -->
    <view class="filter-options">
      <picker @change="sortChange" :value="sortIndex" :range="sortOptions" class="button">
        <view class="picker">
          {{sortOptions[sortIndex]}}
        </view>
        <image src="/static/arrowdown.png" style="padding-top:4px; padding-left:8px; height: 16px;width: 16px;"></image>
      </picker>
    </view>
    <!-- 筛选条件 -->
    <view class="conditions">
      <view
        class="condition"
        :class="{ active: highwayFilter }"
        @click="toggleFilter('highway')"
      >愿摊高速费</view>
      <view
        class="condition"
        :class="{ active: exclusiveFilter }"
        @click="toggleFilter('exclusive')"
      >独享</view>
      <view
        class="condition"
        :class="{ active: timeFilter }"
        @click="toggleFilter('time')"
      >前后一小时内</view>
      <view
        class="condition"
        :class="{ active: offsetFilter }"
        @click="toggleFilter('offset')"
      >起点5公里内</view>
    </view>
    <!-- 匹配订单列表 -->
    <view v-if="filteredItems.length > 0">
      <MatchedRequestBlock v-for="(item, index) in filteredItems" :key="index" :item="item" />
    </view>
    <view v-else class="empty-tips">
      <text>暂时没有与您行程匹配的乘客</text>
      <text>已将您的邀请发布</text>
      <text>请耐心等待~</text>
    </view>
  </view>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import { formatDateTime } from '@/utils/functions/formatDateTime';
import { mapState, mapActions } from 'vuex';
import MatchedRequestBlock from "@/components/MatchedRequestBlock.vue";

export default {
  components: {
    PageHeader,
    MatchedRequestBlock
  },
  data() {
    return {
      invitationInfo: {
        start_loc: "北京市海淀区中关村大街1号",
        end_loc: "北京市朝阳区建国路88号",
        seats: 0,
        start_at: '2023-06-15T09:00:00', // 假设司机行程开始时间
      },
      sortIndex: 0,
      sortOptions: ['按时间排序', '按顺路度由高到低排序', '按价格由低到高排序', '按价格由高到低排序'],
      listBlockItems: [
        {
          id: '1',
          startAt: '2023-06-15T08:30:00',
          startLoc: '北京市海淀区中关村大街5号',
          endLoc: '北京市朝阳区国贸大厦',
          person: '张先生',
          price: 45,
          offset: 6.6,
          exclusive: false,
          highway: true,
          convenientRate: 0.65,
        },
        {
          id: '2',
          startAt: '2023-06-15T09:15:00',
          startLoc: '北京市海淀区清华大学东门',
          endLoc: '北京市朝阳区CBD万达广场',
          person: '李女士',
          price: 35,
          offset: 3.4,
          exclusive: true,
          highway: false,
          convenientRate: 0.75,
        },
        {
          id: '3',
          startAt: '2023-06-15T10:00:00',
          startLoc: '北京市海淀区北京大学西门',
          endLoc: '北京市朝阳区三里屯',
          person: '王同学',
          price: 30,
          offset: 4,
          exclusive: false,
          highway: true,
          convenientRate: 0.85,
        },
        {
          id: '4',
          startAt: '2023-06-15T18:45:00',
          startLoc: '北京市海淀区人民大学',
          endLoc: '北京市朝阳区朝阳公园',
          person: '赵先生',
          price: 40,
          offset: 5,
          exclusive: true,
          highway: true,
          convenientRate: 0.235,
        },
        {
          id: '5',
          startAt: '2023-06-15T09:30:00',
          startLoc: '北京市海淀区五道口',
          endLoc: '北京市朝阳区大望路',
          person: '刘女士',
          price: 25,
          offset: 70,
          exclusive: false,
          highway: false,
          convenientRate: 0.455,
        }
      ],
      isLoading: false,
      error: null,
      // 筛选条件状态
      highwayFilter: false,
      exclusiveFilter: false,
      timeFilter: false,
      offsetFilter: false, // 改为 offsetFilter
    }
  },
  computed: {
    ...mapState(['userID', 'rideRequest', 'rideOrder', 'rideInvitation']),
    // 计算过滤后的订单
    filteredItems() {
      let filtered = [...this.listBlockItems];
      if (this.highwayFilter) {
        filtered = filtered.filter(item => item.highway === true);
      }
      if (this.exclusiveFilter) {
        filtered = filtered.filter(item => item.exclusive === true);
      }
      if (this.timeFilter) {
        const driverTime = new Date(this.invitationInfo.start_at).getTime();
        const oneHour = 60 * 60 * 1000; // 一小时的毫秒数
        filtered = filtered.filter(item => {
          const itemTime = new Date(item.startAt).getTime();
          return Math.abs(itemTime - driverTime) <= oneHour;
        });
      }
      if (this.offsetFilter) {
        filtered = filtered.filter(item => item.offset <= 5); // 顺路度 >= 80 表示起点5公里内
      }
      // 应用当前排序
      const sortType = this.sortOptions[this.sortIndex];
      switch (sortType) {
        case '按时间排序':
          filtered.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
          break;
        case '按顺路度由高到低排序':
          filtered.sort((a, b) => b.convenientRate - a.convenientRate);
          break;
        case '按价格由低到高排序':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case '按价格由高到低排序':
          filtered.sort((a, b) => b.price - a.price);
          break;
      }
      return filtered;
    }
  },
  onLoad() {
    this.getCurrentInvitation();
    this.getMatchedRequests();
    // 初始按时间排序
    this.sortReqests();
  },
  methods: {
    formatDateTime,
    async getCurrentInvitation() {
      this.isLoading = true;
      this.error = null;
      try {
        console.log(this.rideInvitation.invitationID);
        if (!this.rideInvitation.invitationID) {
          throw new Error('未获取到订单ID');
        }
        const response = await uni.request({
          url: `http://localhost:8083/carsharing/get-certain-invitation?orderId=${this.rideOrder.orderID}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
        if (response.data.status === 'success') {
          this.invitationInfo = response.data.history;
        } else {
          throw new Error(response.data.message || '获取邀请信息失败');
        }
      } catch (error) {
        console.error('获取邀请信息失败:', error);
        this.error = error.message || '获取邀请信息失败';
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    async getMatchedRequests() {
      this.isLoading = true;
      this.error = null;
      try {
        if (!this.rideInvitation.invitationID) {
          throw new Error('缺少拼车邀请ID');
        }
        const response = await uni.request({
          url: `http://localhost:8083/carsharing/matched-requests?invitationID=${this.rideInvitation.invitationID}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
        if (response.data.status === 'success') {
          const res = response.data;
          if (res.matched_requests && res.matched_requests.length > 0) {
            this.listBlockItems = res.matched_requests.map(item => ({
              id: item.id,
              startAt: item.start_at,
              startLoc: item.start_loc,
              endLoc: item.end_loc,
              person: item.person,
              price: item.price,
              offset: item.offset,
              exclusive: item.exclusive,
              highway: item.highway,
              convenientRate: item.convenient_rate,
            }));
            // 获取新数据后重新排序
            this.sortReqests();
          } else {
            this.listBlockItems = [];
          }
        } else {
          throw new Error('请求失败');
        }
      } catch (error) {
        console.error('获取匹配订单失败:', error);
        this.error = error.message || '获取匹配订单失败';
        uni.showToast({
          title: this.error,
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    },
    sortChange(e) {
      this.sortIndex = e.detail.value;
      this.sortReqests();
    },
    sortReqests() {
      const sortType = this.sortOptions[this.sortIndex];
      let sortedList = [...this.listBlockItems];
      switch (sortType) {
        case '按时间排序':
          sortedList.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
          break;
        case '按顺路度由高到低排序':
          sortedList.sort((a, b) => b.convenientRate - a.convenientRate);
          break;
        case '按价格由低到高排序':
          sortedList.sort((a, b) => a.price - b.price);
          break;
        case '按价格由高到低排序':
          sortedList.sort((a, b) => b.price - a.price);
          break;
      }
      this.listBlockItems = sortedList;
    },
    toggleFilter(filter) {
      // 切换筛选条件状态
      if (filter === 'highway') {
        this.highwayFilter = !this.highwayFilter;
      } else if (filter === 'exclusive') {
        this.exclusiveFilter = !this.exclusiveFilter;
      } else if (filter === 'time') {
        this.timeFilter = !this.timeFilter;
      } else if (filter === 'offset') {
        this.offsetFilter = !this.offsetFilter;
      }
    },
    grabbing() {
      uni.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  }
}
</script>

<style>
.page-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.trip-info {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
.route {
  font-weight: bold;
  margin-bottom: 10rpx;
}
.trip-details {
  background-color: var(--color-lightgrey);
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  color: var(--color-darkgrey);
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.button {
  display: flex;
  flex-direction: row;
}
.image {
  width: 14px;
  height: 14px;
  padding-right: 10px;
}
.filter-options {
  padding-left: 10px;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: row;
}
.picker {
  font-size: 16px;
  font-weight: bold;
}
.conditions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
}
.condition {
  font-size: 13px;
  border-style: solid;
  border-color: var(--color-grey);
  border-width: 1px;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}
.condition.active {
  background-color: var(--color-darkgrey);
  color: #fff;
  border-color: var(--color-darkgrey);
}
.empty-tips {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  color: #bbbbbb;
  font-size: 18px;
  line-height: 2;
  font-family: "Microsoft YaHei";
}
</style>