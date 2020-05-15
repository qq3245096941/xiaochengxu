<!-- 优惠券 -->
<template>
	<view>
		<van-search left-icon="gold-coin-o" :value="couponCode" @change="codeChange" use-action-slot shape="round" placeholder="输入口令立即领取" >
			<view slot="action" @click="getCoupon">领取</view>
		</van-search>
		<view class="box">
			<view :key="index" v-for="(coupon,index) in my_list" class="item">
				<view class="price"><text style="font-size: 20rpx;">￥</text><text style="font-size: 70rpx;font-weight: bold;">{{coupon.couponPrice}}</text></view>
				<view class="message">
					<view style="font-size: 30rpx;color: #17233d;">{{coupon.couponName}}</view>
					<view style="font-size: 20rpx;color: #808695;margin-top: 5rpx;">{{coupon.createDate}} ~ {{coupon.expTime}}</view>
					<view style="font-size: 25rpx;color: #515a6e;margin-top: 15rpx;" @click="isShowToast=true">查看说明>></view>
				</view>
				<van-popup :show="isShowToast" @close="isShowToast=false" custom-style="height: 20%;padding:20rpx" position="bottom">
					适用商品：{{coupon.commdityName}}
				</van-popup>
			</view>
			
		</view>
	</view>
</template>

<script>
	import post from '../../post.js'

	export default {
		data() {
			return {
				/* 是否展示说明 */
				isShowToast: false,
				my_list:[],
				/* 口令 */
				couponCode:''
			}
		},
		methods: {
			codeChange({detail}){
				this.couponCode = detail;
			},
			/* 领取优惠券 */
			getCoupon(){
				
			},
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
		},
		onLoad() {
			post.gets({
				url:'/coupon/couponAll',
				data:{
					page:1,
					rows:9999,
					userId:uni.getStorageSync('login').userId
				}
			}).then(data=>{
				this.my_list = data.data.couponList;
				this.my_list = [...this.my_list,...this.my_list];
				console.log(this.my_list);
			})
		},
		onReachBottom() {
		
		}
	}
</script>

<style>
	.box{
		padding: 0 20rpx;
		background: #f8f8f9;
	}
	
	.box .item{
		height: 170rpx;
		background: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		margin-top: 20rpx;
		border-radius: 10rpx;
		display: flex;
		overflow: hidden;
	}
	
	.box .item .price{
		width: 25%;
		height: 100%;
		text-align: center;
		background: #ed4014;
		color: #fff;
		line-height: 170rpx;
	}
	
	.box .item .message{
		width: 75%;
		height: 100%;
		padding: 20rpx 30rpx;
	}
</style>
