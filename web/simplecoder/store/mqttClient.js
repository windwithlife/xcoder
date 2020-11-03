//const PahoMQTT = require('paho-mqtt')
import PahoMQTT from 'paho-mqtt';
const MQTT_HOST = 'mq.koudaibook.com';
const MQTT_CI_TOPIC = 'ci/release/test';
const MQTT_TOPIC_LOG = 'ci/release/logs';
const MQTT_TOPIC_STATUS = 'ci/release/status';
const MQTT_TOPIC_EXECUTE ='ci/release/execute';

// called when the client connects

const isString = (data) => {
    return Object.prototype.toString.call(data) === '[object String]';
}

const isServer = typeof window === 'undefined'
            

export default class MQTTClient {
    constructor() {
        if (isServer){return;};
        let that = this;
        const randomString = new Date().getTime();
        const name = 'client_' + randomString;
        console.log('**********client id:*********' + name);
        this.client = new PahoMQTT.Client(MQTT_HOST,30083,'/mqtt',name)   // 服务器地址以及端口号
        this.client.onConnectionLost = this.onConnectionLost;//onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived; //onMessageArrived;

        // connect the client
        let timeout = 5;
        let keepAlive = 100;
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

    onConnect=()=>{
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        this.client.subscribe(MQTT_CI_TOPIC);
        //sendMsg('ci/release/test', "Hello");
    }
    // called when the client loses its connection
    onConnectionLost=(responseObject)=>{
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
            //this.client.connect({ onSuccess: onConnect });
        }
    }
    onMessageArrived=(message)=>{
        console.log("onMessageArrived:" + message.payloadString);
    }
    sendMsg=(topic, msg)=>{
        let finalMsg = msg;
        if (!isString(message)) {
            finalMsg = JSON.stringify(msg);
        }
        let messageObj = new Paho.MQTT.Message(finalMsg);
        messageObj.destinationName = topic;
        this.client.send(messageObj);
    }

}
