<template>
	<view class="Lattice">
		<view class="LatticeSonone">
			<view class="LatticeSonList" v-for="(item,index) in list"  :key="index">
				<navigator :url="item.navlink">
				<view class="listimg"><image class="img" :src="item.img" mode=""></image></view>
				<view class="listname">{{item.name}}</view>
				</navigator>
			</view>
		</view>
		<view class="LatticeSontwo">
			<image class="img" src="../../static/home/bigimg.png" mode=""></image>
		</view>
	</view>
</template> 
 
<script> 
	export default {
		data() {
			return {
				list:[
					{name:"品牌轮胎",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index1.png",navlink:'../isSechcCom/isSechcCom?name=品牌轮胎'},
					// {name:"汽车养护",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index2.png",navlink:'../baoyangtwo/baoyangtwo'},
					// {name:"洗车清洗",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index3.png",navlink:'../baoyang/baoyang'},
					// {name:"汽车美容",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index4.png",navlink:'../baoyang/baoyang'},	
					{name:"汽车养护",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index2.png",navlink:'../isSechcCom/isSechcCom?name=空调'},
					{name:"洗车清洗",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index3.png",navlink:'../isSechcCom/isSechcCom?name=贴膜'},
					{name:"汽车美容",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index4.png",navlink:'../isSechcCom/isSechcCom?name=镀晶'},
					{name:"汽车配件",img:"https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/index5.png",navlink:'../isSechcCom/isSechcCom?name=汽车配件'}
				],

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.Lattice{
	width: 100%;
	// height: 536rpx;
	height: 391rpx;
	.LatticeSonone{
		width: 706rpx;
		height: 141rpx;
		display:flex;
		color:#221815;
		font-size:23rpx;
		margin-left:22rpx;
		background: #fff;
		flex-direction: row;
		justify-content: space-between;
		text-align:center;
		.LatticeSonList{
			margin-top:20rpx;
			width: 93rpx;
			height: 97rpx;
			text-align:center;
			.listimg{
				width: 64rpx;
				height: 61rpx;
				margin-left:10%;
				.img{
					width: 100%;
					height: 100%;
				}
			}
			.listname{
				font-weight:bold;
				margin-top:18rpx;
			}
		}
	}
	.LatticeSontwo{
		width: 706rpx;
		margin-left:22rpx;
		margin-top:25rpx;
		height: 224rpx;
		overflow: hidden;
		.img{
			width: 100%;
			height: 100%;
		}
		
	}
	// .LatticeSonthree{
	// 	.LatticeSonone{
	// 		width: 706rpx;
	// 		height: 145rpx;
	// 		display:flex;
	// 		color:#737275;
	// 		font-size:21rpx;
	// 		margin-left:22rpx;
	// 		margin-top:4rpx;
	// 		flex-direction: row;
	// 		justify-content: space-around;
	// 		text-align:center;
	// 		.LatticeSonList{
	// 			margin-top:20rpx;
	// 			text-align:center;
	// 			width: 110rpx;
	// 			.listimg{
	// 				width: 80%;
	// 				height: 61rpx;
	// 				margin-left:10%;
	// 				.img{
	// 					width: 80%;
	// 					height: 100%;
	// 				}
	// 			} 
	// 			.listname{
	// 				margin-top:18rpx;
	// 			}
	// 		}
	// 	}
	// }
}
</style>
