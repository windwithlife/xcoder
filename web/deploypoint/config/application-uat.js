

module.exports = {
    envName:'UAT',
    application:
    {
        serviceName: "pointhealth",
        servicePort: 8081,
        groupName: "pointhealth",
        contextPath: '/deploypoint',
    },
    servers:
    {
        soaServer: 'http://soagateway.koudaibook.com',
        mqttServer : 'mqtt://mq.koudaibook.com:30883/',
        resourceServer: 'http://soagateway.koudaibook.com/simple/deployment/media/uploadImage',
    },

    repositories:
    {
        dockerRepo : 'registry.cn-hangzhou.aliyuncs.com/windwithlife/',
    }
  
}