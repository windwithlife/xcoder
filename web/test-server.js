

// var mqtt = require('mqtt')
// var client  = mqtt.connect('ws://mq.koudaibook.com:30075/ws')

var messageClient = require('./ci/libs/message_client');

// client.on('connect', function () {
//   console.log("connected!");
//   client.subscribe('topic_0001', function (err) {
//     if (!err) {
//       client.publish('topic_0001', 'Hello mqtt');
//       console.log("published message~");
//     }
//   })
// })
 
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log("received data:"+message.toString())
//   //client.end()// close clint
// })
messageClient.sendLogs("testlog");
console.log("starting to register mq");
