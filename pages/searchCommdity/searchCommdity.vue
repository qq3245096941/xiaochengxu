<!-- 搜索商品 -->
<template>
	<view>
		<van-search :value="search" placeholder="查询商品" shape="round" />
		<commdity :comList="commdityList"></commdity>
	</view>
</template>
 
<script>
	import post from '../../post.js'
	import commdity from '../../component/commdity.vue'

	export default {
		data() {
			return {
				search: '',
				commdityList: [],
				page: 1
			}
		},
		components:{
			commdity
		},
		methods: {
			getCommdityList(){
				post.gets({
					url: `/commdity/commdityAll`,
					data: {
						page: this.page,
						rows: 10
					}
				}).then(data => {
					this.commdityList = [...this.commdityList,...data.data.commdityList];
				})
			}
		},
		onLoad(options) {
			this.search = options.name;
		},
		watch: {
			search(newValue) {
				this.getCommdityList();
			}
		},
		onReachBottom(){
			this.page++;
			this.getCommdityList();
		}
	}
</script>

<style>

</style>
