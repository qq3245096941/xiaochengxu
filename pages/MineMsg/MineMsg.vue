<template>
	<view>
		<view class="MineMsg-cont">
			<view class="MineMsg-cont-box">
				<view>头像</view>
				<image class="headPortrait" :src="userinfo.userTx" mode=""></image>
			</view>
			<view class="MineMsg-cont-box active">
				<view>昵称</view>
				<view class="view">
					<view class="zi">{{userinfo.userName}}</view>
					<image class="tu" src="../../static/home/isnext.png" mode=""></image>
				</view>
			</view>
			<view class="MineMsg-cont-box active">
				<view>真实姓名</view>
				<view class="view">
					<view class="zi">{{userinfo.nickName}}</view>
					<image class="tu" src="../../static/home/isnext.png" mode=""></image>
				</view>
			</view>
			<view class="MineMsg-cont-box active">
				<view>性别</view>
				<view class="view">
					<view class="zi">男</view>
					<image class="tu" src="../../static/home/isnext.png" mode=""></image>
				</view>
			</view>
			<navigator url="../chagePhone/chagePhone">
				<view class="MineMsg-cont-box active">
					<view>手机号</view>
					<view class="view">
						<view class="zi">{{userinfo.userTel}}</view>
						<image class="tu" src="../../static/home/isnext.png" mode=""></image>
					</view>
				</view>
			</navigator>
		</view>
		<view class="MineMsg-cont-box2" @click="gotoAddress">
			<view>收货地址</view>
			<view class="view">
				<image class="tu" src="../../static/home/isnext.png" mode=""></image>
			</view>
		</view>
		<view class="Submission">确认提交</view>
	</view>
</template>

<script>
	import post from '../../post.js'
	
	export default {
		data() {
			return {
				userinfo:{},
			}
		},
		onLoad(){
			post.gets({
				url:`/user/${uni.getStorageSync('login').userId}/userInfo`,
			}).then(data=>{
				this.userinfo = data.data.obj;
				console.log(this.userinfo);
			})
		},
		methods: {
			gotoAddress(){  //跳转到地址页面
				uni.navigateTo({
					url:"../Address/Address"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.MineMsg-cont{
		width:707rpx;
		height:572rpx;
		background:rgba(247,248,248,1);
		box-shadow:0rpx 0rpx 28rpx 1rpx rgba(78,101,153,0.14);
		border-radius:15rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 31rpx;
		font-size: 32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(34,24,21,1);
		.active{
			border-bottom: 1rpx solid #DCDDDDFF;
			box-sizing: border-box;
		}
		.MineMsg-cont-box{
			background:rgba(247,248,248,1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			.view{
				display: flex;
			}
			.tu{
				margin-top: 10rpx;
				width:16rpx;
				height:26rpx;
			}
			.zi{
				margin-right: 44rpx;
				font-size: 25rpx;
				color: #999999;
			}
			.headPortrait{
				width:67rpx;
				height:64rpx;
				border-radius:32rpx;
			}
		}
	}
	.MineMsg-cont-box2{
		padding: 0 28rpx;
		width:707rpx;
		background:rgba(247,248,248,1);
		box-shadow:0rpx 0rpx 28rpx 1rpx rgba(78,101,153,0.14);
		border-radius:15rpx;
		margin: 0 auto;
		margin-top: 21rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		.view{
			display: flex;
		}
		.tu{
			margin-top: 10rpx;
			width:16rpx;
			height:26rpx;
		}
	}
	.Submission{
		width:434rpx;
		height:58rpx;
		background:rgba(255,174,0,1);
		border-radius:10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:30rpx;
		margin: 0 auto;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		margin-top: 179rpx;
	}
</style>
