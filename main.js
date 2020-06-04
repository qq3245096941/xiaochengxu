import Vue from 'vue'
import App from './App'
import post from './post.js'

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.filter('getImg',function(url){
	return post.url + url;
})

Vue.mixin({
	methods:{
		makingCall(){
			uni.makePhoneCall({
				phoneNumber:'4006456777'
			})
		},
		/* 是否登录 */
		isLogin(){
			if(uni.getStorageSync('openid')===''){
				uni.redirectTo({
					url: "/pages/Authorization/Authorization",
					fail(error){
						console.log(error);
					}
				})
			}
		}
	}
})

Vue.filter('webImg',function(name){
	return 'https://xcx.zhongshengzb.com:8089/shoppingImg/images/home-icon/'+name;
})

const app = new Vue({
	...App
});
app.$mount()
