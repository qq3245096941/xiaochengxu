<template>
	<view>
		<view class="box" :key="index" v-for="(cart,index) in cartList">
			<image class="back" src="../../static/aicheback.png" mode="widthFix"></image>
			<van-row>
				<van-col span="6">
					<view style="text-align: center;margin-top: 50rpx;">
						<image class="logo" :src="cart.carLogo" mode="widthFix"></image>
					</view>
				</van-col>
				<van-col span="18">
					<view class="message">
						<view  style="font-size: 30rpx;font-weight: bold;">{{cart.carName}}</view>
						<view style="margin-top: 20rpx;">
							<text class="btn" @click="setDef(cart.mycarId)">{{cart.isDefault==='1'?'已设置默认':'设为默认'}}</text>
							<text class="btn" style="margin-left: 20rpx;" @click="removeCart(cart.mycarId)">删除车型</text></view>
					</view>
				</van-col>
			</van-row>
		</view>
		
		<view @click="gotogetCartType" class="addCart">新增车辆</view>
	</view>

</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				userid: null,
				cartnumber: null,
				cartList: [],
			}
		},
		onLoad() {
			const _this = this;
			uni.getStorage({ //获取userid
				key: 'login',
				success(res) {
					_this.userid = res.data.userId
					if (_this.userid) {
						_this.getMyCart()
					}
				}
			})
		},
		onShow() {
			const _this = this;
			_this.getMyCart()
		},
		methods: {
			//查询爱车档案
			getMyCart(id) {
				post.gets({
					method: "POST",
					url: "/car/" + uni.getStorageSync('login').userId + "/carUserAll",
				}).then(res => {
					if (res.statusCode == 200) {
						this.cartList = res.data.list;
					}
				})
			},
			/* 新增车型 */
			gotogetCartType() {
				uni.navigateTo({
					url: "../getCartType/getCartType"
				})
			},
			/* 删除车辆 */
			removeCart(id) {
				post.gets({
					method: "POST",
					url: "/car/" + id + "/delCar",
				}).then(res => {
					this.getMyCart()
				})
			},
			//设置默认
			setDef(id) {
				const _this = this;
				post.gets({
					method: "POST",
					url: "/car/" + uni.getStorageSync('login').userId + "/" + id + "/upDefCar",
				}).then(res => {
					_this.getMyCart()
				})
			}
		}
	}
</script>

<style scoped>
	.addCart{
		position: fixed;
		width: 100%;
		background-color: #ed4014;
		color: #fff;
		text-align: center;
		bottom: 0;
		padding: 20rpx 0;
	}
	
	.box {
		position: relative;
		padding: 10rpx 10rpx 0 10rpx;
		height: 300rpx;
	}

	.box .back {
		width: 97%;
		height: 100%;
		z-index: -1;
		position: absolute;
	}

	.box .logo {
		width: 100rpx;
		height: 100rpx;
	}
	
	.box .message{
		color: #fff;
		margin-top: 50rpx;
	}
	
	.box .message .btn{
		font-size: 20rpx;
		border: 1rpx solid #fff;
		padding: 10rpx;
	}
</style>
