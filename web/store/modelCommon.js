
var model = require('./modelBase');
var config = require('../config/config');

//var serverPath = 'http://127.0.0.1:8080/';
//var envCurrent = process.env.NODE_ENV;
var serverPath = config['current'].SOA_GATE;
console.log(" current SOA Gateway:========" + serverPath);

function firstUpperCase(str) {
    //return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
    if(!str){return ''}
    var strResult = str.substring(0,1).toUpperCase()+str.substring(1);
    return strResult;
}

function ModelClass(moduleName) {
    if (moduleName) {
        this.moduleName = moduleName;
    }else{
        this.moduleName = "";
    }

    this.apiServerPath = serverPath + "/" + this.moduleName ;
}

ModelClass.prototype.queryRaw = function (path, params,cb) {
    model.get(serverPath + "/" + path, params, cb);
};
ModelClass.prototype.postRaw = function (path, params,cb) {
    model.post(serverPath + "/" + path, params, cb);
};
ModelClass.prototype.query = function (path, params,cb) {
    model.get(this.apiServerPath + "/" + path , params, cb);
};

ModelClass.prototype.update = function (params, cb) {
    model.post(this.apiServerPath + "/update/" + params.id, params, cb);
};

ModelClass.prototype.remove = function (params, cb) {
    model.post(this.apiServerPath + "/remove/" + params.id, params, cb);
};

ModelClass.prototype.removeById = function (id, cb) {
    model.post(this.apiServerPath + "/remove/" + id, {id:id}, cb);
};

ModelClass.prototype.add = function (params, cb) {
    model.post(this.apiServerPath + "/save", params, cb);
};

ModelClass.prototype.queryAll = function (cb) {
    this.query("/queryAll",{},cb);
};
ModelClass.prototype.queryById = function (id, cb) {
    this.query("/query/" + id, {}, cb);
};

ModelClass.prototype.queryByParams = function (params, cb) {
    this.query("/queryByParams", params, cb);
};

ModelClass.prototype.queryByNameLike = function (name, cb) {
    this.query("/queryByNameLike/", {name:name}, cb);
};

ModelClass.prototype.queryByName = function (name, cb) {
    this.query("/queryByName", {name:name}, cb);
};

ModelClass.prototype.queryReferListByName = function (refer, cb) {
    model.get(serverPath + "/" + refer + "/queryAll", {}, cb);
};

ModelClass.prototype.queryReferListBy = function (refer,moduleName,params, cb) {
    model.get(serverPath + "/" + refer + "/queryBy" + firstUpperCase(moduleName), params, cb);
};

ModelClass.prototype.queryDictionaryByCategory = function (params, cb) {
    model.get(serverPath + "/dictionary/queryByCategoryName/", params, cb);
};

ModelClass.queryRaw = function (path, params,cb) {
    model.get(serverPath + "/" + path, params, cb);
};
ModelClass.postRaw = function (path, params,cb) {
    model.post(serverPath + "/" + path, params, cb);
};
ModelClass.queryReferListByName = function (refer, cb) {
    model.get(serverPath + "/" + refer + "/queryAll", {}, cb);
};
ModelClass.queryDictionaryByCategory = function (params, cb) {
    model.get(serverPath + "/xcoder/dictionary/queryByCategoryName/", params, cb);
};
ModelClass.queryReferListBy = function (refer,moduleName,params, cb) {
    model.get(serverPath + "/" + refer + "/queryBy" + firstUpperCase(moduleName), params, cb);
};

module.exports = ModelClass;




