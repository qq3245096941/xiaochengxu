<template>
	<view style="width:100%;min-height:1215rpx;background:rgba(245,245,245,1);">
		<view class="garage" v-for="item in cartList" :key="item.mycarId">
			<image class="back" src="../../static/aicheback.png" mode="widthFix"></image>
			<div>
				<image class="logo" :src="item.carLogo" mode="widthFix"></image>
				<view class="garage-box">
					<view class="view1">{{item.carName}}</view>
					<view class="view2">
						<text v-if="item.typeMoney">{{item.typeMoney}}</text><text v-if="item.engineDis">{{item.engineDis}}</text>
					</view>
				</view>
			</div>
			<view class="operation">
				<view class="operation-view" v-if="item.isDefault == 0">已设为默认</view>
				<view class="operation-view" v-if="item.isDefault != 0" @click="setDef(item.mycarId)">设为默认</view>
				<view class="operation-view2" @click="removeCart(item.mycarId)">删除</view>
			</view>
		</view>
		
		<view class="newModels" @click="gotogetCartType">新增车型</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				userid:null,
				cartnumber:null,
				cartList:[],
			}
		},
		onLoad() {
			const _this = this;
			uni.getStorage({  //获取userid
			  key: 'login',
			  success (res) {
				_this.userid = res.data.userId
				if(_this.userid){
					_this.getMyCart(_this.userid)
				}
			  }
			})
		},
		onShow() {
			const _this = this;
			_this.getMyCart(_this.userid)
		},
		methods: {
			//查询爱车档案
			getMyCart(id){
				const _this = this;
				post.gets({
					method: "POST",
					url: "/car/"+ id +"/carUserAll",
				}).then(res=>{
					console.log(res)
					if(res.statusCode==200){
						_this.cartList=res.data.list;
						console.log(_this.cartList);
					}
				})
			},
			gotogetCartType(){
				uni.navigateTo({
					url:"../getCartType/getCartType"
				})
			},
			
			removeCart(id){
				// /car/{carId}/delCar
				const _this = this;
				post.gets({
					method: "POST",
					url: "/car/"+ id +"/delCar",
				}).then(res=>{
					_this.getMyCart(_this.userid)
				})
			},
			//设置默认
			setDef(id){
				const _this = this;
				post.gets({
					method: "POST",
					url: "/car/"+ uni.getStorageSync(login).userId + "/" + id +"/upDefCar",
				}).then(res=>{
					_this.getMyCart(_this.userid)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.garage{
		position: relative;
		width: 100%;
		height: 300rpx;
		padding-top: 60rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		>view{
			display: flex;
		}
		.back{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.logo{
			margin: 0 80rpx;
			margin-top: 20rpx;
			width: 50rpx;
			height: 50rpx;
		}
		.garage-box{
			padding-left: 40rpx;
			height: 90rpx;
			border-left: 1rpx solid #B8B8B8;
			.view1{
				margin-top: 10rpx;
				font-size: 33rpx;
				font-weight: 500;
			}
			.view2{
				margin-top: 5rpx;
				font-size: 25rpx;
				color: #B8B8B8;
			}
		}
	}
	.operation{
		margin-top: 60rpx;
		border-top: 1rpx solid #B8B8B8;
		display: flex;
		justify-content: space-between;
		padding: 0 60rpx;
		padding-top: 20rpx;
		color: red;
		font-size: 28rpx;
		.operation-view{
			padding: 6rpx 25rpx;
			border: 1rpx solid red;
		}
		.operation-view2{
			padding: 6rpx 70rpx;
			border: 1rpx solid red;
		}
	}
	.newModels{
		position: fixed;
		bottom: 50rpx;
		width: 630rpx;
		height: 80rpx;
		background-color: red;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 40rpx;
		margin-left: 60rpx;
	}
</style>
