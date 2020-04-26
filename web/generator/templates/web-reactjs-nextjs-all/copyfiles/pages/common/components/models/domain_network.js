

var envhelper = require('./envhelper');
var codeTools = require('./code_tools');
var config = require('../../../config');
var axios = require('axios');

var getRequest = function (path, params) {
    console.log("axios request PATH:" + path + "METHOD:[GET]");
    console.log("axios request PARAM:" + JSON.stringify(params));
    return axios.get(path, { params: params }).catch(function (error) {
        console.log(error);
    });
}
var postRequest = function (path, params) {
    console.log("axios request PATH:" + path + "METHOD:[POST]");
    console.log("axios request PARAM:" + JSON.stringify(params));
    return axios.post(path, params).catch(function (error) {
        console.log(error);
    });
}

var serverPath = config['current'].SOA_GATE;
console.log(" current env:========" + serverPath);


class DomainNetwork {
    constructor(moduleName) {
        super();
        if (moduleName) {
            this.moduleName = moduleName;
        } else {
            this.moduleName = "";
        }
        this.domainRequestPath = serverPath + "/" + this.moduleName + '/';
        this.requestPath = serverPath+'/';
    }

    queryRawPromise(path, params) {
        return getRequest(this.requestPath + "/" + path, params);
    }
    postRawPromise(path, params) {
        return postRequest(this.requestPath + "/" + path, params);
    }
    queryPromise(path,params){
        return getRequest(this.domainRequestPath + "/" + path, params);
    }
    postPromise(path,params){
        return postRequest(this.domainRequestPath + "/" + path, params);
    }

    queryAllPromise() {
        return getRequest("/queryAll", {});
    }
    addPromise(params) {
        return postRequest(this.apiServerPath + "/save", params);
    }
    removeByIdPromise(id) {
        return postRequest(this.apiServerPath + "/remove/" + id, { id: id });
    }
    updatePromise(params) {
        postRequest(this.apiServerPath + "/update/" + params.id, params);
    }


    queryRaw(path, params, cb) {
        return getRequest(this.requestPath + "/" + path, params,cb);
    }
    postRaw(path, params, cb) {
        return postRequest(this.requestPath + "/" + path, params,cb);
    }
    query(path,params,cb){
        return getRequest(this.domainRequestPath + "/" + path, params,cb);
    }
    post(path,params,cb){
        return postRequest(this.domainRequestPath + "/" + path, params,cb);
    }

    queryAll(cb) {
        return getRequest("/queryAll", {},cb);
    }
    add(params,cb) {
        return postRequest(this.apiServerPath + "/save", params,cb);
    }
    removeById(id,cb) {
        return postRequest(this.apiServerPath + "/remove/" + id, { id: id },cb);
    }
    update(params,cb) {
        postRequest(this.apiServerPath + "/update/" + params.id, params,cb);
    }


    
    queryDictionaryByCategory(params,cb) {
        getRequest(this.requestPath + "/dictionary/queryByCategoryName/", params).then(cb);
    }
    queryDictionaryByCategoryPromise(params) {
        return getRequest(this.requestPath + "/dictionary/queryByCategoryName/", params);
    }
}


module.exports = DomainNetwork;




