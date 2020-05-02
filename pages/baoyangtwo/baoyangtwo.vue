<template>
	<view style="background: #F6F6F6;">
		<view class="buyTire-header">
			<view class="cont" @click="setcarttow">
				<view class="zi">{{cart}}</view>
				<view class="tu"><van-icon name="arrow-down" /></view>
			</view>
			<view class="xian"></view>
			<view class="cont">
				<view class="zi">当前里程</view>
				<input type="text" placeholder="请输入" value="" @input="getKm" />
				<view class="licheng">KM</view>
			</view>
		</view>
		<view class="baoyangtwo-baoyang">常规保养项目(1/6)</view>
		
		<view class="baoyangtwo-box">
			<image class="baoyangtwo-box-image" src="../../static/home/xuanzhon.png" mode=""></image>
			<view class="baoyangtwo-box-cont">
				<view>小保养服务</view>
				<view class="baoyangtwo-box-cont-view">5000KM或6个月/次</view>
			</view>
			<view class="baoyangtwo-box-caozuo">
				<view class="view1">优惠券</view>
				<view class="view2">|</view>
				<view class="view3">编辑</view>
			</view>
			<view class="baoyangtwo-box-details">
				<image class="image" src="../../static/home/content3.png" mode=""></image>
				<view class="view1">
					<view>阿萨的博文附件为肯即可儿的博客和的说的那件事</view>
					<view><text class="text">全合成</text></view>
					<view class="jiawei">
						<text class="jiaqian">$299.00</text>
						<text class="danwei">X1</text>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="baoyangtwo-box">
			<image class="baoyangtwo-box-image" src="../../static/home/noXuanzhon.png" mode=""></image>
			<view class="baoyangtwo-box-cont">
				<view>小保养服务</view>
				<view class="baoyangtwo-box-cont-view">5000KM或6个月/次</view>
			</view>
			<view class="baoyangtwo-box-caozuo">
				<view class="view4">￥48</view>
			</view>
		</view>
	<van-collapse :value="activeNames" @change="onChange" class="baoyangtwo-box">
			  <van-collapse-item title="有赞微商城" name="1">
				<view class="baoyangtwo-box-details">
					<image class="image" src="../../static/home/content3.png" mode=""></image>
					<view class="view1">
						<view>阿萨的博文附件为肯即可儿的博客和的说的那件事</view>
						<view><text class="text">全合成</text></view>
						<view class="jiawei">
							<text class="jiaqian">$299.00</text>
							<text class="danwei">X1</text>
						</view>
					</view>
				</view>
			  </van-collapse-item>
			  <van-collapse-item title="有赞零售" name="2">
				<view class="baoyangtwo-box-details">
					<image class="image" src="../../static/home/content3.png" mode=""></image>
					<view class="view1">
						<view>阿萨的博文附件为肯即可儿的博客和的说的那件事</view>
						<view><text class="text">全合成</text></view>
						<view class="jiawei">
							<text class="jiaqian">$299.00</text>
							<text class="danwei">X1</text>
						</view>
					</view>
				</view>
			  </van-collapse-item>
			  <van-collapse-item title="有赞美业" name="3" disabled>
				<view class="baoyangtwo-box-details">
					<image class="image" src="../../static/home/content3.png" mode=""></image>
					<view class="view1">
						<view>阿萨的博文附件为肯即可儿的博客和的说的那件事</view>
						<view><text class="text">全合成</text></view>
						<view class="jiawei">
							<text class="jiaqian">$299.00</text>
							<text class="danwei">X1</text>
						</view>
					</view>
				</view>
			  </van-collapse-item>
			</van-collapse>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				userid:'',
				cart:'',//当前车型
				km:0,
				activeNames: ['1']
			}
		},
		onHide() {
			const _this = this;
			uni.getStorage({
				key:"nowcar",
				success(res) {
					if(res.data){
						_this.cart = res.data
					}
				}
			})
		},
		onShow() {
			const _this = this;
			uni.getStorage({
				key:"nowcar",
				success(res) {
					if(res.data){
						_this.cart = res.data
					}
				},
				fail() {
					uni.navigateTo({
						url:"../getCartType/getCartType"
					})
				}
				
			})
		},
		onLoad() {
			const _this = this;
			_this.getList()
			
		},
		methods: {
			onChange(event) {
							 const _this = this;
			     _this.activeNames= event.detail
			 },
			getKm(e){
				_this.km = e.detail.value
				// /pmain/pmainAll
				post.gets({
					method: 'POST',
					url: '/pmain/pmainAll',
					data:{
						vehicle:_this.cart,
						gongli:_this.km
					}
				}).then(res => {
					console.log(res,"保养商品分类")
				})
			},
			//获取保养分类
			// getCartType
			getList(){
				const _this = this;
				uni.getStorage({
				  key: 'login',
				  success (res) {
					_this.userid = res.data.userId
					if(_this.userid){
						post.gets({
							method: 'POST',
							url: '/car/'+ _this.userid +'/carUserAll',
						}).then(res => {
							//轮播图
							if (res.statusCode === 200) {
								if (res.data.code == 0) {
									if(res.data.totalCount==0){
										uni.getStorage({
											key:"nowcar",
											success(res) {
												if(res.data){
													_this.cart = res.data
												}
											},
											fail() {
												uni.navigateTo({
													url:"../getCartType/getCartType"
												})
											}
											
										})
										
									}
								}
							}
						});
					}
				  }
				})
			},
			setcarttow(){
				uni.navigateTo({
					url:"../getCartType/getCartType"
				})
			}
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
				margin-left: 60rpx;
			}
			.tu{
				font-size: 30rpx;
				margin-left: 12rpx;
			}
			input{
				width: 80rpx;
				font-size: 24rpx;
			}
			.licheng{
				font-size:24rpx;
			}
		}
		.xian{
			width:2rpx;
			height:42rpx;
			background:rgba(112,112,112,1);
			margin-top: 16rpx;
		}
	}
	.baoyangtwo-baoyang{
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.baoyangtwo-box::before{
		content: "";
		position: absolute;
		width: 100%;
		height: 2rpx;
		background: #AAAAAA;
		top: 100rpx;
	}
	.baoyangtwo-box{
		position: relative;
		display: flex;
		margin-bottom: 20rpx;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		.baoyangtwo-box-image{
			width: 40rpx;
			height: 40rpx;
			margin-top: 34rpx;
			margin-left: 34rpx;
		}
		.baoyangtwo-box-cont{
			font-size: 24rpx;
			margin-left: 10rpx;
			margin-top: 20rpx;
			.baoyangtwo-box-cont-view{
				color: #AAAAAA;
			}
		}
		.baoyangtwo-box-caozuo{
			display: flex;
			font-size: 24rpx;
			margin-top: 20rpx;
			margin-left: 280rpx;
			.view1{
				color: #B99A70;
			}
			.view2{
				margin: 0 8rpx;
				color: #AAAAAA;
			}
			
		}
	}
	.baoyangtwo-box-details{
		display: flex;
		position: relative;
		width: 650rpx;
		margin-top: 18rpx;
		margin-left: 100rpx;
		height: 160rpx;
		border-bottom: 3rpx solid #AAAAAA;
		.image{
			width: 100rpx;
			height: 120rpx;
			margin-top: 25rpx;
		}
		.view1{
			width: 450rpx;
			margin-left: 80rpx;
			font-size: 26rpx;
			margin-top: 20rpx;
			.text{
				padding: 3rpx 6rpx;
				font-size: 20rpx;
				border: 1rpx solid #AAAAAA;
				border-radius: 8rpx;
			}
			.jiaqian{
				color: #9B5568;
			}
		}
		.jiawei{
			position: absolute;
			top: 125rpx;
			font-size: 22rpx;
		}
		.danwei{
			font-size: 20rpx;
			margin-left: 320rpx;
		}
	}
	.view4{
		color: #989598;
		font-size: 30rpx;
		width: 100rpx;
		text-align: center;
	}
</style>
