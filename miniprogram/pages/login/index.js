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
        wx.getStorage({
            key: 'openid',
            encrypt: true,
            success: (res1) => {
                wx.getUserProfile({
                    lang: 'zh_CN',
                    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success: (res2) => {
                        console.log(res2)
                        wx.request({
                            url: 'http://localhost:18080/auth/decryptUserProfile',
                            data: {
                                openid: res1.data,
                                rawData: res2.rawData,
                                signature: res2.signature,
                                encryptedData: res2.encryptedData,
                                iv: res2.iv
                            },
                            success: (res3) => {
                                console.log("decryptUserProfile:" + JSON.stringify(res3.data))
                                // 调用成功
                                if (res3.data.code === 2000) {
                                    this.setData({
                                        userProfile: res3.data.data
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    }
})