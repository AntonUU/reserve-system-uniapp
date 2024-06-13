<template>
	<view class="container" v-for="(item, index) in reserveTables" :key="index">
	    <reserve-info :title="item.title" 
						:logo-path="item.logoPath" 
						:background-color="item.backgroundColor"
						:route-path="item.routePath"/>
	  </view>
</template>

<script>
	import reserveInfo from '@/components/reserve/reserve_info.vue';
	export default {
		data() {
			return {
				reserveTables: [
					{
						title: "预约校园参观申请",
						logoPath: "/static/icon/预约.png",
						backgroundColor: "#4a90e2",
						routePath: "person_reserve"
					},
					{
						title: "车辆预约申请",
						logoPath: "/static/icon/车辆预约.png",
						backgroundColor: "#E6A84B",
						routePath: ""
					},
					{
						title: "预约校园参观申请",
						logoPath: "/static/icon/预约.png",
						backgroundColor: "#72C040",
						routePath: ""
					},
				]
			}
		},
		methods: {
			
		},
		components: {
			reserveInfo
		}
	}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>
