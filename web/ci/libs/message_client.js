var networkHelper = require('../../store/network');
const axios = require('axios');

 class MessageCenter{
    constructor(){
        //networkHelper.switchService('http://soagateway.koudaibook.com');
        this.server = "http://soagateway.koudaibook.com";
    }
    initMessageServer(server){
        //networkHelper.switchService(server);
        this.server = server;
    }
    updateReleaseStatus(buildId, releaseStatus){
        let requestData = {releaseId: buildId, status:releaseStatus};
        let path = this.server + "/xcoder/buildrecord/updateReleaseStatus";
        axios.get(path, requestData)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    sendReleaseLog(buildId, text){
        let requestData = {releaseId: buildId, log:text};
        let path = this.server + "/xcoder/buildrecord/sendReleaseLog";
        axios.get(path, requestData)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
        //networkHelper.webGet("/xcoder/buildrecord/sendReleaseLog", requestData);
    }   
}

let messageCenter = new MessageCenter();
module.exports = messageCenter;



