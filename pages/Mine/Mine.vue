<template>
	<view>
		<!-- 头部开始 -->
		<view class="header">
			<image style="position: absolute;width: 100%;z-index: -1;" :src="'mineBack.png' | webImg" mode="widthFix"></image>
			<view class="bannerTop">
				<view class="Topmap">
					<text>{{IsCity}}</text>
					<van-icon class="next" color="white" name="location-o" />
				</view>
				<view class="TopSet">
					<van-icon name="setting-o" color="white" class="setMeMsg" @click="SetMineMsg" />
				</view>
			</view>
			<view class="header-position" >
				<!--用户头像 -->
				<image :src="userinfo.userTx" class="header-position-portrait" mode=""></image>
				<view class="header-position-name">
					<!-- 用户名 -->
					{{userinfo.userName}}
					<view class="header-position-name-vip" v-if="userinfo.isVip==1">
						<image class="isvip" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine00.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="header-position-grid" style="margin-top: 40rpx;">
				<navigator url="../order/order?index=0">
					<view class="header-position-grid-box"> 
						<image class="header-position-grid-image" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine01.png" mode=""></image>
						<view class="header-position-grid-view">我的订单</view>
					</view>
				</navigator>
				<view class="header-position-grid-line"></view>
				<navigator url="../Invitation/Invitation">
					<view class="header-position-grid-box">
						<image class="header-position-grid-image" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine02.png" mode=""></image>
						<view class="header-position-grid-view">我要邀请</view>
					</view>
				</navigator>
				<view class="header-position-grid-line"></view>
				<view class="header-position-grid-box" @click="discountCoupon">
					<image style="margin-left: 30rpx;" class="header-position-grid-image" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine03.png" mode=""></image>
					<view style="margin-left: 16rpx;" class="header-position-grid-view">优惠券</view>
				</view>
			</view>
		</view>
		<!-- 九宫格开始 -->
		<view class="headerCont">
			<navigator url="../shoppingCart/shoppingCart">
				<view>
					<image class="headerCont-image" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine04.png" mode=""></image>
					<view>购物车</view>
				</view>
			</navigator>
			
				<view @click="fnheaderCont(0)">
					<image class="headerCont-image" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine05.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view @click="fnheaderCont(3)">
					<image class="headerCont-image" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine07.png" mode=""></image>
					<view>待评价</view>
				</view>
				<view @click="makingCall">
					<image class="headerCont-image" src="https://xcx.zhongshengzb.com:8089/shoppingImg/images/my-icon/mine08.png" mode=""></image>
					<view>拨打电话</view>
				</view>
		</view>
		<!-- 公用标题样式开始 -->
		<view class="publicTitle">服务设置</view>
		<!-- 公用标题样式结束 -->
		<view class="serviceSettings">
				<navigator url="../loveArchives/loveArchives">
					<view class="serviceSettings-box">
						<image class="serviceSettings-image" src="../../static/home/tab/lovecar.png" mode=""></image>
						<view class="serviceSettings-view">爱车档案</view>
					</view>
				</navigator>
				<view class="serviceSettings-box" style="position: relative;">
					<button style="position: absolute;width: 100%;height: 100%;opacity: 0;" open-type="contact"></button>
					<image class="serviceSettings-image" src="../../static/home/tab/serve.png" mode=""></image>
					<view class="serviceSettings-view">在线客服</view>
				</view>
				<view class="serviceSettings-box" @click="goToAboutUs">
					<image class="serviceSettings-image" src="../../static/home/tab/insurance.png" mode=""></image>
					<view class="serviceSettings-view">车维保</view>
				</view>
				<view class="serviceSettings-box">
					<navigator url="../opinion/opinion">
						<image class="serviceSettings-image" src="../../static/home/tab/feedback.png" mode=""></image>
						<view class="serviceSettings-view">意见反馈</view>
					</navigator>
				</view>
		</view>
	</view>
