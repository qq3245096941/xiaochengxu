<template>
	<view style="padding: 20rpx;">
		<rich-text :nodes="html"></rich-text>
	</view>
</template>

<script>
	import post from '../../../post.js'
	
	export default {
		data() {
			return {
				html:''
			}
		},
		methods: {
			
		},
		onLoad(){
			uni.request({
				url:'https://zsxcx.zhongshengzb.com:8446/zs_two/config/configAll',
				success:(res)=>{
					this.html = res.data.data[5].sysValue
				}
			})
		}
	}
</script>

<style>

</style>
