import {
  request
} from '../../util/request'

Page({
  data: {
    userProfile: {}
  },

  onLoad(options) {
    wx.checkSession({
      success: () => {
        console.log("session有效")
      },
      fail: () => {
        console.log("session失效")
        this.code2session()
      },
    })
  },

  code2session() {
    wx.login({
      timeout: 5000,
      success: (res) => {
        if (res.code) {
          console.log("code2session code:" + res.code)
          request('/auth/code2session', {
            code: res.code
          }, 'GET', r => {
            console.log("调用code2session成功:" + JSON.stringify(r))
            wx.setStorageSync('token', r.data)
          }, e => {
            console.log("调用code2session失败:" + JSON.stringify(e))
          })
        }
      }
    })
  },

  getUserProfile() {
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        request('/auth/decryptUserProfile', {
          rawData: res.rawData,
          signature: res.signature,
          encryptedData: res.encryptedData,
          iv: res.iv
        }, 'GET', r => {
          console.log("调用getUserProfile成功:" + JSON.stringify(r))
          this.setData({
            userProfile: r.data
          })
        }, e => {
          console.log("调用getUserProfile失败:" + JSON.stringify(e))
        })
      }
    })
  }
})