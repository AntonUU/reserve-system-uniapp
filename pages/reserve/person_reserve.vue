<template>
  <view class="container">
    <view class="header">
      <view class="back" @click="goBack">＜</view>
      <view class="title">游客预约申请</view>
    </view>
    <view class="welcome">西大欢迎您的来访</view>
    <view class="form">
      <view class="form-item">
        <text class="label">* 游客姓名</text>
        <input class="input" v-model="formData.name" placeholder="请输入姓名" />
      </view>
      <view class="form-item">
        <text class="label">* 游客性别</text>
        <radio-group v-model="formData.gender" class="radio-group">
          <radio value="男">男</radio>
          <radio value="女">女</radio>
        </radio-group>
      </view>
      <view class="form-item">
        <text class="label">* 游客手机号</text>
        <input class="input" v-model="formData.phone" placeholder="请输入手机号" />
      </view>
      <view class="form-item">
        <text class="label">* 预计通行日期</text>
        <picker mode="date" v-model="formData.visitDate">
          <view class="picker">
            {{ formData.visitDate || '请选择预计通行日期' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">* 预计进入时间段</text>
        <picker mode="time" v-model="formData.visitTime">
          <view class="picker">
            {{ formData.visitTime || '请选择预计进入时间段' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">* 游客证件类型</text>
        <picker mode="selector" :range="idTypes" v-model="formData.idType">
          <view class="picker">
            {{ formData.idType || '请选择证件类型' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">* 游客证件号码</text>
        <input class="input" v-model="formData.idNumber" placeholder="请输入证件号码" />
      </view>
      <view class="form-item">
        <text class="label">* 请录入人脸信息</text>
        <image class="face-image" :src="formData.faceImage || '/static/default_face.png'" @click="uploadFaceImage" />
      </view>
      <view class="form-item">
        <text class="label">* 进出校门</text>
        <picker mode="selector" :range="gateOptions" v-model="formData.gate">
          <view class="picker">
            {{ formData.gate || '请选择进出校门' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">* 图形校验</text>
        <image class="captcha-image" :src="captchaImage" @click="refreshCaptcha" />
      </view>
      <view class="form-item">
        <input class="input" v-model="formData.captcha" placeholder="请输入验证码" />
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
        name: '',
        gender: '男',
        phone: '',
        visitDate: '',
        visitTime: '',
        idType: '中华人民共和国居民身份证',
        idNumber: '',
        faceImage: '',
        gate: '',
        captcha: '',
      },
      idTypes: ['中华人民共和国居民身份证', '护照', '军官证'],
      gateOptions: ['东门', '西门', '南门', '北门'],
      captchaImage: '/static/captcha.png'
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    uploadFaceImage() {
      // 上传人脸图片逻辑
    },
    refreshCaptcha() {
      // 刷新验证码逻辑
    },
    submitForm() {
      // 提交表单逻辑
      console.log(this.formData);
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
  color: #007aff;
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
  font-size: 16px;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
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
  width: 100%;
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
</style>
