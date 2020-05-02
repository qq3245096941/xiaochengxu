<template>
	<view class="box">
			
		   <view class="isguige" >
				<van-cell-group>
				  <van-field
				    :value="username"
				    label="用户名"
				    placeholder="收货人姓名"
					@input="setusername"
				  />
				  <van-field
				    :value="phone"
				    label="手机号"
				    placeholder="请输入手机号"
					@input="setphone"
				  />
				   <van-field
				      :value="sheng+shi+qu"
					   placeholder="请选择"
				      label="所在地区"
				      disabled
					  :readonly="true"
				    >
					<van-icon   @click="setMsg" slot="right-icon" size="small"  name="arrow">
					</van-icon>
					</van-field>
					  <van-field
					    :value="addDesc"
					    label="地址"
					    type="textarea"
					    placeholder="详细地址"
					    autosize
						@input="setaddDesc"
					  />
				</van-cell-group>
		   </view>
		<van-action-sheet :show="isshow" @close="onClose" @cancel="onCancel" title="地区">
			<view><van-area :area-list="areaList" @confirm="onConfirm" /></view>
		</van-action-sheet>
		<view class="isbtn" @click="setDiZhi()">
				保存并使用
		</view>
	</view>
</template>

<script>
	import post from "../../post.js"
	import area from '../Store/area.js';
	export default {
		data() {
			return {
				userid:'',
				username:null,
				phone:null,
				isshow:false, //地区选择
				areaList: [] ,//省市区信息
				sheng:'',
				shi:'',
				qu:'',
				addDesc:''
			}
		},
		methods: {
			setusername(e){
				console.log(e,"name")
				this.username = e.detail
			},
			setphone(e){
				this.phone = e.detail
			},
			setaddDesc(e){
				this.addDesc = e.detail
			},
			//编辑地址信息
			onClose() {
				this.isshow = false   //隐藏
			},
			onCancel(){
				this.isshow = false   //隐藏
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
		
			setDiZhi(){  //设置地址
				const _this = this;
				if(_this.userid&&_this.qu&&_this.addDesc&&_this.username&&_this.phone){
					post.gets({
						method: 'POST',
						url: '/address/insertAddress',
						data:{
							userId:_this.userid,
							provice:_this.sheng,
							city:_this.shi,
							county:_this.qu,
							addDesc:_this.addDesc,
							userName:_this.username,
							userTel:_this.phone,
							def:0
						}
					}).then(res => {
						console.log(res)
						uni.navigateBack({
							delta:1
						})
						let dizhi = {
							provice:_this.sheng,  //省
							city:_this.shi, //市
							county:_this.qu, //区
							addDesc:_this.addDesc, //详细地址
							userName:_this.username, //姓名
							userTel:_this.phone, //电话
						}
						uni.setStorageSync('dizhi', dizhi ); //登录信息
					});
				}else{
					if(!_this.username){
						wx.showToast({
							 title: '请输入姓名',
							 duration: 500
						})
					}else if(!_this.phone){
						wx.showToast({
							 title: '请输入电话',
							 duration: 500
						})
						
					}else if(!_this.qu){
						wx.showToast({
							 title: '请选择地区',
							 duration: 500
						})
					}else if(!_this.addDesc){
						wx.showToast({
							 title: '请输入详细地址',
							 duration: 500
						})
					}else{
						wx.showToast({
							 title: '网络错误，请稍后重试',
							 duration: 500
						})
					}
					
				}

			},
			setMsg(){
				const _this = this;
				_this.isshow = true
			}
		},
		onLoad() {
			const _this = this;
			uni.getStorage({  //获取userid
			  key: 'login',
			  success (res) {
				_this.userid = res.data.userId
			  }
			})
			_this.areaList = area;
		}
	}
</script>

<style scoped lang="scss">
//编辑地址信息
.box{
	height: 100%;
	.isbtn{
		width: 600rpx;
		height: 68rpx;
		line-height:68rpx;
		text-align:center;
		color:rgba(216,55,56,1);
		border:2px solid rgba(216,55,56,1);
		border-radius:10rpx;
		margin-left:70rpx;
		margin-top:600rpx;
		font-size:36rpx;
	}
}
</style>
