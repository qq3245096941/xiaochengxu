<template>
	<view style="background: #fff;">
		<scroll-view scroll-x="true" class="scroll">
		    <view class="scroll-box">
		        <view class="scroll-cont">保养周期建议</view>
		    </view>
		    <view class="scroll-box">
		        <view class="scroll-cont">基础养护</view>
		    </view>
		    <view class="scroll-box">
		        <view class="scroll-cont">空调系统养护</view>
		    </view>
			<view class="scroll-box">
		        <view class="scroll-cont">冷却系统</view>
		    </view>
		    <view class="scroll-box">
		        <view class="scroll-cont">基础养护</view>
		    </view>
		    <view class="scroll-box">
		        <view class="scroll-cont">空调系统养护</view>
		    </view>
		</scroll-view>
		<view>
			<view class="yanghu-cont">
				<text>空气滤清器多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>转向助力油多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>雨刮片多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>空调滤清器多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>外置汽油滤清器多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>内置汽油滤清器多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>防冻冷却液多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>刹车盘多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>变速量系统多少时间或多少公里清洗一次</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>矿物质机油多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>全合金机油多久更换或多少公里更换</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
			<view class="yanghu-cont">
				<text>燃油系统多少时间或多少公里清洗一次</text>
				<image src="../../static/home/isnext.png" mode=""></image>
			</view>
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
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		margin: 0 auto;
	    width: 730rpx;
	    height: 80rpx;
		border-top: 1rpx solid #888888;
		border-bottom: 1rpx solid #888888;
	    overflow: hidden;
	    white-space: nowrap;
	}
	.scroll-box {
	    display: inline-block;
		padding: 10rpx 15rpx;
		background: #eeeeee;
		font-size: 20rpx;
		margin-top: 20rpx;
		border-radius:50rpx;
		margin-left: 20rpx;
	}
	.yanghu-cont{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		text{
			font-size: 25rpx;
			line-height: 86rpx;
		}
		image{
			width: 30rpx;
			height: 30rpx;
			margin-top: 30rpx;
		}
	}
</style>
