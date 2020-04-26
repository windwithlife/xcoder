import store from './storage.js';
import modelCommon from "../models/modelCommon.js"

var model = new modelCommon("user");

var isLogin = function(){
   var author = store.get("auth");
    if (author){
        return true;
    }else{
        return false;
    }

}
var getUserInfo = function(callback){
    var author = store.get("auth");
    if (author){
        callback(author);
    }else{
        model.query("getUserInfo",{},function(response){
            if (response && response.data){
                store.set("auth",response.data);
                callback(response.data)
            };
        })
    }
}
var remove = function(key){
    if (!window.localStorage){return;}
    var storage=window.localStorage;
    storage.removeItem(key);
    //return jsonObj;
}

module.exports = {
    isLogin:isLogin,
    getUserInfo:getUserInfo
}