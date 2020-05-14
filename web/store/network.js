
var model = require('./modelBase');
var config = require("../config/config");

let apiserver = config['current'].SOA_GATE;
let webServer = config['current'].WEB_GATE;
console.log(" current env:========" + webServer);

function NetworkClass() {
    this.server = webServer;  
}

NetworkClass.prototype.webGet = function (path, params,cb) {
    model.get(this.server + "/" + path, params, cb);
};
NetworkClass.prototype.webPost = function (path, params,cb) {
    model.post(this.server + "/" + path, params, cb);
};

NetworkClass.prototype.switchService = function (newHost) {
    this.server = newHost;
};

module.exports = new NetworkClass();




