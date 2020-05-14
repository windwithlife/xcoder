
var axios = require('axios');
var get = function(path, params, cb){
    axios.get(path, {params:params}).then(function (response) {
        if (response.status ==200){
            if(cb){cb(response)};
        }else{
            console.log("Error Message:" + response.data);
            if(cb){ cb(response.data);}
           
        }

    }).catch(function (error) {
        console.log(error);
        if(cb){cb(error);}
            
    });
}
var post = function(path,params,cb){
    //console.log("params in axios:"+JSON.stringify(params));
    axios.post(path, params).then(function (response) {
            if(cb){cb(response);}
           
        })
        .catch(function (error) {
            console.log(error);
            if(cb){cb(error);}
            
        });
}

module.exports = {
    get:get,
    post:post
}