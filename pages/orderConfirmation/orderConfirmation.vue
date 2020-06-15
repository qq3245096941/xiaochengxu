<!-- 确认订单 -->
<template>
	<view>
		<view style="margin-bottom: 150rpx;">
			<!-- 基本信息 -->
			<!-- <view style="display: flex;">
				<van-field :border="false" disabled left-icon="manager-o" style="width: 50%;" :value="user.userName" placeholder="请输入姓名"
				 @change="inputName" />
				<van-field :border="false" disabled left-icon="phone-circle-o" style="width: 50%;" :value="user.userTel"
				 placeholder="请输入手机号" @change="inputPhone" />
			</view>
			<view class="hen"></view> -->

			<van-tabs :active="distributionWay.WayIndex" @change="distributionTab">
				<van-tab :name="0" title="配送至门店">
					<view style="padding: 20rpx;display: flex;">
						<view style="font-size: 60rpx;font-weight: bold;color:#17233d">门店：</view>
						<view>
							<text style="color: #515a6e;font-size: 28rpx;">{{distributionWay.store.data.storeName}}</text><br>
							<text style="color: #515a6e;font-size: 20rpx;">{{distributionWay.store.data.storeAddress}}</text>
						</view>
					</view>
					<view class="hen"></view>
					<view>
						<van-cell icon="location-o" @click="jumpSelectStore" is-link title="选择一个门店服务" />
					</view>
				</van-tab>
				

				<van-tab :name="1" title="配送到家">
					<van-cell icon="location-o" @click="jumpSelectAddress" is-link :title="distributionWay.home.data.address" />
				</van-tab>
			</van-tabs>
			
			

			<image src="../../static/hen.png" mode="widthFix" style="width: 100%;display:block;"></image>
			<!-- 所有商品 -->
			<view class="commdityList" @click="lookCommdityParticulars">
				<van-image :key="index" v-for="(commdity,index) in commdityList.slice(0,4)" width="110rpx" height="110rpx" fit="contain" :src="commdity.info.commdityThnmbnail | getImg" />

				<!-- <van-grid :border="false" square center>
					<van-grid-item :key="index" v-for="(commdity,index) in commdityList" :icon="commdity.info.commdityThnmbnail | getImg"
					 :info="'x'+commdity.num" :text="commdity.info.commdityName" />
				</van-grid> -->
				<view style="height: 20rpx;line-height: 20rpx;margin: 0 20rpx 20rpx 0;" v-if="commdityList.length>4">...</view>
				<view style="flex: 1;text-align: right;">
					<van-icon  name="arrow" />
				</view>
			</view>
			<view style="color: #515a6e;font-size: 20rpx;margin: 0 20rpx 20rpx 0;text-align: right;">共{{commdityList.length}}件商品</view>
			<view class="hen"></view>
			<van-cell-group>
				<van-cell icon="balance-o" title="支付方式" value="在线支付" />
				<van-cell v-if="orderType===1" icon="debit-pay" is-link title="优惠" :value="coupon.title" :url="'/pages/discountCoupon/discountCoupon?total='+priceList[0].price+'&carName='+carName+'&ids='+JSON.stringify(commdityList.map(item=>item.commdityId))" />
				<van-cell icon="records" url="../selectInvoice/selectInvoice" is-link title="开发票" :value="invoice.title"></van-cell>
			</van-cell-group>

			<view class="hen"></view>

			<van-cell-group :border="false">
				<van-cell :key="index" v-for="(price,index) in priceList" :border="false" :title="price.name" :value="'￥'+price.price" />
			</van-cell-group>
		</view>
		<van-submit-bar label="实付:" :price="finalPrice*100" button-text="提交订单" @submit="onSubmit" />
	</view>
</template>

