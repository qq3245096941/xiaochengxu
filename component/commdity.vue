<template>
	<view class="case-page">
		<view class="list-masonry">
			<view class="item-masonry" v-for="(item, index) in comList" :key="item.commdityId" @click="gotohomeDetals(item.commdityId)">
				<!-- <van-tag type="danger" v-if="item.commdityRecommed==='0'">推荐</van-tag> -->
				<image :src="item.commdityThnmbnail | getImg" mode="widthFix"></image>
				<view class="listtitle">
					<view class="listtitle1">{{ item.commdityName }}</view>
					<!-- <view class="listtitle2">
						<text class="listtitle2son">￥</text>
						{{ item.commdityPrice }}
					</view> -->
				</view>
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
	
	//页面主样式
	.u-img-slide {
		width: 100%;
		height: 100%;
	}
	
	.Index {
		width: 100%;
		height: 100%;
	
		.IndexBanner {
			width: 100%;
			height: 422rpx;
			background: #000000;
	
			.bannerTop {
				height: 70rpx;
				display: flex;
				width: 100%;
	
				.Topmap {
					color: #fff;
					font-family: PingFang SC;
					width: 335rpx;
					height: 46rpx;
					font-size: 26rpx;
					line-height: 46rpx;
					margin-top: 20rpx;
					text-indent: 23rpx;
	
					text {
						float: left;
						clear: both;
					}
	
					.next {
						float: left;
						width: 26rpx;
						height: 26rpx;
						margin-top: 11rpx;
					}
				}
	
				.TopSerach {
					position: relative;
					width: 415rpx;
					height: 70rpx;
	
					.serchImg {
						position: absolute;
						width: 21rpx;
						height: 23rpx;
						top: 34rpx;
						left: 353rpx;
					}
	
					.Search {
						width: 393rpx;
						height: 42rpx;
						border-radius: 20rpx;
						background: #fff;
						margin-top: 25rpx;
						text-indent: 1em;
					}
				}
			}
	
			.u-wrp-bnr {
				width: 100%;
				height: 352rpx;
			}
		}
	}
	
	.alllist {
		width: 100%;
		height: 223rpx;
		line-height: 223rpx;
		display: inline;
		white-space: nowrap;
		overflow-x: scroll;
		float: left;
		overflow-y: hidden;
	
		.alllistSon1 {
			margin-top: 65rpx;
			margin-left: 21rpx;
			display: inline-block;
	
			.baoyangimg {
				width: 481rpx;
				height: 168rpx;
			}
		}
	}
	
	.Title {
		clear: both;
		width: 706rpx;
		margin-left: 22rpx;
		height: 112rpx;
	
		.TitleLeft {
			display: inline-block;
			width: 10rpx;
			height: 40rpx;
			background: #d83738;
			border-radius: 5rpx;
			float: left;
			margin-top: 36rpx;
		}
	
		.titlename {
			margin: 0;
			padding: 0;
			display: inline-block;
			color: #595757;
			font-size: 36rpx;
			font-weight: bold;
			float: left;
			margin-top: 33rpx;
			margin-left: 29rpx;
			letter-spacing: 2px;
		}
	}
	
	.bannerimg {
		width: 100%;
		height: 100%;
	}
</style>
