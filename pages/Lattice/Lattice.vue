<template>
	<view class="content">
		<view :key="index" v-for="(item,index) in  list" class="item" @click="jumpPage(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						index: 0,
						img: "https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index17.png",
						navlink: '../isSechcCom/isSechcCom'
					},
					{
						index: 1,
						img: "https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index16.png",
						navlink: '../index/pages/engineSynopsis'
					},
					{
						index: 2,
						name: "空气滤清器",
						img: "https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index15.png",
						navlink: '../index/pages/maintain'
					}
				],

			}
		},
		methods: {
			jumpPage(item) {
				if (item.index === 0) {
					uni.switchTab({
						url: item.navlink
					})
				} else {
					uni.navigateTo({
						url: item.navlink,
						fail(error) {
							console.log(error);
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		margin-top: 40rpx;
		display: flex;
		padding: 10rpx;
	}

	.item {
		width: 33%;
		margin-left: 10rpx;
	}

	image {
		width: 100%;
	}
</style>
