// page/component/new-pages/user/address/address.js
var model = require('./models/LiveroomStore');
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    }
  },
  onShow() {
  //   model.queryAll(function(data){
  //     console.log(data);
  //  });
  },
  onLoad(){
    var self = this;
    model.queryAll(function(data){
       console.log(data);
    });
    
    // wx.getStorage({
    //   key: 'address',
    //   success: function(res){
    //     self.setData({
    //       address : res.data
    //     })
    //   }
    // })
  },
  formSubmit(e){
    const value = e.detail.value;
    if (value.name && value.phone && value.detail){
      wx.setStorage({
        key: 'address',
        data: value,
        success(){
          wx.navigateBack();
        }
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