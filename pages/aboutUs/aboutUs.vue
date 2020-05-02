<template>
	<view>
		<view class="aboutUsImage">
			<swiper class='u-wrp-bnr' style="width:100%;height:100%" indicator-dots='true' autoplay='true' interval='5000' duration='1000' circular='true'>
				<block  v-for="(item,index) in obj.attList" :key="index"  style="width:100%;height:100%">
				  <swiper-item  style="width:100%;height:100%">
				    <image  style="width:100%;height:100%"  :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+item.amUrl" class='u-img-slide' mode='aspectFill'></image>
				  </swiper-item>
				</block>
			</swiper>
			<view class="times" v-if="obj.busHours">
				营业时间 {{obj.busHours}}
			</view>
		</view> 
		<view class="aboutUsName">
			<view class="aboutUsName-left">
				<view class="name">{{obj.storeName}}</view>
				<view class="order">总订单<text>2020</text></view>
				<view class="address">{{obj.storeAddress}}</view>
			</view>
			<view class="aboutUsName-right" @click="gotomap()">
				<view class="address"><van-icon name="location-o" size="30rpx" color="rgba(255,179,0,1)"/></view>
				<view class="Navigation">导航</view>
			</view>
		</view>
		<view style="border-bottom: 16rpx solid rgba(242,242,242,1);margin-bottom: 14rpx;">
			<view class="aboutUsService">服务</view>
			<!-- 服务商品列表  -->
			<view class="aboutUsService-box"
			 v-for="(item,index) in commentList" 
			 @click="setIndex(index,item.servicePrice,item.serviceName)"
			  :key="index">
					<view class="aboutUsService-box-cont" :class="index==isIndex?'xuanzhong':''">
						<view :class="index==isIndex?'tubiao1':'tubiao2'">
							√
						</view>
						<view class="fuwu" style="width:530rpx">{{item.serviceName}}</view>
						<view style="text-align: center;">
							<view class="jiaqian">{{item.servicePrice}}</view>
							<view class="s">{{item.oldPrice}}</view>
						</view>
					</view>
			</view>
		</view>
		<view style="border-bottom: 16rpx solid rgba(242,242,242,1);">
			<view class="aboutUsService-box2" v-for="(item,index) in aboutUsServiceList2" :key="index">
				<view class="aboutUsService-box-cont2">
					<view class="fuwu2">{{item.fuwu}}</view>
					<view>
						<navigator :url="item.navlink" v-if="item.navlink">
						<view class="jiaqian2">{{item.presentPrice}}</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="aboutUsService">全部评价<text>(88)</text></view>
			<view class="evaluate">
				<view class="evaluate-top">
					<image src="../../static/home/icons1.png" mode=""></image>
					<view class="evaluate-top-cont">
						<view class="evaluate-top-cont-shang">
							<view style="color: #000000;">m****iii</view>
							<view style="margin-left: -200rpx;">牌子 车型</view>
							<view>2019.11.11</view>
						</view>
						<view class="evaluate-top-cont-xia">*****<view>5.0</view></view>
					</view>
				</view>
				<view class="evaluate-cont">评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论</view>
				<view class="evaluate-address">地址</view>
				<view class="evaluate-address evaluate-time">购买时间：2010.01.01</view>
			</view>
		</view>
		<view class="aboutUsFooter">
			<view class="aboutUsFooter-left">
				<view class="jiaqian">¥{{price}}</view>
				<view class="fuwu">{{itemname}}</view>
			</view>
			<view class="aboutUsFooter-cent">
				<image src="../../static/home/xia.png" mode=""></image>
				<view>在线咨询</view>
			</view>
			<view class="aboutUsFooter-right" @click="isPay">去结算</view>
		</view>
		 <!--  结算弹框 -->
		<van-action-sheet :show="isshow1"
			class="guige"
		   @close="onClose1"
		   @cancel="onCancel1"
		   :title="itemname">
		   <view class="isguige">
		   		<!-- 购物车规格标题 -->
				<view class="yishou">
					已售: 148
				</view>
				<view class="guoqitui">
					
				</view>
				<view class="dizhi">
					
				</view>
				<view class="queding">
					
					<button class="btn" @click="JoinCart">立即结算</button>
				</view>
		   </view>
		</van-action-sheet>
	</view>
