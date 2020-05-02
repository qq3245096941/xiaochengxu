<template>
	<view>
		<view class="header">
			<view class="header-view">
				<view class="view1">
					<view></view>
					<text>{{OrderList.userName}}</text>
				</view>
				<view class="view2">
					<view>
						<image :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+OrderList.detailList[0].commdityThnmbnail" mode=""></image>
					</view>
					<text>{{OrderList.detailList[0].userTel}}</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="service" v-if="OrderList.orderStatus==0">商品</view>
			<view class="service"  v-if="OrderList.orderStatus!=0">服务</view>
			<view class="serviceName">
				<view class="view1"></view>
				<view class="view2">{{OrderList.detailList[0].commdityName}}</view>
				<view class="view3">
					<view>¥{{OrderList.detailList[0].commdityPrice}}</view>
					<view class="number">x{{OrderList.detailList[0].commdityCount}}</view>
				</view>
			</view>
			<view class="serviceType">
				<view>订单编号：{{OrderList.detailList[0].orderId}}</view>
				<view>订单时间：{{time}}</view>
				<view v-if="OrderList.payStat==0">支付方式：线上支付</view>
				<view v-if="OrderList.payStat!=0">支付方式：线下支付</view>
				<view>配送方式：暂无</view>
			</view>
			<!-- <view class="serviceCost">
				<view class="serviceCost-box">
					<view>商品总额</view>
					<view>¥658.50</view>
				</view>
				<view class="serviceCost-box">
					<view>商品总额</view>
					<view>¥658.50</view>
				</view>
				<view class="serviceCost-box">
					<view>商品总额</view>
					<view>¥658.50</view>
				</view>
			</view> -->
			<view class="payment">
				实付款：<text>¥{{OrderList.detailList[0].commdityPrice}}</text>
			</view>
			<view class="QRCode" v-if="OrderList.orderStatus!=0">
				<view class="view1">订单二维码</view>
				<view class="view2">进门店让店员扫一扫，节省您的时间</view>
				<view class="view3"></view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-view">				<view class="view1">					<view><van-icon name="service-o" /></view>					<text>在线客服</text>				</view>
				<view class="view3"></view>				<view class="view2">					<view><van-icon name="phone-o" /></view>					<text>电话咨询</text>				</view>			</view>
		</view>
		<view class="quxiao">
			<button type="default" @click="quxiaodingdan()">取消订单</button>
		</view>
		<van-action-sheet :show="isshow" @close="onClose" cancel-text="取消" @cancel="onCancel" title="请选择取消订单的原因">
			<view class="isquxiao">
				<van-radio-group :value="radio" @change="onChange">
				  <van-radio name="1">配送到达时间无法满足</van-radio>
				  <van-radio name="2">订单信息有误</van-radio>
				  <van-radio name="3">优惠券问题</van-radio>
				  <van-radio name="4">支付方式有误/无法支付</van-radio>
				  <van-radio name="5">重复下单/误下单</van-radio>
				  <van-radio name="6">该商品降价了</van-radio>
				  <van-radio name="7">商品买错了</van-radio>
				  <van-radio name="8">不想买了</van-radio>
				  <van-radio name="9">其他渠道价格更低</van-radio>
				  <van-radio name="10">其他</van-radio>
				</van-radio-group>
				
				
			</view>
		</van-action-sheet>
	</view>
</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				OrderList:{},
				time:"",
				isshow:false,
				radio:1
			}
		},
		onLoad(e) {
			let _this = this;
			_this.getOrderList(e.orderId)
			
		},
		methods: {
			getOrderList(id){
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/order/'+ id +'/searchOrderInfo',
				}).then(res => {
					console.log(res,"订单详情")
					//轮播图
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.OrderList=res.data.data;
							_this.time = new Date(res.data.data.createDate) 
							
						}
					}
				});
			},
			quxiaodingdan(){
				this.isshow = true;
			},
			//关闭市区
			onClose() {
				this.isshow = false;
			},
			onCancel() {
				//点击取消
				this.isshow = false;
			},
			onChange(event){
				this.radio = event.detail
			}
		}
	}
</script>

