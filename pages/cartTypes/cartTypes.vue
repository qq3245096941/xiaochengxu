<template>
	<view>
		<view class="EngineHead">
			<image src="../../static/fanhui.png" mode=""></image>
			<view>{{vehicleName}}</view>
		</view>
		<view class="ismsg">
			<text @click="bankEngine">
				{{pailiang}} >
			</text>
			<text @click="bankyear">
				{{nianfeng}} >
			</text>

		</view>
		<view class="EngineChoose">
			请选择车型
		</view>
		<view class="allcartYear">
			<view class="EngineItem" v-for="(item,index) in iscart" :key="index" @click="SetDeCart(item.vehicleName)">
				{{item.modelName}}</view>
		</view>


	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				userid: '', //用户id
				vehicleName: "", //车名
				pailiang: '', //排量
				carBrand: "", //品牌id
				vehicleId: '', //车系id
				iscartYear: [], //车辆信息
				iscartson: [],
				iscart: [], //车型列表
				nianfeng: '', //年份
				carId: '', //车辆id
			}
		},
		methods: {
			getyear() {
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/modelConfig/modelConfigAll',
					data: {
						page: 1,
						rows: 20,
						carBrand: _this.carBrand,
						vehicleId: _this.vehicleId,
						annualMoney: _this.nianfeng
					}
				}).then(res => {
					//车型
					console.log("车型", res)
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.iscartson = res.data.list;
							Array.prototype.push.apply(_this.iscart, _this.iscartson);
						}
					}
				});
			},
			//设置默认车型
			SetDeCart(cart) {
				let _this = this;
				// 添加车型
				post.gets({
					method: 'POST',
					url: '/car/addCar',
					data: {
						carName: cart,
						isDefault: 0,
						engineDis: _this.pailiang,
						productionYear: _this.nianfeng,
						userId: _this.userid,
					}
				}).then(res => {
					uni.setStorageSync("nowcar", cart);
					uni.showToast({
						title: '添加成功',
						icon: 'success',
					})
					setTimeout(()=>{
						uni.switchTab({
							url: '../Mine/Mine'
						})
					},2000);

					// uni.navigateBack({
					// 	delta:4
					// })
				});
			},
			//返回上级
			bankEngine() {
				uni.navigateTo({
					url: '../Engine/Engine'
				});
			},
			bankyear() {
				uni.navigateTo({
					url: '../caryYear/caryYear'
				});
			}


		},
		onLoad(vehicleId) {
			const _this = this;
			uni.getStorage({
				key: 'login',
				success(res) {
					_this.userid = res.data.userId
				}
			})
			_this.vehicleId = vehicleId.vehicleId //当前车型id  15
			_this.carBrand = vehicleId.carBrand //当前品牌id  1
			_this.vehicleName = vehicleId.vehicleName; //车名  宝来经典
			_this.pailiang = vehicleId.pailiang; //排量  1.6L 100马力 L4
			_this.nianfeng = vehicleId.nianfeng //2004款
			let iscart = [{
					vehicleId: _this.vehicleId
				},
				{
					carBrand: _this.carBrand
				},
				{
					vehicleName: _this.vehicleName
				},
				{
					pailiang: _this.pailiang
				},
				{
					nianfeng: _this.nianfeng
				}
			]
			uni.setStorageSync("iscart", iscart);
			_this.getyear()
		},
		onReachBottom: function() {
			const _this = this;
			_this.page++;
			_this.getyear()
		}
	}
</script>

<style lang="scss" scoped>
	.EngineHead {
		width: 100%;
		height: 120rpx;
		background: #000;
		color: #ffffff;
		display: flex;
		align-items: center;
		font-size: 30rpx;

		image {
			width: 82rpx;
			height: 82rpx;
			border-radius: 50%;
			margin-left: 40rpx;
			margin-right: 32rpx;
		}
	}

	.EngineTitle {
		width: 100%;
		height: 74rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		margin-left: 40rpx;
	}

	.EngineChoose {
		font-size: 24rpx;
		display: flex;
		align-items: center;
		background: rgba(238, 240, 237, 1);
		width: 750rpx;
		height: 60rpx;
		padding-left: 40rpx;
		box-sizing: border-box;
	}

	.EngineItem {
		width: 578rpx;
		height: 82rpx;
		border-bottom: 1rpx solid rgba(184, 184, 184, 1);
		margin-left: 40rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
	}

	.ismsg {
		width: 100%;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		margin-left: 40rpx;

	}
</style>
