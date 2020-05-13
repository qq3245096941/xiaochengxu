<!-- 选择发票 -->
<template>
	<view style="padding: 20rpx;">

		<view style="font-size: 40rpx;color: #17233d;">发票抬头</view>

		<van-radio-group :value="selectInvoice" style="display: flex;margin:20rpx 0;" @change="invoiceRadio">
			<van-radio name="0" style="margin-right: 20rpx;">个人发票</van-radio>
			<van-radio name="1">企业发票</van-radio>
		</van-radio-group>

		<!-- 单人发票 -->
		<view v-if="selectInvoice==='0'">
			<van-cell-group>
				<van-cell @click="selectPersonage(item)" :key="index" v-for="(item,index) in personageList" :title="item.invoiceRise"
				 :label="item.userEmail" center is-link />
			</van-cell-group>

			<view style="font-size: 20rpx;padding: 50rpx;color: #515a6e;">
				电子发票市税务局认可的有效凭证，其法律效力，基本用途及使用规定同纸质发票，如需纸质发票可自行下载打印。
			</view>

			<van-button v-if="personageList.length===0" type="danger" size="small" block round @click="invoice.personage.isShow=true">添加个人发票</van-button>
		</view>
		<!-- 企业发票 -->
		<view v-if="selectInvoice==='1'">

			<van-cell-group>
				<van-cell @click="selectEnterprise(item)" :key="index" v-for="(item,index) in enterpriseList" :title="'单位名称：'+item.companyName"
				 use-label-slot center is-link>
					<view slot="label">
						<ul>
							<li>纳税人识别号：{{item.taxpayer}}</li>
							<li>邮箱：{{item.userEmail}}</li>
						</ul>
					</view>
				</van-cell>
			</van-cell-group>

			<view style="font-size: 20rpx;padding: 50rpx;color: #515a6e;">
				电子发票市税务局认可的有效凭证，其法律效力，基本用途及使用规定同纸质发票，如需纸质发票可自行下载打印。
			</view>
			<van-button v-if="enterpriseList.length===0" type="danger" size="small" block round @click="invoice.enterprise.isShow=true">添加企业发票</van-button>
		</view>

		<!-- 添加单人发票 -->
		<van-dialog use-slot title="添加单人发票" show-cancel-button @cancel="invoice.personage.isShow=false" @confirm="invoice.personage.click"
		 :show="invoice.personage.isShow">
			<van-cell-group>
				<van-field left-icon="manager-o" :value="invoice.personage.name" placeholder="姓名" @input="IPN" />
				<van-field left-icon="envelop-o" :value="invoice.personage.email" placeholder="请输入电子邮箱地址" @input="IPE" />
			</van-cell-group>
		</van-dialog>

		<!-- 添加单人发票 -->
		<van-dialog use-slot title="添加企业发票" show-cancel-button @cancel="invoice.enterprise.isShow=false" @confirm="invoice.enterprise.click"
		 :show="invoice.enterprise.isShow">
			<van-cell-group>
				<van-field :value="invoice.enterprise.name" left-icon="manager-o" placeholder="单位名称" @input="IEN" />
				<van-field :value="invoice.enterprise.taxpayerId" left-icon="idcard" placeholder="纳税人识别号" @input="IET" />
				<van-field :value="invoice.enterprise.email" left-icon="envelop-o" placeholder="请输入电子邮箱地址" @input="IEE" />
			</van-cell-group>
		</van-dialog>
	</view>
</template>

<script>
	import post from '../../post.js'

	export default {
		data() {
			return {
				userId: '',
				/* 当前选择查看哪个发票，0为个人，1为企业 */
				selectInvoice: "0",
				personageList: [],
				enterpriseList: [],
				/*  添加发票弹框*/
				invoice: {
					personage: {
						isShow: false,
						name: '',
						email: '',
						/* 弹框确定后 */
						click(res) {
							let obj = {
								userEmail: this.invoice.personage.email, //邮箱
								invoiceRise: this.invoice.personage.name //个人名称
							}

							if (obj.userEmail === '' || obj.invoiceRise === '') {
								uni.showToast({
									title: '请将内容填写完整',
									icon: 'none'
								})
								return;
							}

							post.gets({
								method: 'POST',
								url: '/invoice/addInvoice',
								data: {
									invoiceType: 1,
									userId: this.userId,
									...obj
								}
							}).then(res => {
								console.log(res);
								if (res.data.message !== '成功') {
									uni.showToast({
										title: res.data.message,
										icon: 'none'
									})
								} else {
									Reflect.set(obj,'invoiceId',res.data.invoiceId);
									this.personageList = [...this.personageList, obj];
								}
							})

							this.invoice.personage.isShow = false;
						},
					},
					enterprise: {
						isShow: false,
						name: '', //单位名称
						taxpayerId: '', //纳税人id
						email: '',
						/* 弹框确定后 */
						click(res) {
							let obj = {
								companyName: this.invoice.enterprise.name,
								taxpayer: this.invoice.enterprise.taxpayerId,
								userEmail: this.invoice.enterprise.email,
							};

							if (obj.companyName === '' || obj.taxpayer === '' || obj.userEmail === '') {
								uni.showToast({
									title: '请将内容填写完整',
									icon: 'none'
								})
								return;
							}

							post.gets({
								method: 'POST',
								url: '/invoice/addInvoice',
								data: {
									invoiceType: 0,
									userId: this.userId,
									...obj
								}
							}).then(res => {
								console.log(res);
								if (res.data.message !== '成功') {
									uni.showToast({
										title: res.data.message,
										icon: 'none'
									})
								} else {
									Reflect.set(obj,'invoiceId',res.data.invoiceId);
									this.enterpriseList = [...this.enterpriseList, obj];
								}
							})

							this.invoice.enterprise.isShow = false;
						}
					}
				}
			}
		},
		methods: {
			/* 选择单人发票 */
			selectPersonage(item) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.invoice.title = '个人发票';
				prevPage.$vm.invoice.id = item.invoiceId;
				uni.navigateBack({
					delta: 1
				})
			},
			selectEnterprise(item) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.invoice.title = '企业发票';
				prevPage.$vm.invoice.id = item.invoiceId;
				uni.navigateBack({
					delta: 1
				})
			},
			invoiceRadio({
				detail
			}) {
				this.selectInvoice = detail;
			},
			IPN({
				detail
			}) {
				this.invoice.personage.name = detail;
			},
			IPE({
				detail
			}) {
				this.invoice.personage.email = detail;
			},
			IEN({
				detail
			}) {
				this.invoice.enterprise.name = detail;
			},
			IET({
				detail
			}) {
				this.invoice.enterprise.taxpayerId = detail;
			},
			IEE({
				detail
			}) {
				this.invoice.enterprise.email = detail;
			}
		},
		onLoad() {
			this.userId = uni.getStorageSync('login').userId;

			/* 企业 */
			post.gets({
				method: 'POST',
				url: `/invoice/${this.userId}/0/invoiceInfo`
			}).then(data => {
				this.enterpriseList = data.data.data;
			})

			/* 个人 */
			post.gets({
				method: 'POST',
				url: `/invoice/${this.userId}/1/invoiceInfo`
			}).then(data => {
				this.personageList = data.data.data;
			})
		}
	}
</script>

<style>

</style>
