
const config = require('../utils/server-config');
const messageClient = require('./message-client');

const pointName = config.APPLICATION.name;
const serverLocation = 'ci/simple/center/server/';
const pointLocation = 'ci/simple/point/' + pointName + '/';
const TOPIC_SUB_CENTER   = pointLocation + '#' ;
const TOPIC_PUB_TARGET  = serverLocation;


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
    sendMsg(command, params){
        let finalParams = { command: command, params: params};
        let targetTopic = TOPIC_PUB_TARGET;
        messageClient.sendMsg(targetTopic,finalParams);
    }
    sendStatus(params){
        this.sendMsg("status",params);
    }
    sendLogs(params){
        this.sendMsg("logs",params);
    }
    registerPoint(params){
        this.sendMsg("register",params);
    }
    updateStatus(id, releaseStatus){
        let params = {id: id, status:releaseStatus};
        this.sendStatus(params);
    }
    
    
}

module.exports = new MessagePoint();



