
var model = require('./modelBase');
var config = require("../utils/page-config");

let apiserver = config.SOA_GATE;
let webServer = config.WEB_GATE;
console.log(" current env:========" + webServer);


function removeFirst(str) {
    let  result = str;
    if(!str){return ''}
    if(str.substring(0,1) == '/'){
        result =  str.substring(1);
    }
    
    return result;
}

function NetworkClass() {
    this.server = webServer;  
}

NetworkClass.prototype.webGet = function (path, params,cb) {
    model.get(this.server + "/" + removeFirst(path), params, cb);
};
NetworkClass.prototype.webPost = function (path, params,cb) {
    model.post(this.server + "/" + removeFirst(path), params, cb);
};

NetworkClass.prototype.switchService = function (newHost) {
    this.server = newHost;
};

module.exports = new NetworkClass();




