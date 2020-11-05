
const config = require('../utils/server-config');
const messageClient = require('./message-client');

const pointName = config.APPLICATION.name;
const serverLocation = 'ci/simple/center/server/';
const pointLocation = 'ci/simple/point/' + pointName + '/';
const TOPIC_SUB_CENTER   = pointLocation + '#' ;
const TOPIC_PUB_STATUS    =  serverLocation + 'status/test';
const TOPIC_PUB_LOGS      = serverLocation + 'logs/test';
const TOPIC_PUB_REGISTER  = serverLocation + 'register/test';

const isString = (data) => {
	return Object.prototype.toString.call(data) === '[object String]';
}

 class MessagePoint{
    connect(){
        messageClient.connect();
    }
    onConnect(callback){
        messageClient.onConnect(callback);
    }
    onExecute(callback){
        messageClient.setCallback(TOPIC_SUB_CENTER,callback);
    }
    sendStatus(status){
        messageClient.sendMsg(TOPIC_PUB_STATUS,status);
    }
    sendLogs(logs){
        messageClient.sendMsg(TOPIC_PUB_LOGS,logs);
    }
    updateReleaseStatus(buildId, releaseStatus){
        let requestData = {releaseId: buildId, status:releaseStatus};
        this.sendStatus(requestData);
    }
    registerPoint(params){
        if (params){
            params.pointName = pointName;
            messageClient.sendMsg(TOPIC_PUB_REGISTER,params);
        }else{
            messageClient.sendMsg(TOPIC_PUB_REGISTER,{pointName: pointName});
        }
          
    }
    
}

module.exports = new MessagePoint();



