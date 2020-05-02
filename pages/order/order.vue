<template>
	<view style="width:100%;min-height:1215rpx;background:rgba(245,245,245,1);">
		<view class="order">
			<view v-for="(item,index) in orderViewList" @tap="fnorderView(index)" :key="index" :class="{'active':tabIndex==index}">{{item}}</view>
		</view>
		<view class="uni-tab-bar">
			<view v-if="tabIndex==0">
				<!-- 无内容付款 -->
				<view class="whole-nothing" v-if="flag">
					<image class="whole-nothing-image" src="../../static/logo.png" mode=""></image>
					<view class="whole-nothing-view">您暂无待付款订单</view>
				</view>
				<!-- 有内容 -->
				<view v-else>
					<view class="collection-box" v-for="(item,index) in comList" :key="index" >
						<view class="collection-cont">
							<view class="collection-cont-view1">订单编号：{{item.orderId}}</view>
							<view class="collection-cont-view2">待付款</view>
						</view>
						<image class="collection-box-image" :src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/'+item.detailList[0].commdityThnmbnail" mode=""></image>
						<view style="border-bottom:1rpx solid rgba(245,245,245,1);margin-left: 20rpx;" @click="gotodetail(item.orderId)">
							<view class="collection-box-view">{{item.detailList[0].commdityName}}</view>
							<text class="collection-box-text2">{{item.detailList[0].commdityCount}}件</text>
							<text class="collection-box-text">{{item.detailList[0].commdityPrice}}</text>
						</view>
						<view class="collection-box-button">
							<view class="collection-box-button1">预约</view><!-- gotodetail -->
							<view class="collection-box-button2">微信支付</view>
						</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabIndex==1">
				<!-- 无内容付款 -->
				<view class="whole-nothing" v-if="flag">
					<image class="whole-nothing-image" src="../../static/logo.png" mode=""></image>
					<view class="whole-nothing-view">您暂无待付款订单</view>
				</view>
				<!-- 有内容 -->
				<view v-else>
					<view class="collection-box" v-for="(item,index) in comList" :key="index" v-if="item.orderStat==0">
						<view class="collection-cont">
							<view class="collection-cont-view1">订单编号：{{item.orderId}}</view>
							<view class="collection-cont-view2">待付款</view>
						</view>
						<image class="collection-box-image" src="../../static/logo.png" mode=""></image>
						<view style="border-bottom:1rpx solid rgba(245,245,245,1);margin-left: 20rpx;">
							<view class="collection-box-view">倍耐力轮胎 新P1 Cinturato P1 185/60R15 84H Pirelli</view>
							<text class="collection-box-text2">5件</text>
							<text class="collection-box-text">$330</text>
						</view>
						<view class="collection-box-button">
							<view class="collection-box-button1">预约</view>
							<view class="collection-box-button2">微信支付</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabIndex==2">
				<!-- 无内容付款 -->
				<view class="whole-nothing" v-if="flag">
					<image class="whole-nothing-image" src="../../static/logo.png" mode=""></image>
					<view class="whole-nothing-view">您暂无待付款订单</view>
				</view>
				<!-- 有内容 -->
				<view v-else>
					<view class="collection-box">
						<view class="collection-cont">
							<view class="collection-cont-view1">订单编号：TH33245412</view>
							<view class="collection-cont-view2">待付款</view>
						</view>
						<image class="collection-box-image" src="../../static/logo.png" mode=""></image>
						<view style="border-bottom:1rpx solid rgba(245,245,245,1);margin-left: 20rpx;">
							<view class="collection-box-view">倍耐力轮胎 新P1 Cinturato P1 185/60R15 84H Pirelli</view>
							<text class="collection-box-text2">5件</text>
							<text class="collection-box-text">$330</text>
						</view>
						<view class="collection-box-button">
							<view class="collection-box-button1">预约</view>
							<view class="collection-box-button2">微信支付</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabIndex==3">
				<!-- 无内容付款 -->
				<view class="whole-nothing" v-if="flag">
					<image class="whole-nothing-image" src="../../static/logo.png" mode=""></image>
					<view class="whole-nothing-view">您暂无待付款订单</view>
				</view>
				<!-- 有内容 -->
				<view v-else>
					<view class="collection-box" v-for="(item,index) in comList" :key="index">
						<view class="" v-for="(isitem,isindex) in item.detailList" :key="isindex">
						<view class="collection-cont">
							<view class="collection-cont-view1">订单编号：TH33245412</view>
							<view class="collection-cont-view2">待付款</view>
						</view>
						<image class="collection-box-image" src="../../static/logo.png" mode=""></image>
						<view style="border-bottom:1rpx solid rgba(245,245,245,1);margin-left: 20rpx;">
							<view class="collection-box-view">倍耐力轮胎 新P1 Cinturato P1 185/60R15 84H Pirelli</view>
							<text class="collection-box-text2">5件</text>
							<text class="collection-box-text">$330</text>
						</view>
						<view class="collection-box-button">
							<view class="collection-box-button1">预约</view>
							<view class="collection-box-button2">微信支付</view>
						</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabIndex==4">
				<!-- 无内容付款 -->
				<view class="whole-nothing" v-if="flag">
					<image class="whole-nothing-image" src="../../static/logo.png" mode=""></image>
					<view class="whole-nothing-view">您暂无待付款订单</view>
				</view>
				<!-- 有内容 -->
				<view v-else>
					<view class="collection-box">
						<view class="collection-cont">
							<view class="collection-cont-view1">订单编号：TH33245412</view>
							<view class="collection-cont-view2">待付款</view>
						</view>
						<image class="collection-box-image" src="../../static/logo.png" mode=""></image>
						<view style="border-bottom:1rpx solid rgba(245,245,245,1);margin-left: 20rpx;">
							<view class="collection-box-view">倍耐力轮胎 新P1 Cinturato P1 185/60R15 84H Pirelli</view>
							<text class="collection-box-text2">5件</text>
							<text class="collection-box-text">$330</text>
						</view>
						<view class="collection-box-button">
							<view class="collection-box-button1">预约</view>
							<view class="collection-box-button2">微信支付</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				orderViewList:["全部","待付款","待服务","待评价","维权"],
				tabIndex:0,
				flag:false,
				comListSon:[],
				comList:[],
				page:1
			}
		},
		onLoad(index) {
			const _this = this;
			_this.tabIndex = index.index
			uni.getStorage({  //获取userid
			  key: 'login',
			  success (res) {
				_this.userid = res.data.userId
				if(_this.userid){
					_this.getcomList(_this.userid,_this.page)
				}
			  }
			})
		},
		methods: {
			fnorderView(index){
				this.tabIndex=index;
			},
			// 获取订单列表
			getcomList(id,page) {
				let _this = this;
					post.gets({
						method: 'POST',
						url: '/order/orderAll',
						data:{
							page:page,
							rows:10,
							userId:id
						}
					}).then(res => {
						console.log(res)
						//轮播图
						if (res.statusCode === 200) {
							if (res.data.code == 0) {
								_this.comListSon=res.data.list;
								Array.prototype.push.apply(_this.comList, _this.comListSon); //合并加载更多的数据与源数据.
							}
						}
					});
			},
			gotodetail(id){
				uni.navigateTo({
					url:"../isbuyorder/isbuyorder?orderId=" + id
				})
			}
		},
		onReachBottom: function() {
			const _this = this;
			_this.page++;
			_this.getcomList(_this.userid,_this.page); //获取商品列表
		}
	}