</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				userinfo:{},
				IsCity:"",//当前所在区域
				comList:[],//商品列表
				page:1,//商品页数
				comListSon:[],
				trueList:[], // 默认列表
				distranceX:"天津",//省份
				storeCity:"天津",//省城市
				storeCounty:"西青",//区县
			}
		}, 
		onLoad() {
			const _this = this;
			this.isLogin();
			
			_this.getcomList(_this.page)//获取商品列表
			_this.getUserId()
			_this.getTrueList()//附近门店
			_this.getuserLo()  //获取位置
		},
		methods: {
			//获取地理位置
			getuserLo() {
				const _this = this;
				wx.getLocation({
					type: 'gcj02', //返回可以用于wx.openLocation的经纬度
					success(res) {
						let latitude = res.latitude
						let longitude = res.longitude
						let keys = "SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS"
						wx.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
							success(res) {
								console.log("位置",res.data.result.address_component.district)
								_this.IsCity=res.data.result.address_component.district;
							}
						})
					},
					fail(res) {
						console.log(res);
					}
				});
			},
			
			//跳转到个人信息设置
			SetMineMsg(){
				uni.navigateTo({
					url: '../MineMsg/MineMsg' 
				});
			},
			// 获取商品列表
			getcomList(page){
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/commdity/commdityAll',
					data:{
						page:page,
						rows:10,
						commdityType:"猜你喜欢"
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
			},
			//获取门店列表
			getTrueList(page){
				let _this = this;
				 // var URL = "https://restapi.amap.com/v3/geocode/geo?batch=true&address=天津市&key=ff309ed17221397704ae790a6dacea43";
				post.gets({
					method: "POST",
					url: "/store/storeList",
					data:{
						page:1, //请求页数
						rows:3,//每页10条
						storeProvince:"天津市",//省份
						storeCity:"市辖区",//省城市
						storeCounty:"和平区",//区县
						distranceX:'117.1730089187622', //经度
						distranceY:'39.107918850334265',//维度
						userId:"20794" //userid 
					}
				}).then(res => {
						console.log(res)
					if(res.statusCode===200&&res.data.code==0){
						if(res.data.list.length!=0){
						_this.trueList=res.data.list;
						}
					}
				});
			},
			//根据接口获取用户信息
			getUserId(){
				const _this = this;
				wx.getStorage({
				  key: 'login',
				  success (res) {
					post.gets({
						method: "POST",
						url: "/user/"+res.data.userId+"/userInfo",
					}).then(res => {
						console.log('用户信息为',res);
						//轮播图
						if(res.data.code==0){
							_this.userinfo = res.data.obj
						} 
					})
				  }
				})
			},
			/* 点击优惠券 */
			discountCoupon(){
				uni.navigateTo({
					url:'../discountCoupon/discountCoupon'
				})
			},
			fnheaderCont(index){
				uni.navigateTo({
					url: '../order/order?index=' + index
				});
			},
			gotohomeDetals(id){
				uni.navigateTo({
					url: '../storeDels/storeDels?id=' + id
				});
			},
			goToFuWu(){
				uni.navigateTo({
					url: '../Service/Service' 
				});
			},
			goToAboutUs(){
				uni.navigateTo({
					url: '../homeDetals/homeDetals' 
				});
			},
			//客户服务打电话
			Phone(){
				wx.makePhoneCall({
					  phoneNumber: '03123688777',
				})
			},
			//点击跳转详情页
			goToDetails(id){
				// 门店详情
				uni.navigateTo({
					url: '../homeDetals/homeDetals?id='+id
				});
			}
		},
		onReachBottom: function() {
			console.log("触底")
			const _this = this;
			_this.page++ 
			_this.getcomList(_this.page) //下拉加载更多
		}
	}
</script>

