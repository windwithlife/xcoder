
var envhelper  = require('./envhelper');
class CodeTools{
    constructor(){
        
    }
    isDebug(){
        const dev = process.env.NODE_ENV !== 'production';
        return dev;
    }
    firstUpperCase(str) {
        //return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
        if(!str){return ''}
        var strResult = str.substring(0,1).toUpperCase()+str.substring(1);
        return strResult;
    }
    debugLog(message){
        if(!envhelper.isDebug){return;}
        console.log(message);
        
    }
    
}

module.exports = new CodeTools();




