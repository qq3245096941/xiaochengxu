<template>
	<view>
		<van-card :key="index" v-for="(commdity,index) in commdityList"
		  :num="commdity.num"
		  :price="commdity.info.commdityPrice"
		  :desc="commdity.info.commdityType"
		  :title="commdity.info.commdityName"
		  :thumb="commdity.info.commdityThnmbnail | getImg"
		/>
	</view>
</template>

<script>
	import post from '../../post.js'
	
	export default {
		data(){
			return{
				commdityList:[]
			}
		},
		onLoad(options){
			let commdityList = JSON.parse(options.ids);
			console.log(commdityList);
			
			for(let {commdityId,num} of commdityList){
				post.gets({
					method: 'POST',
					url: `/commdity/${commdityId}/searchInfo`,
					data: {
						userId: uni.getStorageSync('login').userId
					}
				}).then(data => {
					let commdityInfo = data.data.commdityInfo;
					this.commdityList.push({
						info:commdityInfo,
						num
					});
				})
			}
			
			
		}
	}
</script>

<style>
</style>
