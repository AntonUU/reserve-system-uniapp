<template>
	<view class="card" @click="routeClick">
	    <view class="icon">
	      <image :src="$props.logoPath" class="icon-image" />
	    </view>
	    <view class="text">
	      {{ $props.title }}
	    </view>
	  </view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default:() => "预约校园参观申请"
			},
			logoPath: {
				type: String,
				default: () => "/static/logo.png"
			},
			backgroundColor: {
				type: String,
				default: () => "#4a90e2"
			},
			routePath: {
				type: String,
				default: () => ""
			}
		},
		data() {
			return {		
			}
		},
		methods: {
			routeClick() {
			    uni.navigateTo({
			        url: this.routePath
				});
			}
		}
	}
</script>

<style>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 150px;
  background-color: v-bind($props.backgroundColor);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 40px;
  height: 40px;
  /* background-color: #ffffff; */
  border-radius: 50%;
  /* margin-bottom: 10px; */
}

.icon-image {
  width: 35px;
  height: 35px;
}

.text {
  color: #ffffff;
  font-size: 16px;
  white-space: normal; /* 允许文本换行 */
  word-wrap: break-word; /* 单词太长时进行换行 */
  padding: 0 5px;
}
</style>
