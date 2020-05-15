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
					{name:"汽车养护",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index6.png",navlink:'../isSechcCom/isSechcCom?name=空调'},
					{name:"机油滤清器",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index7.png",navlink:'../searchCommdity/searchCommdity?name=贴膜'},
					{name:"空气滤清器",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index8.png",navlink:'../searchCommdity/searchCommdity?name=镀晶'},
					{name:"空调滤清器",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index9.png",navlink:'../searchCommdity/searchCommdity?name=汽车配件'}
				],

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