<style scoped lang="scss">
	view{
		color: #595757;
	}
	/* 公用标题 */
	.publicTitle{
		font-size: 36rpx;
		margin-left: 22rpx;
		font-family: PingFang-SC-Bold;
		vertical-align: middle;
	}
	.publicTitle::before{
		content: "";
		width:10rpx;
		height:40rpx;
		margin-right: 35rpx;
		display: inline-block;
		background:rgba(216,55,56,1);
		border-radius:5rpx;
		vertical-align: middle;
		box-sizing: border-box;
	}
	// 头部
	.header{
		width:750rpx;
		height:267rpx;
		position: relative;
	}
	.header-position{
		position: absolute;
		width:705rpx;
		height:275rpx; 
		left: 25rpx;
		top: 190rpx;
		background:linear-gradient(90deg,rgba(231,63,63,1) 0%,rgba(153,21,26,1) 100%);
		border-radius:15rpx;
	}
	.header-position-portrait{
		width:121rpx;
		height:120rpx;
		margin-left: 301rpx;
		margin-top: -59rpx;
		border-radius: 50%;
		overflow: hidden;
		z-index:1;
	}
	.header-position-name{
		height:23rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-left: 299rpx;
		position: relative;
		width: 123rpx;
		text-align:center;
		.header-position-name-vip{
			position: absolute;
			width:33rpx;
			height:33rpx;
			background:rgba(0,0,0,1);
			border:5rpx solid rgba(255, 255, 255, 0.35);
			border-radius:50%;
			top:-40rpx;
			left: 80rpx;
			.isvip{
				width: 100%;
				height: 100%;
			}
		}
	}
	.bannerTop {
		width: 700rpx;
		margin: 0 25rpx;
		height: 70rpx;
		display: flex;
		.Topmap {
			color: #fff;
			font-family: PingFang SC;
			width: 335rpx;
			height: 46rpx;
			margin-top: 25rpx;
			font-size: 26rpx;
			line-height:46rpx;
			text{
				float: left;
			}
			.next {
				margin-left: 20rpx;
			}
		}
		.TopSet{
			width: 335rpx;
			height: 46rpx;
			margin-top: 25rpx;
			.setMeMsg{
				float: right;
				margin-top:8rpx;
			}
		}
	
		.TopSerach {
			position: relative;
			width: 415rpx;
			height: 70rpx;
	
			.serchImg {
				position: absolute;
				width: 21rpx;
				height: 23rpx;
				top: 34rpx;
				left: 353rpx;
			}
	
			.Search {
				width: 393rpx;
				height: 42rpx;
				border-radius: 20rpx;
				background: #fff;
				margin-top: 25rpx;
				text-indent: 1em;
			}
		}
	}
	.header-position-grid{
		position: absolute;
		display: flex;
		width: 80%;
		left: 80rpx;
		top: 294rpx;
		justify-content: space-around;
	}
	.header-position-grid-image{
		width:40rpx;
		height:45rpx;
		margin-left: 26rpx;
	}
	.header-position-grid-line{
		width:3rpx;
		height:36rpx;
		margin-top: 40rpx;
		background:rgba(255,255,255,1);
		border-radius:2px;
	}
	.header-position-grid-view{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	/* 九宫格 */
	.headerCont{
		width:750rpx;
		background:rgba(247,248,248,1);
		padding: 220rpx 0 20rpx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		text-align: center;
		font-size: 30rpx;
		margin-bottom: 41rpx;
	}
	.headerCont-image{
		width: 59rpx;
		height: 50rpx;
	}
	/* 轮播 */
	.scroll {
        width: 100%;
        height: 184rpx;
        margin-top: 37rpx;
        overflow: hidden;
        white-space: nowrap;
		margin-bottom: 61rpx;
    }
 
    .scroll-box {
        display: inline-block;
        width: 310rpx;
        height: 184rpx;
        margin-left: 22rpx;
		border-radius:15rpx;
    }
 
    .scroll-box:last-child {
        margin-right: 0;
    }
	.scroll-images{
		width: 100%;
		height: 115rpx;
	}
	.scroll-cont{
		width:310rpx;
		height:69rpx;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		border-radius:15rpx;
		padding: 0 15rpx 0 12rpx;
	}
	.scroll-cont-top{
		height: 20rpx;
	}
	.scroll-cont-top-left{
		float: left;
		width:49rpx;
		height:20rpx;
		background:rgba(249,80,80,1);
		font-size: 10.65rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 18rpx;
	}
	.scroll-cont-top-right{
		float: left;
		margin-left: 16rpx;
		font-size: 16rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(34,24,21,1);
	}
	.scroll-cont-top-image{
		width:20rpx;
		height:20rpx;
		float: right;
	}
	.scroll-cont-botton{
		width: 100%;
		height: 20rpx;
		color: #595757;
		display: flex;
		justify-content: space-between;
	}
	.scroll-cont-botton-left{
		font-size: 14rpx;
	}
	/* 服务设置 */
	.serviceSettings{
		width:705rpx;
		height:180rpx;
		display: flex;
		flex-wrap: wrap;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 21rpx 0rpx rgba(0, 0, 0, 0.11);
		border-radius:15rpx;
		margin: 0 auto;
		margin-top: 38rpx;
		margin-bottom: 59rpx;
		text-align:center;
	}
	.serviceSettings-box{
		width: 177rpx;
		height: 170rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.serviceSettings-image{
		width:65rpx;
		height:65rpx;
	}
	.serviceSettings-view{
		height:23rpx;
		font-size:22rpx;
		margin-top: 20rpx;
		text-align:center;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(89,87,87,1);
	}
	/* 猜你喜欢 */
	.guessLike{
		margin-top: 41rpx;
	}
	page {
		background-color: #eee;
	}
	
	.case-page {
		padding: 22rpx;
	}
	
	.list-masonry {
		column-count: 2;
		column-gap: 20rpx;
	}
	
	.item-masonry {
		box-sizing:border-box;
		border-radius:15rpx;
		overflow: hidden;
		background-color: #fff;
		break-inside: avoid;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow:0px 0px 28rpx 1rpx rgba(78,101,153,0.14);
	}
	
	.item-masonry image {
		width: 100%;
	}
	.listtitle{
		padding-left:22rpx;
		height: 171rpx;
		font-size:24rpx;
		.listtitle1{
			line-height:39rpx;
		}
		.listtitle2{
			color:#FF0000;
			font-size:30rpx;
			line-height:30rpx;
			font-weight:bold;
			padding-top:22rpx;
			.listtitle2son{
				font-size:18rpx;
			}
		}
	}
</style>
