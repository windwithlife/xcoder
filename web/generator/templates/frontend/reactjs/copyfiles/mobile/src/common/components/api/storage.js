

var set = function(key, params){
    if (!window.localStorage){return;}
    var storage=window.localStorage;
    var value =JSON.stringify(params);
    storage.setItem(key,value);

}
var get = function(key){
    if (!window.localStorage){return null;}
    var storage=window.localStorage;

    var json=storage.getItem(key);
    var jsonObj=JSON.parse(json);
    console.log(typeof jsonObj);
    return jsonObj;
}
var remove = function(key){
    if (!window.localStorage){return;}
    var storage=window.localStorage;
    storage.removeItem(key);
    //return jsonObj;
}

module.exports = {
    "get":get,
    "set":set,
    "remove":remove,
}