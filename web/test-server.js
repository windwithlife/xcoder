

 var mqtt = require('mqtt')
 var client  = mqtt.connect('mqtt:mq.koudaibook.com:31883/')



client.on('connect', function () {
  console.log("connected!");
  client.subscribe('topic_0001', function (err) {
    if (!err) {
      client.publish('topic_0001', 'Hello mqtt');
      console.log("published message~");
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log("received data:"+message.toString())
  //client.end()// close clint
})
// messageClient.onCreate(function(){
//   messageClient.sendLogs({status:"started...."});
// });
console.log("starting to register mq");

//var messageClient = require('./ci/libs/message_client');
