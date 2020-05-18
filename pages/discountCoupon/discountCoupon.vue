<!-- 优惠券 -->
<template>
	<view style="background: #e8eaec;">
		<van-popup custom-style="background-color: rgba(0, 0, 0, 0);" :show="isShow" @close="isShow=false" closeable>
			<view class="content">
				<input type="text" style="width: 200rpx;" placeholder="请输入口令" :value="code" @input="change">
				<!-- 立即领取 -->
				<button @click="getCoupon">立即领取</button>
			</view>
		</van-popup>

		<van-tabs active="0" bind:change="onChange">
			<van-tab tab-active-class="tabActiveClass" name="0" :title="'我的优惠券('+num+')'"></van-tab>
		</van-tabs>

		<view @click="selectCon(item)" class="list" :key="index" v-for="(item,index) in list">
			<view class="item">
				<image src="../../static/discountCoupon/item.png" mode="widthFix"></image>
				<text>未使用</text>
			</view>
		</view>
	</view>
</template>

<script>
	import post from '../../post.js'

	export default {
		data() {
			return {
				isShow: true,
				code: '',
				list: [],
				num: 0,
				/* 传入的商品总价 */
				total: 0
			}
		},
		methods: {
			getCoupon() {
				post.gets({
					url: `/coupon/${this.code}/upCouponPwd`,
					data: {
						userId: uni.getStorageSync('login').userId
					}
				}).then(data => {
					/* 成功 */
					if (data.data.code === '0') {
						this.isShow = false;
						this.getData();
					} else {
						uni.showToast({
							title: data.data.message,
							icon: 'none'
						})
					}
				})
			},
			/* 选择优惠券 */
			selectCon(item) {
				if(isNaN(this.total)){
					return;
				}

				if (item.couponPrice > this.total) {
					uni.showToast({
						title: '优惠券价格大于商品价格，此优惠券不能使用',
						icon: 'none'
					})
					return;
				}

				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.coupon.id = item.couponId;
				prevPage.$vm.coupon.title = item.couponName;
				prevPage.$vm.coupon.price = item.couponPrice;
				uni.navigateBack({
					delta: 1
				})
			},
			getData() {
				/* 获取当前用户的优惠券 */
				post.gets({
					url: '/coupon/couponAll',
					data: {
						userId: uni.getStorageSync('login').userId,
						page: 1,
						rows: 9999
					}
				}).then(data => {
					this.list = data.data.couponList;
					if (this.list.length > 0) {
						this.isShow = false;
					}
					this.num = data.data.couponList.length;
					console.log(this.list);
				})
			},
			change(res) {
				this.code = res.detail.value
			}
		},
		onLoad({
			total
		}) {
			this.total = Number.parseInt(total);
			this.getData();
		},
	}
</script>

<style>
	.content {
		position: relative;
		background-image: url('https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/kouling.png');
		background-size: 100% 100%;
		width: 735rpx;
		height: 760rpx;
		position: relative;
		margin-bottom: 200rpx;
	}

	input {
		position: absolute;
		top: 458rpx;
		left: 145rpx;
	}

	button {
		position: absolute;
		top: 558rpx;
		left: 145rpx;
		width: 500rpx;
		height: 100rpx;
		background: red;
		opacity: 0;
	}

	.list {
		padding: 10rpx 10rpx 0 10rpx;
		position: relative;
	}

	.list .item image {
		position: absolute;
		width: 98%;
	}

	.list .item text {
		top: 100rpx;
		font-size: 25rpx;
		position: absolute;
		right: 30rpx;
		color: #fff;
	}

	.van-ellipsis {
		color: #d70910;
	}
</style>
