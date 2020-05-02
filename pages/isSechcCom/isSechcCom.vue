<template>
	<view style="background: #F6F6F6;">
		<view class="Search-box">
			<image class="serchImg" src="../../static/home/sousuo.png" mode=""></image>
			<input @input="fandName" :placeholder="name" placeholder-style="color:#000" 
			 type="search"
			 class="Search">
		</view>
		<view class="buyTire-cont" v-for="(item,index) in comList" :key="item.commdityId" @click="goToDetl(item.commdityId)" >
			<view class="buyTire-cont-left">
				<image class="buyTire-cont-left-image" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+item.commdityParameter"  mode=""></image>
			</view>
			<view class="buyTire-cont-right">
				<view class="buyTire-cont-right-view2">{{item.commdityName}}</view>
				<view class="buyTire-cont-right-view3">
					<text class="text">全合成</text>
					<text class="text">全合成</text>
				</view>
				<view class="buyTire-cont-right-view5">
					<text class="buyTire-cont-right-view5-text">¥{{item.commdityPrice}}</text>
				</view>
				<view class="buyTire-cont-right-view4">154576条图文评价 99.4%好评</view>
			</view>
		</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				page:1,
				name:"",
				comListSon:[],
				comList:[]
			}
		},
		methods: {
			// 搜索商品
			fandName(e){
				const _this = this;
				_this.name = e.detail.value
				_this.getList(_this.page,_this.name)
			},
			//跳转商品详情
			goToDetl(id){
				//商品详情
				uni.navigateTo({
					url: '../storeDels/storeDels?id=' + id
				});
			},
			//默认列表
			getList(page,name){
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/commdity/commdityAll',
					data:{
						page:page,
						rows:10,
						commdityType:name
					}
				}).then(res => {
					console.log(res)
					//轮播图
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.comList=res.data.commdityList;
						}
					}
				});
			}
		},
		onLoad(name) {
			const _this = this;
			_this.name = name.name 
			console.log("当前搜索内容为",name.name)
			if(name){
				_this.getList(_this.page,_this.name)
			}
		},
		onReachBottom: function() {
			const _this = this;
			_this.page++;
			post.gets({
				method: 'POST',
				url: '/commdity/commdityAll',
				data:{
					page:_this.page,
					rows:10,
					commdityType:_this.name
				}
			}).then(res => {
				//轮播图
				if (res.statusCode === 200) {
					if (res.data.code == 0) {
						_this.comListSon=res.data.commdityList;
						Array.prototype.push.apply(_this.comList, _this.comListSon); //合并加载更多的数据与源数据.
					}
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.Search-box{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
		position: sticky;
		top:0;
		left:0;
		border-bottom:1rpx solid #f8f8f8;
	}
	.Search{
		font-size:22rpx;
		width: 700rpx;
		height: 50rpx;
		background: #f8f8f8;
		border-radius: 25rpx;
		margin: 0 auto;
		padding-left: 50rpx;
		box-sizing: border-box;
		position: relative;
	}
	.serchImg{
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		left: 40rpx;
		top: 28rpx;
		z-index: 30;
	}
	.vehicleType{
		width: 100%;
		height: 70rpx;
		background: #FFFFFF;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
	}
	.vehicleType-view1{
		margin-left: 50rpx;
	}
	.vehicleType-view2{
		margin-left: 260rpx;
	}
	.perfect{
		width: 100%;
		height: 50rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		background: sandybrown;
		color: saddlebrown;
		padding-left: 30rpx;
		margin-top: 10rpx;
		box-sizing: border-box;
	}
	.buyTire-cont{
		width:100%;
		height:280rpx;
		background:rgba(255,255,255,1);
		display: flex;
		margin-bottom: 4rpx;
		.buyTire-cont-left-image{
			width:230rpx;
			height:240rpx;
			margin-top: 28rpx;
		}
	}
	.buyTire-cont-right{
		margin-left: 64rpx;
		.buyTire-cont-right-view2{
			margin-top: 10rpx;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(0,0,0,1);
		}
	}
	.buyTire-cont-right-view3{
		margin-top: 40rpx;
		.text{
			padding: 5rpx 6rpx;
			font-size: 20rpx;
			background: sandybrown;
			color: #FFFFFF;
			border-radius: 8rpx;
			margin-right: 5rpx;
		}
	}
	.buyTire-cont-right-view4{
		font-size: 20rpx;
		color: #888888;
		margin-top: 10rpx;
	}
	.buyTire-cont-right-view5{
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		.buyTire-cont-right-view5-text{
			font-size:40rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,0,0,1);
		}
	}
	.Search-image{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50rpx;
	}
</style>
