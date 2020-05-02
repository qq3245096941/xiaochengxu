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
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getUserList(res) {
				const _this = this;
				uni.setStorageSync('usermsg', res);
				if(res.detail.userInfo){
					uni.login({
						success(res) {
							_this.code = res.code; //code
							//登录请求数据
							uni.request({
								url: 'http://47.104.90.72:8445/zs_two/user/loginUser?code=' + _this.code,
								data: {
									code: _this.code
								},
								success(login) { 
									if (login.statusCode === 200 && login.data.code == 0) {
										uni.setStorageSync('login', login.data.obj); //登录
										//获取用户授权
										uni.navigateTo({
											url:'../Login/Login'
										})
									}
								},
								fail(req) {
									console.log(req);
								}
							});
						}
					});
				}
				
			},
			
			
		}
	}
</script>

<style scoped lang="scss">
.Administration{
	width: 74%;
	height: auto;
	padding-top:120rpx;
	margin-left:13%;
}
.welcome{
	font-size:30rpx;
	font-weight:600;
	color:#000;
}
.fondyour{
	font-size:22rpx;
	color:#000;
	font-weight:600;
	margin-top:35rpx;
}
.fondyourson{
	color:rgba(159,160,160,1);
	font-size:20rpx;
	margin-top:10rpx;
}
.isbtn{
	height: 70rpx;
	line-height:70rpx;
	font-size:30rpx;
	background: green;
	color:#fff;
	margin-top:60rpx;
}
</style>
