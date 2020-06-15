<template>
	<view>
		<van-card :key="index" v-for="(commdity,index) in commdityList"
		  :num="commdity.num"
		  :price="commdity.info.commdityPrice"
		  :desc="commdity.info.commdityType"
		  :title="commdity.info.commdityName"
		  :thumb="commdity.info.commdityThnmbnail | getImg"/>
		  
		<view class="hen"></view> 
		<view class="message" style="padding: 20rpx;">
			<view class="title">安装服务相关说明</view>
			<view class="body">相关操作：保养完成需对保养提示灯进行归零复位，特殊车型保养灯复位请与门店协商</view>
			<view class="body">注：更换机油及机油滤清器</view>
		</view>
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

<style lang="scss">
	
	.message{
		font-size: 28rpx;
		
		.title{
			color: #808695;
			margin-bottom: 20rpx;
		}
		
		.body{
			color: #17233d;
		}
	}
	
	
</style>