</script>

<style lang="scss" scoped>
	.order{
		width:750rpx;
		height:66rpx;
		display: flex;
		justify-content: space-around;
		line-height: 66rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		background:rgba(255,255,255,1);
	}
	.active{
		border-bottom: 4rpx solid #DD524D;
	}
	.uni-tab-bar{
		color: #343434;
	}
	// 无内容
	.whole-nothing-image{
		width:96rpx;
		height:120rpx;
		margin-left: 326rpx;
		margin-top: 482rpx;
	}
	.whole-nothing-view{
		font-size:30rpx;
		margin-left: 256rpx;
		margin-top: 60rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(103,103,103,1);
	}
	// 有内容
	.collection-box{
		width:750rpx;
		margin-top: 26rpx;
		background:rgba(255,255,255,1);
		display: flex;
		flex-wrap: wrap;
	}
	.collection-box-image{
		width: 144rpx;
		height: 144rpx;
		margin-left: 42rpx;
		margin-top: 32rpx;
	}
	.collection-box-view{
		width:476rpx;
		font-size:24rpx;
		margin-top: 46rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,0,0,1);
	}
	.collection-box-text2{
		font-size:20rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(138,138,138,1);
		opacity:1;
	}
	.collection-box-text{
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:500;
		margin-left: 360rpx;
		color:rgba(255,0,0,1);
	}
	.collection-cont{
		width: 100%;
		height: 64rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 64rpx;
		border-bottom: 1rpx solid rgba(245,245,245,1);
		box-sizing: border-box;
	}
	.collection-cont-view1{
		font-size:20rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(138,138,138,1);
	}
	.collection-cont-view2{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,179,0,1);
		opacity:1;
	}
	.collection-box-button{
		height: 79rpx;
		width: 100%;
		display: flex;
		align-items: center;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,0,0,1);
	}
	.collection-box-button1{
		display: flex;
		justify-content: center;
		align-items: center;
		width:90rpx;
		height:48rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(255,0,2,1);
		border-radius:10rpx;
		margin-left: 470rpx;
	}
	.collection-box-button2{
		display: flex;
		justify-content: center;
		align-items: center;
		width:134rpx;
		margin-left: 30rpx;
		height:48rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(255,0,2,1);
		border-radius:10rpx;
	}

</style>
