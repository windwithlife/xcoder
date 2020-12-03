import {Network} from '../../../store/Network';
const network = new Network("simple/deployment/");
network.switchDevServerHost("localhost:8888");


export default class ApplicationModel{
    constructor() {  
        this.dataObject ={};
    }
  
    queryAll = (callback) =>{
        return network.fetch_get("deploymentconfig/findAll", {}).then(function (result) {
            console.log(result);
            if(callback && result && callback instanceof Function){
                callback(result);
            }
            return result;
        });
    }
    queryById = (id,callback) =>{
        return network.fetch_get("deploymentconfig/findById", {id:id}).then(function (result) {
            console.log(result);
            if(callback && result && callback instanceof Function){
                callback(result);
            }
            return result;
        });
    }
    queryByProjectId = (id,callback) =>{
        return network.fetch_get("deploymentconfig/getByProjectId", {id:id}).then(function (result) {
            console.log(result);
            if(callback && result && callback instanceof Function){
                callback(result);
            }
            return result;
        });
    }
    

    add = (values,callback) =>{
        return network.fetch_post("deploymentconfig/save", values).then(function (result) {
            if(callback && result && callback instanceof Function){
                console.log(result);
                callback(result);
            }
            return result;
        });
    }

    update = (values,callback) =>{
        return network.fetch_post("deploymentconfig/update", values).then(function (result) {
            if(callback && result && callback instanceof Function){
                console.log(result);
                callback(result);
            }
            return result;
        });
    }


}



