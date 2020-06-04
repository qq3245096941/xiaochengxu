<template>
	<view style="padding: 20rpx;">
		<!-- <view class="title">
			<view class="title-image">
				<image class="timg" src="../../static/basicprofile.png" mode=""></image>
			</view>
			<view class="title-name">企业简介</view>
		</view>
		<view class="Found">
			中盛(天津）汽车服务有限公司是一家利用自身的“双CRM”模式，整合技术专家团队、数据精算团队、IT研发团队组成车辆保障项目团队，全面做好车辆质量保修服务项目的保障方案设计、产品精算定价、承保/理赔审核、管理规范制定、案件管理、数据挖掘等风险管控服务的工作。
		</view>
		<view class="Edition">版本号V6.4.5</view> -->
		
		<rich-text :nodes="html" space></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				html:''
			}
		},
		onLoad() {
			uni.request({
				url:'https://xcx.zhongshengzb.com:8446/zs_two/config/configAll',
				success:(res)=>{
					this.html = res.data.data[3].sysValue
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.title{
		width: 100%;
		.title-image{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin: 0 auto;
			margin-top: 50rpx;
			overflow: hidden;
			.timg{
				width: 100%;
				height: 100%;
			}
				
		}
		.title-name{
			font-size: 30rpx;
			color: #808080;
			width: 100%;
			text-align: center;
		}
	}
	.Found{
		margin-top: 50rpx;
		font-size: 28rpx;
		padding: 0 50rpx;
		box-sizing: border-box;
		font-weight: 500;
		 text-align: justify;
	}
</style>
