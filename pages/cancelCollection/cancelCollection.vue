<template>
	<view style="width:100%;background: #F7F4F8;height: 100%;">
		<view class="edit">编辑</view>
		<view>
			<view class="collection-box">
				<image class="collection-box-image" src="../../static/home/content2.png" mode=""></image>
				<view>
					<view class="collection-box-view">倍耐力轮胎 新P1 Cinturato P1 185/60R15 84H Pirelli</view>
					<text class="collection-box-text">$330</text>
				</view>
			</view>
			<view class="guessLike2">已经到底了</view>
		</view>
		
		<view class="cancelCollection-bottom">
			<view class="cancelCollection-bottom-yuan"></view>
			<view class="cancelCollection-bottom-quanxian">全选</view>
			<view class="cancelCollection-bottom-button" @click="fnCancelCollection">取消收藏</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			fnCancelCollection(){
				uni.showToast({
					title:"删除成功",
					icon:"none"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit{
		height: 72rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:72rpx;
		margin-left: 652rpx;
		color:rgba(103,103,103,1);
	}
	.collection-box{
		width:750rpx;
		height:236rpx;
		background:rgba(255,255,255,1);
		display: flex;
	}
	.collection-box-image{
		width: 144rpx;
		height: 144rpx;
		margin-left: 42rpx;
		margin-top: 32rpx;
	}
	.collection-box-view{
		width:476rpx;
		font-size:24rpx;
		margin-top: 46rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,0,0,1);
	}
	.collection-box-text{
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,0,0,1);
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
	// 底部实现
	.cancelCollection-bottom{
		position: absolute;
		bottom: 0;
		width:750rpx;
		display: flex;
		align-items: center;
		height:98rpx;
		background:rgba(255,255,255,1);
	}
	.cancelCollection-bottom-yuan{
		width:24rpx;
		height:24rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(184,184,184,1);
		border-radius:50%;
		margin-left: 32rpx;
	}
	.cancelCollection-bottom-quanxian{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		margin-left: 6rpx;
		color:rgba(138,138,138,1);
	}
	.cancelCollection-bottom-button{
		width:244rpx;
		height:62rpx;
		margin-left: 370rpx;
		background:rgba(216,55,56,1);
		border-radius:32rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
