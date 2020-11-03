// page/component/new-pages/user/address/address.js
var model = require('../models/<%=data.nameClassName%>Store');

Page({
  data:{
    dataItem:{
      name:'',
      phone:'',
      detail:''
    }
  },
  onLoad(){
    var self = this;
    
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          dataItem : res.data
        })
      }
    })
  },
  formSubmit(e){
    const value = e.detail.value;
    if (value.name){
     
      model.add(value,function(data){
        console.log(data);
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
})