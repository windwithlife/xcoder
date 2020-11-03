var server = require('../../../model/commonStore');

function queryAll(callback) {
  server.query("<%=data.requestBasePath%>queryAll",{},function(data){
    //console.log(data);
    callback(data);
  });
}


function queryById(id, callback) {
  server.query("<%=data.requestBasePath%>queryById/"+ id,{},function(data){
    //console.log(data);
    callback(data);
  });
}


function add(values, callback) {

  server.query("<%=data.requestBasePath%>add"+ id,values,function(data){
    //console.log(data);
    callback(data);
  });
}


function update(itemData, callback) {
  server.query("<%=data.requestBasePath%>update/"+ values.id,values,function(data){
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
