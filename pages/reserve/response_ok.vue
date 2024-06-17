<template>
  <view class="container">
    <view class="header">
      <view class="back" @click="goBack">＜</view>
      <view class="title">预约成功</view>
    </view>
    <view class="view-icon">
      <image src="/static/ok.png" class="icon" />
    </view>
	<view class="title context">预约成功, 请等待受理。</view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.back {
  font-size: 24px;
  cursor: pointer;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 20px;
}

.welcome {
  text-align: center;
  font-size: 18px;
  color: #007aff;
  margin-bottom: 20px;
}

.view-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.icon {
  width: 150px;
  height: 150px;
}

.context {
	margin-bottom: 100px;
}
</style>
