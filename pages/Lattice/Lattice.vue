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
						img: "../../static/index/index3.png",
						navlink: '../isSechcCom/isSechcCom'
					},
					{
						index: 1,
						img: "../../static/index/index2.png",
						navlink: '../index/pages/engineSynopsis'
					},
					{
						index: 2,
						name: "空气滤清器",
						img: "../../static/index/index1.png",
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
