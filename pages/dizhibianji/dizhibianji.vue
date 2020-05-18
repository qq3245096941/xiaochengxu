<template>
	<view class="box">

		<view class="isguige">
			<van-cell-group>
				<van-field :value="username" label="用户名" placeholder="收货人姓名" @input="setusername" />
				<van-field :value="phone" label="手机号" placeholder="请输入手机号" @input="setphone" />
				<van-field :value="sheng+shi+qu" placeholder="请选择" label="所在地区" disabled :readonly="true">
					<van-icon @click="isshow=true" slot="right-icon" size="small" name="arrow"></van-icon>
				</van-field>
				<van-field :value="addDesc" label="地址" type="textarea" placeholder="详细地址" autosize @input="setaddDesc" />
			</van-cell-group>
		</view>
		<van-action-sheet :show="isshow" @close="isshow=false" @cancel="onCancel" title="地区">
			<view>
				<van-area :area-list="areaList" @confirm="onConfirm" />
			</view>
		</van-action-sheet>
		<view class="isbtn" @click="setDiZhi()">
			保存并使用
		</view>
	</view>
</template>

<script>
	import post from "../../post.js"
	import area from '../Store/area.js' 
	export default {
		data() {
			return {
				username: '',
				phone: uni.getStorageSync('phonenumber'),
				isshow: false, //地区选择
				areaList: area, //省市区信息
				sheng: '',
				shi: '',
				qu: '',
				addDesc: ''
			}
		},
		methods: {
			setusername(e) {
				console.log(e, "name")
				this.username = e.detail
			},
			setphone(e) {
				this.phone = e.detail
			},
			setaddDesc(e) {
				this.addDesc = e.detail
			},
			onConfirm(e) { //省市区
				const _this = this;
				this.isshow = false;
				//省
				_this.sheng = e.detail.values[0].name;
				_this.shi = e.detail.values[1].name;
				_this.qu = e.detail.values[2].name;
				console.log(this.sheng, this.shi, this.qu);
			},
			setDiZhi() { //设置地址
				if (this.username === '') {
					wx.showToast({
						title: '请输入姓名',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (this.phone === '') {
					wx.showToast({
						title: '请输入电话',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (this.qu === '') {
					wx.showToast({
						title: '请选择地区',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (this.addDesc === '') {
					wx.showToast({
						title: '请输入详细地址',
						icon: 'none',
						duration: 2000
					})
					return;
				}

				post.gets({
					method: 'POST',
					url: '/address/insertAddress',
					data: {
						userId: uni.getStorageSync('login').userId,
						provice: this.sheng,
						city: this.shi,
						county: this.qu,
						addDesc: this.addDesc,
						userName: this.username,
						userTel: this.phone,
						def: 0
					}
				}).then(res => {
					uni.showToast({
						title:'添加成功',
						icon:'success',
						success(){
							uni.navigateBack({
								delta: 1
							})
						}
					})
					
				});
			},
		},
		onLoad() { 
 
		}
	}
</script>

<style scoped lang="scss">
	//编辑地址信息
	.box {
		height: 100%;

		.isbtn {
			width: 600rpx;
			height: 68rpx;
			line-height: 68rpx;
			text-align: center;
			color: rgba(216, 55, 56, 1);
			border: 2px solid rgba(216, 55, 56, 1);
			border-radius: 10rpx;
			margin-left: 70rpx;
			margin-top: 600rpx;
			font-size: 36rpx;
		}
	}
</style>
