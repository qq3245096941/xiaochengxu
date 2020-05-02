<template>
	<view>
		<view class="screen">
			<view class="screen-box">
				<view class="wenzi">置顶原配轮胎</view>
				<view class="tu">
					<image src="../../static/home/xiajiantou.png" mode=""></image>
				</view>
			</view>
			<view class="screen-box">
				<view class="tuijian">推荐排序</view>
				<view class="tu">
					<image src="../../static/home/xiajiantou.png" mode=""></image>
				</view>
			</view>
			<view style="border: none;" class="screen-box">
				<view class="zhiding">筛选</view>
				<view class="tu">
					<image src="../../static/home/xiajiantou.png" mode=""></image>
				</view>
			</view>
		</view>
		<view>
			<view class="buyTire-cont">
				<view class="buyTire-cont-left">
					<image class="buyTire-cont-left-image" src="../../static/home/banner1.png" mode=""></image>
				</view>
				<view class="buyTire-cont-right">
					<view class="buyTire-cont-right-view2">天津市河北区旭升汽车修理厂</view>
					<view class="buyTire-cont-right-view3">
						<text class="text2">总评分 5 |总单量 6</text>
						<text class="text">全合成</text>
					</view>
					<view class="buyTire-cont-right-view4">
						<text class="text1">天津市河北区旭升汽车修理厂我觉得覅</text>
						<text class="text2">1.25km</text>
					</view>
				</view>
			</view>
			<view class="baoyang-cont">
				<view class="baoyang-cont-box">
					<view class="left">
						<view class="left-view1">雾化消毒标洗</view>
						<view class="left-view2">已售 0</view>
					</view>
					<view class="content">
						<view class="content-view">$68</view>
						<view class="content-s">$89</view>
					</view>
					<view class="right">购物</view>
				</view>
				<view class="baoyang-cont-box">
					<view class="left">
						<view class="left-view1">雾化消毒标洗</view>
						<view class="left-view2">已售 0</view>
					</view>
					<view class="content">
						<view class="content-view">$68</view>
						<view class="content-s">$89</view>
					</view>
					<view class="right">购物</view>
				</view>
				<view class="baoyang-cont-box" style="border: none;">
					<view class="left">
						<view class="left-view1">雾化消毒标洗</view>
						<view class="left-view2">已售 0</view>
					</view>
					<view class="content">
						<view class="content-view">$68</view>
						<view class="content-s">$89</view>
					</view>
					<view class="right">购物</view>
				</view>
				<view class="baoyang-cont-chakan">查看全部团购</view>
			</view>
			<view class="buyTire-cont">
				<view class="buyTire-cont-left">
					<image class="buyTire-cont-left-image" src="../../static/home/banner1.png" mode=""></image>
				</view>
				<view class="buyTire-cont-right">
					<view class="buyTire-cont-right-view2">天津市河北区旭升汽车修理厂</view>
					<view class="buyTire-cont-right-view3">
						<text class="text2">总评分 5 |总单量 6</text>
						<text class="text">全合成</text>
					</view>
					<view class="buyTire-cont-right-view4">
						<text class="text1">天津市河北区旭升汽车修理厂我觉得覅</text>
						<text class="text2">1.25km</text>
					</view>
				</view>
			</view>
			<view class="baoyang-cont">
				<view class="baoyang-cont-box">
					<view class="left">
						<view class="left-view1">雾化消毒标洗</view>
						<view class="left-view2">已售 0</view>
					</view>
					<view class="content">
						<view class="content-view">$68</view>
						<view class="content-s">$89</view>
					</view>
					<view class="right">购物</view>
				</view>
				<view class="baoyang-cont-box" style="border: none;">
					<view class="left">
						<view class="left-view1">雾化消毒标洗</view>
						<view class="left-view2">已售 0</view>
					</view>
					<view class="content">
						<view class="content-view">$68</view>
						<view class="content-s">$89</view>
					</view>
					<view class="right">购物</view>
				</view>
			</view>
			<view class="buyTire-cont">
				<view class="buyTire-cont-left">
					<image class="buyTire-cont-left-image" src="../../static/home/banner1.png" mode=""></image>
				</view>
				<view class="buyTire-cont-right">
					<view class="buyTire-cont-right-view2">天津市河北区旭升汽车修理厂</view>
					<view class="buyTire-cont-right-view3">
						<text class="text2">总评分 5 |总单量 6</text>
						<text class="text">全合成</text>
					</view>
					<view class="buyTire-cont-right-view4">
						<text class="text1">天津市河北区旭升汽车修理厂我觉得覅</text>
						<text class="text2">1.25km</text>
					</view>
				</view>
			</view>
			<view class="baoyang-cont">
				<view class="baoyang-cont-box">
					<view class="left">
						<view class="left-view1">雾化消毒标洗</view>
						<view class="left-view2">已售 0</view>
					</view>
					<view class="content">
						<view class="content-view">$68</view>
						<view class="content-s">$89</view>
					</view>
					<view class="right">购物</view>
				</view>
				<view class="baoyang-cont-box" style="border: none;">
					<view class="left">
						<view class="left-view1">雾化消毒标洗</view>
						<view class="left-view2">已售 0</view>
					</view>
					<view class="content">
						<view class="content-view">$68</view>
						<view class="content-s">$89</view>
					</view>
					<view class="right">购物</view>
				</view>
			</view>
		</view>
		<image v-if="flag" @click="fnScroll" class="zhidingImage" src="../../static/fanhui.png" mode=""></image>
		<van-collapse :value="activeNames" @change="onChange">
		  <van-collapse-item title="有赞微商城" name="1">
		    提供多样店铺模板，快速搭建网上商城
		  </van-collapse-item>
		  <van-collapse-item title="有赞零售" name="2">
		    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
		  </van-collapse-item>
		  <van-collapse-item title="有赞美业" name="3" disabled>
		    线上拓客，随时预约，贴心顺手的开单收银
		  </van-collapse-item>
		</van-collapse>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:false,
				activeNames: ['1']
			}
		},
		methods: {
			fnScroll(){
				this.flag=false;
				document.documentElement.scrollTop=0;
			},
			 onChange(event) {
				 const _this = this;
			      _this.activeNames= event.detail
			  }
		},
		mounted(){
			window.onscroll = function () {
				 var scrollTop = document.documentElement.scrollTop;
				 if(scrollTop>0){
					 this.flag=true;
				 }else{
					 this.flag=false;
				 }
			}.bind(this)
		}
	}
