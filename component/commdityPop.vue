<!-- 商品弹框 -->
<template>
	<view>
		<van-popup round :show="isShow" position="bottom" @close="close" custom-style="height: 70%;padding:20rpx">
			<view style="display: flex;padding: 30rpx;align-items: center;">
				<image mode="widthFix" style="width: 150rpx;height: 150rpx;" :src="commdity.commdityThnmbnail | getImg"></image>
				<view style="margin-left: 20rpx;">
					<view style="font-size: 30rpx;">{{commdity.commdityName}}</view>
					<view style="color: #ed4014;margin-top: 5rpx;"><text style="font-size: 20rpx;">￥</text><text style="font-size: 60rpx;">{{commdity.commdityPrice}}</text></view>
				</view>
			</view>
			
			<view style="font-size: 35rpx;margin: 0 0 20rpx 20rpx;">选规格：</view>

			<view class="commodityClassBox">
				<view :key="index" @click="selectClass(index)" :class="['commodityClsss',isSelectClass===index?'active':'']" v-for="(item,index) in commdityClass">
					{{item.specName}}
				</view>
			</view>
			<van-divider />

			<van-cell-group>
				<van-cell title="购买数量" :border="false">
					<van-stepper :value="number" @change="numberChange"/>
				</van-cell>
			</van-cell-group>

			<view style="position: fixed;width: 95%;bottom: 20rpx;">
				<van-button type="danger" round block @click="joinCar">{{isType===0?'加入购物车':'立即购买'}}</van-button>
			</view>

			</van-grid>
		</van-popup>
	</view>
</template>

<script>
	import post from '../post.js'

	export default {
		props: {
			commdityId: {
				type: Number,
				required: true
			},
			isShow: {
				type: Boolean,
				required: false
			},
			/* 0表示购物车弹框，1表示立即购买弹框 */
			isType: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				/* 购买数量 */
				number: 1,
				commdity: '',
				/* 规格 */
				commdityClass: [],
				/* 当前选择的是哪个规格 */
				isSelectClass: 0
			}
		},
		methods: {
			numberChange(res) {
				this.number = res.detail;
			},
			selectClass(index) {
				this.isSelectClass = index;
			},
			close() {
				this.$emit('close');
			},
			joinCar() {
				/* 获取规格 */
				
				switch (this.isType) {
					/* 购物车 */
					case 0:
						post.gets({
							method: 'POST',
							url: '/cart/addCart',
							data: {
								userId: uni.getStorageSync('login').userId,
								commdityId: this.commdityId,
								commdityCount:this.number,
								commdityClass:this.commdityClass[this.isSelectClass].specName
							}
						}).then(data => {
							uni.showToast({
								title: '加入购物车成功',
								icon: 'none'
							})
						})

						this.$emit('success');
						break;
					case 1:
						let commdityList = [{
							commdityId:this.commdityId,
							num:this.number,
							clazz:JSON.stringify([this.commdityClass[this.isSelectClass].specName])
						}];
						
						let total = this.number * this.commdity.commdityPrice;

						uni.navigateTo({
							url: `/pages/orderConfirmation/orderConfirmation?commdityList=${JSON.stringify(commdityList)}&total=${total}&orderType=0`
						})
						break;
				}
				/* 关闭弹框 */
				this.$emit('close');
			}
		},
		watch: {
			commdityId(newValue) {
				/* 获取具体的商品 */
				post.gets({
					url: `/commdity/${newValue}/searchInfo`,
					data: {
						userId: uni.getStorageSync('login').userId
					}
				}).then(data => {
					this.commdity = data.data.commdityInfo;
					this.commdityClass = JSON.parse(this.commdity.commdityClass).map(item => {
						return item;
					});
				})
			}
		}
	}
</script>

<style>
	.commodityClassBox {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.commodityClassBox .commodityClsss {
		color: #808695;
		font-size: 20rpx;
		border: 1rpx solid #808695;
		border-radius: 20rpx;
		padding: 10rpx;
		width: 25%;
		margin: 10rpx 0 0 10rpx;
		text-align: center;
	}

	.active {
		color: #ed4014 !important;
		border: 1rpx solid #ed4014 !important;
		background:  #ffe5e5;
	}
</style>
