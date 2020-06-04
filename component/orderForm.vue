<!-- 订单项目 -->
<template>
	<view v-if="isShow">
		<view>
			<view style="padding: 25rpx;font-size: 25rpx;">
				<text>订单编号：{{order.orderId}}</text>
			</view>

			<view style="border-bottom: 1rpx solid #e8eaec;">
				<view :key="commdityIndex" v-for="(commdity,commdityIndex) in commdityList" @click="jumpOrderPar()">
					<van-card :num="commdity.commdityCount" :price="commdity.commdityPrice*commdity.commdityCount" :title="commdity.commdityName"
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
				<van-button v-if="index===0" type="warning" round size="mini" @click="cancelPay" plain style="margin-left: 5rpx;">取消订单</van-button>
				<van-button v-if="index===2" type="danger" round size="mini" @click="wxDelivery" plain>确认收货</van-button>
				<van-button v-if="index===3" type="danger" round size="mini" @click="this.isShowComment = !this.isShowComment"
				 plain>评价</van-button>
			</view>
		</view>
		<view class="hen"></view>

		<!-- 评论弹框 -->
		<van-popup position="bottom" :show="isShowComment" @close="isShowComment=false">
			<view class="pop">
				<view>
					<textarea v-model="content" name="" id="" placeholder="亲，您对商品还满意吗？" cols="30" rows="10"></textarea>
					<van-uploader accept="image" preview-size="60" :deletable="false" :file-list="fileList" @after-read="uploadImg" />
				</view>
				<van-button @click="postComment" type="danger" round block>发起评论</van-button>
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
				isShow: true,
				/* 是否展示评论弹框 */
				isShowComment: false,
				/* 已经上传的文件 */
				fileList: [],
				/* 评论内容 */
				content: ''
			}
		},
		watch: {

		},
		methods: {
			/* 取消订单 */
			cancelPay() {
				uni.showModal({
					title: '确定取消订单吗',
					success: ({
						confirm
					}) => {
						if (confirm) {
							post.gets({
								method: 'POST',
								url: `/order/${this.order.orderId}/cancelOrder`
							}).then(data => {
								this.isShow = false;
							})
						}
					}
				})

			},
			/* 提交评论 */
			postComment() {
				post.gets({
					method: 'POST',
					url: '/comment/addComment',
					data: {
						userId: uni.getStorageSync('login').userId,
						orderId: this.order.orderId,
						comTitle: this.content,
						content: JSON.stringify(this.fileList),
						comType: 1,
						commdityIds: this.commdityList.map(item => {
							return item.commdityId
						}).join(',')
					}
				}).then(data => {
					console.log(data);
					uni.showToast({
						title: '评论成功',
						icon: 'none',
					})

					this.isShowComment = false;
					this.isShow = false;
				})
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
						title: '已确认收货',
						icon: 'none',
						success: () => {
							this.isShow = false;
						}
					})
				})
			},
			/* 跳转到订单详情 */
			jumpOrderPar() {
				if (this.index === 7) {
					uni.navigateTo({
						url: `/pages/orderParticulars/orderParticulars?total=${this.order.sumPrice}&orderId=${this.order.orderId}`,
						fail(error) {
							console.log(error);
						}
					})
				}
			},
			/* 上传图片 */
			uploadImg(res) {
				const tmpImg = res.detail.file.path;

				uni.uploadFile({
					url: 'https://xcx.zhongshengzb.com:8446/zs_two/file/uploadPicAjax',
					filePath: tmpImg,
					name: 'image',
					success: (res) => {
						console.log(res);
						const json = JSON.parse(res.data);
						let path = json.data.serverUrl + "/" + json.data.picPath.split('/images/')[1];
						path = path.replace(/\\/g, "/");

						this.fileList = [...this.fileList, {
							url: path
						}]
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.pop {
		padding: 15rpx;

		view {
			border-radius: 10rpx;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			padding: 15rpx;
			margin-bottom: 20rpx;

			textarea {
				display: block;
				width: 100%;
			}
		}
	}
</style>
