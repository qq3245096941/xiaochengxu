<template>
	<view style="width:100%;background: #F7F4F8;height: 100%;">
		<view class="opinion-box">
			<textarea class="opinion-box-textarea" v-model="opinionContent" placeholder="请输入要反馈的内容" />
			<view class="opinion-box-zishu">0/255</view>
			<view class="opinion-box-tishi">请提供相关问题的截图或照片</view>
			<van-uploader :file-list="fileList" @after-read="afterRead" max-count="3">
			<view class="opinion-box-view">
				<image class="opinion-box-view-image" src="../../static/home/icons14.png" mode=""></image>
				<view class="opinion-box-view-zishu">0/3</view>
			</view>
			</van-uploader>
		</view>
		<view class="opinion-phone">
			<text class="opinion-phone-text">手机号码</text>
			<input class="opinion-phone-input" type="text" value="" />
		</view>
		<view class="opinion-button" @tap="fnClick">提交反馈</view>
	</view>
</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				fileList:[],
				opinionContent:null
			}
		},
		methods: {
			fnClick(){
				post.gets({
					method: "get",
					url: "/opionion/addOpionion?userId=20794&opinionContent="+this.opinionContent,
				}).then(res => {
					uni.showToast({
					    title: "添加"+res.data.message,
					    duration: 2000
					});
					setTimeout(function(){
						uni.switchTab({
						    url: '/pages/Mine/Mine'
						});
					}, 1000);
					
				});
			},
			afterRead(event) {
				const { file } = event.detail;
				// 需要接口调试
				this.fileList.push(event.detail.file);
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				// wx.uploadFile({
				//   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
				//   filePath: file.path,
				//   name: 'file',
				//   formData: { user: 'test' },
				//   success(res) {
				// 	// 上传完成需要更新 fileList
				// 	const { fileList = [] } = this.data;
				// 	fileList.push({ ...file, url: res.data });
				// 	this.setData({ fileList });
				//   }
				// });
			  }
		}
	}
</script>

<style>
	.opinion-box{
		width:750rpx;
		height:572rpx;
		background:rgba(255,255,255,1);
		padding: 30rpx 38rpx 0 40rpx;
		box-sizing: border-box;
	}
	.opinion-box-textarea{
		width: 100%;
		height: 270rpx;
	}
	.opinion-box-zishu{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(184,184,184,1);
		margin-left: 592rpx;
	}
	.opinion-box-tishi{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(103,103,103,1);
		margin-top: 26rpx;
	}
	.opinion-box-view{
		width:124rpx;
		height:124rpx;
		margin-top: 38rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(245,245,245,1);
	}
	.opinion-box-view-image{
		width:58rpx;
		height:44rpx;
		margin-left: 32rpx;
		margin-top: 34rpx;
	}
	.opinion-box-view-zishu{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(184,184,184,1);
		margin-left: 42rpx;
	}
	.opinion-phone{
		width:750rpx;
		height:86rpx;
		background:rgba(255,255,255,1);
		margin-top: 16rpx;
		display: flex;
	}
	.opinion-phone-text{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(103,103,103,1);
		margin-left: 32rpx;
		margin-top: 26rpx;
		display: inline-block;
	}
	.opinion-phone-input{
		margin-left: 50rpx;
		margin-top: 26rpx;
	}
	.opinion-button{
		width:632rpx;
		height:98rpx;
		background:rgba(216,55,56,1);
		border-radius:10rpx;
		margin-top: 58rpx;
		margin-left: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.opinion-bangzhu{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(138,138,138,1);
		margin-top: 26rpx;
		margin-left: 112rpx;
	}
	.opinion-bangzhu-text{
		color: #B54343;
	}
</style>
