<template>
	<view class="portrait">
		<view class="swiper-view">
			<swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="5000"><!-- autoplay="true" -->
				<block v-for="(item,index) in msgList" :key="index">
					<swiper-item>
						<view class="swiper_item">
							<view class="son son1">
								<image :src="item.img" mode=""></image>
							</view>
							<view class="son son2" >{{item.time}}</view>
							<view class="son son3">{{item.user}}</view>
							<view class="son son4">{{item.title}}</view>
							<view class="son son5">{{item.msg}}</view>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgList: [{
						time: "1分钟前",user:"会开车的猫",title:"雪佛龙特劲TCP养护型汽油添加剂而当时担任股份",msg:"花费40积分"
					},
					{
						time: "10分钟前",user:"带娃的方式",title:"雪佛龙特劲TCP养护型汽油添加剂而当时担任股份",msg:"花费40积分"
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.portrait {
		width: 100%;
		height: 68rpx;
		background: #F4F4F4;
	}

	.swiper-view {
		width: 706rpx;
		margin-left:22rpx;
		line-height:68rpx;
		display: flex;
		flex-direction: row;
		border-radius: 5rpx;
		color:#727171;
	}

	.swiper_container {
		height: 68rpx;
		width: 100%;
	}

	.swiper_item {
		width: 100%;
		height: 100%;
		font-size:18rpx;
		display:flex;
		.son{
			width: auto;
			overflow: hidden; //超出的文本隐藏
			text-overflow: ellipsis; //溢出用省略号显示
			white-space: nowrap; //溢出不换行
		}
		.son1{
			width: 10rpx;
			height:21rpx ;
			margin-top:24rpx;
		}
		.son2{
			width: 70rpx;
			margin-left:21rpx;
		}
		.son3{
			color:#FF8A00;
			margin-left:40rpx;
			width: 100rpx;
			
		}
		.son4{
			width: 300rpx;
			margin-left:40rpx;
		}
		.son5{
			width: 100rpx;
			color:#FF0000;
			margin-left:40rpx;
		}
	}
</style>
