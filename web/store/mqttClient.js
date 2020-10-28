//const PahoMQTT = require('paho-mqtt')
import PahoMQTT from 'paho-mqtt';

const MQTT_CI_TOPIC = 'ci/release/#';
const randomString = new Date().getTime();
const name = 'client_' + randomString;



const client = new PahoMQTT.Client('192.168.1.61', 1884, name)   // 服务器地址以及端口号

// client.connect({

//   onSuccess: function (res) {

//     client.subscribe(MQTT_CI_TOPIC) // 订阅频道

//   }

// })

//client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(MQTT_CI_TOPIC);
  sendMsg('ci/release/test', "Hello");
}
const isString = (data) => {
	return Object.prototype.toString.call(data) === '[object String]';
}
function sendMsg(topic, msg){
    let finalMsg =msg;
    if (!isString(message)){
        finalMsg = JSON.stringify(msg);
    }
    let messageObj = new Paho.MQTT.Message(finalMsg);
    messageObj.destinationName = topic;
    client.send(messageObj);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}



class MQTTClient {
  constructor() {
      if (moduleName){
          this.model = new BaseModel(moduleName);
          this._modelname = moduleName;
      }
  }
}

export default BaseStore;