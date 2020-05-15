<template>
	<view>
		<van-tabs :active="isSelectTab" bind:change="onChange">
			<van-tab :key="index" v-for="(item,index) in orderViewList" :title="item.title" :name="item.index+''">
				<orderForm :text="item.title" :key="orderIndex" :order="order" v-for="(order,orderIndex) in item.list"></orderForm>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import post from "../../post.js"
	import orderForm from '../../component/orderForm.vue'

	export default {
		data() {
			return {
				orderViewList: [{
						title: '待发货',
						list: [],
						page: 1,
						index: 1
					},
					{
						title: '待付款',
						list: [],
						page: 1,
						index: 0
					},
					{
						title: '待评价',
						list: [],
						page: 1,
						index: 3
					},
					{
						title: '维权',
						list: [],
						page: 1,
						index: 5
					},
				],
				isSelectTab: '1',
				/* 当前正在操作的order */
				currentOrder:{}
			}
		},
		components: {
			orderForm
		},
		onLoad(options) {
			this.isSelectTab = options.index;
			this.getcomList();
		},
		methods: {
			// 获取订单列表
			getcomList() {
				this.currentOrder = this.orderViewList.find((item) => {
					return item.index === Number.parseInt(this.isSelectTab);
				})
				
				post.gets({
					method: 'GET',
					url: `/order/orderAll`,
					data: {
						page: this.currentOrder.page,
						rows: 7,
						userId: uni.getStorageSync('login').userId,
						orderStat: this.isSelectTab
					}
				}).then(data => {
					const list = data.data.list;
					console.log('订单列表', list);
					this.currentOrder.list = [...this.currentOrder.list, ...list];
				})
			},
		},
		onReachBottom: function() {
			this.currentOrder.page++;
			this.getcomList();
		}
	}
</script>

<style lang="scss" scoped>

</style>
