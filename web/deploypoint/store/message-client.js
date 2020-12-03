
const config = require('../utils/config');
const mqtt = require('mqtt')
const msgpack = require('msgpack-lite');

//const MQTT_HOST = "mqtt://mq.koudaibook.com:30883/";
const MQTT_HOST = config.servers.mqttServer;



const isString = (data) => {
    return Object.prototype.toString.call(data) === '[object String]';
}

let options ={
    clientId: 'MQTT_Client_DeployPoint_' + Math.random().toString(16).substr(2, 8),
    reconnectPeriod: 0,
    keepalive: 120,
    // protocolId: 'MQTT',
    // protocolVersion: 4,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: false,


};


class MessageCenter {
    constructor() {
        console.log("start to initialize the mqtt!!!");
        this.isOnline = false;
        this.messageCache = [];
        this.callbacks = new Map();
        this.receiveClient = this.getReceiveConnect();
        this.sendClient  = this.getSendClient();

    }
    getReceiveConnect(){
        let that = this;
        let options ={
            clientId: 'MQTT_Client_DeployPoint_' + Math.random().toString(16).substr(2, 8),
            reconnectPeriod: 1000,
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: false,
        
        };
        let client = mqtt.connect(MQTT_HOST,options);
        client.on('connect', function (){
            console.log("connected,client_id:" + options.clientId);
            //that.isOnline = true;
            that.callbacks.forEach(function (value, key) {
                if ((key) && (isString(key))) {
                    that.receiveClient.subscribe(key, { qos: 1 }, function () {
                        console.log("successful to  subscribe " + key);
                    });
                }
            });
           

        });

        client.on('message', function (topic, message) {
            // console.log("**************** Received mqtt data topic:" + topic + "******************");
            // console.log("message:" + message.toString());
            // console.log("**************** The end of receiving mqtt data ******************");
            that.handleRecievedMsg(topic, message);

        });
        client.on('offline',function(){
            that.isOnline = false;
            console.log('offline');
        })
        client.on('packetsend',function(){
            console.log('packetsend');
        })
        client.on('error',function(error){
            console.log(error);
        })
        client.on('disconnect',function(packtet){
            console.log(packtet);
        })

        return client;
    }
    getSendClient(){
      
            let that = this;
            //this.callbacks = new Map();
            let options ={
                clientId: 'MQTT_Client_DeployPoint_' + Math.random().toString(16).substr(2, 8),
                reconnectPeriod: 1000,
                protocolId: 'MQTT',
                protocolVersion: 4,
                clean: false,
            
            };
            let client = mqtt.connect(MQTT_HOST,options);
            client.on('connect', function (){
                console.log(" send connected,client_id:" + options.clientId);
               
               
                const cacheSize = that.messageCache.length;
                for (var i=0; i < cacheSize; i++){
                    let item = that.messageCache.shift();
                    that.sendMsg(item.topic,item.msg);
                }
    
            });
    
            client.on('message', function (topic, message) {
                // console.log("**************** Received mqtt data topic:" + topic + "******************");
                // console.log("**************** The end of receiving mqtt data ******************");
                that.handleRecievedMsg(topic, message);
    
            });
            client.on('offline',function(){
                that.isSendOnline = false;
                console.log('Send offline');
            })
            client.on('packetsend',function(){
                console.log('Send of packetsend');
            })
            client.on('error',function(error){
                console.log(error);
            })
            client.on('disconnect',function(packtet){
                console.log("Send of disconnect",packtet);
            })
       return client;
    }
    handleRecievedMsg(topic,data){
        let beHanled = false;
        let fromTopic = topic;
        //console.log(data);
        let resultData = this.dealWithReceivedData(data);
        let callback = null;
        
        this.callbacks.forEach(function (value, key) {
            
            let pureTopic = key;
            if (key.lastIndexOf('#') >= 0) {
                pureTopic = key.substring(0, key.lastIndexOf('#'));
                if (fromTopic.indexOf(pureTopic) == 0) {
                    callback = value;
                    if ((callback) && (callback instanceof Function)) {
                        callback(fromTopic,resultData);
                    } else {
                        console.log("<==No logic to deal with the recieved data==>");
                        console.log(resultData);
                        console.log("<=================+The End+==================>");
                    }
                    beHanled = true;
                }

            } else if (topic.lastIndexOf('+') >= 0) {
                pureTopic = key.substring(0, key.lastIndexOf('+'));
                if (fromTopic.indexOf(pureTopic) == 0) {
                    callback = value;
                    if ((callback) && (callback instanceof Function)) {
                        callback(resultData);
                    } else {
                        console.log("<==No logic to deal with the recieved data==>");
                        console.log(resultData);
                        console.log("<=================+The End+==================>");
                    }
                    beHanled = true;
                }
            } else if (fromTopic === key) {
                callback = value;
                if ((callback) && (callback instanceof Function)) {
                    callback(fromTopic,resultData);
                } else {
                    console.log("<==No logic to deal with the recieved data==>");
                    console.log(resultData);
                    console.log("<=================+The End+==================>");
                }
                beHanled = true;
            }

        });
        if (!beHanled){
            console.log('Topic is not handled! topic is ' +  topic)
        }
    }
    dealWithReceivedData(data){
        let finalData = null;
        try {
            if (!isString(data)) {
                //finalData = msgpack.decode(data);
                finalData = JSON.parse(data);
            } else {
                finalData = data;
            }
        } catch (exception) {
            console.log('failed to parse message data');
            finalData = data;
        }
        return finalData;
    }
    onConnect(callback) {
        this.onConnect = callback;
    }
    setCallback(topic, callback){
        this.callbacks.set(topic, callback);
    }
    sendMsg(topic, data){
        try{
            if (!this.sendClient.connected) {
                console.log('mqtt is not yet readay!');
                this.messageCache.push({topic:topic,msg:data});
                return;
            }
            if (isString(data)) {
                this.sendClient.publish(topic, data,{qos:1});
            } else {
               
                let strMsg = JSON.stringify(data);
                this.sendClient.publish(topic, strMsg,{qos:1});
            }
        }catch(exception ){
            console.log('failed to send message!!!');
        }
        console.log('successful send message! topic:'  + topic)

    }
}

let messageCenter = new MessageCenter();
module.exports = messageCenter;



