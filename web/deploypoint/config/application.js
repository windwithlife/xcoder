const env={
    DEV:{
        servers:{
            soaServer: {schema:"http", host:'localhost',port:9999,path:'/'},
            mqServer: {schema: "ws",host:'mq.koudaibook.com',port:30083,path:'/mqtt'},
        }
    },
    PROD:{
        servers:{
            soaServer: {schema:"http", host:'localhost',port:9999,path:'/'},
            mqServer: {schema: "ws",host:'mq.koudaibook.com',port:30083,path:'/mqtt'},
            
        }
    }
}
module.exports = env;