
var model = require('./modelBase');


var serverPath = 'http://localhost:8080/';

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
ModelClass.prototype.queryById = function (params, cb) {
    this.query("/query/" + params.id, params, cb);
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

ModelClass.prototype.queryDictionaryByCategory = function (params, cb) {
    model.get(serverPath + "/dictionary/queryByCategory/", params, cb);
};

ModelClass.queryReferListByName = function (refer, cb) {
    model.get(serverPath + "/" + refer + "/queryAll", {}, cb);
};
ModelClass.queryDictionaryByCategory = function (params, cb) {
    model.get(serverPath + "/dictionary/queryByCategory/", params, cb);
};

module.exports = ModelClass;




