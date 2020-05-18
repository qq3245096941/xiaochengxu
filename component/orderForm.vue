<!-- 订单项目 -->
<template>
	<view>
		<view style="padding:10rpx 30rpx;">
			<view class="order">
				<text>订单编号：{{order.orderId}}</text>
				<text style="float: right;color: #ff9900;">{{text}}</text>
			</view>

			<view style="border-bottom: 1rpx solid #e8eaec;margin-bottom: 10rpx;">
				<van-row :key="index" v-for="(commdity,index) in commdityList">
					<van-col span="2">
						<view style="margin-top: 70rpx;">
							<van-checkbox :value="commdity.isClick" @change="setClick(commdity)"></van-checkbox>
						</view>
					</van-col>
					<van-col span="22">
						<van-row>
							<van-col span="6">
								<image style="width: 200rpx;" mode="widthFix" :src="commdity.commdityThnmbnail | getImg"></image>
							</van-col>
							<van-col span="18">
								<view style="padding: 20rpx;">
									<view style="color: #515a6e;font-size: 30rpx;font-weight: bold;">{{commdity.commdityName}}</view>
									<view style="margin-top: 80rpx;font-size: 25rpx;color: #515a6e;">
										<text>共{{commdity.commdityCount}}件</text><text style="float: right;color: #ed4014;">￥{{commdity.commdityPrice*commdity.commdityCount}}</text>
									</view>
								</view>
							</van-col>
						</van-row>
					</van-col>
				</van-row>
			</view>

			<view class="btns">
				<van-button type="danger" round size="small" @click="wxPay">微信支付</van-button>
			</view>
		</view>
		<view class="hen"></view>
	</view>
</template>

<script>
	import post from '../post.js'

	export default {
		props: {
			order: {
				type: Object,
				required: true
			},
			/* 需要展示tab文本 */
			text: {
				type: String,
				required: true
			}
		},
		methods: {
			setClick(commdity) {
				commdity.isClick = !commdity.isClick;
			},
			/* 微信支付 */
			wxPay() {
				post.wxPay(this.order.orderId, order.sumPrice);
			}
		},
		data() {
			return {
				commdityList: this.order.detailList.map(item => {
					item.isClick = false;
					return item;
				})
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.order {
		font-size: 20rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #e8eaec;
	}

	.btns {
		text-align: right;
	}
</style>
