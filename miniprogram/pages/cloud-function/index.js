// pages/cloud-function/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sum: 0,
        items: ['项目1']
    },

    add(event) {
        wx.cloud.callFunction({
            name: 'gooseFunctions',
            data: {
                type: 'add', a: 1, b: 2
            }
        }).then(res => {
            console.log(res)
            this.setData({
                sum: res.result.sum
            })
        }).catch(console.error)
    },

    request() {
        wx.cloud.callFunction({
            name: 'gooseFunctions',
            data: {
                type: 'request'
            },
            complete: res => {
                this.setData({
                    items: res.result
                })
            }
        })
    }
})