// 云函数入口文件
const cloud = require('wx-server-sdk');
const rp = require('request-promise')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    return rp('http://127.0.0.1:8080/items')
};
