<template>
	<view>
		<view class="total">共{{num}}件商品</view>
		<view :key="index" v-for="(commdity,index) in commdityList">
			<van-row>
				<van-col span="3">
					<view style="margin: 70rpx 0 0 25rpx;">
						<van-checkbox :value="commdity.isClick" @change="setClick(commdity)"></van-checkbox>
					</view>
				</van-col>
				<van-col span="21">
					<van-card custom-class="card" 
					:num="commdity.commdityCount" 
					:price="commdity.commdityPrice*commdity.commdityCount" 
					:title="commdity.commdityName" 
					:thumb="commdity.commdityThnmbnail | getImg" >
						<view slot="footer">
						    <van-button type="warning" plain round size="mini" @click="deletePay(commdity,index)">取消</van-button>
						    <van-button type="danger" plain round size="mini" @click="wxPay(commdity)">去付款</van-button>
						  </view>
					</van-card>
				</van-col>
			</van-row>
			<view class="hen"></view>
		</view>

		<van-submit-bar button-text="立即支付" :price="total" safe-area-inset-bottom @submit="allSubmit">
			<van-checkbox :value="isAllClick" @change="clickAll()">全选</van-checkbox>
		</van-submit-bar>
	</view>
</template>

<script>
	import post from '../../post.js';

	export default {
		data() {
			return {
				commdityList: [],
				num: 0,
				/* 是否点击了全选*/
				isAllClick: false,
				/* 总计,注意，这里是分为单位*/
				total: 0
			}
		},
		mounted() {

		},
		methods: {
			/* 全选提交 */
			allSubmit() {
				let [total, list, num, commdityClass, orderType, carid] = [0, [],
					[],
					[], 0, []
				];

				this.commdityList.forEach(commdity => {
					if (commdity.isClick === true) {
						total = total + commdity.commdityPrice * commdity.commdityCount;
						console.log(total);
						list = [...list, commdity.commdityId];
						num = [...num, commdity.commdityCount];
						commdityClass = [...commdityClass, commdity.commdityCount];
						carid = [...carid, commdity.cartId];
					}
				})

				list = JSON.stringify(list);
				num = JSON.stringify(num);
				commdityClass = JSON.stringify(commdityClass);
				carid = JSON.stringify(carid);

				uni.navigateTo({
					url: `/pages/orderConfirmation/orderConfirmation?list=${list}&total=${total}&num=${num}&commdityClass=${commdityClass}&orderType=${orderType}&carid=${carid}`
				})
			},
			/* 清除购物车的一个商品 */
			deletePay(commdity, index) {
				post.gets({
					url: `/cart/delCart`,
					data: {
						cartId: commdity.cartId
					}
				}).then(data => {
					this.commdityList.splice(index, 1);
				})
			},
			/* 点了复选框 */
			setClick(commdity) {
				this.total = 0;
				commdity.isClick = !commdity.isClick;

				this.commdityList.map(item => {
					if (item.isClick === true) {
						this.total = this.total + item.commdityPrice * item.commdityCount * 100
					}
					return item;
				})
			},
			/* 单个商品付款 */
			wxPay(commdity) {
				let total = commdity.commdityCount * commdity.commdityPrice;
				let list = JSON.stringify([commdity.commdityId]);
				let num = JSON.stringify([commdity.commdityCount]);
				let commdityClass = JSON.stringify([commdity.commdityClass]);
				let orderType = 0;
				let carid = JSON.stringify([commdity.cartId])

				uni.navigateTo({
					url: `/pages/orderConfirmation/orderConfirmation?list=${list}&total=${total}&num=${num}&commdityClass=${commdityClass}&orderType=${orderType}&carid=${carid}`
				})
			},
			/* 全选 */
			clickAll() {
				this.total = 0;

				this.isAllClick = !this.isAllClick

				this.commdityList.map(item => {
					item.isClick = this.isAllClick;
					this.total = this.total + item.commdityPrice * item.commdityCount * 100
					return item;
				})

				if (this.isAllClick === false) {
					this.total = 0;
				}
			}
		},
		async onLoad() {
			post.gets({
				url: `/cart/${uni.getStorageSync('login').userId}/cartAll`,
				data: {
					page: 1,
					rows: 9999
				}
			}).then(data => {
				this.commdityList = data.data.cartList.map(item => {
					item.isClick = false;
					return item;
				})
				this.num = data.data.cartList.length;
			})
		}
	}
</script>

<style>
	.total {
		background: #e8eaec;
		font-size: 28rpx;
		color: #515a6e;
		padding: 15rpx;
	}
	
	.card{
		background: #fff;
	}
</style>
