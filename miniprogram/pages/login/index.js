// pages/login/index.js
Page({
    data: {

    },

    login() {
        wx.login({
            timeout: 5000,
            success(res) {
                if (res.code) {
                    console.log("success:" + res.code)
                    wx.request({
                        url: 'http://localhost:18080/auth/code2session',
                        data: {
                            code: res.code
                        },
                        success(r) {
                            console.log("code2session:" + JSON.stringify(r))
                        }
                    });
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            },
            complete(res) {
                console.log("complete:" + JSON.stringify(res))
            }
        })
    },

    checkSession() {
        wx.checkSession({
            success() {
                console.log("session有效")
            },
            fail() {
                this.login()
            },
        })
    }
})