<template>
	<view class="invitation-box">
		<image :src="image" mode=""></image>
		<view>您可凭此邀请码分享给其他人</view>
		<button type="default" @click="invitationClick">保存图片至手机</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image:'https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/qrcode.jpg'
			}
		},
		methods: {
			invitationClick(){
				uni.downloadFile({
						url: this.image,
						success: (res) =>{
							if (res.statusCode === 200){
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.showToast({
											title: "保存成功",
											icon: "none"
										});
									},
									fail: function() {
										uni.showToast({
											title: "保存失败，请稍后重试",
											icon: "none"
										});
									}
								});
							}
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	.invitation-box{
		width: 100%;
		height: 100%;
		image{
			width:494rpx;
			margin-left: 128rpx;
			margin-top: 270rpx;
			height:494rpx;
		}
		view{
			width: 100%;
			text-align: center;
			margin-top: 48rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(103,103,103,1);
		}
		button{
			width:538rpx;
			height:100rpx;
			background:rgba(216,55,56,1);
			border-radius:20rpx;
			font-size:40rpx;
			font-family:PingFang SC;
			font-weight:500;
			line-height:104rpx;
			margin-top: 186rpx;
			color:rgba(255,255,255,1);
		}
	}
</style>
