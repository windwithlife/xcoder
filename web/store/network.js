
var model = require('./modelBase');
var config = require("../config/config");

let apiserver = config['current'].SOA_GATE;
let webServer = config['current'].WEB_GATE;
console.log(" current env:========" + webServer);

function NetworkClass() {
    this.webServer = webServer;  
}

NetworkClass.prototype.webGet = function (path, params,cb) {
    model.get(webServer + "/" + path, params, cb);
};
NetworkClass.prototype.webPost = function (path, params,cb) {
    model.post(webServer + "/" + path, params, cb);
};

NetworkClass.prototype.switchService = function (newHost) {
    this.webServer = newHost;
};

module.exports = new NetworkClass();




