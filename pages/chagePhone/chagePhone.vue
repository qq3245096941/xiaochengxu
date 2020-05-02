<template>
	<view>
		<view v-if="xiayibuFlag">
			<view class="phone">
				<van-icon name="phone-o" class="image" />
				<view class="view">123****7986</view>
				<view class="button">获取验证码</view>
			</view>
			<view class="verificationCode">
				<van-icon name="phone-o" class="image" />
				<input style="margin-left: 30rpx;" @input="fnChange" type="text" v-model="verificationCode" placeholder="获取验证码" />
			</view>
			<view class="xiayibu" :class="flag?'ac':''" @tap="fnTap">下一步</view>
		</view>
		<view v-else>
			<view class="phone">
				<image class="image" src="../../static/home/icons11.png"></image>
				<input class="phoneInput" type="text" v-model="phoneInput" placeholder="请输入手机号" />
				<view class="button">获取验证码</view>
			</view>
			<view class="verificationCode">
				<image class="image" src="../../static/home/icons11.png"></image>
				<input style="margin-left: 30rpx;" @input="fnChange" type="text" v-model="verificationCode" placeholder="获取验证码" />
			</view>
			<view class="xiayibu" :class="flag?'ac':''">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verificationCode:'',
				phoneInput:'',
				flag:false,
				xiayibuFlag:true
			}
		},
		methods: {
			fnChange(){
				// 输入值按钮变色
				if(this.verificationCode){
					this.flag=true;
				}else{
					this.flag=false;
				}
			},
			fnTap(){
				this.flag=false;
				this.verificationCode="";
				this.xiayibuFlag=false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.phone{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #000000;
		background: #F7F4F8;
	}
	.ac{
		background: red !important;
		color: #FFFFFF !important;
	}
	.image{
		margin-left: 20rpx;
		width: 30rpx;
		height: 50rpx;
	}
	.view{
		margin-right: 242rpx;
	}
	.phoneInput{
		margin-right: 80rpx;
	}
	.button{
		width: 180rpx;
		height: 65rpx;
		display: flex;
		justify-content: center;
		background: red;
		color: #808080;
		font-size: 27rpx;
		align-items: center;
		margin-right: 30rpx;
		border-radius: 20rpx;
	}
	.verificationCode{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		background: #F7F4F8;
	}
	.xiayibu{
		width: 707rpx;
		height: 100rpx;
		border-radius: 20rpx;
		margin: 0 auto;
		display: flex;
		background: #F7F4F8;
		color: #C0C0C0;
		justify-content: center;
		align-items: center;
		margin-top: 50rpx;
	}
</style>
