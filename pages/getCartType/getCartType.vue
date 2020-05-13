<template>
	<view>
		<view class="Search-box">
			<image class="serchImg" src="../../static/home/sousuo.png" mode=""></image>
			<input @input="fandName" placeholder="汽车品牌关键字" placeholder-style="color:#000" type="inputs" class="Search">
		</view>
		<view class="content">
			<view class="isTitle">
				热门品牌
			</view>
			<van-index-bar v-if="!isSch" :use-slot="true">
				<view v-for="(zimu,zimuIndex) in indexList" :key="zimuIndex">
					<van-index-anchor :index="zimu" />
					<van-cell :icon="item.brandLogo" v-for="(item,index) in comList" :key="index" :title="item.brandName" v-if="item.brandInitials===zimu"
					 @click="showPopup(item.carBrand,item.brandName)" />
				</view>
			</van-index-bar>
			<van-index-bar v-if="isSch">
				<view>
					<van-index-anchor index="A" :use-slot="true" />
					<van-cell :icon="item.brandLogo" v-for="(item,index) in comList" :key="index" :title="item.brandName" @click="showPopup(item.carBrand,item.brandName)" />
				</view>
			</van-index-bar>
			<van-popup :show="show" position="right" custom-style="height: 100%;width:620rpx" @close="onClose">
				<view class="isAllcart">
					<view class="isAllcart1">
						{{isCartName}}
					</view>
					<view class="isAllcart2">
						{{isCartName}}
					</view>
					<view class="sonAllList" v-for="(item,index) in comList1" :key="item.vehicleId" @click="gitEngine(item.vehicleId,carBrand,item.vehicleName)">
						{{item.vehicleName}}
					</view>
				</view>
			</van-popup>
			<!-- <van-cell title="展示弹出层" is-link @click="showPopup()" />
		<van-popup :show="show" position="right" custom-style="height: 100%;width:70%" @close="onClose">内容</van-popup> -->
		</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				name: '', //搜索汽车
				isSch: false,
				show: false,
				page: 1, //商品页数
				comList: [], //商品列表
				comListSon: [],
				comList1: [], //商品列表
				comListSon1: [],
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
					"V", "W", "X", "Y", "Z"
				],
				carBrand: "",
				isCartName: ''
			}
		},
		methods: {
			//跳转发动机页面
			gitEngine(vehicleId, carBrand, vehicleName) {
				uni.navigateTo({
					url: '../Engine/Engine?vehicleId=' + vehicleId + "&carBrand=" + carBrand + "&vehicleName=" + vehicleName
				});
			},
			//搜索文字
			fandName(e) {
				console.log(e)
				const _this = this;
				if (!e) {
					_this.isSch = false
				} else {
					_this.isSch = true
					_this.name = e.detail.value
					_this.comList = []
					_this.getcomList(_this.page)
				}
			},
			//获取所有品牌
			getcomList(page) {
				let _this = this;
				if (_this.name) {
					post.gets({
						method: 'POST',
						url: '/carbrand/carBrandAll',
						data: {
							carBrand: _this.name,
							page: page,
							rows: 348,
						}
					}).then(res => {
						//轮播图
						if (res.statusCode === 200) {
							if (res.data.code == 0) {
								_this.comListSon = res.data.list;
								Array.prototype.push.apply(_this.comList, _this.comListSon); //合并加载更多的数据与源数据.
							}
						}
					});
				} else {
					post.gets({
						method: 'POST',
						url: '/carbrand/carBrandAll',
						data: {
							page: page,
							rows: 348,
						}
					}).then(res => {
						//轮播图
						if (res.statusCode === 200) {
							if (res.data.code == 0) {
								_this.comListSon = res.data.list;
								Array.prototype.push.apply(_this.comList, _this.comListSon); //合并加载更多的数据与源数据.

								const map = new Map();
								_this.indexList.forEach(zimu => {
									map.set(zimu, 0);
								})

								_this.comList.forEach(item => {
									map.set(item.brandInitials, map.get(item.brandInitials) + 1);
								})

								map.forEach((value, key) => {				
									if(value===0){
										_this.indexList.splice(_this.indexList.findIndex((zimu)=>{
											return zimu===key;
										}),1)
									}
								})

								console.log(_this.indexList);
							}
						}
					});
				}

			},
			//打开弹框
			showPopup(id, name) {
				const _this = this;
				_this.show = true
				_this.carBrand = id
				_this.isCartName = name
				_this.getCartsonType(_this.carBrand, _this.page)

			},
			//获取车系
			getCartsonType(id, page) {
				const _this = this;
				_this.comList1 = []
				post.gets({
					method: 'POST',
					url: '/vehicle/vehicleAll',
					data: {
						carBrand: id,
						page: page,
						rows: 30
					}
				}).then(res => {
					console.log(res, "所有车系")
					//轮播图
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.comListSon1 = res.data.list;
							Array.prototype.push.apply(_this.comList1, _this.comListSon1); //合并加载更多的数据与源数据.
						}
					}
				});
			},
			//关闭弹框
			onClose() {
				const _this = this;
				_this.show = false
			},

		},
		onLoad() {
			const _this = this;
			_this.getcomList(_this.page); //获取商品列表
		},
		onReachBottom: function() {
			const _this = this;
			_this.page++
			_this.getCartsonType(_this.carBrand, _this.page)
		}
	}
</script>

<style lang="scss" scoped>
	.isAllcart {
		width: 100%;
		height: auto;
		padding-left: 40rpx;

		.isAllcart1 {
			width: 100%;
			height: 122rpx;
			font-size: 30rpx;
			font-weight: bold;
			line-height: 122rpx;
			color: rgba(0, 0, 0, 1);
		}

		.isAllcart2 {
			font-size: 20rpx;
			background: rgba(238, 240, 237, 1);
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			color: rgba(138, 138, 138, 1);
		}

		.sonAllList {
			width: 100%;
			font-size: 28rpx;
			height: 82rpx;
			line-height: 82rpx;
			border-bottom: 1px solid rgba(184, 184, 184, 1);
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}
	}

	.islogo {
		width: 68rpx;
		height: 68rpx;
	}

	.isTitle {
		width: 100%;
		height: 49rpx;
		font-size: 25rpx;
		background: rgba(238, 240, 237, 1);
		color: rgba(34, 24, 21, 1);
		text-indent: 7%;
		line-height: 49rpx;
	}

	.jiugongge {
		height: 154rpx;
		width: 96%;
		margin-left: 2%;
		display: flex;

		.jiuson {
			width: 20%;
			height: 100%;
			text-align: center;

			.jiusonimg {
				width: 64rpx;
				height: 67rpx;
				background: rgba(159, 160, 160, 1);
				margin-top: 30rpx;
			}

			.jiusontitle {
				margin-top: 8rpx;
				color: rgba(34, 24, 21, 1);
				font-size: 25rpx;
			}

		}
	}

	.Search-box {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
		position: sticky;
		top: 0;
		left: 0;
	}

	.Search {
		font-size: 22rpx;
		width: 700rpx;
		height: 50rpx;
		background: #f8f8f8;
		border-radius: 25rpx;
		margin: 0 auto;
		padding-left: 50rpx;
		box-sizing: border-box;
		position: relative;
	}

	.serchImg {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		left: 40rpx;
		top: 28rpx;
		z-index: 30;
	}
</style>
