<template>
	<view>
		<view class="EngineHead">
			<image src="../../static/fanhui.png" mode=""></image>
			<view>{{vehicleName}}</view>
		</view>
			<view class="EngineChoose">
				选择发动机排量
			</view>
			<view class="allcartYear">
				<view class="EngineItem" v-for="(item,index) in iscartYear" :key="index"
				 @click="goTocartyear(vehicleId,carBrand,vehicleName,item.engine)">
				{{item.engine}}</view>
			</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
	
				vehicleName:"",
				carBrand:"",
				vehicleId:'',
				iscartYear:[],//车辆排量
			}
		},
		methods: {
			//查询车辆排量  ---》 跳转年份
			getyear(carBrand,vehicleId) {
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/modelConfig/'+ carBrand +'/'+ vehicleId+'/engineAll',
				}).then(res => {
					//轮播图
					console.log("发动机排量",res)
					if (res.statusCode === 200) {
						if (res.data.code == 0) { 
							_this.iscartYear=res.data.data;
						}
					}
				});
			},
			//跳转车辆年份
			goTocartyear(vehicleId,carBrand,vehicleName,pailiang){
				uni.navigateTo({
					url: '../caryYear/caryYear?vehicleId=' + vehicleId +"&carBrand=" + carBrand+ "&vehicleName=" + vehicleName + "&pailiang=" + pailiang
				});
			}, 
			
		},
		onLoad(vehicleId,carBrand,vehicleName) { 
			const _this = this;
			_this.vehicleId = vehicleId.vehicleId //当前车型id
			_this.carBrand = vehicleId.carBrand //当前车型id
			_this.vehicleName = vehicleId.vehicleName;
			_this.getyear(_this.carBrand,_this.vehicleId) //获取车辆排量
			
		}
	}
</script>

<style lang="scss" scoped>
	.EngineHead{
		width: 100%;
		height: 120rpx;
		background: #000;
		color: #ffffff;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		image{
			width:82rpx;
			height:82rpx;
			border-radius:50%;
			margin-left: 40rpx;
			margin-right: 32rpx;
		}
	}
	.EngineTitle{
		width:100%;
		height: 74rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		margin-left: 40rpx;
	}
	.EngineChoose{
		font-size:24rpx;
		display: flex;
		align-items: center;
		background:rgba(238,240,237,1);
		width:750rpx;
		height:60rpx;
		padding-left: 40rpx;
		box-sizing: border-box;
	}
	.EngineItem{
		width:578rpx;
		height: 82rpx;
		border-bottom:1rpx solid rgba(184,184,184,1);
		margin-left: 40rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-family:PingFang SC;
		font-weight:bold;
	}
</style>
