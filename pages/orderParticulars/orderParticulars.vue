<!-- 订单详情 -->
<template>
	<view>
		<view style="display: flex;">
			<van-field :border="false" disabled left-icon="manager-o" style="width: 50%;" :value="user.userName" />
			<van-field :border="false" disabled left-icon="phone-circle-o" style="width: 50%;" :value="user.userTel" />
		</view>

		<view class="hen"></view>
		<van-card :key="index" v-for="(commdity,index) in commdityList" :num="commdity.commdityCount" :price="commdity.commdityPrice"
		 :title="commdity.commdityName" :thumb="commdity.commdityThnmbnail" />
		 <van-divider />
		 <!-- 订单信息-->
		 <view class="order">
			 <ul>
				 <li>订单编号：{{order.orderId}}</li>
				 <li>创建时间：{{order.paymentTime}}</li>
				 <li>支付方式：线上支付</li>
				 <li>配送方式：{{order.freeShip==='1'?'配送至门店':'配送至家'}}</li>
			 </ul>
		 </view>
		 <van-divider />
		 <!-- 价钱-->
		 <view class="order">
			 <ul>
				 <li>商品总额：<text style="float: right;">￥{{total}}</text></li>
				 <li>优惠券：<text style="float: right;">-￥0.00</text></li>
				 <li>运费：<text style="float: right;">+￥0.00</text></li>
			 </ul>
		 </view>
		 <van-divider />
		 <view style="font-size: 30rpx;color: #17233d;float: right;padding: 0 40rpx;">实付款：<text style="color: #ed4014;">￥{{total}}</text></view>
			
		 <view class="btns">
			 <van-button open-type="contact" icon="service-o" type="default" block>在线客服</van-button><van-button icon="phone-circle-o" type="default" block>电话咨询</van-button>
		 </view>
		
	</view>
</template>

<script>
	import post from '../../post.js'

	export default {
		data() {
			return {
				/* 订单信息 */
				order: {},
				total: 0,
				user: {},
				/* 商品 */
				commdityList: []
			}
		},
		methods: {

		},
		async onLoad(options) {
			console.log(options);
			this.total = options.total;

			this.order = (await post.gets({
				method: 'GET',
				url: `/order/${options.orderId}/searchOrderInfo`
			})).data.data;

			this.commdityList = this.order.detailList.map(item => {
				item.commdityThnmbnail = post.url + item.commdityThnmbnail;
				return item;
			});

			console.log(this.order);

			this.user = (await post.gets({
				method: 'POST',
				url: `/user/${this.order.userId}/userInfo`
			})).data.obj;
		}
	}
</script>

<style>
	.order{
		padding:0 40rpx;
	}
	
	.order li{
		margin-top: 10rpx;
		font-size: 23rpx;
		color: #515a6e;
	}
	
	.btns{
		width: 100%;
		display: flex;
		position: absolute;
		bottom: 0;
	}
	
	.btns van-button{
		width:50%;
	}
</style>
