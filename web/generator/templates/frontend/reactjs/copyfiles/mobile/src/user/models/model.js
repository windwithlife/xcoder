var model = require('../../common/components/models/modelBase');


var serverPath = 'http://121.196.221.190:8080/';
var moduleName = "product";
var apiServerPath = serverPath + "/" + moduleName ;
var query = function (cb) {
    model.get(apiServerPath + "/queryAll", {}, cb);
};

var queryByNameLike = function (params, cb) {
    model.get(apiServerPath + "/queryByNameLike/", params, cb);
};
var queryById = function (params, cb) {
    model.get(apiServerPath + "/query/" + params.id, params, cb);
};
var update = function (params, cb) {
    model.post(apiServerPath + "/update/" + params.id, params, cb);
};
var remove = function (params, cb) {
    model.post(apiServerPath + "/remove/" + params.id, params, cb);
};
var add = function (params, cb) {
    model.post(apiServerPath + "/save", params, cb);
};
var queryReferListByName = function (refer, cb) {
    model.get(serverPath + "/" + refer + "/queryAll", {}, cb);
};
var queryDictionaryListByParams = function (params, cb) {
    model.get(serverPath + "/dictionary/queryByCategory/", params, cb);
};
module.exports = {
    add: add,
    remove: remove,
    update: update,
    query: query,
    queryById: queryById,
    queryByNameLike: queryByNameLike,
    queryReferListByName: queryReferListByName,
    //queryReferListByParams: queryDictionaryListByParams,
    queryDictionaryByCategory: queryDictionaryListByParams
}

