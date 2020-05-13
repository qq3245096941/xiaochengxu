<!-- 优惠券 -->
<template>
	<view>
		<van-tabs :active="isShowDiscount" @change="discountTab">
			<van-tab :key="index" v-for="(item,index) in discount" :title="item.name" :name="item.index">
				<!-- 系统优惠券 -->
				<view :key="tIndex" v-for="(ticket,tIndex) in item.list" class="box">
					<view class="item">
						<view class="price">
							<view><text>￥</text><text style="font-size: 60rpx;font-weight: bold;">{{ticket.money}}</text></view>
							<view style="font-size: 25rpx;text-align: center;">立减{{ticket.money}}元</view>
						</view>

						<view class="data">
							<view style="color: #17233d;font-size: 30rpx;">新人专享</view>
							<view style="margin-bottom: 20rpx;color: #515a6e;">{{ticket.time}}</view>
							<view style="text-align: right;" @click="isShowToast=true">查看说明>></view>
						</view>

						<view class="get" @click="getDiscount(ticket)">
							立刻<br>领取
						</view>

						<!-- 说明-->
						<van-popup position="bottom" :show="isShowToast" @close="isShowToast=false" custom-style="height: 20%;" round
						 overlay-style="background:#515a6e">
							<view style="padding: 50rpx;">
								{{ticket.explain}}
							</view>
						</van-popup>
					</view>
				</view>

				<!-- 领取优惠券弹框 -->
				<van-dialog use-slot :show="item.isModalShow" show-cancel-button @close="item.isModalShow=false">
					<view>
						30员相亲
					</view>
				</van-dialog>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import post from '../../post.js'

	export default {
		data() {
			return {
				discount: {
					admin: {
						/* 是否展示领取优惠券时的弹框 */
						isModalShow: false,
						index: '0',
						name: '优惠券',
						/* 优惠券 */
						list: [],
						page: 1,
						
					},
					my: {
						index: '1',
						name: '我的优惠券',
						/* 我的优惠券 */
						list: [],
					}
				},
				/* 是否展示说明 */
				isShowToast: false,
				/* 当前正在展示是什么 0为优惠券 1为我的优惠券 */
				isShowDiscount: '0'
			}
		},
		methods: {
			/* 获取优惠券 */
			getDiscount(ticket) {
				console.log(ticket);
				this.discount.admin.isModalShow=true;
			},
			discountTab({
				detail
			}) {
				this.isShowDiscount = detail;
			},
			getAdminList() {
				post.gets({
					method: 'GET',
					url: '/coupon/couponAll',
					data: {
						page: this.discount.admin.page,
						rows: 8
					}
				}).then(data => {
					this.discount.admin.list = [...this.discount.admin.list, ...data.data.couponList];
				})
			}
		},
		onLoad() {
			this.discount.admin.list = Array.from({
				length: 8
			}).map(() => {
				return {
					money: 30,
					title: '新人专享',
					time: '2019年3月~2019年5月',
					explain: '说明说明说明说民说明说明说民说明说明说民说明说明说民说明说明说民说明说明说民说明说明说民说明说明说民说明说明说民'
				}
			})
		},
		onReachBottom() {
			this.discount.admin.page++;
			this.getAdminList();
		}
	}
</script>

<style>
	.box {
		padding: 30rpx 30rpx 0 30rpx;
	}

	.box .item {
		background-image: url('../../static/discountCoupon/djqdt.png');
		height: 180rpx;
		background-size: 100% 100%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
	}

	.box .item .price {
		color: #ed4014;
		margin-left: 40rpx;
	}

	.box .item .data {
		margin-left: 85rpx;
		font-size: 25rpx;
	}

	.box .item .get {
		margin-left: 130rpx;
		color: #fff;
		font-size: 30rpx;
	}
</style>
