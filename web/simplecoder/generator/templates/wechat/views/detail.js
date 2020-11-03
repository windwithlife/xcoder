// page/component/details/details.js
var model = require('../models/<%=data.nameClassName%>Store');

Page({
  data:{
   dataItem:{},
  },
  onLoad(){
    var self = this;
    var id = options.id;
    model.queryById(id, function(data){
      console.log(data);
      self.setData({dataItem:data});
    });
  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})