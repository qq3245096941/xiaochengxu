<template>
	<view class="issefar">
		<view class="storedels">
			<!-- 图片 -->
			<view class="storetop">
				<swiper class='u-wrp-bnr' indicator-dots='true' autoplay='true' interval='5000' duration='1000' circular='true'>
					<block class="bannerblock" v-for="(item,index) in bannerList" :key="index">
						<swiper-item>
							<image class="storetopimg u-img-slide" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+item.amUrl"
							 mode=""></image>
						</swiper-item>
					</block>
				</swiper>
				<!-- <image class="storetopimg" :src="delsList.commdityThnmbnail" mode=""></image> -->
			</view>
			<!-- 标题 -->
			<view class="storetitle">
				<view class="titleleft">
					{{delsList.commdityName}} {{delsList.commdityType}}
				</view>
				<view class="titleright">
					<view class="titlerightimg">
						<image class="img" src="../../static/home/fenxiang.png" mode=""></image>
					</view>
					<view class="titlerightname">
						分享
					</view>
				</view>
			</view>
			<!-- 信息 -->
			<view class="storedetal">
				<view class="detalson">
					<image class="detalsonimg" src="../../static/home/xia.png" mode=""></image>
					<text class="detalsontext">30天质保</text>
				</view>
				<view class="detalson">
					<image class="detalsonimg" src="../../static/home/xia.png" mode=""></image>
					<text class="detalsontext">正品保证</text>
				</view>
				<view class="detalson">
					<image class="detalsonimg" src="../../static/home/xia.png" mode=""></image>
					<text class="detalsontext">7天退货</text>
				</view>
				<view class="detalson">
					<image class="detalsonimg" src="../../static/home/xia.png" mode=""></image>
					<text class="detalsontext">全国联保</text>
				</view>
				<view class="detalson detalson2">
					<image src="../../static/home/dayu.png" mode=""></image>
				</view>
			</view>
			<!-- 选择 -->
			<view class="xuanze">
				<view class="xuanzeson">
					<text class="xuanzetitle">
						选择
					</text>
					<text class="xuanzeguige">规格</text>
				</view>
				<view class="xuanzeson xuanzeson2">
					<image class="xuanzeson2img" src="../../static/home/dayu.png" mode=""></image>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="storebr"></view>
			<!-- 商品详情和评论 -->
			<view class="storetable">
				<view class="tab-title">
					<view class="title" @click="table(1)">
						<text :class="{clickcolor:tableIndex==1}">
							商品详情
						</text>
					</view>
					<view class="title" @click="table(2)">
						<text :class="{clickcolor:tableIndex==2}">评论</text>
					</view>
				</view>
				<view class="tab-con">
					<view class="tab-connone" :class="{tabconshow:tableIndex==1}">
						<image class="u-img-slide image" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/' + delsListimg"
						 mode=""></image>
					</view>
					<view class="tab-connone" :class="{tabconshow:tableIndex==2}">
						<view class="tab-haopinglist tab-connone">
							<view class="tab-haopinglist-whole" v-for="evaluationAllItem in evaluationAll" :key="evaluationAllItem.comId">
								<view class="tab-haopinglist-whole-view1">
									<image src="../../static/home/icons1.png" mode=""></image>
									<view class="view1">{{evaluationAllItem.comTitle}}</view>
									<view class="view2"><text :key="index" v-for="(item,index) in evaluationAllItem.remark">*</text></view>
									<view class="view3">{{ evaluationAllItem.createDate }}</view>
								</view>
								<view class="tab-haopinglist-whole-view2">{{evaluationAllItem.content}}</view>
								<view class="tab-haopinglist-whole-view3">
									<image src="../../static/home/content2.png" mode=""></image>
									<image src="../../static/home/content2.png" mode=""></image>
									<image src="../../static/home/content2.png" mode=""></image>
									<image src="../../static/home/content2.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="buy">
				<van-goods-action>
					<van-goods-action-icon icon="chat-o" text="客服" open-type="contact" />
					<van-goods-action-icon icon="cart-o" text="购物车" :info="buycartnumber" @click="gotToshoppingCart" />
					<van-goods-action-button text="加入购物车" type="warning" @click="ongiveCart()" />
					<van-goods-action-button text="立即购买" @click="ongiveCart2()" />
				</van-goods-action>
			</view>
		</view>
		<!-- 选择规格 -->
		<van-action-sheet :show="isshow1" class="guige" @close="onClose1" @cancel="onCancel1" title="加入购物车">
			<view class="isguige">
				<!-- 购物车规格标题 -->
				<view class="smallTitle">
					<view class="smallimg">
						<image class="smallimgs" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+bannerList[0].amUrl" mode=""></image>
					</view>
					<view class="smallspan">
						{{delsList.commdityName}}
						<view class="buyprice">
							{{delsList.commdityPrice}}
						</view>
					</view>
				</view>
				<!-- <view class="smallguige">
				<view class="smallxuan">选规格</view>
				<view class="isthisguige" v-for="(item,index) in guige" :key="index">
					{{item.specName}}
				</view>
			</view> -->
				<view class="smallnumber">
					<view class="smallnumber1">数量</view>
					<view class="smallnumber2">
						<van-stepper :value="buynumber" @change="setbuynumber" integer max="100" />
					</view>
				</view>
				<view class="queding">
					<button class="btn" @click="JoinCart">加入购物车</button>
				</view>
			</view>
		</van-action-sheet>
		<!-- 立即购买 -->
		<van-action-sheet :show="isshow2" class="guige" @close="onClose2" @cancel="onCancel2" title="立即购买">
			<view class="isguige">
				<!-- 购物车规格标题 -->
				<view class="smallTitle">
					<view class="smallimg">
						<image class="smallimgs" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+bannerList[0].amUrl" mode=""></image>
					</view>
					<view class="smallspan">
						{{delsList.commdityName}}
						<view class="buyprice">
							{{delsList.commdityPrice}}
						</view>
					</view>
				</view>
				<!-- <view class="smallguige">
				<view class="smallxuan">选规格</view>
				<view class="isthisguige" v-for="(item,index) in guige" :key="index">
					{{item.specName}}
				</view>
			</view> -->
				<view class="smallnumber">
					<view class="smallnumber1">数量</view>
					<view class="smallnumber2">
						<van-stepper :value="isbuynumber" @change="setbuynumber2" integer max="100" />
					</view>
				</view>
				<view class="queding">
					<button class="btn" @click="JoinCart2()">立即购买</button>
				</view>
			</view>
		</van-action-sheet>
	</view>

