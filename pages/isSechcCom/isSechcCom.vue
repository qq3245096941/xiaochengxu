<template>
	<view>
		<!-- <view class="isSechcComHeader">常规保养项目</view> -->
		<van-collapse :value="isSelectIndex" @change="onChange">
			<van-collapse-item v-for="(firstItem,index) in firstList" :name="index" :key="index">
				<view slot="title">
					<van-checkbox catchtap="" :value="firstItem.isClickAll" @change="clickAll(firstItem)">{{firstItem.mainName}}丨
						<text class="total">总计：¥{{firstItem.total}}</text></van-checkbox>
				</view>
				<van-card :key="commdityIndex" v-for="(commdity,commdityIndex) in firstItem.list" num="1" :price="commdity.commdityPrice"
				 :title="commdity.commdityName" :thumb="commdity.commdityThnmbnail | getImg" />
			</van-collapse-item>
		</van-collapse>

		<van-submit-bar :price="total*100" button-text="去结算" :disabled="total===0" @submit="submit">
			<button open-type="contact" class="service_btn">联</button>
			<view class="service">
				<van-icon size="20" name="service-o" />
				<text>联系客服</text>
			</view>
		</van-submit-bar>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				page: 1,
				user: '',
				firstList: [],
				isSelectIndex: [0],
				/* 当前选中商品的总计 */
				total: 0
			}
		},
		filters: {
			getImg(img) {
				return post.url + img;
			}
		},
		methods: {
			onChange(res) {
				this.isSelectIndex = res.detail;
			},
			/* 是否全选 */
			clickAll(firstItem) {
				firstItem.isClickAll = !firstItem.isClickAll;
				if (firstItem.isClickAll) {
					this.total = (firstItem.total * 100 + this.total * 100) / 100;
				} else {
					this.total = (this.total * 100 - firstItem.total * 100) / 100;
				}
			},
			/* 提交订单 */
			submit(res) {
				let commodityList = [];
				this.firstList.forEach(item => {
					if (item.isClickAll) {
						item.list.forEach(commodity => {
							commodityList.push(commodity.commdityId);
						})
					}
				})

				console.log(commodityList);

				let commodityNum = Array.from({
					length: commodityList.length
				}).map(() => {
					return 1;
				})

				uni.navigateTo({
					url: `../orderConfirmation/orderConfirmation?list=${JSON.stringify(commodityList)}&total=${this.total}&num=${JSON.stringify(commodityNum)}&commdityClass=[]&orderType=1`
				})
			}
		},
		onLoad() {
			
		},
		async onShow(){ 
			this.user = uni.getStorageSync('login');
			this.total = 0;
			
			/* 登录成功之后判断当前用户是否已经选中爱车 */
			post.gets({
				method: 'GET',
				url: `/car/${this.user.userId}/carUserTotalCount`
			}).then(data => {
				if (data.data.totalCount === 0) {
					uni.navigateTo({
						url:'../getCartType/getCartType'
					})
				}
			})
			
			/* 通过用户获取当前用户爱车信息 */
			const aicheList = (await post.gets({
				method: 'POST',
				url: `/car/${this.user.userId}/carUserAll`
			})).data.list;
			
			for (let aiche of aicheList) {
				console.log(aiche);
				if (aiche.isDefault === '1') {
					/* 通过默认爱车获取保养商品*/
					post.gets({
						method: 'POST',
						url: '/pmain/pmainRemarkAll',
						data: {
							vehicle: aiche.carName,
							gongli: aiche.travel===null?'':aiche.travel
						}
					}).then(data => {
						this.firstList = data.data.resultMap.map(item => {
							let total = 0; 
			
							/* 是否点击了全选按钮 */
							item.isClickAll = false;
			
							item.list.forEach(childItem => {
								total = total + childItem.commdityPrice;
							})
			
							item.total = total;
			
							return item;
						});
					})
					break;
				}
			}
		},
		onReachBottom() {

		}
	}
</script>

<style scoped>
	.isSechcComHeader {
		text-align: center;
		padding: 10rpx;
		color: #fff;
		font-size: 30rpx;
		background: #d2d2d2;
	}

	.thumb {
		width: 400rpx;
	}

	.total {

		color: red;
	}

	.service {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 50rpx;
	}

	.service text {
		font-size: 20rpx;
	}

	.service_btn {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 80rpx;
		opacity: 0;
	}
</style>
