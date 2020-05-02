<template>
	<view class="Store">
		<view class="Topchoose">
			<view class="Topchooseson">
				<view class="isCity" @click="getClose">
					{{ qu }}
					<van-icon name="arrow-down" />
				</view>
				<view class="isCity" @click="getClose1">
					 门店
					<van-icon name="arrow-down" />
				</view>
				<view class="isCity" @click="getClose2">
					{{ istitle3 }} 
					<van-icon name="arrow-down" />
				</view> 
				<!-- 省市区选择器 -->
				<van-action-sheet :show="isshow" @close="onClose" @cancel="onCancel" title="地区">
					<view><van-area :area-list="areaList" @confirm="onConfirm" /></view>
				</van-action-sheet>
				<!-- 附件门店选择器 -->
				<van-action-sheet :show="isshow1" @close="onClose1" @cancel="onCancel1" title="门店"></van-action-sheet>
				<!-- 距离选择器 -->
				<van-action-sheet :show="isshow2" @close="onClose2" @cancel="onCancel2" :actions="actions" @select="getselect"  :title="istitle3"></van-action-sheet>
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="content">
			<view class="conterson" v-for="item in trueList" :key="item.storeId" @click="goToDetails(item.storeId)">
				<view class="conimg"><image class="conimgson" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/' + item.storeTax" mode=""></image></view>
				<view class="contitle">
					<view class="titleson">
						<text class="tieletext istext">{{ item.storeName }}</text>
						<!-- <view class="titleimgs" v-if="item.icon">
							{{item.icon}}
						</view> -->
					</view>
					<view class="titletow">
						<text>
							总评价
							<text class="origin">{{ item.ason }}</text>
						</text>
						<text class="nbsp">|</text>
						<text>
							总订单
							<text class="origin">{{ item.alist }}</text>
						</text>
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
			isshow: false,
			isshow1: false,
			isshow2: false,
			actions: [{ name: '默认列表' }, { name: '距离最近' }],
			istitle3:'默认列表', // 默认还是 距离最近
			trueList: [], // 默认列表
			trueListSon: [], //默认列表
			page: 1, //请求页数
			rows: 10, //每页10条
			sheng: '', //省
			shi: '', //市
			qu: '', //区   //将区 传给后台获取当前区域的门店
			areaList: [] //省市区信息
		};
	},
	onLoad() {
		const _this = this;
		_this.getuserLo();
		uni.getStorage({  //获取userid
		  key: 'login',
		  success (res) {
			_this.userid = res.data.userId
		  }
		})
		_this.areaList = area;
	},
	methods: {
		onConfirm(e) {
			const _this = this;
			this.isshow = false;
			console.log(e);
			//省
			_this.sheng = e.detail.values[0].name;
			_this.shi = e.detail.values[1].name;
			_this.qu = e.detail.values[2].name;
			_this.trueList = []
			_this.getTrueList(_this.page);
			console.log(this.sheng, this.shi, this.qu);
		},
		//关闭市区
		onClose() {
			this.isshow = false;
		},
		onCancel() {
			//点击取消
			console.log(123);
			this.isshow = false;
		},
		getClose() {
			this.isshow = true;
		},
		//关闭门店
		onClose1() {
			this.isshow1 = false;
		},
		onCancel1() {
			this.isshow1 = false;
		},
		
		getClose1() {
			this.isshow1 = true;
		},
		//关闭默认选择
		onClose2() {
			this.isshow2 = false;
		},
		onCancel2() {
			this.isshow2 = false;
		},
		getClose2() {
			this.isshow2 = true;
		},
		getselect(e){   //获取默认列表还是距离最近
			this.istitle3 = e.detail.name
		},
		//获取地理位置
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
							_this.qu = res.data.result.address_component.district;
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
		//获取默认列表
		getTrueList(page) {
			let _this = this;
			wx.showLoading({
				title: '加载中'
			});
			post.gets({
				method: 'POST',
				url: '/store/storeList',
				data: {
					page: page, //请求页数
					rows: 10, //每页10条
					userId: _this.userid ,//userid
					storeCounty:_this.qu
				}
			}).then(res => {
				console.log(res,"mendian")
				console.log(_this.qu,"quxian")
				wx.hideLoading();
				if (res.statusCode === 200 && res.data.code == 0) {
					if (res.data.list.length != 0) {
						_this.trueListSon = res.data.list;
						Array.prototype.push.apply(_this.trueList, _this.trueListSon); //合并加载更多的数据与源数据.
					} else {
						wx.showToast({
							title: '暂无更多数据',
							icon: 'loading',
							duration: 500 //持续的时间
						});
					}
				}
			});
		},

		onReachBottom: function() {
			const _this = this;
			_this.page++;
			_this.getTrueList(_this.page); //下拉加载更多
		}
	}
};
</script>

<style scoped lang="scss">
.isCity {
	display: inline-block;
	width: 33.3%;
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