</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				buynumber: 1, ///购物车数量
				isbuynumber: 1, ///购买数量
				isshow1: false, //控制选择购物车的规格
				isshow2: false, //控制选择购买的规格
				sumPrice: null, //商品总价
				storeId: null,
				page: 1,
				bannerList: [],
				guige: null, // 商品规格  后端传输过来的规格
				userid: null, //用户id
				tableIndex: 1, //详情和评价的切换
				delsList: {}, //商品详情
				delsListimg: "", //商品详情
				evaluationAll: [], //全部评价
				buycartnumber: "", //全部购物车的数量
				id: '',
				commdityCount: 1, //商品数量
				commdityId: null, //商品id
				body: null, //商品名,
			}
		},
		methods: {
			setbuynumber(event) { //加入购物车
				this.buynumber = event.detail
			},
			setbuynumber2(event) { //立即购买
				this.commdityCount = event.detail
				this.isbuynumber = event.detail
			},
			//控制规格显示   以及点击加入购物车让其显示
			onClose1() {
				this.isshow1 = false //隐藏
			},
			onCancel1() {
				this.isshow1 = false //隐藏
			},
			ongiveCart() {
				this.isshow1 = true //显示
			},
			JoinCart() { //加入购物车
				const _this = this; //buynumber
				_this.isshow1 = false
				post.gets({
					method: "POST",
					url: "/cart/addCart",
					data: {
						userId: _this.userid,
						commdityId: _this.id
					}
				}).then(res => {
					if (res.statusCode == 200) {
						_this.getbuycartnumber(_this.userid)
					}
				})
			},
			//控制规格显示   以及点击立即购买让其显示
			onClose2() {
				this.isshow2 = false //隐藏
			},
			onCancel2() {
				this.isshow2 = false //隐藏
			},
			ongiveCart2() {
				this.isshow2 = true //显示

			},
			/* 立刻购买 */
			JoinCart2() {
				/* 商品单价为 */
				console.log(this.delsList);
				uni.navigateTo({
					url:`../orderConfirmation/orderConfirmation?list=[${this.delsList.commdityId}]&total=${this.delsList.commdityPrice*this.commdityCount}&num=[${this.commdityCount}]`
				})
			},
			// 切换
			table(e = 1) {
				const _this = this;
				_this.tableIndex = e;
			},
			getList(id) {
				let _this = this;
				post.gets({
					method: "get",
					url: "/commdity/" + id + "/searchInfo?userId=" + _this.userid,
				}).then(res => {
					console.log(res, "商品信息")
					if (res.data.code == 0) {
						_this.delsList = res.data.commdityInfo
						_this.delsListimg = res.data.commdityInfo.commdityThnmbnail
						_this.bannerList = res.data.commdityInfo.commdityUrlList
						_this.storeId = res.data.commdityInfo.commdityStore
						_this.guige = JSON.parse(res.data.commdityInfo.commdityClass)
						_this.commdityId = res.data.commdityInfo.commdityId
						_this.body = res.data.commdityInfo.commdityName
					}
				});
			},
			//请求购物车商品数量
			getbuycartnumber(id) {
				const _this = this;
				post.gets({
					method: 'get',
					url: '/cart/' + id + '/cartAll?page=1&rows=0',
				}).then(res => {
					_this.buycartnumber = res.data.totalCount;
				});
			},
			//跳转至购物车
			gotToshoppingCart() {
				uni.navigateTo({
					url: '../shoppingCart/shoppingCart'
				});
			},
			//获取商品评价
			getEvaluation(page) {
				const _this = this;
				post.gets({
					method: "get",
					url: "/comment/" + _this.id + "/commentAll?page=" + page + "&rows=10",
				}).then(res => {
					if (res.statusCode == 200) {
						console.log(res, "评价")
						_this.evaluationAll = res.data.commentList;
					}
				})
			}
		},
		onLoad(id) {
			console.log(id)
			let _this = this
			_this.id = id.id
			_this.getEvaluation(_this.page);
			uni.getStorage({ //获取userid
				key: 'login',
				success(res) {
					_this.userid = res.data.userId
					if (_this.userid) {
						_this.getList(_this.id)
						_this.getbuycartnumber(_this.userid) //获取购物车数量
					}
				}
			})
		},
		onReachBottom: function() {
			const _this = this;
			_this.page++;
			_this.getEvaluation(_this.page); //获取商品列表
		}
	}