<style lang="scss" scoped>
	.isquxiao{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(184,184,184,1);
	}
	.header{
		height: 122rpx;
		width: 100%;
		background-color: #F5F5F5;
		padding-top: 34rpx;
		box-sizing: border-box;
		.header-view{
			width:750rpx;
			height:66rpx;
			background:rgba(255,255,255,1);
			display: flex;
			.view1{
				width: 384rpx;
				height: 100%;
				line-height: 50rpx;
				padding-top: 8rpx;
				box-sizing: border-box;
				view{
					margin-left: 72rpx;
					display: inline-block;
					vertical-align: middle;
					width:38rpx;
					height:38rpx;
					border: 1rpx solid;
				}
				text{
					display: inline-block;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					vertical-align: middle;
					margin-left: 46rpx;
				}
			}
			.view2{
				height: 100%;
				line-height: 50rpx;
				padding-top: 8rpx;
				box-sizing: border-box;
				view{
					display: inline-block;
					vertical-align: middle;
					width:38rpx;
					height:38rpx;
				}
				text{
					display: inline-block;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					vertical-align: middle;
					margin-left: 46rpx;
				}
			}
		}
	}
	.content{
		width: 100%;
		.service{
			width: 100%;
			height: 64rpx;
			border-bottom: 1rpx solid #F5F5F5;
			box-sizing: border-box;
			line-height: 64rpx;
			padding-left: 46rpx;
		}
		.service::before{
			display: inline-block;
			width:6rpx;
			height:25rpx;
			content: "";
			vertical-align: middle;
			background-color: red;
			margin-right: 10rpx;
		}
		.serviceName{
			width: 100%;
			height: 184rpx;
			display: flex;
			border-bottom: 1rpx solid #F5F5F5;
			.view1{
				width: 144rpx;
				height: 144rpx;
				margin-top: 24rpx;
				margin-left: 44rpx;
				background-color: red;
			}
			.view2{
				font-size:24rpx;
				margin-top: 30rpx;
				margin-left: 20rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(138,138,138,1);
			}
			.view3{
				width:100rpx;
				font-size:26rpx;
				margin-top: 30rpx;
				margin-left: 316rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,0,0,1);
				.number{
					float: right;
					font-size:20rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(184,184,184,1);
					margin-top: 8rpx;
				}
			}
		}
		.serviceType{
			margin-top: 8rpx;
			width: 100%;
			height: 184rpx;
			border-bottom: 1rpx solid #F5F5F5;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(138,138,138,1);
			padding: 0 60rpx;
			box-sizing: border-box;
			view{
				margin-bottom: 12rpx;
			}
		}
		.serviceCost{
			width: 100%;
			height: 164rpx;
			border-bottom: 1rpx solid #F5F5F5;
			padding: 0 60rpx;
			margin-top: 14rpx;
			box-sizing: border-box;
			.serviceCost-box{
				display: flex;
				justify-content: space-between;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(138,138,138,1);
				margin-bottom: 25rpx;
			}
		}
		.payment{
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: flex-end;
			padding: 0 60rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F5F5F5;
			text{
				color: red;
			}
		}
		.QRCode{
			height: 695rpx;
			width: 100%;
			.view1{
				margin-top: 29rpx;
				text-align: center;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			.view2{
				color:rgba(138,138,138,1);
				opacity:1;
				margin-top: 10rpx;
				text-align: center;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
			}
			.view3{
				width: 358rpx;
				height: 346rpx;
				margin: 0 auto;
				margin-top: 18rpx;
				background-color: red;
			}
		}
	}
	.footer{
		position: fixed;
		bottom: -7rpx;
		border-top: 1rpx solid #F5F5F5;
		height: 75rpx;
		color: #8A8A8A;
		.footer-view{
			width:750rpx;
			height:66rpx;
			background:rgba(255,255,255,1);
			display: flex;
			.view1{
				width: 375rpx;
				height: 100%;
				line-height: 50rpx;
				padding-top: 8rpx;
				box-sizing: border-box;
				view{
					margin-left: 69rpx;
					display: inline-block;
					vertical-align: middle;
					width:38rpx;
					height:38rpx;
					border: 1rpx solid;
				}
				text{
					display: inline-block;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					vertical-align: middle;
					margin-left: 67rpx;
				}
			}
			.view3{
				width: 0rpx;
				height:42rpx;
				margin-top: 18rpx;
				border:2rpx solid rgba(245,245,245,1);
			}
			.view2{
				height: 100%;
				line-height: 50rpx;
				padding-top: 8rpx;
				box-sizing: border-box;
				view{
					margin-left: 69rpx;
					display: inline-block;
					vertical-align: middle;
					width:38rpx;
					height:38rpx;
					border: 1rpx solid;
				}
				text{
					display: inline-block;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					vertical-align: middle;
					margin-left: 67rpx;
				}
			}
		}
	}
</style>
