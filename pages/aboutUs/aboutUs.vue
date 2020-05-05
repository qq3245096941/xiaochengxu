<template>
	<view>
		<view class="aboutUsImage">
			<swiper class='u-wrp-bnr' style="width:100%;height:100%" indicator-dots='true' autoplay='true' interval='5000'
			 duration='1000' circular='true'>
				<block v-for="(item,index) in obj.attList" :key="index" style="width:100%;height:100%">
					<swiper-item style="width:100%;height:100%">
						<image style="width:100%;height:100%" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+item.amUrl"
						 class='u-img-slide' mode='aspectFill'></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 营业时间 -->
		<view class="times" v-if="obj.busHours">
			营业时间 {{obj.busHours}}
		</view>
		<view class="aboutUsName">
			<view style="margin-top: 20rpx;">
				<image mode="widthFix" style="width: 100rpx;" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+obj.storeTax"></image>
			</view>
			<view class="aboutUsName-left">
				<view class="name">{{obj.storeName}}</view>
				<!-- <view class="order">总订单<text>2020</text></view> -->
				<view class="address">{{obj.storeAddress}}</view>
			</view>
			<view class="aboutUsName-right" @click="gotomap()">
				<view class="address">
					<van-icon style="margin-left: 15rpx;" name="location-o" size="30rpx" color="rgba(255,179,0,1)" />
				</view>
				<view class="Navigation">导航</view>
			</view>
		</view>
		<view>
			<view class="aboutUsService">全部评价<text>({{commentList.length}})</text></view>
			<view v-show="commentList.length>0" class="evaluate" v-for="(comment,index) in commentList" :key="index">
				<view class="evaluate-top">
					<image :src="comment.userTx" mode="widthFix"></image>
					<view class="evaluate-top-cont">
						<view class="evaluate-top-cont-shang">
							<view style="color: #000000;font-size: 20rpx;">{{comment.userName}}</view>
							<!-- <view style="margin-left: -200rpx;">牌子 车型</view> -->
							<view>{{comment.createDate | timeFormatting}}</view>
						</view>
						<view class="evaluate-cont">{{comment.content}}</view>
					</view>
				</view>
			</view>
			<view v-show="commentList.length===0" style="text-align: center;margin-top: 50rpx;color: #d2d2d2;">
				<van-icon size="40" name="chat-o" />
				<view style="font-size: 50rpx;">暂无评论</view>
			</view>
		</view>
	</view>
</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				id: '', //当前门店id 
				obj: {}, //门店详情信息
				distanceX: null,
				distanceY: null,
				commentList: [], //评论信息
			}
		},
		filters: {
			timeFormatting(res) {
				return post.js_date_time(res);
			}
		},
		methods: {
			getStoreList() {
				post.gets({
					method: "POST",
					url: "/store/" + this.id + "/searchInfo",
					data: {
						page: 1,
						rows: 20
					}
				}).then(res => {
					if (res.statusCode === 200 && res.data.code == 0) {
						this.obj = res.data.obj;
						console.log(res);
						/* 设置标题 */
						uni.setNavigationBarTitle({
							title: this.obj.storeName
						})

						this.distanceX = res.data.obj.distanceX;
						this.distanceY = res.data.obj.distanceY;
						/* 评论信息 */
						this.commentList = res.data.commentList;
						console.log(this.commentList);

					}
				})
			},
			setIndex(index, price, name) {
				const _this = this;
				_this.isIndex = index //当前选中的index
				_this.price = price
				_this.itemname = name
			},
			//结算  弹出model层
			isPay() {
				this.isshow1 = true
			},
			onClose1() {
				this.isshow1 = false //隐藏
			},
			onCancel1() {
				this.isshow1 = false //隐藏
			},
			gotomap() {
				// 地图导航
				const _this = this;
				uni.navigateTo({
					url: "../isMap/isMap?distanceX=" + _this.distanceX + "&distanceY=" + _this.distanceY
				})
			}
		},
		onLoad({
			id
		}) {
			// id=280
			this.id = id;
			console.log(id);
			this.getStoreList()
		}
	}
</script>

