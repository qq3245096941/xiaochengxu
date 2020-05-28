<template>
	<view class="Index">
		<view class="IndexBanner">
			<view class="bannerTop">
				<view class="Topmap">
					<text>{{IsCity}}</text>
					<van-icon class="next" name="location-o" />
				</view>
				<view class="TopSerach">
					<navigator url="../searchCommdity/searchCommdity">
						<image class="serchImg" placeholder="轮胎" src="../../static/home/sousuo.png" mode=""></image>
						<input type="text" class="Search" />
					</navigator>
				</view>
			</view>
			<swiper class="u-wrp-bnr" style="width:100%" indicator-dots="true" autoplay="true" interval="5000" duration="1000"
			 circular="true">
				<block class="bannerblock" v-for="(item, index) in bannerList" :key="index">
					<swiper-item>
						<image class="bannerimg u-img-slide" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/' + item.imagepath"
						 mode="aspectFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 纵向轮播组件 -->
		<!-- <Portrait></Portrait> -->
		<Lattice></Lattice>

		<view style="padding: 0 20rpx;">
			<image @click="clickImg" :src="tup0 | getImg" mode="widthFix" style="width: 100%;display: block;"></image>
		</view>
		<image v-if="tup0!==''" src="../../static/recommend.png" mode="widthFix" style="width: 100%;"></image>
		<!-- 第二张广告图 -->
		<view class="advertising" v-if="tup1!==''">
			<image :src="tup1 | getImg" mode="widthFix"></image>
		</view> 
		<!-- 瀑布流布局列表 -->
		<view>
			<commdity :comList="comList"></commdity>
		</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	//引入纵向轮播
	import Portrait from '../Portrait/Portrait';
	//引入九宫格
	import Lattice from '../Lattice/Lattice';
	//瀑布流商品
	import commdity from '../../component/commdity.vue'

	export default {
		data() {
			return {
				bannerList: [], //轮播图列表
				page: 1, //商品页数
				comList: [], //商品列表
				IsCity: "", //当前位置
				tup0:'',
				tup1:''
			};
		},
		onLoad() {
			const _this = this;
			_this.getuserLo()
			this.getcomList();
			_this.getBanner(); //获取轮播

			/* 获取单一广告图 */
			post.gets({
				url: '/banner/bannerAll',
				data: {
					type: 'h'
				}
			}).then(data => {
				let list = data.data.list
				this.tup0 = list[0].imagepath;
				this.tup1 = list[1].imagepath;
			})

		},
		components: { 
			Portrait,
			Lattice,
			commdity
		},
		onShow() {
			this.getUserList();
		},
		methods: {
			clickImg() {
				uni.navigateTo({
					url: '/pages/discountCoupon/discountCoupon'
				})
			},
			//获取用户登录信息
			getUserList() {
				uni.getStorage({
					key: 'login',
					success(res) {

					},
					fail(res) {
						uni.navigateTo({
							url: "../Authorization/Authorization"
						})
					}

				})
			},
			// 获取轮播图
			getBanner() {
				let _this = this;
				// 大图轮播
				post.gets({
					method: 'POST',
					url: '/banner/bannerAll?type=index'
				}).then(res => {
					//轮播图
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.bannerList = res.data.list;
						}
					}
				});
			},

			// 获取商品列表
			getcomList() {
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/commdity/commdityAll',
					data: {
						page: this.page,
						rows: 10,
						commdityRecommd: 0
					}
				}).then(res => {
					let list = res.data.commdityList;
					this.comList = [...this.comList, ...list];
				});
			},

			getuserLo() {
				const _this = this;
				wx.getLocation({
					type: 'gcj02', //返回可以用于wx.openLocation的经纬度
					success(res) {
						let latitude = res.latitude;
						let longitude = res.longitude;
						let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';
						wx.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
							success(res) {
								console.log(res.data.result.address_component)
								_this.IsCity = res.data.result.address_component.district;
							}
						});
					},
					fail(res) {
						console.log(res);
					}
				});
			},
		},
		onReachBottom: function() {
			const _this = this;
			_this.page++;
			_this.getcomList(); //获取商品列表
		}
	};
</script>

<style scoped="scoped" lang="scss">
	/* 广告 */
	.advertising{
		padding: 10rpx 20rpx 0 20rpx;
		
		image{
			width: 100%;
			border-radius: 15rpx;
			display: block;
		}
	}
	
	//页面主样式
	.u-img-slide {
		width: 100%;
		height: 100%;
	}

	.Index {
		position: absolute;
		width: 100%;
		height: 100%;

		.IndexBanner {
			width: 100%;
			height: 422rpx;
			background: #fff;

			.bannerTop {
				display: flex;

				.Topmap {
					color: #000;
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
					margin-right: 20rpx;
					padding: 0 0 20rpx 0;


					.serchImg {
						position: absolute;
						width: 21rpx;
						height: 23rpx;
						top: 34rpx;
						left: 353rpx;
					}

					.Search {
						background-color: #f8f8f9;
						width: 393rpx;
						height: 42rpx;
						border-radius: 20rpx;
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
