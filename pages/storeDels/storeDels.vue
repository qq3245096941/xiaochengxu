<template>
	<view style="margin-bottom: 30rpx;">
		<swiper style="height: 400rpx;" indicator-dots autoplay>
			<swiper-item :key="index" v-for="(banner,index) in commdity.commdityUrlList">
				<image mode="widthFix" :src="banner.amUrl | getImg" style="display: block;width: 100%;"></image>
			</swiper-item>
		</swiper>
		<!-- <view class="quality">
			<van-icon name="passed" /><text style="margin-right: 30rpx;">30天质保</text>
			<van-icon name="passed" /><text style="margin-right: 30rpx;">正品保证</text>
			<van-icon name="passed" /><text style="margin-right: 30rpx;">7天退货</text>
			<van-icon name="passed" /><text style="margin-right: 50rpx;">全国联保</text>
		</view> -->
		<view style="color: #ed4014;padding: 20rpx 0 20rpx 40rpx;"><text style="font-size: 18rpx;">￥</text><text style="font-size: 50rpx;">{{commdity.commdityPrice}}</text></view>
		<view style="padding: 0 0 30rpx 30rpx;font-size: 30rpx;font-weight: bold;">{{commdity.commdityName}}</view>
		<van-tabs active="0">
			<van-tab title="详情" name="0">
				<image :key="index" v-for="(item,index) in particularsList" mode="widthFix" style="display: block;width: 100%;"
				 :src="item | getImg"></image>
			</van-tab>
			<van-tab title="评论" name="1">
				<Comment :comdityId="commdity.commdityId"></Comment>
			</van-tab>
		</van-tabs>

		<CommdityAction :commdityId="commdity.commdityId"></CommdityAction>

	</view>
</template>

<script>
	import post from "../../post.js"
	import Comment from '../../component/comment.vue'
	import CommdityAction from '../../component/commdityAction.vue'

	export default {
		data() {
			return {
				/* 商品详情 */
				commdity: {},
				particularsList: []
			}
		},
		components: {
			Comment,
			CommdityAction
		},
		methods: {

		},
		filters: {
			getImg(url) {
				return post.url + url;
			}
		},
		onLoad({
			id
		}) {
			post.gets({
				url: `/commdity/${id}/searchInfo`,
				data: {
					userId: uni.getStorageSync('login').userId
				}
			}).then(data => {
				this.commdity = data.data.commdityInfo;
				console.log('商品详情', this.commdity);
				this.particularsList = this.commdity.commdityParameter.split(',');
			})
		},
		onReachBottom: function() {

		}
	}
</script>

<style scoped>
	.quality {
		display: flex;
		align-items: center;
		height: 70rpx;
		background: #e8eaec;
		color: 25rpx;
		padding: 5rpx 5rpx 5rpx 20rpx;
		font-size: 35rpx;
		color: #ed4014;
	}

	.icon {
		width: 20rpx;
		height: 20rpx;
	}
	
	.quality text{
		color: #515a6e;
		font-size: 25rpx;
		margin-left: 10rpx;
	}
</style>
