
var axios = require('axios');
var get = function(path, params, cb){
    axios.get(path, {params:params}).then(function (response) {
        if (response.status ==200){
            cb(response);
        }else{
            console.log("Error Message:" + response.data);
            cb();
        }

    }).catch(function (error) {
        console.log(error);
            cb();
    });
}
var post = function(path,params,cb){
    console.log("params in axios:"+JSON.stringify(params));
    axios.post(path, params).then(function (response) {
           cb(response);
        })
        .catch(function (error) {
            console.log(error);
            cb();
        });
}

module.exports = {
    get:get,
    post:post
}