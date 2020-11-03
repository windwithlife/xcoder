var server = require('../../../../model/commonStore');

function queryAll(callback) {
  server.query("/configure/menu/queryAll",{},function(data){
    //console.log(data);
    callback(data);
  });
}


function queryById(id, callback) {
  server.query("/configure/menu/queryById/"+ id,{},function(data){
    //console.log(data);
    callback(data);
  });
}


function add(values, callback) {

  server.query("/configure/menu/add"+ id,values,function(data){
    //console.log(data);
    callback(data);
  });
}


function update(itemData, callback) {
  server.query("/configure/menu/update/"+ values.id,values,function(data){
    //console.log(data);
    callback(data);
  });
 
}

module.exports = {
  queryAll:queryAll,
  queryById:queryById,
  add:add, 
  update:update,
}