</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				isshow1:false,  //model 层的显示隐藏
				isIndex:0, //当前选中的商品
				id:'', //当前门店id 
				obj:{},//门店详情信息
				distanceX:null,  
				distanceY:null,
				price:null,//当前商品价格
				commentList:[],  //商品信息
				itemname:"", //底部结算服务名称
				aboutUsServiceList2:[{
					fuwu:"轮胎服务",
					presentPrice:"换轮胎",
					navlink:'../buyTire/buyTire'
				},{
					fuwu:"保养服务",
					presentPrice:"做保养",
					navlink:'../baoyangtwo/baoyangtwo'
				},{
					fuwu:"安装服务"
				}]
			}
		},
		methods: {
			getStoreList(){
				const _this = this;
				post.gets({
					method: "POST",
					url: "/store/"+ _this.id +"/searchInfo",
					data:{
						page:1,
						rows:10
					}
				}).then(res => {
					console.log(res,"门店详情")
					if(res.statusCode===200&&res.data.code==0){
						_this.obj = res.data.obj
						_this.distanceX = res.data.obj.distanceX
						_this.distanceY = res.data.obj.distanceY
						_this.commentList = res.data.serviceList
						if(res.data.serviceList.length!==0){
							_this.price = res.data.serviceList[0].servicePrice
							_this.setIndex(0,_this.commentList[0].servicePrice,_this.commentList[0].serviceName)
						}else{
							_this.price = "暂无"
						}
					}
				})
			},
			setIndex(index,price,name) {
				const _this = this;
				_this.isIndex = index //当前选中的index
				_this.price = price
				_this.itemname = name
			},
			//结算  弹出model层
			isPay(){   
				this.isshow1 = true
			},
			onClose1() {
				this.isshow1 = false   //隐藏
			},
			onCancel1(){
				this.isshow1 = false   //隐藏
			},
			gotomap(){
				// 地图导航
				const _this = this;
				uni.navigateTo({
					url:"../isMap/isMap?distanceX=" + _this.distanceX + "&distanceY=" + _this.distanceY 
				})
			}
			
			
		},
		onLoad(id) {
			const _this = this;
			// _this.id = id.id
			_this.id = 401
			_this.getStoreList()
		}
	}
</script>

