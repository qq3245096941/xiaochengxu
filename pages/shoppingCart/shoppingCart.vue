<template>
	<view style="background:#F5F5F5;">
		<view class="tishi">
			<van-icon name="fail" color="red" class="isfail" /> 向左滑动删除 
		</view>
		<van-swipe-cell right-width="100" left-width="0" class="" v-for="(item,index) in comList" :key="item.cartId"> 
		  <van-cell-group>
			<van-cell title="单元格" value="内容"/>
				<view class="iscontent">
						<view class="isState">
							<view class="isStateLeft">
								订单编号：<!-- {{}} -->
							</view>
							<view class="isStateRight">
								<!-- {{}} -->
								<!-- 待付款 -->
							</view>
						</view>
						<view class="collection-box" @click="goToDetls(item.commdityId)">
							<image class="collection-box-image" 
							:src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+item.commdityThnmbnail"
							 mode=""></image>
							<view class="iscors">
								<view class="collection-box-view">{{item.commdityName}}</view>
								<view class="collection-box-text">
									<view class="collection-box-textleft">
										共{{item.commdityCount}}件
									</view>
									<view class="collection-box-textright">
										￥{{item.commdityPrice*item.commdityCount}}
									</view>
								</view>
							</view>
						</view>
						<!-- 底部付款 -->
						<view class="gotobuy">
							<!-- 创建订单并跳转 -->
							<!-- @click="JoinCart2(userid,orderStatus,item.commdityPrice*item.commdityCount,payStat,item.storeId,item.commdityCount,item.commdityId,item.commdityName)" -->
							<view class="buyson" @click="JoinCart2(userid,orderStatus,item.commdityPrice*item.commdityCount,payStat,item.storeId,item.commdityCount,item.commdityId,item.commdityName)">
								微信支付
							</view>
							<view class="buyson">
								预约
							</view>
						</view>
				</view>
		  </van-cell-group>
		  <view slot="right" @click="removeItem(item.cartId)" style="height:328rpx;line-height:328rpx;background:red;color:#fff;width:200rpx;text-align:center;">删除</view>
		</van-swipe-cell>
	
	</view>	

		<!-- 没有收藏时sss -->
		<!-- <view class="nothingShopp">
			<image class="nothingShopp-image" src="../../static/home/content3.png" mode=""></image>
			<view class="nothingShopp-view">购物车为空</view>
			<view class="nothingShopp-view2">去逛逛</view>
		</view> -->
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				page: 1, //商品页数
				comList: [], //商品列表
				comListSon: [],
				userid:'' , 
				orderStatus:0,
				payStat:0,
			}
		},
		mounted(){
			
		},
		methods: {
			//获取购物车数据
			getcomList(page) {
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/cart/'+ _this.userid +'/cartAll?page='+ page +'&rows=10',
				}).then(res => {
					//轮播图
					console.log(res,"购物车数据")
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.comListSon=res.data.cartList;
							Array.prototype.push.apply(_this.comList, _this.comListSon); //合并加载更多的数据与源数据.
						}
					}
				});
			},
			//删除购物车
			removeItem(id){
				const _this = this;
				post.gets({
					method: 'POST',
					url: '/cart/delCart',
					data:{
						cartId:id
					}
				}).then(res => {
					//轮播图
					_this.comList=[] //商品列表
					_this.comListSon= []
					_this.getcomList(_this.page)
				});
			},
			goToDetls(id){ //跳转去详情
				uni.navigateTo({
					url: '../storeDels/storeDels?id=' + id
				});
			},
			isupdatecart(){  ///cart/upCart  更新购物车数量
				
			},
			JoinCart2(userId,orderStatus,sumPrice,payStat,storeId,commdityCount,commdityId,body){//创建订单
				uni.navigateTo({
					url:'../yesOrder/yesOrder?userId='+ userId+ "&orderStatus="+ orderStatus  +"&sumPrice="+ sumPrice  +"&payStat="+payStat+"&storeId="+ storeId+  "&commdityCount="+ commdityCount    + "&commdityId=" + commdityId +  "&body=" + body  
				})
			}
				

		},
		onReachBottom: function() {
			console.log('触底');
			const _this = this;
			_this.page++;
			_this.getcomList(_this.page); //获取商品列表
		},
		onLoad() {
			const _this = this;
			wx.getStorage({
			  key: 'login',
			  success (res) {
				_this.userid = res.data.userId
				_this.getcomList(_this.page)
			  }
			})
		}
	}
