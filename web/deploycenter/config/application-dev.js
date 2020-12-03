

module.exports =  {
    envName:'DEV',
    application:
    {
        name:"deploycenter",
        contextPath: '/xcoder',
    },
    servers:
    {
        soaServer: 'http://localhost:8888',
        mqttServer : 'mqtt://localhost:8083/mqtt',
        resourceServer: 'http://localhost:8888/simple/deployment/media/uploadImage',
    },
    repositories:
    {
        dockerRepo : 'registry.cn-hangzhou.aliyuncs.com/windwithlife/',
    }
  
}