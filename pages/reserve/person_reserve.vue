<template>
  <view class="container">
    <view class="header">
      
    </view>
    <view class="welcome">欢迎您的来访</view>
    <view class="form">
      <view class="form-item">
        <text class="label"><text class="star">*</text> 游客姓名</text>
        <input class="input" v-model="formData.reserveName" placeholder="请输入姓名" />
      </view>
      <view class="form-item">
        <text class="label"><text class="star">*</text> 游客性别</text>
        <radio-group class="radio-group">
          <radio value="男" @click="setSex('男')" checked>男</radio>
          <radio value="女"  @click="setSex('女')">女</radio>
        </radio-group>
      </view>
      <view class="form-item">
        <text class="label"><text class="star">*</text> 游客手机号</text>
        <input class="input" v-model="formData.reservePhone" placeholder="请输入手机号" />
      </view>
      <view class="form-item">
        <text class="label"><text class="star">*</text> 预计通行日期</text>
        <picker mode="date" :value="formData.visitDate" @change="handleDateChange">
          <view class="picker">
            {{ formData.visitDate || '请选择预计通行日期' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label"><text class="star">*</text> 预计进入时间段</text>
		<picker mode="selector" :range="times" :value="timeTypeIndex" @change="handleTimesTypeChange">
		  <view class="picker">
		    {{ formData.period || '请选择时间段' }}
		  </view>
		</picker>
      </view>
      <view class="form-item">
        <text class="label"><text class="star">*</text> 游客证件类型</text>
        <picker mode="selector" :range="idTypes" :value="idTypeIndex" @change="handleIdTypeChange">
          <view class="picker">
            {{ formData.documents || '请选择证件类型' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label"><text class="star">*</text> 游客证件号码</text>
        <input class="input" v-model="formData.reserveCard" placeholder="请输入证件号码" />
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
        <text class="label"><text class="star">*</text> 请录入人脸信息</text>
        <image class="face-image" src="/static/马总.jpg" />
      </view>
      
	  
	  <view class="form-item">
	    <text class="label">被访人姓名</text>
	    <input class="input" v-model="visitData.visitName" placeholder="请输入姓名" />
	  </view>
	  <view class="form-item">
	    <text class="label">拜访部门</text>
	    <input class="input" v-model="visitData.visitUnit" placeholder="请输入姓名" />
	  </view>
	  <view class="form-item">
	    <text class="label">随行人员</text>
	    <input class="input" v-model="visitData.accompanyingNum" type="number" placeholder="请输入姓名" />
	  </view>
	  <view class="form-item">
	    <text class="label">拜访事由</text>
	    <input class="input" v-model="visitData.visitContext" placeholder="请输入姓名" />
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
        reserveName: '',
        reserveSex: true,
        reservePhone: '',
        visitDate: '',
        documents: '中华人民共和国居民身份证',
        reserveCard: '',
        portrait: '/static/马总.jpg',
        gate: '东门',
		period: '',
		reserveGroup: false,
		startDatetime: '',
		endDatetime: '',
		reserveDoor: 1
      },
	  visitData: {
		visitName: '',
		visitUnit: '',
		accompanyingNum: 0,
		visitContext: ''  
	  },
      idTypes: ['中华人民共和国居民身份证', '护照', '军官证'],
      gateOptions: ['东门', '西门', '南门', '北门'],
      idTypeIndex: 0,
      gateIndex: 0,
	  times: ['08:00~16:00', '12:00~20:00', '15:00~22:00'],
	  timeTypeIndex: 0
    };
  },
  methods: {
	setSex(sex){
	  console.log(sex == '男' ? true : false);
	  this.formData.reserveSex = sex;
	},
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
	handleIdTypeChange(event) {
	  const index = event.target.value;
	  this.idTypeIndex = index;
	  this.formData.documents = this.idTypes[index];
	},
	handleGateChange(event) {
	  const index = event.target.value;
	  this.gateIndex = index;
	  this.formData.gate = this.gateOptions[index];
	  this.formData.reserveDoor = index;
	  this.reserveDoor = index + 1;
	},
	submitForm() {
	  if (!this.isValidPhoneNumber()) {
		  this.errorIdea({
			  title: '错误',
			  content: '手机号错误, 请重新填写!'
		  });
		  this.formData.reservePhone = '';
		  return;  
	  }
	  if (!this.isValidIDCard()) {
		  this.errorIdea({
		  			  title: '错误',
		  			  content: '身份证号错误, 请重新填写!'
		  });
		  this.formData.reserveCard = '';
		  return;
	  }
	  if (!this.isValidChineseName()) {
		  this.errorIdea({
			  title: '错误',
			  content: '名字错误, 请重新填写!'
		  });
		  this.formData.reserveName = '';
		  return;
	  }
	  
	  let startS = this.formData.period.split("~")[0] + ':00';
	  let endS = this.formData.period.split("~")[1] + ':00';
	
	  this.formData.startDatetime = this.formData.visitDate + ' ' + startS;
	  this.formData.endDatetime = this.formData.visitDate + ' ' + endS;
	
	const tmp = this.formData;
	
	  const data = {
			reserveGroup: tmp.reserveGroup,
			reserveName: tmp.reserveName,
			reserveSex: tmp.reserveSex,
			reservePhone: tmp.reservePhone,
			reserveCard: tmp.reserveCard,
			reserveDoor: tmp.reserveDoor,
			startDatetime: tmp.startDatetime,
			endDatetime: tmp.endDatetime,
			portrait: tmp.portrait
		}
		
		if (this.visitData.visitName != '' || this.visitData.visitName != null) {
			data.visitInfo = this.visitData;
		}
	
	  
	  uni.request({
		url: 'http://localhost:8000/reserve/api/reserve',
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
		// console.log(this.formData.reservePhone, regex.test(this.formData.reservePhone));
		return regex.test(this.formData.reservePhone);
	},
	// 身份证验证
	isValidIDCard() {
		const regex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{3}(\d|X)$/i;
		
		if (!regex.test(this.formData.reserveCard)) {
		    return false; // 格式不正确
		}
		
		// 身份证前17位数字本体码加权因子
		const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	  
		// 身份证前17位数字本体码对应的校验码字符
		const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
		
		 // 计算校验码
		let sum = 0;
		for (let i = 0; i < 17; i++) {
			sum += parseInt(this.formData.reserveCard.charAt(i), 10) * factor[i];
		}
		
		let checkCode = parity[sum % 11];
		
		// 比较计算出的校验码和身份证最后一位
		return checkCode === this.formData.reserveCard.toUpperCase().charAt(17);
	},
	// 姓名验证
	isValidChineseName() {
	  // 正则表达式，匹配1-3个中文汉字组成的字符串
	  const regex = /^[\u4e00-\u9fa5]{2,5}$/;
	  return regex.test(this.formData.reserveName);
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
  margin-bottom: 50px;
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
