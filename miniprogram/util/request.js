var app = getApp()
const baseUrl = "http://localhost:18080/"

export const request = (url = '', data = {}, method = 'GET', callback = null, errCallback = null) => {
  let token = wx.getStorageSync('token')
  wx.request({
    url: baseUrl + url,
    header: {
      'Authorization': token
    },
    method: method,
    data: data,
    success: (res2) => {
      console.log("返回结果:" + JSON.stringify(res2.data))
      // 调用成功
      if (res2.data.code === '2000') {
        if (callback) {
          callback(res2.data)
        }
      } else {
        if (errCallback) {
          errCallback(res2.data)
        }
        wx.showToast({
          title: '请稍后再试',
          icon: 'none'
        })
      }
    }
  })
}