</script>

<style scoped lang="scss">
	//购物车规格 标题
	.smallTitle {
		width: 100%;
		height: 230rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;

		.smallimg {
			width: 154rpx;
			height: 154rpx;
			display: inline-block;

			.smallimgs {
				width: 100%;
				height: 100%;
			}
		}

		.smallspan {
			display: inline-block;
			width: auto;
			height: auto;
		}
	}

	// 规格选择
	.smallguige {
		.smallxuan {
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 52rpx;
			color: rgba(0, 0, 0, 1);
		}

		.isthisguige {
			width: auto;
			height: 30rpx;
			font-size: 22rpx;
			padding: 4rpx;
			border: 1rpx solid red;
			color: red;
			display: inline-block;
			border-radius: 4rpx;
		}
	}

	.smallnumber {
		width: 100%;
		padding: 0 15rpx;
		height: 100rpx;
		display: flex;

		.smallnumber1 {
			width: 70%;
			font-size: 30rpx;
			font-weight: 600;
			color: #000;
		}

		.smallnumber {
			width: 30%;
		}
	}

	.queding {
		width: 92%;
		margin-left: 4%;

		.btn {
			width: 100%;
			height: 68rpx;
			line-height: 68rpx;
			font-size: 30rpx;
			background: #D83738FF;
			color: #fff;

		}
	}

	//规格卡
	.guige {
		width: 100%;

		.isguige {
			height: 500rpx;
			width: 100%;
			padding-left: 15rpx;
			padding-right: 15rpx;
		}
	}

	.u-wrp-bnr {
		width: 100%;
		height: 100%;
	}

	.active {
		color: #001952;
		font-size: 40rpx;
	}

	.storedels {
		margin: 0;
		padding: 0;
		position: relative;

		.buy {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 101rpx;
			display: flex;
			z-index: 1;
			color: rgba(255, 255, 255, 1);

			.buyson {
				width: 91rpx;
				height: 100%;
				background: #000;
				text-align: center;
				padding-top: 10rpx;
				box-sizing: border-box;
				line-height: 30rpx;
				font-weight: bold;

				.buysonimg {
					width: 40rpx;
					height: 40rpx;
				}

				.buysontitle {
					font-size: 19rpx;
				}
			}

			.buyson2 {
				width: 659rpx;
				height: 100%;
				text-align: center;
				line-height: 87rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
			}
		}

		.storetop {
			width: 100%;
			height: 663rpx;

			.storetopimg {
				width: 100%;
				height: 100%;
			}
		}

		.storetitle {
			width: 706rpx;
			margin-left: 22rpx;
			height: 146rpx;
			display: flex;

			.titleleft {
				height: 100%;
				width: 600rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(0, 0, 0, 1);
				line-height: 60rpx;
			}

			.titleright {
				width: 50rpx;
				height: 100%;
				margin-left: 57rpx;

				.titlerightimg {
					width: 50rpx;
					height: 50rpx;
					margin-top: 18rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.titlerightname {
					margin-top: 4rpx;
					color: #595757;
					font-size: 23rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
				}
			}
		}

		.storedetal {
			width: 100%;
			height: 68rpx;
			line-height: 68rpx;
			background: rgba(239, 239, 239, 1);
			display: flex;

			.detalson {
				width: 22%;
				color: #595757;
				font-size: 24rpx;
				font-family: Microsoft YaHei;

				.detalsonimg {
					width: 27rpx;
					height: 27rpx;
					margin-left: 22rpx;
					vertical-align: middle;
				}

				text {
					display: inline-block;
					margin-left: 7rpx;
				}
			}

			.detalson2 {
				width: 12%;

				image {
					margin-left: 50rpx;
					margin-top: 26rpx;
					width: 13rpx;
					height: 20rpx;
				}
			}
		}

		.xuanze {
			width: 706rpx;
			margin: 0 22rpx;
			height: 99rpx;
			display: flex;

			.xuanzeson {
				width: 88%;
				height: 100%;
				line-height: 99rpx;
				color: #3E3A39;

				.xuanzetitle {
					font-size: 30rpx;
					font-weight: bold;
				}

				.xuanzeguige {
					font-size: 24rpx;
					color: #4E4E4E;
					display: inline-block;
					margin-left: 20rpx;
				}
			}

			.xuanzeson2 {
				width: 12%;
				height: 100%;

				.xuanzeson2img {
					width: 13rpx;
					height: 20rpx;
					float: right;
					margin-top: 39rpx;
					margin-right: 3rpx;
				}
			}
		}

		.storebr {
			width: 100%;
			height: 19rpx;
			background: rgba(239, 239, 239, 1);
		}

		//底部详情切换
		.storetable {
			width: 100%;

			.tab-title {
				display: flex;
				height: 99rpx;

				.title {
					width: 50%;
					height: 100%;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					text-align: center;
					line-height: 99rpx;
					border-bottom: 3rpx solid rgba(239, 239, 239, 1);
				}
			}

			.tab-con {
				width: 706rpx;
				min-height: 800rpx;
				margin-left: 22rpx;
				padding-bottom: 102rpx;

				.tab-list {
					width: 706rpx;
					min-height: 800rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000;
					display: flex;
					line-height: 160rpx;

					.tab-listson {
						width: 25%;
						text-align: center;
					}

					.listson1s {
						text-align: left;
					}

					.listson2s {
						text-align: right;
					}

					.tab-haopinglist {
						width: 706rpx;
						height: auto;

					}
				}

				.tab-connone {
					display: none;
				}

				.tabconshow {
					display: block;

					.image {
						width: 100%;
					}
				}

			}
		}
	}

	.clickcolor {
		display: inline-block;
		border-bottom: 3rpx solid rgba(249, 0, 64, 1);
		color: rgba(249, 0, 64, 1);
	}

	// 全部评价
	.tab-haopinglist-whole {
		width: 100%;
		height: 377rpx;
		padding: 0 23rpx;
		box-sizing: border-box;
		border-bottom: 3rpx solid rgba(239, 239, 239, 1);
		margin-top: 25rpx;

		.tab-haopinglist-whole-view1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			image {
				width: 66rpx;
				height: 65rpx;
			}

			.view1 {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(0, 0, 0, 1);
				margin-left: 19rpx;
			}

			.view2 {
				margin-left: 18rpx;
			}

			.view3 {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(87, 87, 87, 1);
			}
		}

		.tab-haopinglist-whole-view2 {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			margin-top: 41rpx;
		}

		.tab-haopinglist-whole-view3 {
			display: flex;
			justify-content: space-between;
			margin-top: 39rpx;

			image {
				width: 165rpx;
				height: 165rpx;
			}
		}
	}

	//商品详情
	.tab-connone-active {
		height: 50rpx;
		width: 707rpx;
		margin: 0 auto;
		display: flex;
		box-sizing: border-box;
		padding: 0 15rpx;
		justify-content: space-between;
		align-items: center;
		font-size: 25rpx;
		background: #F1F0F5;
	}

	.tab-connone-details {
		background: #013AA7;
		color: #fff;
		margin-top: 31rpx;
		justify-content: center;
	}

	.tab-connone-parts {
		margin-bottom: 2rpx;
	}

	.tab-connone-bufen {
		background: #F5F4F9;
	}

	.tab-connone-cont {
		width: 100%;
		padding: 0 15rpx;
		text-align: center;
		box-sizing: border-box;
		margin-top: 60rpx;

		.buzou {
			border-bottom: 2rpx solid #595757;
			height: 200rpx;
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;

			.image1 {
				width: 50rpx;
				height: 70rpx;
			}

			.image2 {
				margin-top: 20rpx;
				width: 30rpx;
				height: 30rpx;
			}

			.view1 {
				color: #001952;
				font-size: 40rpx;
			}

			.view2 {
				font-size: 20rpx;
			}
		}

		.tishi {
			margin-top: 20rpx;
			margin-bottom: 60rpx;

			.tishi-view1 {
				color: #001952;
				font-size: 30rpx;
			}

			.tishi-view2 {
				margin-top: 30rpx;

				view {
					font-size: 25rpx;
					margin-top: 15rpx;
					color: #656567;
				}
			}
		}

		.qinjian {
			margin-top: 80rpx;
			position: relative;

			.image1 {
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				top: 10rpx;
				left: 300rpx;
				z-index: 10;
			}

			.image2 {
				width: 100%;
				height: 1000rpx;
			}

			.image2:last-child {
				margin-bottom: 87rpx;
			}
		}
	}
</style>
