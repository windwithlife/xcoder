//const PahoMQTT = require('paho-mqtt')

import PahoMQTT from 'paho-mqtt';

import config from '../utils/page-config';

const MQTT_ENDPOINT_PREFIX = "ClientID_";
const MQTT_HOST = config.MQTT_SERVER.host; // 'mq.koudaibook.com';
const MQTT_PORT = config.MQTT_SERVER.port;
const MQTT_PATH = config.MQTT_SERVER.path;





const isString = (data) => {
    return Object.prototype.toString.call(data) === '[object String]';
}

const isServer = typeof window === 'undefined'
console.log("MQTT_HOST:" + MQTT_HOST + MQTT_PORT + MQTT_PATH);

export default class MQTTClient {
    constructor() {
        this.callbacks = new Map();
        this.isConnected = false;
        if (isServer) { return; };
        let that = this;
        const randomString = new Date().getTime();
        const name = MQTT_ENDPOINT_PREFIX + randomString;
        console.log('**********client id:*********' + name);
        this.client = new PahoMQTT.Client(MQTT_HOST, MQTT_PORT, MQTT_PATH, name)   // 服务器地址以及端口号
        this.client.onConnectionLost = this.onConnectionLost;//onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived; //onMessageArrived;


        let timeout = 15;
        let keepAlive = 10;
        var options = {
            invocationContext: {
                host: MQTT_HOST,
                port: 30083,
                path: that.client.path,
                clientId: name,
            },
            timeout: timeout,
            keepAliveInterval: keepAlive,
            cleanSession: false,
            useSSL: false,
            onSuccess: that.onConnect,
            onFailure: function (e) {
                console.log(e);
                s = "{time:" + new Date().Format("yyyy-MM-dd hh:mm:ss") + ", onFailure()}";
                console.log(s);
            }
        };

        this.client.connect(options);
    }

    onConnect = () => {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        let that = this;
        this.isConnected = true;
        this.callbacks.forEach(function (value, key) {
            //console.log("key" + key);
            if (isString(key)) {
                that.client.subscribe(key);
                console.log('subscribe the topic: ---' + key);
            } else {
                console.log("invalid key:" + key);
            }

        })


    }
    // called when the client loses its connection
    setSubscribe(topic, callback) {
        this.callbacks.set(topic, callback);
        if (this.isConnected) {
            this.client.subscribe(topic);
            console.log('subscribe the topic: ---' + topic);
        }

    }
    onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }
    onMessageArrived = (message) => {
        let that = this;
        let fromTopic = message.destinationName;
        console.log("Received message  ===>" + fromTopic);
        console.log("Received message payload ===>" + message.payloadString);
    
        let resultData = this.dealWithReceivedData(message);

        this.callbacks.forEach(function (value, key) {
            //let pureTopic = that.getPureTopic(key);
            if(that.matchTopic(fromTopic, key)){
                let callback = value;
                if ((callback) && (callback instanceof Function)) {
                        try{
                            callback(fromTopic,resultData);
                        }catch(exception){
                            console.log("Exception Happened during the dealwith received message!");
                            console.log(exception);
                        }
                       
                } else {
                        console.log("<==No logic to deal with the recieved data==>");
                        console.log(resultData);
                        console.log("<=================+The End+==================>");
                }
            }
           
        });
        //let callback = this.callbacks.get(message.destinationName);

    }
    
    sendMsg = (topic, msg) => {
        let finalData = this.dealWithSendData(msg);
        let messageObj = new PahoMQTT.Message(finalData);
        messageObj.destinationName = topic;
        this.client.send(messageObj);
    }
    dealWithSendData = (message) => {
        let finalMsg = message;
        if (!isString(message)) {
            finalMsg = JSON.stringify(message);
        }
        return finalMsg;
    }
    getPureTopic(topic){
        console.log("ORIGIN TOPIC ==>" + topic);
        let pureTopic = "";
        if (topic.lastIndexOf('#') >= 0) {
            pureTopic = topic.substring(0, topic.lastIndexOf('#'));
        } else if (topic.lastIndexOf('+') >= 0) {
            pureTopic = topic.substring(0, topic.lastIndexOf('+'));
        }else{
            pureTopic = topic;
        }
        console.log("PURE TOPIC ==>" + pureTopic);
        return pureTopic;

    }
    matchTopic(fromTopic, topic){
        let keyTopic = this.getPureTopic(topic);
        if (fromTopic.indexOf(keyTopic) == 0) {
            return true;
        }else{
            return false;
        }
    }
    dealWithReceivedData = (message) => {
        let dataObj = message.payloadString;
        try {
            
            dataObj = JSON.parse(message.payloadString);
        } catch (exception) {
            console.log('failed to parse the string');
            dataObj = message.payloadString;
        }

        return dataObj;
    }

}
