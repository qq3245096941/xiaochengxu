<template>
	<view>
		<view class="isSechcComHeader">常规保养服务({{maintain.default.length}}/{{maintain.list.length}})</view>
		<van-collapse :value="maintain.default" @change="onChange">
			<van-collapse-item v-for="(item,index) in maintain.list" :name="item.id" :key="index">
				<view slot="title">
					<van-checkbox catchtap="" :value="item.isCheckAll" @change="clickAll(item)">{{item.name}}丨<text class="total">总计：¥{{item.total}}</text></van-checkbox>
				</view>
				<!-- 小保养 -->
				<view v-if="item.id===1">
					<van-card :key="commodityIndex" v-for="(commodity,commodityIndex) in item.data" :num="commodit.commdity_count"
					 :price="commodity.commdityPrice" :desc="commodity.remark" :title="commodity.commdityName" :thumb="commodity.commdityThnmbnail" />
				</view>
				<!-- 大保养 -->
				<view v-if="item.id===2">
					<van-card :key="commodityIndex" v-for="(commodity,commodityIndex) in item.data" :num="commodit.commdity_count"
					 :price="commodity.commdityPrice" :desc="commodity.remark" :title="commodity.commdityName" :thumb="commodity.commdityThnmbnail" />
				</view>
			</van-collapse-item>
		</van-collapse>
		<van-submit-bar :price="maintain.mainTotal*100" button-text="去结算" :disabled="maintain.mainTotal===0" @submit="submit">
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
				maintain: {
					mainTotal: 0,
					/* 默认展示小保养服务 */
					default: [1],
					list: [{
							id: 1,
							name: '小保养服务',
							/* 总价 */
							total: 0,
							/*小保养服务项目 */
							data: [],
							/* 是否全选 */
							isCheckAll: false
						},
						{
							id: 2,
							name: '大保养服务',
							/* 总价 */
							total: 0,
							/* 数据 */
							data: [],
							isCheckAll: false
						}
					]
				}
			}
		},
		methods: {
			onChange(res) {
				this.maintain.default = res.detail;
			},
			/* 是否全选 */
			clickAll(item) {
				item.isCheckAll = !item.isCheckAll;
				if (item.isCheckAll) {
					this.maintain.mainTotal = item.total + this.maintain.mainTotal;
				} else {
					this.maintain.mainTotal = this.maintain.mainTotal - item.total;
				}
			},
			/* 提交订单 */
			submit(res) {
				let commodityList = [];
				this.maintain.list.forEach(item => {
					if (item.isCheckAll) {
						item.data.forEach(main => {
							commodityList.push(main.commdityId);
						})
					}
				})
				
			
				console.log(commodityList);
				
				let commodityNum = Array.from({length:commodityList.length}).map(()=>{
					return 1;
				})

				uni.navigateTo({
					url: `../orderConfirmation/orderConfirmation?list=${JSON.stringify(commodityList)}&total=${this.maintain.mainTotal}&num=${JSON.stringify(commodityNum)}`
				})
			}
		},
		async onLoad() {
			this.user = uni.getStorageSync('login');

			/* 通过用户获取当前用户爱车信息 */
			const aicheList = (await post.gets({
				method: 'POST',
				url: `/car/${this.user.userId}/carUserAll`
			})).data.list;

			for (let aiche of aicheList) {
				if (aiche.isDefault === '1') {
					/* 通过默认爱车获取小保养*/
					post.gets({
						method: 'POST',
						url: '/pmain/pmainAll',
						data: {
							mainType: 1,
							vehicle: aiche.carName,
							gongli: aiche.travel
						}
					}).then(data => {
						const list = data.data.mainAll;
						this.maintain.list[0].data = list.map(data => {
							data.commdityThnmbnail = post.url + data.commdityThnmbnail
							return data;
						});

						/* 计算总价 */
						list.forEach(item => {
							this.maintain.list[0].total = item.commdityPrice + this.maintain.list[0].total
						})
					})

					/* 获取大保养 */
					post.gets({
						method: 'POST',
						url: '/pmain/pmainAll',
						data: {
							mainType: 2,
							vehicle: aiche.carName,
							gongli: aiche.travel
						}
					}).then(data => {
						this.maintain.list[1].data = data.data.mainAll.map(data => {
							data.commdityThnmbnail = post.url + data.commdityThnmbnail
							return data;
						})

						/* 计算总价 */
						data.data.mainAll.forEach(item => {
							this.maintain.list[1].total = item.commdityPrice + this.maintain.list[1].total
						})

						console.log('大保养', data.data.mainAll);
					});
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
		margin-left: 10rpx;
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
