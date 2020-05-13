<template>
	<view class="Login">
		<button class="isloginbtn" open-type="getPhoneNumber" @getphonenumber="Isgetphonenumber">
			<van-icon name="chat-o" /> 微信用户快速登录
		</button>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
		data() {
			return {
				userid: '',
				name: "",
				touxiang: ''
			}
		},
		onLoad() {
			const _this = this;
			uni.getStorage({
				key: 'usermsg',
				success(ress) {
					_this.userinfo = ress.data.detail.userInfo
					_this.name = _this.userinfo.nickName
					_this.touxiang = _this.userinfo.avatarUrl
				},
				fail() {}
			})
		},
		methods: {
			Isgetphonenumber(e) {
				const _this = this;
				uni.getStorage({
					key: 'login',
					success(res) {
						_this.userid = res.data.userId
						post.gets({
							method: 'POST',
							url: '/user/' + res.data.userId + '/AuthorizationUserTel',
							data: {
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData,
								sessionkey: res.data.sessionkey
							}
						}).then(res => {
							post.gets({
								method: 'POST',
								url: '/user/upUser',
								data: {
									userId: _this.userid,
									userTel: res.data.data.userTel
								}
							}).then(reqq => {
								/*获取用户信息*/
								uni.setStorageSync('phonenumber', res.data.data.userTel); //登录信息
								uni.setStorageSync('openid', res.data.data.openId); //登录信息

								/* 登录成功之后判断当前用户是否已经选中爱车 */
								post.gets({
									method: 'GET',
									url: `/car/${_this.userid}/carUserTotalCount`
								}).then(data => {
									if (data.data.totalCount > 0) {
										if (res) {
											uni.navigateBack({
												delta: 3
											})
										}
									} else {
										uni.redirectTo({ 
											url:'../loveArchives/loveArchives'
										})
									}
								})
							})
						});
					}
				})

			}
		},

	}
</script>

<style lang="scss" scoped>
	.Login {
		width: 100%;
		height: 100%;

		.isloginbtn {
			width: 90%;
			margin-left: 5%;
			margin-top: 100rpx;
			background: green;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
			color: #fff;
		}
	}
</style>
