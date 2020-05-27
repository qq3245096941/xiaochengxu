<script>
	import post from './post.js'
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		url:'https://xcx.zhongshengzb.com:8089/shoppingImg/images/',
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/dist/common/index.wxss";
	page{
		width: 100%;
		margin: 0;
		padding: 0;
		background: #fff;
		height: 100%;
	}
	
	.hen {
		background: #f8f8f9;
		height: 15rpx;
	}
</style>
