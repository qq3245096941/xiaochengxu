// 网络请求方法封装
function request({method, url, data}) {
	return new Promise((resolve) => {
		wx.request({
			method: method,
			url: 'https://zsxcx.zhongshengzb.com:8446/zs_two' + url,
			data: data,
			header: {
				'Accept': "*/*",
				'content-type': 'application/x-www-form-urlencoded',
			},
			success(res) {
				resolve(res)
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

/* 获取 */
function getLocation() {
	return new Promise(resolve => {
		uni.getLocation({
			type: 'gcj02', //返回可以用于wx.openLocation的经纬度
			success(res) {
				let latitude = res.latitude;
				let longitude = res.longitude;
				let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';
				wx.request({
					url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
					success(res) {
						resolve({
							address: res.data.result.address_component,
							latitude,
							longitude
						});
					}
				});
			},
			fail(res) {
				console.log(res);
			}
		});
	})

}

/* 日期格式化 */
function js_date_time(unixtime) {
	var date = new Date(unixtime);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	// return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
}

// 函数防抖
const Debounce = (fn, t) => {
	let delay = t || 500
	let timer
	return function() {
		let args = arguments;
		if (timer) {
			clearTimeout(timer)
		}

		let callNow = !timer

		timer = setTimeout(() => {
			timer = null
		}, delay)

		if (callNow) fn.apply(this, args)
	}
}
//post请求
function gets(obj) {
	return request({
		method: obj.method,
		url: obj.url,
		data: obj.data
	})
}

/**
 * 微信支付封装
 * @param {String,Number} orderId 订单id
 * @param {Number} 总价
 * @param {NUmber} 0为普通商品，1为服务商品
 */
function wxPay(orderId,total,orderType=0) {
	request({
		method: 'POST',
		url: '/order/orderPay',
		data: {
			orderId
		}
	}).then(order => {
		const pay = order.data.data;

		uni.requestPayment({
			timeStamp: pay.timeStamp,
			nonceStr: pay.nonceStr,
			package: `prepay_id=${pay.prepayId}`,
			signType: pay.signType,
			paySign: pay.paySign,
			success: (payment) => {
				/* 跳转到订单详情 */
				uni.redirectTo({
					url: `/pages/orderParticulars/orderParticulars?orderId=${orderId}&total=${total}&orderType=${orderType}`
				})
			},
			fail(error) {
				console.log(error);
				uni.showToast({
					title: '您取消了支付',
					icon: 'none'
				})
			}
		})
	})
}

//实时通讯
module.exports = {
	gets,
	Debounce,
	js_date_time,
	url: 'https://xcx.zhongshengzb.com:8089/shoppingImg/images/',
	getLocation,
	wxPay
}

// 调用方式为
// var utils = require('../../utils/util.js')
// utils.gets({
//   method: "POST",
//   url: "链接地址",
//   data: {
//     anchor_pfid: '0'
//   }
// }).then(res => {
//   console.log(res)
// });
// 防抖
