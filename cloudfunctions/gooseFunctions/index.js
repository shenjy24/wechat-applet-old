const add = require('./add/index'); 
const request = require('./request/index')

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
      case 'add':
        return await add.main(event, context);
      case 'request':
        return await request.main(event, context)
    }
  };