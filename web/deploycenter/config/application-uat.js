

module.exports =  {
    envName:'UAT',
    application:
    {
        name:"deploycenter",
        contextPath: '/xcoder',
    },
    servers:
    {
        soaServer: 'http://soagateway.koudaibook.com',
        mqttServer : 'mqtt://mq.koudaibook.com:30083/ws',
        resourceServer: 'http://soagateway.koudaibook.com/simple/deployment/media/uploadImage',
    },

    repositories:
    {
        dockerRepo : 'registry.cn-hangzhou.aliyuncs.com/windwithlife/',
    }
  
}