<style lang="scss" scoped>
	//下拉弹框
	.guige{
		width: 92%;
		margin-left:4%;
		.isguige{
			height: 420rpx;
			padding-left:15rpx;
			padding-right:15rpx;
			padding-bottom:10rpx;
			.yishou{
				width: 100%;
				height:72px;
				font-size:22rpx;
				font-family:PingFang SC;
				font-weight:500;
				line-height:72rpx;
				color:rgba(0,0,0,1);
			}
			.guoqitui{
				width: 750rpx;
				margin-left:-14rpx;
				height: 70rpx;
				line-height:70rpx;
				border-bottom:1rpx solid rgba(112,112,112,1);
				border-top:1rpx solid rgba(112,112,112,1);
			}
			.dizhi{
				width: 100%;
				height: 178rpx;
				background: skyblue;
			}
		}
	}
	.queding{
		width: 92%;
		margin-left:4%;
		.btn{
			width: 40%;
			float: right;
			height: 68rpx;
			line-height:68rpx;
			font-size:30rpx;
			background: #D83738FF;
			color:#fff;
		}
	}
	// 
	.xuanzhong{
		// background: red;
	}
	.tubiao1{
		background: rgba(26,173,25,1);
		display:inline-block;
		width: 28rpx;
		height: 28rpx;
		border-radius:50%;
		text-align:center;
		font-size:16rpx;
		line-height:28rpx;
		color:#fff;
	}
	.tubiao2{
		background: rgba(184,184,184,1);
		display:inline-block;
		width: 28rpx;
		height: 28rpx;
		border-radius:50%;
		text-align:center;
		font-size:16rpx;
		line-height:28rpx;
		color:#fff;
	}
	.aboutUsImage{
		width: 750rpx;
		height: 562rpx;
		position: relative;
		.times{
			position: absolute;
			left:0;
			bottom:0;
			width: 328rpx;
			height: 58rpx;
			line-height:58rpx;
			text-indent:1em;
			color:#fff;
			background: rgba(0,0,0,.7);
			z-index:1;
			font-size:22rpx
		}
	}
	.aboutUsName{
		width: 100%;
		height: 180rpx;
		display: flex;
		padding: 0 56rpx;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 16rpx solid rgba(242,242,242,1);
	}
	.aboutUsName-left{
		margin-top: 26rpx;
		.name{
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(0,0,0,1);
		}
		.order{
			margin-top: 14rpx;
			font-size:20rpx;
			font-family:PingFang SC;
			font-weight:400;
			text{
				color:rgba(255,179,0,1);
				margin-left: 5rpx;
			}
		}
		.address{
			font-size:20rpx;			
			margin-top: 12rpx;
			font-family:PingFang SC;
			font-weight:bold;
			text-align:center;
		}
	}
	.aboutUsName-right{
		margin-top: 30rpx;
		image{
			width:35rpx;
			margin-left: 10rpx;
			height:38rpx;
		}
		.address{
			margin-top: 10rpx;
			font-size:16rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(138,138,138,1);
		}
		.Navigation{
			font-size:20rpx;
			font-family:PingFang SC;
			font-weight:bold;
			margin-top: 6rpx;
			margin-left: 10rpx;
		}
	}
	.aboutUsService{
		height: 86rpx;
		width: 100%;
		border-bottom: 2rpx solid rgba(242,242,242,1);
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		padding-left: 46rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
		>text{
			margin-left: 50rpx;
			font-size: 20rpx;
			color:#e8e8e8;
		}
	}
	.aboutUsService-box{
		height: 96rpx;
		width: 100%;
		display: flex;
		padding-top: 28rpx;
		box-sizing: border-box;
		image{
			width:28rpx;
			height:28rpx;
			margin-left: 40rpx;
		}
		.aboutUsService-box-cont{
			margin-left: 12rpx;
			width:671rpx;
			height: 100%;
			border-bottom:2rpx solid rgba(232,232,232,1);
			padding: 0 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.fuwu{
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:bold;
			}
			.jiaqian{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(216,55,56,1);
			}
			.s{
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(107,106,106,1);
				text-decoration: line-through;
			}
		}
	}
	.aboutUsService-box2{
		height: 68rpx;
		width: 100%;
		display: flex;
		padding-top: 18rpx;
		box-sizing: border-box;
		.aboutUsService-box-cont2{
			margin-left: 80rpx;
			width:671rpx;
			height: 100%;
			border-bottom:2rpx solid rgba(232,232,232,1);
			padding: 0 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.fuwu2{
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:bold;
			}
			.jiaqian2{
				padding: 2rpx 18rpx;
				background:rgba(255,255,255,1);
				border:2rpx solid rgba(216,55,56,1);
				border-radius:6px;
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(216,55,56,1);
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.evaluate{
		width: 719rpx;
		height: 286rpx;
		margin-left: 32rpx;
		border-bottom:2rpx solid rgba(232,232,232,1);
		margin-bottom: 82rpx;
		.evaluate-top{
			margin-top: 22rpx;
			width:676rpx;
			display: flex;
			image{
				width:68rpx;
				height:68rpx;
				margin-right: 26rpx;
			}
			.evaluate-top-cont{
				width: 486rpx;
				.evaluate-top-cont-shang{
					display: flex;
					justify-content: space-between;
					font-size:20rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(138,138,138,1);
				}
				.evaluate-top-cont-xia{
					letter-spacing: 10rpx;
					color: #EB1010;
					display: flex;
					view{
						display: inline-block;
						font-size: 20rpx;
						font-family:PingFang SC;
						font-weight:500;
					}
				}
			}
		}
		.evaluate-cont{
			width:676rpx;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(103,103,103,1);
		}
		.evaluate-address{
			font-size:20rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(103,103,103,1);
			margin-top: 18rpx;
		}
	}
	.aboutUsFooter{
		width:750rpx;
		height:84rpx;
		background:rgba(255,255,255,1);
		border-top:1rpx solid rgba(112,112,112,1);
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
		.aboutUsFooter-left{
			width:395rpx;
			height:64rpx;
			border-right:1px solid rgba(221,221,221,1);
			margin-left: 20rpx;
			.jiaqian{
				font-size:35rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(216,55,56,1);
			}
			.fuwu{
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(138,138,138,1);
			}
		}
		.aboutUsFooter-cent{
			margin-left: 24rpx;
			text-align: center;
			image{
				width:37rpx;
				height:35rpx;
			}
			view{
				font-size:16rpx;
				font-family:PingFang SC;
				font-weight:bold;
				margin-top: -8rpx;
			}
		}
		.aboutUsFooter-right{
			margin-left: 20rpx;
			width:300rpx;
			background:rgba(255,0,0,1);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
	}
</style>
