<template>
	<view style="width:100%;background:rgba(245,245,245,1);height: 100%;">
		<view class="order">
			<view v-for="(item,index) in orderViewList" @tap="fnorderView(index)" :key="index" :class="{'active':tabIndex==index}">{{item}}</view>
		</view>
		<view class="uni-tab-bar">
			<swiper :current="tabIndex" @change="tabChange">
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;">
						<yanghu/>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;">
						<guzhang/>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;">
						<APP/>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;">
						<shouhou/>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import yanghu from "./yanghu.vue"
	import guzhang from "./guzhang.vue"
	import APP from "./APP.vue"
	import shouhou from "./shouhou.vue"
	export default {
		components:{yanghu,guzhang,APP,shouhou},
		data() {
			return {
				orderViewList:["车辆养护","常见故障分析","APP使用","售后&其他"],
				tabIndex:0,
				swiperHeight: 0
			}
		},
		methods: {
			fnorderView(index){
				this.tabIndex=index;
			},
			//滑动切换swiper
			tabChange(e){
				const tabIndex = e.detail.current
				this.tabIndex = tabIndex
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order{
		width:730rpx;
		height:66rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		line-height: 66rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		background:rgba(255,255,255,1);
		position: sticky;
		top: 0;
	}
	.active{
		border-bottom: 4rpx solid #DD524D;
	}
	.uni-tab-bar{
		width: 730rpx;
		margin: 0 auto;
		color: #343434;
		height: calc(100% - 66rpx);
	}
	uni-swiper{
		height: 100%;
	}
	.active .swiper-tab-line{
		border-bottom: 6upx solid #FEDE33;
		width: 70upx;
		margin: auto;
		border-top: 6upx solid #FEDE33;
		border-radius: 20upx;
	}
	.uni-swiper-tab{
		border-bottom: 1upx solid #eeeeee;
	}
</style>
