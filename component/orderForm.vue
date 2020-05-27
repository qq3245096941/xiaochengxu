<!-- 订单项目 -->
<template>
	<view>
		<view>
			<view style="padding: 25rpx;font-size: 25rpx;">
				<text>订单编号：{{order.orderId}}</text>
				<text style="float: right;color: #ff9900;">{{text}}</text>
			</view>

			<view style="border-bottom: 1rpx solid #e8eaec;">
				<view :key="commdityIndex" v-for="(commdity,commdityIndex) in commdityList" @click="jumpOrderPar()">	
					<van-card 
					:origin-price="commdity.commdityPrice*commdity.commdityCount"
					:num="commdity.commdityCount" 
					:price="order.sumPrice" 
					:title="commdity.commdityName" 
					:thumb="commdity.commdityThnmbnail | getImg">
						<view slot="footer">
						    <van-button v-if="index===0" type="danger" round size="mini" @click="wxPay" plain>微信支付</van-button>
						    <van-button v-if="index===2" type="danger" round size="mini" @click="wxDelivery(commdityIndex)" plain>确认收货</van-button>
						  </view>
					</van-card>
					
				</view>
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
			index: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				text: ''
			}
		},
		watch: {
			index(newValue) {
				switch (newValue) {
					case 0:
						this.text = '待付款';
						break;
					case 2:
						this.text = '待收货';
						break;
					case 7:
						this.text = '已完成';
						break;
					case 5:
						this.text = '待评价';
						break;
				}
			}
		},
		methods: {
			setClick(commdity) {
				commdity.isClick = !commdity.isClick;
			},
			/* 微信支付 */
			wxPay() {
				post.wxPay(this.order.orderId, this.order.sumPrice);
			},
			/* 待收货 */
			wxDelivery(index) {
				post.gets({
					url: `/order/confimReceipt`,
					data: {
						orderId: this.order.orderId
					}
				}).then(data => {
					uni.showToast({
						title:'已确认收货',
						icon:'none',
						success(){
							this.commdityList.splice(index,1);
						}
					})
				})
			},
			/* 跳转到订单详情 */
			jumpOrderPar(){
				if(this.index===7){
					uni.navigateTo({
						url:`/pages/orderParticulars/orderParticulars?total=${this.order.sumPrice}&orderId=${this.order.orderId}`,
						fail(error){
							console.log(error);
						}
					})
				}
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
	}
</script>

<style scoped>
	
</style>
