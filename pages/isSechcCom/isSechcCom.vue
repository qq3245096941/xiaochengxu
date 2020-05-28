<template>
	<view>
		<view style="margin-bottom: 100rpx;">
			<van-dropdown-menu>
				<van-dropdown-item :value="car.default.mycarId" :options="car.tabData" @change="loveCarChange" />
			</van-dropdown-menu>
			<!-- <view class="isSechcComHeader">常规保养项目</view> -->
			<van-collapse :value="isSelectIndex" @change="onChange">
				<van-collapse-item v-for="(firstItem,index) in firstList" :name="index" :key="index">
					<view slot="title">
						<van-checkbox catchtap="" :value="firstItem.isClickAll" @change="clickAll(firstItem)">{{firstItem.mainName}}丨
							<text class="total">总计：¥{{firstItem.total}}</text></van-checkbox>
					</view>
					<van-card 
					:key="commdityIndex" v-for="(commdity,commdityIndex) in firstItem.list" 
					:num="commdity.commdityCount" 
					:price="commdity.commdity.commdityPrice"
					:title="commdity.commdityName" 
					:thumb="commdity.commdityThnmbnail | getImg">
						<view slot="desc">
							<van-tag 
							style="margin-left: 5rpx;" :key="titleIndex" 
							v-for="(title,titleIndex) in commdity.commdityTitle" 
							plain round 
							:type="titleIndex===0?'warning':'primary'">
							{{title}}
							</van-tag>
						</view>
					</van-card>
				</van-collapse-item>
			</van-collapse>
		</view>
		
		<view class="submit">
			<view class="service" @click="makingCall">
				<van-icon size="20" name="service-o" />
				<text>联系客服</text>
			</view>
			
			<view class="text">
				<view>合计：<text style="color: #ed4014;font-size: 50rpx;font-weight: bold;"><text style="font-size: 30rpx;">￥</text>{{total}}</text></view>
				<!-- <view class="abandon">包含安装费</view> -->
			</view>
			
			<view class="btn">
				<van-button type="danger" round @click="submit" :disabled="total===0">去结算</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				/* 我的爱车 */
				car: {
					/* 所有爱车的完整数据 */
					all: [],
					default: {},
					/* 显示在tab的数据 */
					tabData: []
				},
				defaultCar: 0,
				page: 1,
				user: '',
				/* 数据 */
				firstList: [],
				isSelectIndex: [0],
				/* 当前选中商品的总计 */
				total: 0,
			}
		},
		methods: {
			/* 爱车切换 */
			loveCarChange(res) {
				this.car.default = this.car.all.find(item => {
					if (item.mycarId === res.detail) {
						return item;
					}
				})
			},
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
				let num = [];
				
				this.firstList.forEach(item => {
					if (item.isClickAll) {
						item.list.forEach(commodity => {
							commodityList.push(commodity.commdityId);
							num.push(commodity.commdityCount);
						})
					}
				})

				uni.navigateTo({
					url: `../orderConfirmation/orderConfirmation?list=${JSON.stringify(commodityList)}&total=${this.total}&num=${JSON.stringify(num)}&commdityClass=[]&orderType=1`
				})
			}
		},
		watch: {
			'car.default'({
				carName,
				travel
			}) {
				this.total = 0;
				/* 通过默认爱车获取保养商品*/
				post.gets({
					method: 'POST',
					url: '/pmain/pmainRemarkAll',
					data: {
						vehicle: carName,
						gongli: travel === null ? '' : travel
					}
				}).then(data => {
					this.firstList = data.data.resultMap.map(item => {
						/* 初始化总价 */
						let total = 0;
						/* 初始化全选按钮 */
						item.isClickAll = false;

						item.list.forEach(childItem => {
							total = total + childItem.commdityCount*childItem.commdity.commdityPrice;
						})
						
						total = total.toFixed(2);

						item.total = total;
						/* 重置商品描述 */
						item.list = item.list.map(commdity=>{
							let list = [];
							
							commdity.commdity.commdityTitle.split(" ").forEach(desc=>{
								if(desc!==''){
									list.push(desc);
								}
							});
							
							commdity.commdityTitle = list;
							
							return commdity;
						})
						
						return item;
					});
				})

			}
		},
		onLoad() {

		},
		async onShow() {
			this.user = uni.getStorageSync('login');
			this.total = 0;

			/* 登录成功之后判断当前用户是否已经选中爱车 */
			post.gets({
				method: 'GET',
				url: `/car/${this.user.userId}/carUserTotalCount`
			}).then(data => {
				if (data.data.totalCount === 0) {
					uni.navigateTo({
						url: '../getCartType/getCartType'
					})
				}
			})

			/* 通过用户获取当前用户爱车信息 */
			this.car.all = (await post.gets({
				method: 'POST',
				url: `/car/${this.user.userId}/carUserAll`
			})).data.list;

			this.car.tabData = this.car.all.map(item => {
				if (item.isDefault === '1') {
					this.car.default = item;
				}

				return {
					text: item.carName,
					value: item.mycarId
				}
			})

			console.log(this.car);
		},
		onReachBottom() {

		}
	}
</script>

<style lang="scss">
	.submit{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		display:flex;
		align-items: center;
		color: #515a6e;
		
		.service {
			margin-right:auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-left: 50rpx;
			
			text {
				font-size: 20rpx;
			}
		}
		
		.text{
			font-size: 28rpx;
			margin-right: 20rpx;
			
			.abandon{
				text-decoration: line-through;
				color: #c5c8ce;
				font-size: 20rpx;
				text-align: right;
			}
		}
		
		.btn{
			margin-right: 20rpx;
		}
	}
	
	
	
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
</style>
