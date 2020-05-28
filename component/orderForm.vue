<!-- 订单项目 -->
<template>
	<view v-if="isShow">
		<view>
			<view style="padding: 25rpx;font-size: 25rpx;">
				<text>订单编号：{{order.orderId}}</text>
			</view>

			<view style="border-bottom: 1rpx solid #e8eaec;">
				<view :key="commdityIndex" v-for="(commdity,commdityIndex) in commdityList" @click="jumpOrderPar()">	
					<van-card 
					:num="commdity.commdityCount" 
					:price="commdity.commdityPrice*commdity.commdityCount" 
					:title="commdity.commdityName" 
					:thumb="commdity.commdityThnmbnail | getImg">
					</van-card>
				</view>
			</view>
			<view style="padding: 20rpx;text-align: right;">
				<text style="font-size: 25rpx;color: #808695;margin-right: 10rpx;">总计：
					<text style="color: #ed4014;font-size: 22rpx;">￥</text>
					<text style="color: #ed4014;font-size: 40rpx;font-weight: bold;">{{order.sumPrice}}</text>
				</text>
				<van-button v-if="index===0" type="danger" round size="mini" @click="wxPay" plain>微信支付</van-button>
				<van-button v-if="index===2" type="danger" round size="mini" @click="wxDelivery" plain>确认收货</van-button>
				<van-button v-if="index===3" type="danger" round size="mini" @click="isShowComment=!isShowComment" plain>评价</van-button>
			</view>
		</view>
		<view class="hen"></view> 
		
		<!-- 评论弹框 -->
		<van-popup position="bottom" :show="isShowComment" bind:close="onClose">
			<view class="pop">
				<view>
					<textarea name="" id="" placeholder="亲，您对商品还满意吗？" cols="30" rows="10"></textarea>
					<van-uploader accept="image" :file-list="fileList" @after-read="uploadImg"/>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import post from '../post.js'

	export default {
		props: {
			order: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				commdityList: this.order.detailList.map(item => {
					item.isClick = false;
					return item;
				}),
				/* 是否显示该组件 */
				isShow:true,
				/* 是否展示评论弹框 */
				isShowComment:false,
				/* 已经上传的文件 */
				fileList:[]
			}
		},
		watch: {
			
		},
		methods: {
			setClick(commdity) {
				commdity.isClick = !commdity.isClick;
			},
			/* 微信支付 */
			wxPay() {
				post.wxPay(this.order.orderId, this.order.sumPrice);
			},
			/* 待收货 */
			wxDelivery() {
				post.gets({
					url: `/order/confimReceipt`,
					data: {
						orderId: this.order.orderId
					}
				}).then(data => {
					uni.showToast({
						title:'已确认收货',
						icon:'none',
						success:()=>{
							this.isShow = false;
						}
					})
				})
			},
			/* 跳转到订单详情 */
			jumpOrderPar(){
				if(this.index===7){
					uni.navigateTo({
						url:`/pages/orderParticulars/orderParticulars?total=${this.order.sumPrice}&orderId=${this.order.orderId}`,
						fail(error){
							console.log(error);
						}
					})
				}
			},
			/* 上传图片 */
			uploadImg(res){
				console.log(res);
				const tmpImg = res.detail.file.path;
				
				uni.uploadFile({
					url:'https://zsxcx.zhongshengzb.com:8446/zs_two/file/uploadPicAjax',
					filePath:tmpImg,
					name:'file',
					success(res){
						console.log(res);
					}
				})
				// post.gets({
				// 	method:'POST',
				// 	url:'/file/uploadPicAjax',
				// 	data:{
				// 		file:tmpImg
				// 	}
				// }).then(data=>{
				// 	console.log(data);
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
	.pop{
		padding: 15rpx;
		
		view{
			border-radius: 10rpx;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			padding: 15rpx;
			
			textarea{
				display: block;
				width: 100%;
				font-size: 20rpx;
			}
		}
	}
</style>
