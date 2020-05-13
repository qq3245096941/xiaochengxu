<template>
	<view class="content">
		<view class="identity">
			<view class="identity-top">
				<view class="identity-top-name">
					<van-icon name="manager-o" />
					<view>{{dizhi.userName}}</view>
				</view>
				<view class="identity-top-iphone">
					<van-icon name="phone-circle-o" />
					<view>{{dizhi.userTel}}</view>
				</view>
			</view>
			<view class="identity-bottom">
				<van-icon name="location-o" />
				<view>{{dizhi.provice}}{{dizhi.city}}{{dizhi.county}}{{dizhi.addDesc}}</view>
				<van-icon name="arrow" />
			</view>
		</view>
		<view class="commodity">
			<view class="commodity-left">
				<!-- <image class="image1" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/' + img " mode=""></image> -->
				<view>共{{commdityCount}}件商品</view>
			</view>
				<!-- <image class="image2" src="../../static/logo.png" mode=""></image> -->
		</view>
		<view class="payment">
			<view>支付方式</view>
			<view class="payment-content">在线支付</view>
			<!-- <image src="../../static/logo.png" class="image2" mode=""></image> -->
		</view>
		<view class="payment">
			<view>优惠</view>
			<view class="payment-content">折扣</view>
			<!-- <image src="../../static/logo.png" class="image2" mode=""></image> -->
		</view>
		<view class="payment">
			<view>开发票</view>
			<view class="payment-content">无需开票</view>
			<!-- <image src="../../static/logo.png" class="image2" mode=""></image> -->
		</view>
		<view class="total">
			<view class="total-box">
				<view>商品总价</view>
				<view class="red">¥{{sumPrice}}</view>
			</view>
			<!-- <view class="total-box">
				<view>安装费</view>
				<view class="delete">¥878.00</view>
			</view>
			<view class="total-box">
				<view>运费</view>
				<view class="delete">¥878.00</view>
			</view>
			<view class="total-box">
				<view>赠品</view>
				<view class="delete">¥878.00</view>
			</view>
			<view class="total-box">
				<view>优惠</view>
				<view class="col">-¥219.50</view>
			</view> -->
		</view>
		<!-- 底部付款 -->
		<view class="footer">
			<view class="footer-view1">实付：</view>
			<view class="footer-view2">¥{{sumPrice}}</view>
			<!-- <view class="footer-view3">¥1087.00</view> -->
			<view class="footer-view4" @click="wpay()">微信支付</view>
		</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				img:null,  //图片
				userid:null,//  用户id
				orderStatus:null, // 0 代表商品   1代表服务
				sumPrice:null, //商品总价
				payStat:null,//支付状态  只穿0
				storeId:null,	// 商家id  等于 commdityStore 字段   173
				commdityCount:null, //商品数量   
				commdityId:null, //商品id
				orderId:null,  //支付时的orderid
				body:null, //支付时的商品名称
				dizhi:{} ,//收货地址
			}
		},
		onShow() {
			const _this = this;
			post.gets({  // 请求收货地址  先获取默认地址
				method: "get",
				url:"/address/"+ _this.userid +"/addressUser",
			}).then(res => {
				let arr = res.data.list
				if(res.data.list.length!=0){
					for(let i in arr){
						if(arr[i].def == 0){  //有默认 
							_this.dizhi = arr[i]
						}else{  //没有默认地址
							_this.dizhi = arr[0]
						}
					}
				}else{
					uni.getStorage({  //先从本地获取地址
					  key: 'dizhi',
					  success (res) {
						  _this.dizhi = res.data
					  },
					  fail() {
					  	// uni.navigateTo({
					  	// 	url:"../dizhibianji/dizhibianji"
					  	// })
					  }
					})
				}
			})
		},
		onLoad(e) {
			console.log(e)
			const _this = this;
			_this.userid = e.userId
			_this.orderStatus = e.orderStatus
			_this.sumPrice = e.sumPrice
			_this.payStat = e.payStat
			_this.storeId = e.storeId
			_this.commdityCount = e.commdityCount 
			_this.commdityId = e.commdityId
			_this.body = e.body
			_this.img = e.img
			_this.Create() //创建订单和支付
		},
		methods: {
			Create(){
				let _this = this;
				//获取地址
				// /address/{userId}/addressUser
				post.gets({  //创建订单
					method: "get",
					url:"/address/" + _this.userid + "/addressUser",
				}).then(res => {
					if(res.data.totalCount <= 0 ){   //没有地址  设置地址
						uni.navigateTo({
							url:"../Address/Address"
						})
					}else{
						// _this.addressId = res.data
						for(let i in res.data.list){
							if( res.data.list[i].def == 0){
								_this.addressId = res.data.list[i].addressId
							}
						}
					}
				})
				
				let commJson = [{"commdityCount":_this.commdityCount,"commdityId":_this.commdityId}]
				post.gets({  //创建订单
					method: "get",
					url:"/order/addOrder",
					data:{
						userId:_this.userid,
						orderStatus:_this.orderStatus,
						sumPrice:_this.sumPrice,
						payStat:_this.payStat,
						commJson:commJson,
						
					}
				}).then(res => {
					_this.orderId = res.data.data
				})
			},
			wpay(){ //微信支付
				const _this = this;
				post.gets({  //走支付接口
					method: "POST",
					url: "/order/orderPay",
					data:{
						orderId:_this.orderId,
						body:_this.body
					}
				}).then(res => {
					uni.requestPayment({
					  appId:"wx8c99e25ad7127682",
					  timeStamp: res.data.data.timeStamp,
					  nonceStr: res.data.data.nonceStr,
					  package: res.data.data.packages,
					  signType:res.data.data.signType,
					  paySign: res.data.data.paySign,
					  success(res) {
						 console.log(_this.orderId,"_this.orderId")
						 wx.showToast({
						   title: '购买成功',
						   icon: 'none',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示succ
						   duration: 2000,      //停留时间  
						 }) 
						 //跳转订单详情页   姓名  电话 地址  商品名称  价格  图片  数量
						 uni.navigateTo({
						 	url:"../isbuyorder/isbuyorder?orderId=" + _this.orderId
						 })
					  },
					  fail(res) {
					    wx.showToast({
					      title: '支付失败',
					      icon: 'none',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示succ
					      duration: 2000,      //停留时间  
					    })
					   }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body{
		height: 100%;
	}
	.image2{
		position: absolute;
		right: 30rpx;
		width:14rpx;
		height:26rpx;
	}
	.content{
		width: 100%;
		height: 100% !important;
		background: #F5F5F5;
		.identity{
			width:750rpx;
			background:rgba(255,255,255,1);
			margin-bottom: 36rpx;
		}
		.identity-top{
			width: 100%;
			height: 80rpx;
			border-bottom: 1rpx solid #F5F5F5;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			padding: 0 30rpx 0 58rpx;
			.identity-top-name{
				width: 300rpx;
				display: flex;
				image{
					width: 38rpx;
					height: 35rpx;
				}
				view{
					margin-left: 78rpx;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,1);
				}
			}
			.identity-top-iphone{
				width: 300rpx;
				display: flex;
				align-items: center;
				.image1{
					width:35rpx;
					height:40rpx;
				}
				view{
					margin-left: 60rpx;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
				}
			}
		}
		.identity-bottom{
			width: 100%;
			display: flex;
			align-items: center;
			height: 85rpx;
			padding: 0 30rpx 0 58rpx;
			box-sizing: border-box;
			.image1{
				width:29rpx;
				height:38rpx;
			}
			view{
				margin-left: 32rpx;
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(103,103,103,1);
			}
			
		}
	}
	.commodity{
		width:750rpx;
		height:280rpx;
		background:rgba(255,255,255,1);
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 30rpx 0 58rpx;
		position: relative;
		margin-bottom: 20rpx;
		.commodity-left{
			margin-top: 66rpx;
			.image1{
				width: 90rpx;
				height: 90rpx;
			}
			view{
				margin-top: 20rpx;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(103,103,103,1);
			}
		}
		.image2{
			top: 168rpx;
		}
	}
	.payment{
		width: 100%;
		height: 70rpx;
		display: flex;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(103,103,103,1);
		background:rgba(255,255,255,1);
		border-bottom: 1rpx solid #F5F5F5;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 0 58rpx;
		box-sizing: border-box;
		.payment-content{
			padding-right: 40rpx;
			box-sizing: border-box;
		}
	}
	.total{
		width:750rpx;
		background:rgba(255,255,255,1);
		margin-top: 36rpx;
		.total-box{
			display: flex;
			height: 50rpx;
			font-size:22rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(103,103,103,1);
			background:rgba(255,255,255,1);
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 0 58rpx;
			box-sizing: border-box;
			.red{
				color: red;
			}
			.delete{
				color: #8A8A8A;
				text-decoration:line-through;
			}
			.col{
				color: #16A770;
			}
		}
	}
	.footer{
		width:750rpx;
		height:94rpx;
		display: flex;
		background:rgba(255,255,255,1);
		align-items: center;
		padding: 0 25rpx 0 58rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		.footer-view1{
			font-size:22rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(103,103,103,1);
		}
		.footer-view2{
			font-size:40rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,0,0,1);
			margin-left: 14rpx;
		}
		.footer-view3{
			font-size:18rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(138,138,138,1);
			margin-left: 16rpx;
		}
		.footer-view4{
			width:300rpx;
			height:68rpx;
			background:rgba(216,55,56,1);
			border-radius:10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size:38rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(255,255,255,1);
			margin-left: 32rpx;
		}
	}
</style>
