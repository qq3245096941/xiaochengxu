import Vue from 'vue'
import App from './App'
import post from './post.js'

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.filter('getImg',function(url){
	return post.url + url;
})

const app = new Vue({
	...App
});
app.$mount()