</script>

<style lang="scss" scoped>
	.gotobuy{  //购买
		width:100%;
		height:78rpx;
		.buyson{
			float: right;
			margin-right:30rpx;
			height: 48rpx;
			margin-top:10rpx;
			border-radius:10rpx;
			border:1rpx solid rgba(255,0,2,1);
			padding:0rpx 20rpx;
			font-size:24rpx;
			line-height:48rpx;
			color:red;
		}
	}
	.iscors{
		width: auto;
		height: 184rpx;
	}
	//订单号和支付状态
	.isState{
		height: 64rpx;
		width: 100%;
		.isStateLeft{ //订单号和支付状态
			font-size:20rpx;
			text-indent:44rpx;
			display:inline-block;
			width:50%;
			color:rgba(138,138,138,1);
		}
		.isStateRight{  //支付状态
			display:inline-block;
			font-size:30rpx;
			color:rgba(255,179,0,1);
			width:50%;
			text-indent:200rpx;
		}
		
		
		
	}
	.isfail{
		width: 22rpx;
		height: 22rpx;
		float: left;
		margin-left:44rpx;
		margin-top:16rpx;
	}
	//提示
	.tishi{
		width: 100%;
		height: 40rpx;
		line-height:50rpx;
		font-size:22rpx;
		color:#000;
	}
	.iscontent{
		width: 100%;
		height: 328rpx;
		margin-top:28rpx;
		
		background: #fff;
	}
	.collectionYuan{
		background: red;
	}
	/* 有数据 */
	.shoppingCartBottom{
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		.yuan{
			margin: 0 0 0 32rpx;
		}
		.quanxuan{
			font-size:24rpx;
			color:rgba(138,138,138,1);
			margin-left: 10rpx;
		}
		.quxiao{
			width:244rpx;
			height:62rpx;
			background:rgba(216,55,56,1);
			border-radius:32rpx;
			margin-left: 344rpx;
			font-size:30rpx;
			color:rgba(255,255,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.yuan{
		width: 24rpx;
		height: 24rpx;
		border: 1rpx solid #000000;
		border-radius: 50%;
		margin: 100rpx 0 0 70rpx;
	}
	.shoppingCartEdit{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 660rpx;
		font-size: 22rpx;
		color:rgba(103,103,103,1);
	}
	.collection-box{
		width:750rpx;
		height:184rpx;
		background:rgba(255,255,255,1);
		display: flex;
		border-top:1rpx solid rgba(245,245,245,1);
		border-bottom:1rpx solid rgba(245,245,245,1);
	}
	.collection-box-image{
		width: 144rpx;
		height: 144rpx;
		margin-left: 42rpx;
		margin-top: 32rpx;
	}
	.collection-box-view{
		width:520rpx;
		height: 84rpx;
		font-size:24rpx;
		margin-top: 46rpx;
		margin-left:15rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(138,138,138,1);
		overflow: hidden;
	}
	.collection-box-text{
		height: 54rpx;
		margin-bottom:0;
		width: 100%;
		.collection-box-textleft{
			display:inline-block;
			color:rgba(138,138,138,1);
			font-size:20rpx;
			line-height:54rpx;
			width: 50%;
			text-indent:15rpx;
		}
		.collection-box-textright{
			display:inline-block;
			font-size:34rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,0,0,1);
			width: 50%;
			text-align:right;
		}
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
	/* 没有数据 */
	.nothingShopp{
		width:750rpx;
		background:rgba(255,255,255,1);
		opacity:1;
		height: 466rpx;
	}
	.nothingShopp-image{
		width:50px;
		height:49px;
		margin: 88rpx 324rpx 42rpx 326rpx;
	}
	.nothingShopp-view{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		margin-left: 295rpx;
		color:rgba(103,103,103,1);
	}
	.nothingShopp-view2{
		width:164rpx;
		height:64rpx;
		margin-left: 295rpx;
		margin-top: 48rpx;
		border:1rpx solid rgba(216,55,56,1);
		border-radius:20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(216,55,56,1);
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