<script>
	import post from "../../post.js";

	export default {
		data() {
			return {
				invoice: {
					title: '无需发票',
					id: ''
				},
				distributionWay: {
					/* 配送方式索引 */
					WayIndex: 0, //默认为门店配送
					store: {
						/* 数据 */
						data: {},
						/* 选择门店的storeid，此变量是下一页传递过来的*/
						id: '',
					},
					home: {
						/* 地址id */
						id: '',
						data: {
							address: '选择配送地址'
						}
					}
				},
				commdity: {},
				/* 购买的货物list */
				orderCommdityList:[],
				commdityList: [],
				/* 0为普通商品，1为服务商品*/
				orderType: 0,
				/* 优惠券id，紧紧适用于服务商品 */
				coupon: {
					id: '',
					title: '选择优惠券',
					price: 0
				},
				/* 购物车id，表示是从购物车跳转过来的 */
				carid: '',
				carName: '', //当前选择的车辆
				priceList: [{
						name: '商品总价',
						price: 0
					},
					{
						name: '优惠',
						price: 0
					},
				],
				finalPrice: 0
			}
		},
		watch: {
			'coupon.price'(newValue) {
				this.priceList[1].price = newValue;
				this.finalPrice = this.priceList[0].price - newValue;
			}
		},
		methods: {
			/* 查看商品列表详情 */
			lookCommdityParticulars(){
				uni.navigateTo({
					url:'../commdityList/commdityList?ids='+JSON.stringify(this.orderCommdityList)
				})
			},
			/* 跳转到选择门店 */
			jumpSelectStore() {
				uni.navigateTo({
					url: '../selectStore/selectStore',
					fail(error) {
						console.log(error);
					}
				})
			},
			/* 选择家的收货地址 */
			jumpSelectAddress() {
				uni.navigateTo({
					url: "../Address/Address?index=orderC"
				})
			},
			distributionTab(res) {
				this.distributionWay.WayIndex = res.detail.name;
			},
			/* 提交订单 */
			onSubmit() {
				this.finalPrice = Number.parseFloat(this.finalPrice).toFixed(2);

				switch (this.distributionWay.WayIndex) {
					case 0:
						if (this.distributionWay.store.id === '') {
							uni.showToast({
								title: '请选择配送门店',
								icon: 'none'
							})
							return;
						}
						break;
					case 1:
						if (this.distributionWay.home.id === '') {
							uni.showToast({
								title: '请选择家配送地址',
								icon: 'none'
							})
							return;
						}
						break;
				}

				let commJson = this.commdityList.map((item, index) => {
					return {
						'commdityCount': item.num,
						'commdityId': item.commdityId,
						'commdityClass': item.clazz
					}
				})

				let obj = {
					userId: uni.getStorageSync('login').userId, //当前用户id
					orderStatus: 0, //订单状态，0商品购买 1服务购买
					sumPrice: this.finalPrice, //总价
					payStat: 0, //付款方式，默认为0，也就是现金支付
					commJson: JSON.stringify(commJson),
				}

				/* 是否是从购物车跳转过来的 */
				if (this.carid !== '') {
					Reflect.set(obj, 'cartJson', JSON.stringify(this.carid.map(item => {
						return {
							cartId: item
						}
					})));
				}

				/* 是否是服务商品 */
				if (this.orderType === 1) {
					Reflect.set(obj, 'couponId', this.coupon.id);
				}

				/* 是否开发票 */
				if (this.invoice.id !== '') {
					Reflect.set(obj, 'isInvoice', 1);
				}

				/* 邮寄方式 freeShip=1表示不邮寄，不邮寄表示我选择了门店*/
				if (this.distributionWay.WayIndex === 0) {
					//如果是门店配送，那么传入门店id
					Reflect.set(obj, 'freeShip', 1);
					Reflect.set(obj, 'storeId', this.distributionWay.store.id); //用户选择的门店storeId
				} else {
					/* 如果是家配送 */
					Reflect.set(obj, 'freeShip', 0);
					Reflect.set(obj, 'addressId', this.distributionWay.home.id);
				}

				post.gets({ //创建订单
					method: "POST",
					url: "/order/addOrder",
					data: obj
				}).then(res => {
					if (res.data.code === '5') {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					} else {
						const orderId = res.data.data;
						post.wxPay(orderId, this.finalPrice);
					}
				})
			}
		},
		onLoad({
			commdityList, //商品集合{commdityId:商品id,num:购买数量,clazz:规格}
			total, //总价
			orderType,
			/* 0为普通商品，1为服务商品*/
			carid, //购物车id,
			/* 默认爱车名称 */
			carName
		}) {
			this.orderType = Number.parseInt(orderType);
			this.priceList[0].price = total;
			this.finalPrice = total;
			this.carName = carName;
			this.orderCommdityList = JSON.parse(commdityList);
			commdityList = JSON.parse(commdityList);
			
			if (carid !== undefined) {
				this.carid = JSON.parse(carid);
			}

			if (this.orderType === 1) {
				/* 获取当前用户的优惠券 */
				post.gets({
					method: 'POST',
					url: '/coupon/couponAll',
					data: {
						page: 1,
						rows: 9999,
						vechicleName: carName,
						commdityIds: commdityList.map(item => {
							return item.commdityId;
						}),
						remark: '0',
						userId: uni.getStorageSync('login').userId
					}
				}).then(data => {
					let list = data.data.couponList;
					this.coupon = {
						id: list[0].couponId,
						title: list[0].couponName,
						price: list[0].couponPrice
					}
				})
			}

			/* 解析商品集合 */
			commdityList.forEach(commdity => {
				post.gets({
					method: 'POST',
					url: `/commdity/${commdity.commdityId}/searchInfo`,
					data: {
						userId: uni.getStorageSync('login').userId
					}
				}).then(data => {
					let commdityInfo = data.data.commdityInfo;
					Reflect.set(commdity, 'info', commdityInfo);
					this.commdityList.push(commdity);
				})
			})
		},
		onShow() {
			if (this.distributionWay.store.id !== '') {
				post.gets({
					method: 'POST',
					url: `/store/${this.distributionWay.store.id}/searchInfo`,
					data: {
						page: 1,
						rows: 20
					}
				}).then(data => {
					this.distributionWay.store.data = data.data.obj;
				})
			}
		}
	}
</script>

<style lang="scss">
	.van-grid-item__text {
		font-size: 20rpx !important;
	}

	.van-grid-item__icon {
		font-size: var(--grid-item-icon-size, 37px) !important;
	}

	.commdityList {
		padding: 30rpx;
		display: flex;
		align-items: center;

		van-image {
			border: 1rpx solid #d2d2d2;
			margin-right: 15rpx;
			padding: 10rpx;
		}
	}
</style>
