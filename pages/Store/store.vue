<template>
	<view class="Store">
		<view class="Topchoose">
			<view class="Topchooseson">
				<!-- 省 -->
				<view class="isCity" @click="clickAddress('省')">
					{{ address.province.name }}
					<van-icon name="arrow-down" />
				</view>
				<!-- 市 -->
				<view class="isCity" @click="clickAddress('市')">
					{{address.city.name===''?'选择市':address.city.name}}
					<van-icon name="arrow-down" />
				</view>
				<!-- 区 -->
				<view class="isCity" @click="clickAddress('区')">
					{{address.district.name===''?'选择区':address.district.name}}
					<van-icon name="arrow-down" />
				</view>
				<!-- 地址选择器 -->
				<van-action-sheet :show="address.isShow" @close="address.isShow=false" @cancel="address.isShow=false" title="选择地址">
					<view>
						<van-area v-if="address.province.isClick" :area-list="address.area" @confirm="addressConfirm" :columns-num="1"
						 :value="address.province.code" />
						<van-area v-if="address.city.isClick" :area-list="address.area" @confirm="addressConfirm" :columns-num="2" :value="address.province.code" />
						<van-area v-if="address.district.isClick" :area-list="address.area" @confirm="addressConfirm" :columns-num="3"
						 :value="address.province.code" />
					</view>
				</van-action-sheet>
			</view>
		</view>
		<!--  -->
		<view>
			<van-dropdown-menu>
				<!-- 门店分类 -->
				<van-dropdown-item :value="storeClassify.currentValue" :options="storeClassify.option" @change="selectClassify" />
				<!-- 排序方式 -->
				<van-dropdown-item :value="actions.selectValue" :options="actions.option" @change="selectActions" />
			</van-dropdown-menu>
		</view>
		<!-- 主要内容 -->
		<view class="content">
			<view class="conterson" v-for="item in trueList" :key="item.storeId" @click="goToDetails(item.storeId)">
				<view class="conimg">
					<image class="conimgson" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/' + item.storeTax" mode=""></image>
				</view>
				<view class="contitle">
					<view class="titleson">
						<text class="tieletext istext">{{ item.storeName }}</text>
						<!-- <view class="titleimgs" v-if="item.icon">
							{{item.icon}}
						</view> -->
					</view>
					<view class="titletow">
						<text>距离我：{{item.distance}}km</text>
					</view>
					<view class="titletow">
						<text class="istext">{{ item.storeAddress }}</text>
						<!-- <text class="right">{{item.km}}</text> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import area from './area.js';
	import post from '../../post.js';
	export default {
		data() {
			return {
				address: {
					/* 是否展示选择器 */
					isShow: false,
					/* 当前用户的地理位置 */
					latitude: 0,
					longitude: 0,
					/* 所有的省份 */
					area: {},
					//省
					province: {
						//当前用户省的名称
						name: '',
						code: 0,
						//当前用户选中的是哪个地址
						isClick: false
					},
					city: {
						name: '',
						code: 0,
						isClick: false
					},
					district: {
						name: '',
						code: '',
						isClick: false
					}
				},
				/* 排序方式 */
				actions: {
					selectValue: 0,
					option: [{
							text: '默认列表',
							value: 0

						},
						{
							text: '距离最近',
							value: 1
						},
					]
				},
				/* 门店分类 */
				storeClassify: {
					currentValue: 0,
					option: []
				},
				trueList: [], // 默认列表
				page: 1, //请求页数
				rows: 10, //每页10条,
			};
		},
		onLoad() {
			this.userid = uni.getStorageSync('login').userId;
			
			wx.getLocation({
				success(res){
					console.log('经纬度',res);
				}
			})
			/* 获取分类店铺的信息 */
			post.gets({
				method: 'GET',
				url: '/industry/industryAll',
			}).then(res => {
				let arr = res.data.data.map(item => {
					return {
						text: item.industryName,
						value: item.industryId
					}
				})

				this.storeClassify.option = [{
					text: '所有分类',
					value: 0
				}, ...arr];
			})
			this.address.area = area;
			this.getuserLo(this.page);
		},
		methods: {
			/* 通过属性值，查找属性key */
			findKey(obj, value, compare = (a, b) => a === b) {
				return Object.keys(obj).find(k => compare(obj[k], value))
			},
			/* 切换距离时 */
			selectActions(res) {
				this.actions.selectValue = res.detail;
				this.getTrueList(this.page);
			},
			selectClassify(res) {
				this.storeClassify.currentValue = res.detail;
				this.getTrueList(this.page);
			},
			/* 点击城市选择 */
			clickAddress(region) {
				this.address.province.isClick = false;
				this.address.city.isClick = false;
				this.address.district.isClick = false;

				switch (region) {
					case '省':
						this.address.province.isClick = true;
						break;
					case '市':
						this.address.city.isClick = true;
						break;
					case '区':
						this.address.district.isClick = true;
						break;
				}
				this.address.isShow = true;
			},
			/* 提交用户选择的信息 */
			addressConfirm(res) {
				this.address.isShow = false;
				this.address.province = {
					name: '',
					code: 0
				};
				this.address.city = {
					name: '',
					code: 0
				};
				this.address.district = {
					name: '',
					code: 0
				};
				const arr = res.detail.values;
				this.address.province = {
					name: arr[0].name,
					code: arr[0].code
				};

				switch (arr.length) {
					case 2:
						this.address.city = {
							name: arr[1].name,
							code: arr[1].code
						};
						break;
					case 3:
						this.address.city = {
							name: arr[1].name,
							code: arr[1].code
						};
						this.address.district = {
							name: arr[2].name,
							code: arr[2].code
						};
						break;
				}
				this.getTrueList(this.page);
			},
			//获取地理位置
			getuserLo() {
				const _this = this;
				wx.getLocation({
					type: 'gcj02', //返回可以用于wx.openLocation的经纬度
					success(data) {
						_this.address.latitude = data.latitude;
						_this.address.longitude = data.longitude;
						let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';
						wx.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${_this.address.latitude},${_this.address.longitude}&key=${keys}`,
							success(res) {
								console.log(res);
								const {
									province,
									city,
									district
								} = res.data.result.address_component;
								_this.address.province = {
									name: province,
									code: _this.findKey(area.province_list, province)
								}
								_this.address.city = {
									name: city,
									code: _this.findKey(area.city_list, city)
								}
								_this.address.district = {
									name: district,
									code: _this.findKey(area.county_list, district)
								}
								_this.getTrueList(_this.page);
							}
						});
					},
					fail(res) {
						console.log(res);
					}
				});
			},
			//点击跳转详情页
			goToDetails(id) {
				// 门店详情
				uni.navigateTo({
					url: '../aboutUs/aboutUs?id=' + id
				});
			},
			/**
			 * 获取店铺信息
			 * @isReachBottom true是上拉加载，false不是
			 */
			getTrueList(page, isReachBottom = false) {
				wx.showLoading({
					title: '加载中'
				});

				let obj = { 
					page: isReachBottom ? this.page : 1, //请求页数
					rows: 10, //每页10条
					userId: this.userid, //userid
					storeProvince: this.address.province.name,
					storeCity: this.address.city.name,
					storeCounty: this.address.district.name,

					/* 店铺分类 */
					industry: this.storeClassify.currentValue === 0 ? '' : this.storeClassify.currentValue
				}


				Reflect.set(obj, 'distranceX', this.address.longitude);
				Reflect.set(obj, 'distranceY', this.address.latitude);

				post.gets({
					method: 'POST',
					url: '/store/storeList',
					data: obj
				}).then(res => {
					wx.hideLoading();
					if (res.statusCode === 200 && res.data.code == 0) {
						const arr = res.data.list;
						console.log('商店信息', arr);
						/* 判断是否是上拉加载数据 */
						if (isReachBottom) {
							this.trueList = [...this.trueList, ...arr];
						} else {
							this.trueList = arr;
							/* 初始化页数 */
							this.page = 1;
						}

						if (arr.length === 0) {
							wx.showToast({
								title: '暂无更多数据',
								icon: 'loading',
								duration: 1000 //持续的时间
							});
						}
					}
				});
			},

			onReachBottom: function() {
				this.page++;
				this.getTrueList(this.page, true); //下拉加载更多
			}
		}
	};
</script>

<style scoped lang="scss">
	.isCity {
		display: inline-block;
		width: 33%;
		height: 100%;
	}

	.istext {
		width: 490rpx;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.Store {
		width: 100%;
		height: 100%;
		// padding:0 22rpx;
		background: #fff;

		.Topchoose {
			height: 77rpx;
			width: 100%;
			display: flex;
			border-bottom: 1px solid rgba(220, 221, 221, 1);

			.Topchooseson {
				width: 100%;
				height: 77rpx;
				line-height: 77rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #000;
				text-align: center;
			}
		}

		//主要内容
		.content {
			width: 100%;

			.conterson {
				margin: 22rpx;
				display: flex;
				width: 706rpx;
				height: 180rpx;
				border-bottom: 1rpx solid rgba(220, 221, 221, 1);

				.conimg {
					padding: 22rpx 0;
					width: 140rpx;
					height: 140rpx;

					.conimgson {
						width: 100%;
						height: 100%;
					}
				}

				.contitle {
					margin-left: 22rpx;
					height: 180rpx;
					width: 544rpx;
					padding: 22rpx 0;

					.titleson {
						color: #000;
						font-family: PingFang SC;
						font-weight: bold;
						font-size: 30rpx;
					}

					.titleimgs {
						width: 30rpx;
						height: 30rpx;
						float: right;
						margin-top: 2rpx;
						border: 4rpx solid #d5a56f;
						font-size: 25rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #d5a56f;
					}

					.titletow {
						font-size: 22rpx;
						height: 44rpx;
						line-height: 44rpx;
						color: #999;

						.origin {
							color: #f40;
						}

						.right {
							float: right;
						}
					}
				}
			}
		}
	}

	.nbsp {
		margin: 0 8rpx;
	}
</style>
