<template>
	<view class="Administration">
		<view class="welcome">
			欢迎加入车维宝I保养维修之家！
		</view>
		<view class="fondyour">
			请确认授权以下信息
		</view>
		<view class="fondyourson">
			获取你的公开信息 (昵称，头像等)
		</view>
		<button class="isbtn" open-type="getUserInfo" @getuserinfo="getUserList">
			微信授权
		</button>
	</view>
</template>

<script>
	import post from "../../post.js"

	export default {
		data() {
			return {

			}
		},
		methods: {
			async getUserList(data) {
				const user = data.detail.userInfo;

				const code = await new Promise(resolve => {
					wx.login({
						success(res) {
							resolve(res.code);
						}
					})
				});

				const userData = (await post.gets({
					method: 'POST',
					url: '/user/loginUser',
					data: {
						code
					}
				})).data.obj;
				
				console.log(userData);
				
				uni.setStorageSync('login', userData); //登录

				/* 更新当前用户信息，就是将昵称和头像传入后台 */
				await post.gets({
					method: 'POST',
					url: '/user/upUser',
					data: {
						userId: userData.userId,
						userName: user.nickName,
						userTx: user.avatarUrl
					}
				})
				
				//获取用户授权的手机号
				uni.navigateTo({
					url: '../Login/Login'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.Administration {
		width: 74%;
		height: auto;
		padding-top: 120rpx;
		margin-left: 13%;
	}

	.welcome {
		font-size: 30rpx;
		font-weight: 600;
		color: #000;
	}

	.fondyour {
		font-size: 22rpx;
		color: #000;
		font-weight: 600;
		margin-top: 35rpx;
	}

	.fondyourson {
		color: rgba(159, 160, 160, 1);
		font-size: 20rpx;
		margin-top: 10rpx;
	}

	.isbtn {
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		background: green;
		color: #fff;
		margin-top: 60rpx;
	}
</style>
