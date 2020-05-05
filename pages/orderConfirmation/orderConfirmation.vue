<!-- 确认订单 -->
<template>
	<view>
		<view style="margin-bottom: 150rpx;">
			<!-- 基本信息 -->
			<view style="display: flex;">
				<van-field :border="false" left-icon="manager-o" style="width: 50%;" :value="userData.name" placeholder="请输入姓名"
				 @change="inputName" />
				<van-field :border="false" left-icon="phone-circle-o" style="width: 50%;" :value="user.userTel" placeholder="请输入手机号"
				 @change="inputPhone" />
			</view>
			<view class="hen"></view>
			<view>
				<view style="padding: 20rpx;">
					<text style="font-size: 40rpx;font-weight: bold;color:#17233d">门店：</text>
					<text style="color: #515a6e;font-size: 25rpx;">选择一个门店服务</text>
				</view>
				<van-cell icon="location-o" is-link title="门店名称 地址" link-type="navigateTo" />
			</view>
			<view class="hen"></view>
			<!-- 所有商品 -->
			<view style="padding: 30rpx;">
				<van-grid :border="false">
					<van-grid-item :key="index" v-for="(commdity,index) in commdityList" :icon="commdity.commdityParameter" :text="commdity.commdityName" />
				</van-grid>
				<view style="color: #515a6e;font-size: 20rpx;margin-left: 20rpx;text-align: right;">共{{commdityList.length}}件商品</view>
			</view>
			<view class="hen"></view>
			<van-cell-group>
				<van-cell icon="balance-o" title="支付方式" value="在线支付" />
				<van-cell icon="debit-pay" is-link title="优惠" value="折扣" />
				<van-cell icon="records" is-link title="开发票" value="无需发票" />
			</van-cell-group>
			<view class="hen"></view>
			<van-cell-group :border="false">
				<van-cell :key="index" v-for="(price,index) in priceList" :border="false" :title="price.name" :value="price.price" />
			</van-cell-group>
		</view>
		<van-submit-bar label="实付:" :price="total*100" button-text="提交订单" bind:submit="onSubmit" />
	</view>
</template>

<script>
	import post from "../../post.js";

	export default {
		data() {
			return {
				/* 购买的货物list */
				commdityList: [],
				total: 0,
				user: {},
				userData: {
					phone: '',
					name: ''
				},
				/* 选择门店的storeid */
				storeid: '',
				priceList:[
					{
						name:'商品总价',
						price:123
					},
					{
						name:'安装费',
						price:123
					},
					{
						name:'运费',
						price:123
					},
					{
						name:'赠品',
						price:123
					},
					{
						name:'优惠',
						price:123
					},
				]
			}
		},
		methods: {
			inputName({
				detail
			}) {
				this.userData.name = detail;
			},
			inputPhone({
				detail
			}) {
				this.userData.phone = detail;
			}
		},
		onLoad({
			list,
			total
		}) {
			this.user = wx.getStorageSync('login');
			this.total = total;

			JSON.parse(list).forEach(id => {
				post.gets({
					method: 'POST',
					url: `/commdity/${id}/searchInfo`,
					data: {
						userId: this.user.userId
					}
				}).then(data => {
					let commdityInfo = data.data.commdityInfo;
					commdityInfo.commdityParameter = post.url + commdityInfo.commdityParameter;
					this.commdityList.push(commdityInfo);
					console.log(this.commdityList);
				})
			})
		}
	}
</script>

<style>
	.hen {
		background: #e8eaec;
		height: 11rpx;
	}
</style>
