// 网络请求方法封装
function request(method, url, data) {
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
// 函数防抖
const Debounce = (fn, t) => {
    let delay = t || 500
    let timer
    return function () {
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
		// request.default.headers.commit[""]
  return request(obj.method, obj.url, obj.data)
}

//实时通讯
module.exports = {
  gets,
  Debounce
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
