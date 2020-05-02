<template>
	<view style="background: #F7F4F8;">
		<view >
			<view class="collection-box">
				<image class="collection-box-image" src="../../static/home/content2.png" mode=""></image>
				<view>
					<view class="collection-box-view">倍耐力轮胎 新P1 Cinturato P1 185/60R15 84H Pirelli</view>
					<text class="collection-box-text">$330</text>
				</view>
			</view>
			<view class="guessLike2">已经到底了</view>
		</view>
		<!-- 没有收藏时的样式 -->
		<view  class="collection-nothing">
			<image class="collection-nothing-image" src="../../static/home/icons12.png" mode=""></image>
			<text class="collection-nothing-text">您还未收藏过商品，去车品商城逛逛</text>
			<view class="collection-nothing-view">去车品商城</view>
		</view>
		
		
		
		<view class="guessLike">猜你喜欢</view>
		<view class="guessLike-cont">
			<view class="guessLike-cont-box">
				<image class="guessLike-cont-box-image" src="../../static/home/content2.png" mode=""></image>
				<view class="guessLike-cont-box-view1">S权威的饿得我入围单位分为非违法违法无人</view>
				<view class="guessLike-cont-box-view2">
					<text class="guessLike-cont-box-view2-text">￥330</text>
					<s class="guessLike-cont-box-view2-s">￥480</s>
				</view>
			</view>
			<view class="guessLike-cont-box">
				<image class="guessLike-cont-box-image" src="../../static/home/content2.png" mode=""></image>
				<view class="guessLike-cont-box-view1">S权威的饿得我入围单位分为非违法违法无人</view>
				<view class="guessLike-cont-box-view2">
					<text class="guessLike-cont-box-view2-text">￥330</text>
					<s class="guessLike-cont-box-view2-s">￥480</s>
				</view>
			</view>
			<view class="guessLike-cont-box">
				<image class="guessLike-cont-box-image" src="../../static/home/content2.png" mode=""></image>
				<view class="guessLike-cont-box-view1">S权威的饿得我入围单位分为非违法违法无人</view>
				<view class="guessLike-cont-box-view2">
					<text class="guessLike-cont-box-view2-text">￥330</text>
					<s class="guessLike-cont-box-view2-s">￥480</s>
				</view>
			</view>
			<view class="guessLike-cont-box">
				<image class="guessLike-cont-box-image" src="../../static/home/content2.png" mode=""></image>
				<view class="guessLike-cont-box-view1">S权威的饿得我入围单位分为非违法违法无人</view>
				<view class="guessLike-cont-box-view2">
					<text class="guessLike-cont-box-view2-text">￥330</text>
					<s class="guessLike-cont-box-view2-s">￥480</s>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				 userid:'',//用户id
				 
				 
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.getStorage({
			  key: 'login',
			  success (res) {
				_this.userid = res.data.userId
				if(_this.userid){
					// _this.getList(_this.id)
					// _this.getbuycartnumber(_this.userid) //获取购物车数量
				}
			  }
			})
		}
	}
</script>

<style lang="scss" scoped>
	.collection-box{
		width:750rpx;
		height:236rpx;
		background:rgba(255,255,255,1);
		display: flex;
	}
	.collection-box-image{
		width: 144rpx;
		height: 144rpx;
		margin-left: 42rpx;
		margin-top: 32rpx;
	}
	.collection-box-view{
		width:476rpx;
		font-size:24rpx;
		margin-top: 46rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,0,0,1);
	}
	.collection-box-text{
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,0,0,1);
	}
	/* 猜你喜欢 */
	.guessLike{
		box-sizing: border-box;
		margin-top: 394rpx;
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(216,55,56,1);
		margin-bottom: 28rpx;
	}
	.guessLike:after{
		content: "";
		width:80rpx;
		display: inline-block;
		height:0rpx;
		margin-left: 14rpx;
		margin-bottom: 10rpx;
		border:1rpx solid rgba(216,55,56,1);
	}
	.guessLike:before{
		content: "";
		margin-left: 164rpx;
		margin-right: 14rpx;
		width:80rpx;
		margin-bottom: 10rpx;
		display: inline-block;
		height:0rpx;
		border:1rpx solid rgba(216,55,56,1);
	}
	// 已经到底了
	.guessLike2{
		box-sizing: border-box;
		margin-top: 32rpx;
		font-size:20rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(184,184,184,1);
		margin-bottom: 28rpx;
	}
	.guessLike2:after{
		content: "";
		width:72rpx;
		height:0rpx;
		border:1rpx solid rgba(184,184,184,1);
		display: inline-block;
		margin-left: 14rpx;
		margin-bottom: 6rpx;
	}
	.guessLike2:before{
		content: "";
		margin-left: 230rpx;
		margin-right: 14rpx;
		margin-bottom: 6rpx;
		display: inline-block;
		width:72rpx;
		height:0rpx;
		border:1rpx solid rgba(184,184,184,1);
	}
	// 没有收藏时的样式
	.collection-nothing{
		width: 100%;
		height: 300rpx;
	}
	.collection-nothing-image{
		width:128rpx;
		height:130rpx;
		background:rgba(138,138,138,1);
		margin-left: 312rpx;
		margin-top: 106rpx;
	}
	.collection-nothing-text{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:bold;
		display: block;
		color:rgba(103,103,103,1);
		margin-left: 168rpx;
		margin-top: 22rpx;
	}
	.collection-nothing-view{
		width:208rpx;
		height:62rpx;
		border:1rpx solid rgba(112,112,112,1);
		border-radius:32rpx;
		margin-left: 272rpx;
		margin-top: 50rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight:400;
		color:rgba(103,103,103,1);
		opacity:1;
	}
	/* 详情 */
	.guessLike-cont{
		width: 100%;
		padding: 0 32rpx;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.guessLike-cont-box{
		width:318rpx;
		height:446rpx;
		margin-bottom: 40rpx;
		background:rgba(255,255,255,1);
	}
	.guessLike-cont-box-image{
		width: 318rpx;
		height: 318rpx;
	}
	.guessLike-cont-box-view1{
		margin: 0 auto;
		width:280rpx;
		font-size:14rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.guessLike-cont-box-view2-text{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,0,0,1);
		margin-left: 20rpx;
	}
	.guessLike-cont-box-view2-s{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(138,138,138,1);
		margin-left: 16rpx;
	}
</style>
