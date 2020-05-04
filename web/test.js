const low = require('lowdb');
var codeTools = require('./ci/libs/code_tools');
const FileSync = require('lowdb/adapters/FileSync');  // 有多种适配器可选择
require('shelljs/global');

cp("-R", "./source/", "./target/");
// const adapter = new FileSync('db.json'); // 申明一个适配器
// const db = low(adapter);


// db.defaults({ 'routetable': [] }).write();
// //db.defaults({ 'testTable': [] }).write();
// db.get('routetable')
//   .push({ id: 1, host: 'gateway.koudaibook.com', path: 'medicallive',serviceName:"test-service" })
//   .write()


// let data =  db.read().get('routetable').find({ name: "testnamexxx" }).value();
// console.log(data);
// let params = {};
// params.routes = [];
// params.routes.push({ id: 1, host: 'gateway.koudaibook.com', path: 'medicallive',serviceName:"test-service" });
// params.routes.push({ id: 1, host: 'gateway.koudaibook.com', path: 'medicallive234',serviceName:"test-service23" });

// codeTools.generateCode("./java-server.yaml",params,"./result.yaml");