<style lang="scss" scoped>
	//下拉弹框
	.guige {
		width: 92%;
		margin-left: 4%;

		.isguige {
			height: 420rpx;
			padding-left: 15rpx;
			padding-right: 15rpx;
			padding-bottom: 10rpx;

			.yishou {
				width: 100%;
				height: 72px;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 72rpx;
				color: rgba(0, 0, 0, 1);
			}

			.guoqitui {
				width: 750rpx;
				margin-left: -14rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-bottom: 1rpx solid rgba(112, 112, 112, 1);
				border-top: 1rpx solid rgba(112, 112, 112, 1);
			}

			.dizhi {
				width: 100%;
				height: 178rpx;
				background: skyblue;
			}
		}
	}

	.queding {
		width: 92%;
		margin-left: 4%;

		.btn {
			width: 40%;
			float: right;
			height: 68rpx;
			line-height: 68rpx;
			font-size: 30rpx;
			background: #D83738FF;
			color: #fff;
		}
	}

	// 
	.xuanzhong {
		// background: red;
	}

	.tubiao1 {
		background: rgba(26, 173, 25, 1);
		display: inline-block;
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		text-align: center;
		font-size: 16rpx;
		line-height: 28rpx;
		color: #fff;
	}

	.tubiao2 {
		background: rgba(184, 184, 184, 1);
		display: inline-block;
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		text-align: center;
		font-size: 16rpx;
		line-height: 28rpx;
		color: #fff;
	}

	.aboutUsImage {
		width: 750rpx;
		height: 462rpx;
		position: relative;
	}
	
	/* 营业时间 */
	.times {
		height: 58rpx;
		line-height: 58rpx;
		text-indent: 1em;
		color: #fff;
		background: rgba(0, 0, 0, .7);
		z-index: 1;
		font-size: 22rpx
	}

	.aboutUsName {
		width: 100%;
		height: 180rpx;
		display: flex;
		padding: 0 56rpx;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 16rpx solid rgba(242, 242, 242, 1);
	}

	.aboutUsName-left {
		margin-top: 26rpx;

		.name {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}

		.order {
			margin-top: 14rpx;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;

			text {
				color: rgba(255, 179, 0, 1);
				margin-left: 5rpx;
			}
		}

		.address {
			font-size: 20rpx;
			margin-top: 12rpx;
			font-family: PingFang SC;
			font-weight: bold;
			text-align: center;
		}
	}

	.aboutUsName-right {
		margin-top: 30rpx;

		image {
			width: 35rpx;
			margin-left: 10rpx;
			height: 38rpx;
		}

		.address {
			margin-top: 10rpx;
			font-size: 16rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(138, 138, 138, 1);
		}

		.Navigation {
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-top: 6rpx;
			margin-left: 10rpx;
		}
	}

	.aboutUsService {
		height: 86rpx;
		width: 100%;
		border-bottom: 2rpx solid rgba(242, 242, 242, 1);
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		padding-left: 46rpx;
		padding-top: 20rpx;
		box-sizing: border-box;

		>text {
			margin-left: 30rpx;
			font-size: 20rpx;
			color: #e8e8e8;
		}
	}

	.aboutUsService-box {
		height: 96rpx;
		width: 100%;
		display: flex;
		padding-top: 28rpx;
		box-sizing: border-box;

		image {
			width: 28rpx;
			height: 28rpx;
			margin-left: 40rpx;
		}

		.aboutUsService-box-cont {
			margin-left: 12rpx;
			width: 671rpx;
			height: 100%;
			border-bottom: 2rpx solid rgba(232, 232, 232, 1);
			padding: 0 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			.fuwu {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
			}

			.jiaqian {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(216, 55, 56, 1);
			}

			.s {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(107, 106, 106, 1);
				text-decoration: line-through;
			}
		}
	}

	.aboutUsService-box2 {
		height: 68rpx;
		width: 100%;
		display: flex;
		padding-top: 18rpx;
		box-sizing: border-box;

		.aboutUsService-box-cont2 {
			margin-left: 80rpx;
			width: 671rpx;
			height: 100%;
			border-bottom: 2rpx solid rgba(232, 232, 232, 1);
			padding: 0 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			.fuwu2 {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
			}

			.jiaqian2 {
				padding: 2rpx 18rpx;
				background: rgba(255, 255, 255, 1);
				border: 2rpx solid rgba(216, 55, 56, 1);
				border-radius: 6px;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(216, 55, 56, 1);
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.evaluate {
		width: 719rpx;
		height: 286rpx;
		margin-left: 32rpx;
		border-bottom: 2rpx solid rgba(232, 232, 232, 1);
		margin-bottom: 82rpx;

		.evaluate-top {
			margin-top: 22rpx;
			width: 676rpx;
			display: flex;

			image {
				width: 68rpx;
				height: 68rpx;
				margin-right: 26rpx;
			}

			.evaluate-top-cont {
				width: 486rpx;

				.evaluate-top-cont-shang {
					display: flex;
					justify-content: space-between;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(138, 138, 138, 1);
				}

				.evaluate-top-cont-xia {
					letter-spacing: 10rpx;
					color: #EB1010;
					display: flex;

					view {
						display: inline-block;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
					}
				}
			}
		}

		.evaluate-cont {
			width: 676rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(103, 103, 103, 1);
		}

		.evaluate-address {
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(103, 103, 103, 1);
			margin-top: 18rpx;
		}
	}

	.aboutUsFooter {
		width: 750rpx;
		height: 84rpx;
		background: rgba(255, 255, 255, 1);
		border-top: 1rpx solid rgba(112, 112, 112, 1);
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		display: flex;

		.aboutUsFooter-left {
			width: 395rpx;
			height: 64rpx;
			border-right: 1px solid rgba(221, 221, 221, 1);
			margin-left: 20rpx;

			.jiaqian {
				font-size: 35rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(216, 55, 56, 1);
			}

			.fuwu {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(138, 138, 138, 1);
			}
		}

		.aboutUsFooter-cent {
			margin-left: 24rpx;
			text-align: center;

			image {
				width: 37rpx;
				height: 35rpx;
			}

			view {
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: bold;
				margin-top: -8rpx;
			}
		}

		.aboutUsFooter-right {
			margin-left: 20rpx;
			width: 300rpx;
			background: rgba(255, 0, 0, 1);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
