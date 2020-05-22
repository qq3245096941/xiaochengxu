<template>
	<view>
		<van-tabs :active="isSelectTab" @change="tabChange">
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
				orderViewList: [
					{
						title: '待付款',
						list: [],
						index: 0
					},
					{
						title: '待发货',
						list: [],
						index: 1
					},
					{
						title: '已完成',
						list: [],
						index: 7
					},
					{
						title: '待评价',
						list: [],
						index: 5
					},
				],
				isSelectTab: '1',
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
			/* 切换 */
			tabChange(res) {
				this.isSelectTab = res.detail.name;
				this.getcomList();
			},
			// 获取订单列表
			getcomList() {
				let order = this.orderViewList.find((item) => {
					return item.index === Number.parseInt(this.isSelectTab);
				})
				
				console.log(order);

				post.gets({
					method: 'GET',
					url: `/order/orderAll`,
					data: {
						page: 1,
						rows: 9999,
						userId: uni.getStorageSync('login').userId,
						orderStat: this.isSelectTab
					}
				}).then(data => {
					order.list = data.data.list;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
