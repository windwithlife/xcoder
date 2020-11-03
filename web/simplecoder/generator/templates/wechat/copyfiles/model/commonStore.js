let config = require('../config/config');
console.log(config);

function composeUrl(url){
  let finalUrl = config.host + url;
  return finalUrl;
}

function post(url, data, callback) {
  //callback("okokpost");

  var self = this;
  wx.request({
    url: composeUrl(url), //仅为示例，并非真实的接口地址
    method:'POST',
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
      if (callback){
        callback(res.data);
      }
    },
    fail(res){
      console.log('failed to request net data!');
      //console.log(res.data);
    },
  })
 
}

function query(url, data, callback) {
  ///callback("okokpost");

  var self = this;
  wx.request({
    url: composeUrl(url), //仅为示例，并非真实的接口地址
    method:'GET',
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      //console.log(res.data)
      if (callback){
        callback(res.data);
      }
    },
    fail(res){
      console.log('failed to request net data!');
      //console.log(res.data);
    },
  })
 
}
module.exports = {
  query:query,
  post:post,
}
