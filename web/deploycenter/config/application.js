const env={
    DEV:{
        application:{name:"server-center-page",projectName:'simple'},
        servers:{
            soaServer: {schema:"http", host:'localhost',port:9999,path:'/'},
            mqServer: {schema: "ws",host:'mq.koudaibook.com',port:30075,path:'/ws'},
        }
    },
    PROD:{
        application:{name:"server-center-page", projectName:'simple'},
        servers:{
            soaServer: {schema:"http", host:'localhost',port:9999,path:'/'},
            mqServer: {schema: "ws",host:'mq.koudaibook.com',port:30083,path:'/mqtt'},
            
        }
    }
}
module.exports = env;