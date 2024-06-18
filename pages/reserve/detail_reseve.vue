<template>
	<view class="container">
	  <view class="header">
	  </view>
	  <view class="welcome">欢迎您的来访</view>
	</view>
	
	<view class="container">
		<view v-if="reserveStatus == 0" class="icon-container">
			<img id="icon-img" src="/static/等待.png">
		</view>
		<view v-if="reserveStatus == 1" class="icon-container">
			<img id="icon-img" src="/static/ok.png">
		</view>
		
		<view class="info-container">
			<view class="info-item">
				<text class="label">申请人: </text>
				<text class="value"> {{reserveName}}</text>
			</view>
			<view class="info-item">
				<text class="label">联系电话: </text>
				<text class="value"> {{reservePhone}}</text>
			</view>
			<view class="info-item">
				<text class="label">申请时间: </text>
				<text class="value"> {{createTime}}</text>
			</view>
			<view class="info-item">
				<text class="label">预约通行时间: </text>
				<text class="value"> {{startDateTime}}</text>
			</view>
			<view class="info-item">
				<text class="label">预约结束时间: </text>
				<text class="value"> {{endDateTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reserveName: '',  // 申请人
				reservePhone: '', // 手机号
				reserveStatus: 0, // 申请状态
				createTime: '', // 申请时间
				startDateTime: '', // 预约通行时间
				endDateTime: '' // 预约结束时间
			}
		},
		onLoad(option){
			this.reserveName = option.reserveName;
			this.endDateTime = option.endDateTime;
			this.reserveStatus = option.reserveStatus;
			this.startDateTime = option.startDateTime;
			this.reservePhone = option.reservePhone;
			this.createTime = option.createTime;
		},
		methods: {
			goBack() {
				// 返回逻辑
			}
		}
	}
</script>

<style>
#icon-img {
	width: 100px;
	height: 100px;
}

.icon-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px; /* 设置一个高度确保图片居中 */
	margin-bottom: 30px;
}

.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  align-items: center;
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
  margin-bottom: 20px;
}

.info-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.label {
  font-size: 13px;
}

.value {
  font-size: 13px;
  margin-left: 10px;
}

.star {
	color: red;
}

</style>
