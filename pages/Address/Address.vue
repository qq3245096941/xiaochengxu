<template>
	<view class="Address">
		<view class="tianjia" @click="Tianjia()">  
			+ 添加收货地址
		</view>
		<van-swipe-cell right-width="100" left-width="100" v-for="item in dizhilist" :key="item.addressId" >
		  <view slot="left" style="width:200rpx;height:196rpx;text-align:center;background:#00CD00;color:#fff;font-size:30rpx;line-height:196rpx;" @click="setDefault(item.addressId)">设为默认</view>
		  <van-cell-group>
		    <van-cell title="地址" value="地址" />
			<view class="isAllList" @click="xuanzedizhi(item.addressId)">
				<view class="Aleft">
					<view class="Atop">
						<view class="isUser">
							<van-icon name="contact" style="width:60rpx;height:40rpx;"/> <text> {{item.userName}}</text> 
						</view>
						<view class="isNum">
							<van-icon name="phone-o" style="width:60rpx;height:40rpx;"/> <text> {{item.userTel}}</text>  
						</view>
					</view>
					<view class="Abottom">
						<van-icon name="location-o" style="width:60rpx;height:40rpx;"/> {{item.provice}}{{item.city}}{{item.county}}{{item.addDesc}}
					</view>
				</view>
				<view class="Aright">
					<van-icon name="arrow" />
				</view>
				<view class="brs"></view>
			</view>
		  </van-cell-group>
		  <view slot="right" style="width:200rpx;height:196rpx;text-align:center;background:red;color:#fff;font-size:30rpx;line-height:196rpx;" @click="remove(item.addressId)">删除</view>
		</van-swipe-cell>
		<van-action-sheet :show="isshow" @close="onClose" @cancel="onCancel" title="地区">
			<view><van-area :area-list="areaList" @confirm="onConfirm" /></view>
		</van-action-sheet>
	</view>
</template>

<script>
	import post from "../../post.js"
	export default {
		data() {
			return {
				userid:null, //用户id
				dizhilist:[],
			}
		},
		methods: {
			//编辑个人信息
			Tianjia(){  //添加收货地址
				uni.navigateTo({
					url:"../dizhibianji/dizhibianji"
				})
			},
			//请求收货地址的所有数据
			getAsList(id){
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/address/'+id+'/addressUser',
				}).then(res => {
					console.log(res)
					if (res.statusCode === 200) {
						if (res.data.code == 0) {
							_this.dizhilist=res.data.list;
						}
					}
				});
			},
			//删除地址
			remove(id){
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/address/'+id+'/delAddress',
				}).then(res => {
					console.log(res)
					_this.getAsList(_this.userid)
				});
			},
			//设为默认
			setDefault(id){
				console.log(id)
				// /address/upAddress
				let _this = this;
				post.gets({
					method: 'POST',
					url: '/address/upAddress',
					data:{
						addressId:id,
						userId:_this.userid
					}
				}).then(res => {
					wx.showToast({
					  title: '设置成功',
					  icon: 'success',
					  duration: 2000
					})
				});
			},
			xuanzedizhi(isDizhi){
				uni.setStorageSync('isDizhi', isDizhi ); //登录信息
			}
		},
		onLoad() {
			const _this = this;
			uni.getStorage({  //获取userid
			  key: 'login',
			  success (res) {
				_this.userid = res.data.userId
				_this.getAsList(res.data.userId)
			  }
			})
		},
		onShow() {
			const _this = this;
			uni.getStorage({  //获取userid
			  key: 'login',
			  success (res) {
				_this.userid = res.data.userId
				_this.getAsList(res.data.userId)
			  }
			})
		}
		
	}
</script>

<style scoped lang="scss">
.Address{
	width: 100%;
	height: 100%;
	background: #F5F5F5;
	position: relative;
	.tianjia{
		position: absolute;
		width: 600rpx;
		height: 68rpx;
		left:76rpx;
		bottom:48rpx;
		line-height:68rpx;
		font-size:38rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(216,55,56,1);
		border-radius:10rpx;
		text-align:center;
		border:2px solid rgba(216,55,56,1);
	}
	
}
//地址列表
.isAllList{
	margin-top:20rpx;
	width: 100%;
	height: 196rpx;
	background: #fff;
	display:flex;
	position: relative;
	font-size:26rpx;
	.Aleft{
		line-height:96rpx;
		width: 85%;
		height: 100%;
		.Atop{
			width: 100%;
			height: 96rpx;
			.isUser{
				display: inline-block;
				width: 50%;
				height: 100%;
				text-indent:15rpx;
			}
			.isNum{
				display: inline-block;
				height: 100%;
				width: 50%;
				text-indent:15rpx;
			}
		}
		.Abottom{
			width: 100%;
			height: 100rpx;
			text-indent:15rpx;
		}
	}
	.Aright{
		width: 15%;
		height: 100%;
		text-align:center;
		line-height:196rpx;
	}
}
.brs{
	width: 100%;
	height: 14rpx;
	background:linear-gradient(to right,#f40 50%,skyblue 0);
	background-size: 30rpx 100% ; 
	 position: absolute;
	 left:0;
	 bottom:0;
}

</style>
