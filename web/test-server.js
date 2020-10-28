

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://mq.koudaibook.com:31883/')

//var messageClient = require('./ci/libs/message_client');

client.on('connect', function () {
  console.log("connected!");
  client.subscribe('ci/release/#', function (err) {
    if (!err) {
      client.publish('ci/release/test', 'Hello mqtt');
      console.log("published message~");
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log("received data:"+message.toString())
  //client.end()// close clint
})

//messageClient.sendLogs("testlog");
console.log("starting to register mq");
