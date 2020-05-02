<template>
	<view class="ismap">
		<map class="amap" :markers="markers" :longitude="longitude" :latitude="latitude">
		
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markers: [{
						iconPath: "../../static/home/dingwei.png",
						id: 0,
						width: 20,
						height: 28,
						longitude:null,
						latitude:null
					}
				],
				longitude:null,
				latitude:null
			}
		},
		methods: {
			
		},
		onLoad(id) {
			console.log(id)
			const _this = this;
			_this.markers[0].longitude = Number(id.distanceX)
			_this.markers[0].latitude = Number(id.distanceY)
			_this.longitude = Number(id.distanceX)
			_this.latitude = Number(id.distanceY)
		}
	}
</script>

<style scoped lang="scss">
.ismap{
	width: 100%;
	height: 100%;
	map{
		width: 100%;
		height: 100%;
	}
}
</style>
