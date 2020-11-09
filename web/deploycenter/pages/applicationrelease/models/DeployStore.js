import {Network} from '../../../store/Network';
import config from '../../../utils/page-config';
console.log(config);

const network = new Network("simple/deployment/");
const testServer = "localhost:9999";
network.switchWebServerHost(testServer);

let Data = {
    
    list:[],
    buildRecord:{},
}

export default class ReleaseStore{
    constructor() {
        this.dataObject = Data;
    }
    deployTo(params, callback){
        return network.fetch_post("mqtt/deploy", params).then(function (result) {
            if(callback && result && callback instanceof Function){
                console.log(result);
                callback(result);
            }
        });
    }

}



