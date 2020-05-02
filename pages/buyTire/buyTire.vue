<template>
	<view style="background: #F6F6F6;">
		<view class="buyTire-header">
			<view class="cont">
				<view class="zi">上海大众-POLO</view>
				<view class="tu">
					<image src="../../static/home/xiajiantou.png" mode=""></image>
				</view>
			</view>
			<view class="xian"></view>
			<view class="cont">
				<view class="zi">上海大众-POLO</view>
				<view class="tu">
					<image src="../../static/home/xiajiantou.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="screen">
			<view class="screen-box">
				<view class="biao"></view>
				<view class="wenzi">置顶原配轮胎</view>
			</view>
			<view class="screen-box">
				<view class="tuijian">推荐排序</view>
				<view class="tu">
					<image src="../../static/home/redjiantou.png" mode=""></image>
				</view>
			</view>
			<view style="border: none;" class="screen-box">
				<view class="zhiding">筛选</view>
				<image class="image" src="../../static/home/xia.png" mode=""></image>
			</view>
		</view>
		<view class="buyTire-cont" v-for="(item,index) in comList" :key="item.commdityId">
			<view class="buyTire-cont-left">
				<image class="buyTire-cont-left-image" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+item.commdityParameter" mode=""></image>
				<view class="buyTire-cont-left-view">185/60R15 84H</view>
			</view>
			<view class="buyTire-cont-right">
				<view class="buyTire-cont-right-view1">{{item.commdityName}}</view>
				<view class="buyTire-cont-right-view2">{{item.commdityTitle}}</view>
				<view class="buyTire-cont-right-view3">干湿地操控强</view>
				<view class="buyTire-cont-right-view4">
					<text class="text1">*****</text>
					<text class="text2">4.99</text>
					<text class="text3">5000条评价</text>
				</view>
				<view class="buyTire-cont-right-view5">
					<text class="buyTire-cont-right-view5-text">¥{{item.commdityPrice}}</text>
					<s class="buyTire-cont-right-view5-s">¥520</s>
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
				page: 1, //商品页数
				comList: [], //轮胎商品列表
				comListSon: [],
			}
		},
		methods: {
			getcomList(page) {
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/commdity/commdityAll',
					data:{
						page:page,
						rows:10,
						commdityType:"轮胎"
					}
				}).then(res => {
					console.log(res)
					//轮播图
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.comListSon=res.data.commdityList;
							Array.prototype.push.apply(_this.comList, _this.comListSon); //合并加载更多的数据与源数据.
						}
					}
				});
			},
		},
		onLoad(){
			const _this = this;
			_this.getcomList(_this.page); //获取商品列表
		},
		onReachBottom: function() {
			const _this = this;
			_this.page++;
			_this.getcomList(_this.page); //获取商品列表
		}
	}
</script>

<style lang="scss" scoped>
	.buyTire-header{
		display: flex;
		width: 100%;
		height: 70rpx;
		background: #fff;
		border-bottom:2rpx solid rgba(184,184,184,1);
		.cont{
			height: 100%;
			width: 374rpx;
			display: flex;
			align-items: center;
			.zi{
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				margin-left: 98rpx;
			}
			.tu{
				font-size: 30rpx;
				margin-left: 52rpx;
				image{
					width: 25rpx;
					height: 25rpx;
					margin-left: 10rpx;
					margin-top: 10rpx;
				}
			}
		}
		.xian{
			width:2rpx;
			height:42rpx;
			background:rgba(112,112,112,1);
			margin-top: 16rpx;
		}
	}
	.screen{
		width: 100%;
		height: 62rpx;
		display: flex;
		align-items: center;
		background: #fff;
		.screen-box{
			width: 246rpx;
			height: 38rpx;
			border-right:2rpx solid rgba(112,112,112,1);
			display: flex;
			align-items: center;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			.biao{
				width:20rpx;
				height:20rpx;
				background:rgba(255,255,255,1);
				border:2rpx solid rgba(112,112,112,1);
				margin-left: 42rpx;
			}
			.wenzi{
				margin-left: 8rpx;
			}
			.tuijian{
				color:rgba(216,55,56,1);
				margin-left: 48rpx;
			}
			.tu{
				font-size: 24rpx;
				margin-left: 24rpx;
				color:rgba(216,55,56,1);
				image{
					width: 25rpx;
					height: 25rpx;
					margin-left: 10rpx;
					margin-top: 10rpx;
				}
			}
			.zhiding{
				margin-left: 112rpx;
			}
			.image{
				width:22rpx;
				height:26rpx;
				margin-left: 8rpx;
			}
		}
	}
	.buyTire-cont{
		width:722rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		height:270rpx;
		background:rgba(255,255,255,1);
		display: flex;
		.buyTire-cont-left-image{
			width:164rpx;
			height:164rpx;
			margin-top: 28rpx;
			margin-left: 52rpx;
		}
		.buyTire-cont-left-view{
			margin-top: 12rpx;
			margin-left: 38rpx;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
		}
	}
	.buyTire-cont-right{
		margin-left: 64rpx;
		.buyTire-cont-right-view1{
			font-size:22rpx;
			margin-top: 32rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(0,0,0,1);
		}
		.buyTire-cont-right-view2{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(0,0,0,1);
		}
		.buyTire-cont-right-view3{
			font-size:22rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(216,55,56,1);
		}
		.buyTire-cont-right-view4{
			display: flex;
			.text1{
			}
			.text2{
				font-size:22rpx;
				margin-left: 8rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(22,167,112,1);
			}
			.text3{
				margin-left: 24rpx;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(138,138,138,1);
			}
		}
	}
	.buyTire-cont-right-view5{
		margin-top: 16rpx;
		display: flex;
		align-items: center;
		.buyTire-cont-right-view5-text{
			font-size:50rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,0,0,1);
			margin-left: 78rpx;
		}
		.buyTire-cont-right-view5-s{
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(107,106,106,1);
			margin-left: 18rpx;
		}
	}
</style>
