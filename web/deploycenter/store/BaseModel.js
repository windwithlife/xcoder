import {Network} from './Network';

export default class BaseModel{
    constructor(moduleName){  
        this.dataObject = new Object();
        if(moduleName){
            this.moduleName = moduleName;
            this.network = new Network();
        }else{
            this.moduleName = '';
            this.network = new Network();
        }
        //support dev test
        this.setDevServerHost("localhost:8888");
    }
    setDevServerHost(host){
        this.network.switchDevServerHost(host);
    }
    composeUrl = (url)=>{
        let finalPath = this.moduleName + url;
        return finalPath;
    }
    post=(url, params,callback)=>{
        let path = this.composeUrl(url);
        return this.fetch_post(path, params,callback);
    }
    get=(url, params,callback)=>{
        let path = this.composeUrl(url);
        return this.fetch_get(path,params,callback);
    }
    fetch_post=(url, params, callback)=>{
        return this.network.fetch_post(url, params).then(function (result) {
            console.log(result);
            if(callback && result && callback instanceof Function){
                callback(result);
            }
            return result;
        });
    }
    fetch_get=(url, params,callback)=>{
        return this.network.fetch_get(url, params).then(function (result) {
            console.log(result);
            if(callback && result && callback instanceof Function){
                callback(result);
            }
            return result;
        });
    }
    
    findAll(callback){
        return this.get('/findAll', {}, callback);
    }
    queryAll(callback){
        return this.get('/findAll', {}, callback);
    }
    findById (id,callback){
        return this.get('/findById', {id:id}, callback);
    }
    queryById (id,callback){
        return this.get('/findById', {id:id}, callback);
    }
    queryByProjectId(id,callback){
        return this.get('/getByProjectId', {id:id}, callback);
    }
    
    add(values,callback){
        return this.post('/save', values, callback);
    }

    update(values,callback){
        return this.post('/update/' + values.id, values, callback);
    }
    removeById(id,callback){
        let params ={id:id};
        return this.post('/remove/' + id, params, callback);
    }
    // deleteById(id,callback){
    //     let params ={id:id};
    //     return this.post('/removeById' + id, params, callback);
    // }

}



