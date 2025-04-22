<template>
  <cover-view 
    class="option-card" 
    :class="[type, {selected: isSelected}]" 
    @click="handleClick"
  >
    <cover-view class="left" @click="handleClick">
      <cover-image :src="type === 'shared' ? '/static/shareoption/shared.png' : '/static/shareoption/exclusive.png'"></cover-image>
    </cover-view>
    <cover-view class="right" @click="handleClick">
      <cover-view class="firstrow" @click="handleClick">
        <cover-view class="type-name" @click="handleClick">{{ typeName }}</cover-view>
        <cover-view class="radio-button" :class="{selected: isSelected, [type]: true}" @click="handleClick">
          <cover-view class="radio-inner" v-if="isSelected" @click="handleClick"></cover-view>
        </cover-view>
      </cover-view>
      <cover-view class="type-desc"@click="handleClick">{{ typeDesc }}</cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'shared',
      validator: value => ['shared', 'exclusive'].includes(value)
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeName() {
      return this.type === 'shared' ? '拼座' : '独享';
    },
    typeDesc() {
      return this.type === 'shared' 
        ? '超低价，低碳环保' 
        : '不拼人，舒适省时';
    }
  },
  methods: {
    handleClick() {
	  console.log(this.type);
      this.$emit('select', this.type);
    }
  }
}
</script>

<style>
.option-card {
  width: 120px;
  height: 30px;
  padding: 5px;
  margin: 5px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
}

.left {
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left cover-image {
  width: 100%;
}

.right {
  margin-left: 5px;
}

.firstrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2px;
}

.type-name {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 900;
}

.shared .type-name {
  color: var(--color-green);
}

.exclusive .type-name {
  color: var(--color-orange);
}

.type-desc {
  font-size: 10px;
  color: var(--color-darkgrey);
  text-align: left;
}

/* 单选按钮样式 */
.radio-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #CCCCCC;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.radio-button.shared.selected {
  border-color: var(--color-green);
}

.radio-button.exclusive.selected {
  border-color: var(--color-orange);
}

.radio-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-green);
}

.radio-button.exclusive .radio-inner {
  background-color: var(--color-orange);
}

/* 未选中状态 */
.option-card.shared {
  border: 1px solid #E0E0E0;
}

.option-card.exclusive {
  border: 1px solid #E0E0E0;
}

/* 选中状态 */
.option-card.selected {
  transform: translateY(-2px);
}

.option-card.shared.selected {
  background-color: #F0FAF0;
}

.option-card.exclusive.selected {
  border: 1px solid var(--color-orange);
  background-color: #FFF5E6;
}
</style>