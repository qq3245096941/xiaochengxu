<template>
	<view>
		<view v-if="istrue">
			<view class="header">
				<view class="header-position">
					<view class="ispositions">
						<swiper class="u-wrp-bnr" @change="fnChange($event)" style="width:100%" interval="5000" duration="1000" circular="true">
							<block class="bannerblock" v-for="(item,index) in usercart" :key="item.mycarId">
								<swiper-item>
									<view class="header-position-top">
										<image class="header-position-top-image" v-if="item.carLogo" :src="item.carLogo"
										 mode="widthFix"></image>
										<view class="header-position-top-image" v-if="!item.carLogo">暂无图片</view>
										<view class="header-position-top-view1">{{item.carName}}</view>
									</view>
									<view class="header-position-middle">
										<text v-if="item.engineDis">{{item.engineDis}}</text><text v-if="item.departureTime">{{item.departureTime}}款</text>
									</view>
									<view class="header-position-bottom">
										<view class="header-position-bottom-view" v-if="item.isDefault==0">已设为默认</view>
										<view class="header-position-bottom-view" v-if="item.isDefault==1" @click="setDefault(item.mycarId)">设为默认</view>
									</view>
								</swiper-item>
							</block>
						</swiper>

					</view>
				</view>
			</view>
			<!-- 头部结束 -->
			<view class="loveArchives-cont">
				<!-- 基本信息开始 -->
				<view class="essentialInformation">
					<view class="essentialInformation-title">
						<image class="essentialInformation-title-image" src="../../static/home/my01.png" mode=""></image>
						<text class="essentialInformation-title-text1">基本信息</text>
						<text class="essentialInformation-title-text2">为您精确匹配保养服务和配件</text>
					</view>
					<view class="essentialInformation-cont">
						<view class="essentialInformation-cont-view1">
							<view>
								<input type="text" class="essentialInformation-cont-view1-T black" v-model="paiLiang" @change="upDetaCar" value="" />
								<view class="essentialInformation-cont-view1-engine">发动机的排量</view>
							</view>
							<image class="essentialInformation-cont-view1-image" src="../../static/home/my03.png" mode=""></image>
						</view>
						<view class="essentialInformation-cont-view2"></view>
						<view class="essentialInformation-cont-view1">
							<view>
								<input type="date" class="essentialInformation-cont-view1-T black" v-model="creatYear" @change="upDetaCar"
								 value="" />
								<view class="essentialInformation-cont-view1-engine">生产年份</view>
							</view>
							<image class="essentialInformation-cont-view1-image" src="../../static/home/my03.png" mode=""></image>
						</view>
					</view>
					<view class="essentialInformation-cont">
						<view class="essentialInformation-cont-view3">款型</view>
						<input type="text" class="essentialInformation-cont-input black" v-model="kuanXing" @change="upDetaCar" value="" />
					</view>
					<view class="essentialInformation-cont">
						<view class="essentialInformation-cont-view5">
							<input type="date" class="essentialInformation-cont-view1-T black" v-model="shangLu" @change="upDetaCar" value="" />
							<view>上路时间</view>
						</view>
						<view class="essentialInformation-cont-view2"></view>
						<view class="essentialInformation-cont-view5">
							<input type="text" class="essentialInformation-cont-view1-T black" v-model="liCheng" @change="upDetaCar" value="" />
							<view>行驶里程</view>
						</view>
					</view>
					<view class="essentialInformation-cont register">
						<view class="essentialInformation-cont-view3">注册时间</view>
						<input type="date" class="essentialInformation-cont-input black" v-model="zhuCe" @change="upDetaCar" style="margin-left: -200rpx;"
						 value="" />
						<image class="essentialInformation-cont-view1-image" src="../../static/home/my03.png" mode=""></image>
					</view>
					<view class="essentialInformation-title">
						<image class="essentialInformation-title-image" src="../../static/home/my02.png" @change="upDetaCar" mode=""></image>
						<text class="essentialInformation-title-text1">车险信息</text>
					</view>
					<view class="essentialInformation-cont">
						<view class="essentialInformation-cont-view5">
							<input type="text" class="essentialInformation-cont-view1-T black" v-model="baoXian" @change="upDetaCar" value="" />
							<view>商业保险公司</view>
						</view>
						<view class="essentialInformation-cont-view2"></view>
						<view class="essentialInformation-cont-view5">
							<input type="date" class="essentialInformation-cont-view1-T black" v-model="baoTime" @change="upDetaCar" value="" />
							<view>保险到期日</view>
						</view>
					</view>
					<view class="essentialInformation-cont">
						<view class="essentialInformation-cont-view5">
							<input type="number" class="essentialInformation-cont-view1-T black" v-model="name" @change="upDetaCar" value="" />
							<view>车主姓名</view>
						</view>
						<view class="essentialInformation-cont-view2"></view>
						<view class="essentialInformation-cont-view5">
							<input type="text" class="essentialInformation-cont-view1-T black" v-model="IdCard" @change="upDetaCar" value="" />
							<view>身份证号</view>
						</view>
					</view>
					<view class="essentialInformation-cont">
						<view class="essentialInformation-cont-view5">
							<input type="text" class="essentialInformation-cont-view1-T black" v-model="City" @change="upDetaCar" value="" />
							<view>投保城市</view>
						</view>
						<view class="essentialInformation-cont-view2"></view>
						<view class="essentialInformation-cont-view5">
							<input type="text" class="essentialInformation-cont-view1-T black" v-model="YandN" @change="upDetaCar" value="" />
							<view>一年内是否过户</view>
						</view>
					</view>
					<button class="Administration" type="primary" @click="gotoMyCart">管理车型</button>

				</view>
			</view>
		</view>


		<view class="Isnothing" v-if="!istrue">
			<view class="titlemsg">
				您暂未添加爱车，赶紧添加定制
			</view>
			<view class="titbtn">
				<button type="default" class="btn" @click="tianjiacar">添加爱车</button>
			</view>

		</view>

	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				istrue: true, //是否有数据

				userid: null,
				cityshow: true,
				usercart: [],

				index: 0,

				mycarId: null, //当前车辆的carid
				mycarIdList: {}, //当前id对应的数组

				paiLiang: null, //发动机排量
				creatYear: null, //生产年份
				kuanXing: null, //款型
				shangLu: null, //上路时间
				liCheng: null, //里程
				zhuCe: null, //注册时间
				baoXian: null, //保险 公司
				baoTime: null, //保险 到期时间
				name: null, //车主姓名
				IdCard: null, //身份证号
				City: null, //投保城市
				YandN: null, //是否过户
			}
		},
		methods: {
			// 获取轮播车辆下标
			fnChange(event) {
				const _this = this;
				if (event) {
					_this.index = event.detail.current
				} else {
					_this.index = 0
				}
				_this.mycarId = _this.usercart[_this.index].mycarId
				_this.mycarIdList = _this.usercart[_this.index]
				if (_this.mycarIdList.engineDis) {
					_this.paiLiang = _this.mycarIdList.engineDis
				} else {
					_this.paiLiang = ''
				}
				if (_this.mycarIdList.productionYear) {
					_this.creatYear = _this.mycarIdList.productionYear
				} else {
					_this.creatYear = ''
				}
				if (_this.mycarIdList.typeMoney) {
					_this.kuanXing = _this.mycarIdList.typeMoney
				} else {
					_this.kuanXing = ''
				}
				if (_this.mycarIdList.departureTime) {
					_this.shangLu = _this.mycarIdList.departureTime
				} else {
					_this.shangLu = ''
				}
				if (_this.mycarIdList.travel) {
					_this.liCheng = _this.mycarIdList.travel
				} else {
					_this.liCheng = ''
				}
				if (_this.mycarIdList.insuranceCompany) {
					_this.baoXian = _this.mycarIdList.insuranceCompany
				} else {
					_this.baoXian = ''
				}
				if (_this.mycarIdList.expiryInsurance) {
					_this.baoTime = _this.mycarIdList.expiryInsurance
				} else {
					_this.baoTime = ''
				}
				if (_this.mycarIdList.realName) {
					_this.name = _this.mycarIdList.realName
				} else {
					_this.name = ''
				}
				if (_this.mycarIdList.userCard) {
					_this.IdCard = _this.mycarIdList.userCard
				} else {
					_this.IdCard = ''
				}
				if (_this.mycarIdList.insureCity) {
					_this.City = _this.mycarIdList.insureCity
				} else {
					_this.City = ''
				}
				if (_this.mycarIdList.whetherTransfer) {
					_this.YandN = _this.mycarIdList.whetherTransfer
				} else {
					_this.YandN = ''
				}
				if (_this.mycarIdList.createDate) {
					_this.zhuCe = _this.mycarIdList.createDate
					_this.zhuCe = new Date(_this.zhuCe);
				} else {
					_this.zhuCe = ''
				}
			},
			gotoMyCart() { //跳转到我的车库
				uni.navigateTo({
					url: '../MyCart/MyCart'
				})
			},
			// 获取爱车档案
			getUserCart(id) {
				let _this = this;
				// 大图轮播
				post.gets({
					method: 'POST',
					url: '/car/' + id + '/carUserAll',
				}).then(res => {
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							if (res.data.list.length != 0) {
								_this.istrue = true
								_this.usercart = res.data.list;
								console.log("我的爱车", _this.usercart);
								_this.fnChange()
							} else {
								_this.istrue = false
							}
						}
					}
				});
			},
			//更新车辆信息
			upDetaCar() {
				let _this = this;
				// 大图轮播
				post.gets({
					method: 'POST',
					url: '/car/upCar',
					data: {
						mycarId: _this.mycarId,
						userId: _this.userid,
						engineDis: _this.paiLiang,
						productionYear: _this.creatYear,
						typeMoney: _this.kuanXing,
						departureTime: _this.shangLu,
						travel: _this.liCheng,
						insuranceCompany: _this.baoXian,
						expiryInsurance: _this.baoTime,
						realName: _this.name,
						userCard: _this.IdCard,
						insureCity: _this.City,
						whetherTransfer: _this.YandN
					}
				}).then(res => {
					_this.getUserCart(_this.userid)
				});

			},
			setDefault(id) { //设为默认
				let _this = this;
				// 大图轮播
				post.gets({
					method: 'POST',
					url: '/car/' + _this.userid + "/" + id + '/upDefCar',
					// /car/{userId}/{carId}/upDefCar
				}).then(res => {
					_this.getUserCart(_this.userid)
				});
			},
			tianjiacar() {
				//没有爱车添加爱车
				uni.navigateTo({
					url: "../getCartType/getCartType"
				})
			}
		},
		onLoad() {
			let _this = this;
			uni.getStorage({ //获取userid
				key: 'login',
				success(res) {
					_this.userid = res.data.userId
					if (_this.userid) {
						_this.getUserCart(_this.userid)
					}
				}
			})
		},
		onShow() {
			let _this = this;
			uni.getStorage({ //获取userid
				key: 'login',
				success(res) {
					_this.userid = res.data.userId
					if (_this.userid) {
						_this.getUserCart(_this.userid)
					}
				}
			})
		}

	}
