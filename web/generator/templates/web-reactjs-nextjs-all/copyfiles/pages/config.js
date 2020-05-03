var DEV = {SOA_GATE:'http://gateway.koudaibook.com',WEB_GATE:'http://localhost:8080'}
var UAT = {SOA_GATE:'https://service.zhangyongqiao.com:8080'}
var PRODUCTION = {SOA_GATE:'http://gateway.zhangyongqiao.com/coder/',WEB_GATE:'http://gateway.zhangyongqiao.com/coder/'}
var DOCKER = {SOA_GATE:'http://dockerhost:8080'}
module.exports = {
   current: DEV
}



