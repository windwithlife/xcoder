
const config = require('../utils/server-config');
const mqtt = require('mqtt')
const msgpack = require('msgpack-lite');

//let MQTT_HOST  =  config.MQTT_HOST;
const MQTT_HOST = "mqtt://mq.koudaibook.com:30883/";
const ON_CREATE = "ci/oncreate";


const isString = (data) => {
    return Object.prototype.toString.call(data) === '[object String]';
}



class MessageCenter {
    constructor() {
        console.log("start to initialize the mqtt!!!");
        this.isConnected = false;
        let that = this;
        this.callbacks = new Map();
        this.client = mqtt.connect(MQTT_HOST);
        this.client.on('connect', function (){
            console.log("have connected");
            that.isConnected = true;
            that.callbacks.forEach(function (value, key) {
                if ((key) && (isString(key))) {
                    that.client.subscribe(key, { qos: 1 }, function () {
                        console.log("successful to  subscribe " + key);
                    });
                }
            });
            that.handleRecievedMsg(ON_CREATE, "onCreate");

        });

        that.client.on('message', function (topic, message) {
            console.log("**************** Received mqtt data topic:" + topic + "******************");
            console.log("message:" + message.toString());
            console.log("**************** The end of receiving mqtt data ******************");
            that.handleRecievedMsg(topic, message);

        });

    }
    connect(){
       
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
    onCreate(callback) {
        this.setCallback(ON_CREATE, callback);
    }
    setCallback(topic, callback){
        this.callbacks.set(topic, callback);
    }
    sendMsg(topic, data){
        try{
            if (!this.isConnected) {
                console.log('mqtt is not yet readay!');
                return;
            }
            if (isString(data)) {
                this.client.publish(topic, data);
            } else {
                //let strMsg = JSON.stringify(data);
                //let strMsg = msgpack.encode(data);
                let strMsg = JSON.stringify(data);
                this.client.publish(topic, strMsg);
            }
        }catch(exception ){
            console.log('failed to send message!!!');
        }
        console.log('successful send message! topic:'  + topic)

    }
}

let messageCenter = new MessageCenter();
module.exports = messageCenter;



