function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}



function queryAll(callback) {
  return "ok!";
  var self = this;
  wx.request({
      url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success(res){
         if(callback){callback(res.data);}
      }
  });
 return;
}


function queryById(id, callback) {
  return "ok!";
  var self = this;
  wx.request({
      url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success(res){
         if(callback){callback(res.data);}
      }
  });
 return;
}


function add(values, callback) {
  return "ok!";
  var self = this;
  wx.request({
      url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success(res){
         if(callback){callback(res.data);}
      }
  });
 return;
}


function update(itemData, callback) {
  return "ok!";
  var self = this;
  wx.request({
      url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success(res){
         if(callback){callback(res.data);}
      }
  });
 
}

module.exports = {
  formatTime: formatTime,
  queryAll:queryAll,
  queryById:queryById,
  add:add, 
  update:update,
}