</script>

<style lang="scss" scoped>
	.buyTire-cont{
		margin-left: 50rpx;
		width:700rpx;
		height:220rpx;
		border-bottom: 4rpx solid #F6F6F6;
		background:rgba(255,255,255,1);
		display: flex;
		.buyTire-cont-left-image{
			width:170rpx;
			height:170rpx;
			margin-top: 28rpx;
		}
	}
	.buyTire-cont-right{
		margin-left: 40rpx;
		.buyTire-cont-right-view2{
			margin-top: 28rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(0,0,0,1);
		}
	}
	.buyTire-cont-right-view3{
		margin-top: 15rpx;
		.text2{
			font-size: 25rpx;
		}
		.text{
			margin-left: 190rpx;
			font-size: 20rpx;
			padding: 5rpx 6rpx;
			border: 1rpx solid #888888;
			border-radius: 8rpx;
			margin-right: 5rpx;
		}
	}
	.buyTire-cont-right-view4{
		font-size: 20rpx;
		color: #888888;
		margin-top: 20rpx;
		.text2{
			margin-left: 50rpx;
		}
	}
	.screen{
		box-sizing: border-box;
		width: 100%;
		height: 80rpx;
		display: flex;
		border-bottom: 4rpx solid #F6F6F6;
		border-top: 5rpx solid #F6F6F6;
		align-items: center;
		background: #fff;
		.screen-box{
			width: 246rpx;
			height: 38rpx;
			border-right:2rpx solid rgba(112,112,112,1);
			display: flex;
			align-items: center;
			font-size:24rpx;
			margin: 0 auto;
			font-family:PingFang SC;
			font-weight:400;
			.wenzi{
				margin-left: 48rpx;
			}
			.tuijian{
				margin-left: 60rpx;
			}
			.tu{
				font-size: 24rpx;
				image{
					width: 25rpx;
					height: 25rpx;
					margin-left: 10rpx;
					margin-top: 10rpx;
				}
			}
			.zhiding{
				margin-left: 100rpx;
			}
		}
	}
	.baoyang-cont{
		width: 750rpx;
		border-bottom: 12rpx solid #F6F6F6;
		.baoyang-cont-box{
			width: 700rpx;
			margin-left: 50rpx;
			height: 120rpx;
			display: flex;
			border-bottom: 4rpx solid #F6F6F6;
		}
		.left-view1{
			font-size: 30rpx;
			margin-top: 15rpx;
		}
		.left-view2{
			font-size: 25rpx;
			margin-top: 10rpx;
		}
		.content{
			margin-left: 280rpx;
			.content-view{
				font-size: 40rpx;
				color: red;
				margin-top: 15rpx;
			}
			.content-s{
				text-decoration:line-through;
				font-size: 25rpx;
				margin-left: 20rpx;
			}
		}
		.right{
			width: 100rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2rpx solid red;
			color: red;
			font-size: 30rpx;
			border-radius: 25rpx;
			margin-top: 25rpx;
			margin-left: 30rpx;
		}
	}
	.baoyang-cont-chakan{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		height: 80rpx;
		border-top: 4rpx solid #F6F6F6;
	}
	.zhidingImage{
		position: fixed;
		bottom: 20rpx;
		right: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}
</style>
