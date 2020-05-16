<template>
	<view>
		<van-grid :border="false">
		  <van-grid-item :url="item.navlink"  :key="index" v-for="(item,index) in list" :icon="item.img" :text="item.name" /> 
		</van-grid>
	</view>
</template> 
 
<script> 
	export default {
		data() {
			return {
				list:[
					{name:"汽车养护",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index11.png",navlink:'../isSechcCom/isSechcCom?name=空调'},
					{name:"机油滤清器",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index12.png",navlink:'../searchCommdity/searchCommdity?name=贴膜'},
					{name:"空气滤清器",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index13.png",navlink:'../searchCommdity/searchCommdity?name=镀晶'},
					{name:"空调滤清器",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index14.png",navlink:'../searchCommdity/searchCommdity?name=汽车配件'}
				],

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
