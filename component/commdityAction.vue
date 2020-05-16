<template>
	<view>
		<van-goods-action>
			<van-goods-action-icon open-type="contact" icon="chat-o" text="客服" />
			<van-goods-action-icon url="/pages/shoppingCart/shoppingCart" icon="cart-o" text="购物车" :info="num" />
			<van-goods-action-button :disabled="shopping.isDidden" text="加入购物车" type="warning" @click="isShowCar=true" />
			<van-goods-action-button text="立即购买" @click="isShowBuy=true" />
		</van-goods-action>
		<!-- 购物车弹框 -->
		<commdityPop :isType="0" :isShow.sync="isShowCar" :commdityId="commdityId" @close="isShowCar=false" @success="num++"></commdityPop>
		<!-- 立即购买弹框 -->
		<commdityPop :isType="1" :isShow.sync="isShowBuy" :commdityId="commdityId" @close="isShowBuy=false"></commdityPop>	
	</view>
</template>

<script>
	import post from '../post.js'
	import commdityPop from './commdityPop.vue'

	export default {
		props: {
			commdityId: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				commdity: {},
				isShowCar:false,
				isShowBuy:false,
				/* 购物车数量 */
				num:0
			}
		},
		components: {
			commdityPop
		},
		watch: {
			commdityId(newValue) {
				console.log(newValue);
				post.gets({
					url: `/cart/${uni.getStorageSync('login').userId}/cartAll`,
					data: {
						page: 1,
						rows: 9999
					}
				}).then(data => {
					this.num = data.data.cartList.length;
				})

				/* 获取具体的商品 */
				post.gets({
					url: `/commdity/${newValue}/searchInfo`,
					data: {
						userId: uni.getStorageSync('login').userId
					}
				}).then(data => {
					this.commdity = data.data.commdityInfo;
				})
			}
		}
	}
</script>

<style scoped>

</style>
