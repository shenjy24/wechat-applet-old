// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
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
            success: (res) => {
                console.log("session有效")
            },
            fail: (res) => {
                this.login()
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})