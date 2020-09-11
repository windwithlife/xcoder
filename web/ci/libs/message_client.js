var networkHelper = require('../../store/network');


 class MessageCenter{
    constructor(){
        networkHelper.switchService('http://soagateway.koudaibook.com');
    }
    initMessageServer(server){
        networkHelper.switchService(server);
    }
    updateReleaseStatus(buildId, releaseStatus){
        let requestData = {id: buildId, status:releaseStatus};
        networkHelper.webGet("/xcoder/buildrecord/updateRelaseStatus", requestData);
    }
    sendReleaseLog(buildId, text){
        let requestData = {id: buildId, log:text};
        networkHelper.webGet("/xcoder/buildrecord/sendReleaseLog", requestData);
    }   
}

let messageCenter = new MessageCenter();
module.exports = messageCenter;



