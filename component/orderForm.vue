<!-- 订单项目 -->
<template>
	<view style="padding:0 30rpx;">
		<view class="order">
			<text>订单编号：{{order.orderId}}</text>
			<text style="float: right;color: #ff9900;">{{text}}</text>
		</view>
		<van-grid :border="false">
			<van-grid-item :info="'x'+commdity.commdityCount" :key="index" v-for="(commdity,index) in order.detailList" :icon="commdity.commdityThnmbnail | getImg" :text="commdity.commdityName" />
		</van-grid>
		<view class="btns">
			<van-button type="danger" round size="small">微信支付</van-button>
		</view>
		<van-divider />
	</view>
</template>

<script>
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
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.order{
		font-size: 20rpx;
		padding: 20rpx 0;
	}
	.btns{
		text-align: right;
	}
</style>
