<template>
	<view class="container">
	  <view class="header">
	    <view class="back" @click="goBack">＜</view>
	    <view class="title">行人预约申请</view>
	  </view>
	  <view class="welcome">欢迎您的来访</view>
	  <view class="form">
		  
		  <view class="form-item">
			<text class="label"><text class="star">*</text> 查询类型</text>
			<radio-group class="radio-group">
				<radio value="女"  @click="setType('行人')" checked>行人</radio>
			  <radio value="男" @click="setType('车辆')">车辆</radio>
			</radio-group>
		  </view>
		  
	    <view class="form-item">
	      <text class="label"><text class="star">*</text> 来访问人姓名</text>
	      <input class="input" v-model="formData.reserveName" placeholder="来访问人姓名" />
	    </view>
		<view class="form-item">
		  <text class="label"><text class="star">*</text> 来访问人手机号</text>
		  <input class="input" v-model="formData.reservePhone" placeholder="来访问人手机号" />
		</view>
		<view class="form-item" v-if="formData.type == true">
		  <text class="label"><text class="star">*</text> 来访问人身份证后四位</text>
		  <input class="input" v-model="formData.theLastFourId" placeholder="来访问人身份证后四位" />
		</view>
		<!-- <view class="form-item" style="display: none;"> -->
		<view class="form-item" v-if="formData.type == false">
		  <text class="label"><text class="star">*</text> 车牌号</text>
		  <input class="input" v-model="formData.catId" placeholder="车牌号" />
		</view>
		<button class="submit-button" @click="submitForm()">申请</button>
	 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					type: true,
					reserveName: '秦振凯',
					reservePhone: '15777191121',
					theLastFourId: '3376',
					catId: '桂AAE86M'
				}
			}
		},
		methods: {
			errorIdea(info){
				uni.showModal({
					  title: info.title || '预约查询',
					  content: info.content || '没有您的预约信息, 请您先预约!',
					  showCancel: info.showCancel || false
				});
			},
			setType(element) {
				this.formData.type = element == '行人';
			},
			submitForm() {
				
				const person = '/reserve/api/search';
				const cat = '/cat/api/search';
				
				const baseUrl = 'http://localhost:8000' + (this.formData.type == true ? person : cat);
				console.log(baseUrl);
				
				const data = {
					reserveName: this.formData.reserveName,
					reservePhone: this.formData.reservePhone
				}
				
				if (this.formData.type == true) {
					data.theLastFourId = this.formData.theLastFourId;
				} else {
					data.catId = this.formData.catId;
				}
				
				
				uni.request({
						url: baseUrl,
						method: "POST",
						data: data,
						success: (res) => {
							res = res.data;
							console.log(res);
							const msg = res.msg;
							
							if (msg == '未能查询到您的预约信息' || msg == '参数错误...') {
								this.errorIdea({});
								return;
							} else {
								// TODO 页面跳转， 并传送参数
							}
						}
				});
			}
		}
	}
</script>

<style>	
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

.form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 15px;
}

.label {
  display: block;
  font-size: 13px;
  margin-bottom: 5px;
}

.input {
  width: 90%;
  padding: 7px;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.picker {
  width: 90%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.face-image {
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.captcha-image {
  width: 100%;
  height: 50px;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}

.star {
	color: red;
}

.pop-container {
	background-color: #007aff;
	color: #fff;
}

</style>