</script>

<style scoped lang="scss">
	.Isnothing {
		width: 100%;
		height: 100%;

		.titlemsg {
			text-align: center;
			color: #8A8A8A;
			width: 100%;
			height: 478rpx;
			line-height: 478rpx;
			font-size: 30rpx;
		}

		.titbtn {
			width: 100%;
			height: 50rpx;

			.btn {
				background: #D83738;
				color: #fff;
				width: 80%;
				margin-left: 10%;
				font-size: 44rpx;
				height: 74rpx;
				line-height: 74rpx;
			}
		}
	}

	// 头部
	.header {
		width: 750rpx;
		height: 410rpx;
		position: relative;
		background-color: rgba(231, 63, 63, 1);
	}

	.header-position {
		position: absolute;
		width: 705rpx;
		height: 255rpx;
		left: 25rpx;
		top: 91rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
	}

	.header-position-top {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		padding: 29rpx 63rpx 0 33rpx;
	}

	.header-position-top-image {
		width: 70rpx;
		height: 70rpx;
	}

	.header-position-top-view1 {
		width: 298rpx;
		height: 60rpx;
		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: bold;
		margin-left: 40rpx;
		line-height: 60rpx;
	}

	.header-position-top-view2 {
		width: 171rpx;
		height: 60rpx;
		background: linear-gradient(90deg, rgba(255, 151, 15, 1) 0%, rgba(255, 186, 1, 1) 100%);
		border-radius: 30rpx;
		box-sizing: border-box;
	}

	.header-position-top-view2-image {
		width: 20rpx;
		height: 22rpx;
		margin-left: 21rpx;
	}

	.header-position-top-view2-text {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		margin-left: 10rpx;
	}

	.header-position-middle {
		width: 146rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		opacity: 0.6;
		display: flex;
		justify-content: space-between;
		margin-left: 150rpx;
	}

	.header-position-bottom {
		margin-left: 150rpx;
		width: 210rpx;
		border: 1rpx solid rgba(255, 255, 255, 1);
		margin-top: 17rpx;
		display: flex;
	}

	.header-position-bottom-view {
		margin-top: 9rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: red;
		border: 1rpx solid red;
		padding: 5rpx 20rpx;
	}

	.loveArchives-cont {
		width: 705rpx;
		height: 1080rpx;
		background: #F0EFF2;
		box-shadow: 0rpx 0rpx 28rpx 1rpx rgba(78, 101, 153, 0.14);
		border-radius: 15rpx;
		margin: 0 auto;
	}

	/* 基本信息开始 */
	.essentialInformation {
		width: 100%;
		border-radius: 15rpx 15rpx 0 0;
		background: #fff;
	}

	.essentialInformation-title {
		width: 100%;
		height: 100rpx;
		padding-top: 30rpx;
		box-sizing: border-box;
		border-bottom: 4rpx solid #F0EFF2;

	}

	.essentialInformation-title-image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
	}

	.essentialInformation-title-text1 {
		font-size: 30rpx;
		margin-left: 15rpx;
	}

	.essentialInformation-title-text2 {
		font-size: 25rpx;
		color: #B8B8B8;
		margin-left: 15rpx;
	}

	.essentialInformation-cont {
		width: 95%;
		margin: 0 auto;
		color: #B8B8B8;
		height: 100rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		border-bottom: 2rpx solid #B8B8B8;
	}

	.essentialInformation-cont-view1 {
		width: 45%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
	}

	.essentialInformation-cont-view5 {
		width: 45%;
		height: 100rpx;
		font-size: 25rpx;
	}

	.essentialInformation-cont-view2 {
		width: 2rpx;
		height: 50rpx;
		margin: 25rpx 20rpx 0 20rpx;
		background: #B8B8B8;
	}

	.essentialInformation-cont-view1-image {
		width: 30rpx;
		height: 30rpx;
		margin-top: 40rpx;
	}

	.essentialInformation-cont-view1-T {
		font-size: 22rpx;
		font-weight: 700;
		margin-top: 10rpx;
	}

	.essentialInformation-cont-view1-engine {
		font-size: 20rpx;
	}

	.essentialInformation-cont-view3 {
		font-size: 25rpx;
		margin-top: 35rpx;
	}

	.essentialInformation-cont-input {
		margin-left: 20rpx;
		margin-top: 30rpx;
		font-size: 22rpx;
	}

	.essentialInformation-cont-view4 {
		position: absolute;
		z-index: 100;
		width: 704rpx;
		height: 4rpx;
		background: 10rpx solid #F0EFF2;
	}

	.black {
		color: #000;
	}

	.register {
		border-bottom: 14rpx solid #F0EFF2;
		display: flex;
		justify-content: space-between;
	}

	.Administration {
		width: 703rpx;
		height: 108rpx;
		background: rgba(255, 180, 0, 1);
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
		border-radius: 15rpx;
		margin: 0 auto;
		margin-top: 45rpx;
		margin-bottom: 58rpx;
		text-align: center;
		line-height: 108rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
</style>
