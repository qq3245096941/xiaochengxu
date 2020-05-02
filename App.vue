<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		url:'https://xcx.zhongshengzb.com:8089/shoppingImg/images/',
        request(){
            return new Promise((resolve) => {
                uni.request({
                    method: method,
                    url: 'https://zsxcx.zhongshengzb.com:8446/zs_two' + url,
                    data: data,
                    header: {
                        'Accept': "*/*",
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                    success(res) {
                        resolve(res);
                    }, 
                    fail(res) {
                        wx.showToast({
                            title: '请求失败',
                            icon: 'none',
                            duration: 1500,
                        })
                    }
                })
            })
        }
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/dist/common/index.wxss";
	page{
		width: 100%;
		margin: 0;
		padding: 0;
		background: #fff;
		height: 100%;
	}
</style>
