<template>
	<view class="case-page">
		<view class="list-masonry">
			<view class="item-masonry" v-for="(item, index) in comList" :key="item.commdityId" @click="gotohomeDetals(item.commdityId)">
				<!-- <van-tag type="danger" v-if="item.commdityRecommed==='0'">推荐</van-tag> -->
				<image :src="item.commdityThnmbnail | getImg" mode="widthFix"></image>
				<!-- <view class="listtitle">
					<view class="listtitle1">{{ item.commdityName }}</view>
					<view class="listtitle2">
						<text class="listtitle2son">￥</text>
						{{ item.commdityPrice }}
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			comList:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			//跳转首页产品详情
			gotohomeDetals(id) {
				//商品详情
				uni.navigateTo({
					url: '../storeDels/storeDels?id=' + id
				});
			},
		}
	}
</script>

<style lang="scss">
	//瀑布流
	page {
		background-color: #eee;
		height: 100%;
	}
	
	.case-page {
		padding: 22rpx;
	}
	
	.list-masonry {
		column-count: 2;
		column-gap: 20rpx;
	}
	
	.item-masonry {
		box-sizing: border-box;
		border-radius: 15rpx;
		overflow: hidden;
		background-color: #fff;
		break-inside: avoid;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
	}
	
	.item-masonry image {
		width: 100%;
		display: block;
	}
	
	.listtitle {
		padding: 15rpx;
		font-size: 24rpx;
	
		.listtitle1 {
			line-height: 39rpx;
		}
	
		.listtitle2 {
			color: #ff0000;
			font-size: 30rpx;
			line-height: 30rpx;
			font-weight: bold;
			padding-top: 22rpx;
	
			.listtitle2son {
				font-size: 18rpx;
			}
		}
	}
	
	
</style>
