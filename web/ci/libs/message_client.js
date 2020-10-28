
let config = require('../../config/config').current;
let mqtt = require('mqtt')
let msgpack = require('msgpack-lite');


//let MQTT_HOST  =  config.MQTT_HOST;
let MQTT_HOST = "mqtt://mq.koudaibook.com:31883/";

const MQTT_CI_TOPIC =  'ci/release/#';
const MQTT_EXEC_TOPIC   =  "ci/release/execute";
const MQTT_STATUS_TOPIC =  "ci/release/status";
const MQTT_LOG_TOPIC    =  "ci/release/logs";
const ON_CREATE         =  "ci/oncreate";


const isString = (data) => {
	return Object.prototype.toString.call(data) === '[object String]';
}



 class MessageCenter{
    constructor(){
        console.log("start to initialize the mqtt!!!");
        this.isConnected = false;
        let that = this;
        this.callbacks= {};
        this.client = mqtt.connect(MQTT_HOST);
        this.execCommandTopic = MQTT_EXEC_TOPIC;
        this.statusTopic      = MQTT_STATUS_TOPIC;
        this.logTopic         = MQTT_LOG_TOPIC;
        this.client.on('connect', function () {
            console.log("connected!");
            that.client.subscribe(MQTT_CI_TOPIC, {qos:1}, function (err) {
              if (!err) {
                //that.client.publish('ci/release/test', 'Hello, test message for  MQTT!');
                that.isConnected = true;
                that.handleRecievedMsg(ON_CREATE,"connected");
                console.log("successful to  subscribe " + MQTT_CI_TOPIC);
              }
            });
            
          });

        
          that.client.on('message', function (topic, message) {
            console.log("**************** Received mqtt data topic:"+ topic + "******************");
            console.log("message:"+  message.toString());
            console.log("**************** The end of receiving mqtt data ******************");
            that.handleRecievedMsg(topic,message);

        });

    }
    handleRecievedMsg(topic, data){
        let execObj = this.callbacks[topic];
        if (execObj instanceof Function){
           
            if (!isString(data)){
                 let dataObj = msgpack.decode(data);
                 execObj(dataObj);
            }else{
                execObj(data);
            }
            
        }
    }
    
    onCreate(callback){
        this.setCallback(ON_CREATE, callback);
    }
    setCallback(topic, callback){
        this.callbacks[topic] = callback;
    }
    sendMsg(topic, data){
        if(!this.isConnected){
            console.log('mqtt is not yet readay!');
            return;
        }
        if (isString(data)){
            this.client.publish(topic,data);
        }else{
            //let strMsg = JSON.stringify(data);
            let strMsg = msgpack.encode(data);
            this.client.publish(topic,strMsg);
        }
        
    }
    setExecCallback(callback){
        this.setCallback(MQTT_EXEC_TOPIC,callback);
    }
    setLogsCallback(callback){
        this.setCallback(MQTT_LOG_TOPIC,callback);
    }
    setStatusCallback(callback){
        this.setCallback(MQTT_STATUS_TOPIC,callback);
    }
    sendExecCommand(params){
        this.sendMsg(this.execCommandTopic,params);
    }
    sendLogs(params){
        //console.log(params);
        this.sendMsg(this.logTopic,params);
    }
    sendStatus(params){
        //let strParams = params.toString;
        this.sendMsg(this.statusTopic,strParams);
    }
    
    updateReleaseStatus(buildId, releaseStatus){
        let requestData = {releaseId: buildId, status:releaseStatus};
        this.sendStatus(requestData);
    }
    
}

let messageCenter = new MessageCenter();
module.exports = messageCenter;



