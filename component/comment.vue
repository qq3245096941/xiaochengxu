<!-- 评论组件 -->
<template>
	<view class="common">
		<view :key="index" v-for="(common,index) in commonList">
			<view class="message">
				<van-image width="32" height="32" round :src="common.userTx" />
				<view style="font-size: 28rpx;font-weight: bold;margin-left: 20rpx;">{{common.userName}}</view>
			</view>
			<view class="content">
				{{common.title}}
			</view>
			<van-uploader :file-list="common.imgs" preview-size="60" :deletable="false"/><van-divider />
		</view>
	
		</van-popup>
	</view>
</template>

<script>
	import post from '../post.js'

	export default {
		props: {
			comdityId: {
				type: Number,
				required: true
			},
		},
		data() {
			return {
				commonList: [],
				page: 1,
			}
		},
		methods: {
			getList(commdityId) {
				/* 获取当前商品的评论 */
				post.gets({
					url: `/comment/${commdityId}/commentAll`,
					data: {
						page: 1,
						rows: 9999
					}
				}).then(data => {
					this.commonList = data.data.commentList.map(item=>{
						item.title = item.comTitle;
						item.imgs = JSON.parse(item.content);
						return item;
					});
				})
			}
		},
		watch: {
			comdityId(newValue) {
				this.getList(newValue);
			}
		},
		onReachBottom() {
			this.page++;
			this.getList(this.comdityId);
		}
	}
</script>

<style>
	.common {
		padding: 20rpx;
		margin-bottom: 80rpx;
	}

	.common .message {
		display: flex;
		align-items: center;
	}

	.common .content {
		font-size: 35rpx;
		margin-bottom: 20rpx;
	}
	
	.van-uploader__upload{
		display: none !important;
	}
</style>
