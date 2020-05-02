<template>
	<view>
			<view class="EngineHead">
		<image src="../../static/fanhui.png" mode=""></image>
			<view>{{vehicleName}}</view>
		</view>
			<view class="ismsg">
				<text @click="bankEngine">
					{{pailiang}} >
				</text>
			</view>
			<view class="EngineChoose">
				请选择生产年份
			</view>
			<view class="allcartYear">
				<view class="EngineItem" v-for="(item,index) in iscartYear" 
				:key="index"
				@click="goTocartypes(vehicleId,carBrand,vehicleName,item.annualMoney,pailiang)"
				>
				{{item.annualMoney}}</view>
			</view>
			
		
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				vehicleName:"", //车名
				pailiang:'',//排量
				carBrand:"", //品牌id
				vehicleId:'', //车系id
				iscartYear:[],//车辆年份
			}
		},
		methods: {
			//查询车辆年份
			getyear(carBrand,vehicleId) {
				// GET /modelConfig/{carBrand}/{vehicleId}/annualMoneyAll
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/modelConfig/'+ carBrand +'/'+ vehicleId+'/annualMoneyAll',
				}).then(res => {
					//轮播图
					console.log("发动机年份",res)
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.iscartYear=res.data.data;
						}
					}
				});
			},
			// //跳转车型
			goTocartypes(vehicleId,carBrand,vehicleName,nianfeng,pailiang){
				uni.navigateTo({
					url: '../cartTypes/cartTypes?vehicleId=' + vehicleId +"&carBrand=" + carBrand+ "&vehicleName=" + vehicleName +"&nianfeng="+ nianfeng +"&pailiang=" + pailiang
				});
			},
			//返回上级
			bankEngine(){
				uni.navigateTo({
					url: '../Engine/Engine'
				});
			}
			
		},
		onLoad(vehicleId) {
			const _this = this ;
			console.log("获取年份信息",vehicleId)
			_this.vehicleId = vehicleId.vehicleId //当前车型id
			_this.carBrand = vehicleId.carBrand //当前品牌id
			_this.vehicleName = vehicleId.vehicleName; //车名
			_this.pailiang = vehicleId.pailiang; //排量
			_this.getyear(_this.carBrand,_this.vehicleId)
			
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
	.ismsg{
		width: 100%;
		height: 74rpx;
		line-height:74rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		margin-left: 40rpx;
		
	}
</style>
