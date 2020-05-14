
var model = require('./modelBase');
var config = require("../config/config");

let apiserver = config['current'].SOA_GATE;
let webServer = config['current'].WEB_GATE;
console.log(" current env:========" + webServer);

function firstUpperCase(str) {
    //return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
    if(!str){return ''}
    var strResult = str.substring(0,1).toUpperCase()+str.substring(1);
    return strResult;
}

function NetworkClass() {
    this.webServer = webServer;  
}

NetworkClass.prototype.webGet = function (path, params,cb) {
    model.get(webServer + "/" + path, params, cb);
};
NetworkClass.prototype.webPost = function (path, params,cb) {
    model.post(webServer + "/" + path, params, cb);
};


module.exports = new NetworkClass();




