<template>
  <view class="container">
    <view class="header">
      <view class="back" @click="goBack">＜</view>
      <view class="title">车辆预约申请</view>
    </view>
    <view class="welcome">欢迎您的来访</view>
    <view class="form">
      <view class="form-item">
        <text class="label"><text class="star">*</text> 申请人</text>
        <input class="input" v-model="formData.personName" placeholder="申请人" />
      </view>
	  <view class="form-item">
	    <text class="label"><text class="star">*</text> 车牌号</text>
	    <input class="input" v-model="formData.catId" placeholder="车牌号" />
	  </view>
	  
	  <view class="form-item">
	    <text class="label"><text class="star">*</text> 联系电话</text>
	    <input class="input" v-model="formData.personPhone" placeholder="联系电话" />
	  </view>
      
      <view class="form-item">
        <text class="label"><text class="star">*</text> 开始日期</text>
        <picker mode="date" :value="formData.visitDate" @change="handleDateChange">
          <view class="picker">
            {{ formData.visitDate || '请选择预计通行日期' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label"><text class="star">*</text> 结束日期</text>
		<picker mode="selector" :range="times" :value="timeTypeIndex" @change="handleTimesTypeChange">
		  <view class="picker">
		    {{ formData.period || '请选择时间段' }}
		  </view>
		</picker>
      </view>
      
	  <view class="form-item">
	    <text class="label"><text class="star">*</text> 进出校门</text>
	    <picker mode="selector" :range="gateOptions" :value="gateIndex" @change="handleGateChange">
	      <view class="picker">
	        {{ formData.gate || '请选择进出校门' }}
	      </view>
	    </picker>
	  </view>
	  
	  <view class="form-item">
	    <text class="label"><text class="star">*</text> 被访人姓名</text>
	    <input class="input" v-model="visitData.visitName" placeholder="被访人姓名" />
	  </view>
	  <view class="form-item">
	    <text class="label"><text class="star">*</text> 拜访部门</text>
	    <input class="input" v-model="visitData.visitUnit" placeholder="请输入被访人手机号" />
	  </view>
	  <view class="form-item">
	    <text class="label"><text class="star">*</text> 随行人员</text>
	    <input class="input" v-model="visitData.accompanyingNum" type="number" placeholder="被访人单位" />
	  </view>
	  <view class="form-item">
	    <text class="label"><text class="star">*</text> 拜访事由</text>
	    <input class="input" v-model="visitData.visitContext" placeholder="拜访事由" />
	  </view>
	  
	  
      <button class="submit-button" @click="submitForm">申请</button>
    </view>
  </view>
</template>

<script>	
export default {
  data() {
    return {
      formData: {
        personName: '秦振凯',
		catId: '桂A AE86M',
        personPhone: '15777191121',
        visitDate: '2024-06-18',
        gate: '东门',
		period: '08:00~16:00',
		startDatetime: '',
		endDatetime: '',
		entrance: 1
      },
	  visitData: {
		visitName: '秦凯振',
		visitUnit: '信息部',
		accompanyingNum: 0,
		visitContext: '找点事做'  
	  },
      gateOptions: ['东门', '西门', '南门', '北门'],
      idTypeIndex: 0,
      gateIndex: 0,
	  times: ['08:00~16:00', '12:00~20:00', '15:00~22:00'],
	  timeTypeIndex: 0
    };
  },
  methods: {
	goBack() {
	  uni.navigateBack();
	},
	handleDateChange(event) {
	  this.formData.visitDate = event.target.value;
	},
	handleTimesTypeChange(event){
		const index = event.target.value;
		this.timeTypeIndex = index;
		this.formData.period = this.times[index];
	},
	handleGateChange(event) {
	  const index = event.target.value;
	  this.gateIndex = index;
	  this.formData.gate = this.gateOptions[index];
	  this.formData.entrance = index;
	  this.entrance = index + 1;
	},
	submitForm() {
	  if (!this.isValidPhoneNumber()) {
		  this.errorIdea({
			  title: '错误',
			  content: '手机号错误, 请重新填写!'
		  });
		  this.formData.personPhone = '';
		  return;  
	  }
	  if (!this.isValidChineseName()) {
		  this.errorIdea({
			  title: '错误',
			  content: '申请人名字错误, 请重新填写!'
		  });
		  this.formData.personName = '';
		  return;
	  }
	  if (this.isStringEmpty(this.visitData.visitName)) {
		  this.errorIdea({
		  			  title: '错误',
		  			  content: '被访人名字错误, 请重新填写!'
		  });
		  this.visitData.visitName = '';
		  return;
	  }
	  if (this.isStringEmpty(this.visitData.visitUnit)) {
	  		  this.errorIdea({
	  		  			  title: '错误',
	  		  			  content: '访问部门错误, 请重新填写!'
	  		  });
	  		  this.visitData.visitUnit = '';
	  		  return;
	  }
	  
	  let startS = this.formData.period.split("~")[0] + ':00';
	  let endS = this.formData.period.split("~")[1] + ':00';
	
	  this.formData.startDatetime = this.formData.visitDate + ' ' + startS;
	  this.formData.endDatetime = this.formData.visitDate + ' ' + endS;
	
	const tmp = this.formData;
	
	  const data = {
			personName: tmp.personName,
			personPhone: tmp.personPhone,
			entrance: tmp.entrance,
			startDatetime: tmp.startDatetime,
			endDatetime: tmp.endDatetime,
			catId: tmp.catId,
			visitInfo: this.visitData
		}
	
	  
	  uni.request({
		url: 'http://localhost:8000/cat/api/reserve',
		method: "POST",
		data: data,
		success: (res) => {
			// TODO 写完行人预约
		}
	  });
	  
	  uni.redirectTo({
	      url: '/pages/reserve/response_ok'
	  });
	  
	  // TODO 提交 转页面  后续开发, 验证提交次数，防止一个设备多次提交
	  
	},
	errorIdea(info){
		uni.showModal({
			  title: info.title || '错误',
			  content: info.content || '填写错了, 请重新输入!',
			  showCancel: info.showCancel || false
		});
	},
	
	
	// 验证
	// 手机号验证
	isValidPhoneNumber() {
		const regex = /^1[3-9]\d{9}$/;
		// console.log(this.formData.personPhone, regex.test(this.formData.personPhone));
		return regex.test(this.formData.personPhone);
	},
	// 姓名验证
	isValidChineseName() {
	  // 正则表达式，匹配1-3个中文汉字组成的字符串
	  const regex = /^[\u4e00-\u9fa5]{2,5}$/;
	  return regex.test(this.formData.personName);
	},
	// 字符串不为空验证
	isStringEmpty(str) {
	  return !str || str.trim() === '';
	}
  }
};
</script>

<style scoped>
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
  color: #fff;
  background-color: #007aff;
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

.radio-group {
  display: flex;
}

.radio-group radio {
  margin-right: 15px;
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

.picker::after {
  content: attr(value);
  font-size: 18px; /* 调整字体大小 */
}
</style>
