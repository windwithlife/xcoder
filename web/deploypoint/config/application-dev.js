

module.exports = {
    envName:'DEV',
    application:
    {
        serviceName: "pointhealth",
        servicePort: 8081,
        groupName: "pointhealth",
        contextPath: '/deploypoint',
    },
    servers:
    {
        soaServer: 'http://localhost:8888',
        mqttServer : 'mqtt://mq.koudaibook.com:30883/',
        resourceServer: 'http://localhost:8888/simple/deployment/media/uploadImage',
    },
    repositories:
    {
        dockerRepo : 'registry.cn-hangzhou.aliyuncs.com/windwithlife/',
    }
  
}