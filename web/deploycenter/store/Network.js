import axios from "axios";
import config from "../utils/page-config";
const isServer = typeof window == 'undefined';

var soaPrefix = config.SOA_GATE.schema + '://' + config.SOA_GATE.host + ':' + config.SOA_GATE.port + '/' ;
console.log(" current SOA Gateway:========" + soaPrefix );

console.log("soa server-------",soaPrefix);
const checkStatus = response => {
    console.log("check status");
    if (response.status >= 200 && response.status < 300) {
        return response
    } else if (response.status == 401 || response.status == 403) {
        return response
    } else {
        var error = new Error((response && response.statusText) || 'text')
        error.response = response
        throw error
    }
}
function dealToken(result) {
    console.log("dealToken");
    console.log(result);
    
    let statusCode = result.status;
    if (statusCode == 401 || statusCode == 403) {
        if (!isServer) doHref();
        return result.data;
    }
    if ((statusCode) && (statusCode == 200)) {
        if (!isServer) {
            //let token = result.headers.token;
            let token = result.data.token;
            localStorage.setItem('token', token);
        }
        //if (location.pathname == `${baseUrl}/index`) doHref('lecture_setting'); //首页登录成功处理
        return result.data;

    }

    return result.data;

}

export async function invoke_post(url, params = {}) {
    try {
        //Loading.show();
        let urlPrefix = 'https://soagateway.e-healthcare.net/meeting-server/pc/'
        axios.defaults.withCredentials = true;
        axios.defaults.crossDomain = true;
        let token = localStorage.getItem('token');
        let result = await axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: `${urlPrefix}${url}`,
            data: { platType: 4, category: 1, version: 1, platForm: "web", token, data: params }
        }).then(checkStatus).then(dealToken)
        //Loading.hide();
        return result;
    } catch (error) {
        Loading.hide();
        console.error('---invoke_post_error---: ', error);
        throw error;
    }
}

export async function uploadFile(file) {
    try {
        //Loading.show();
        let formData = new FormData();
        let token = localStorage.getItem('token');
        let json = { token, platType: 4, category: 1, version: 1, platForm: "web" };
        formData.append('json', JSON.stringify(json))
        formData.append('file', file);
        let result = await axios.post('http://images.e-healthcare.net/meeting-server/uploadService/uploadImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(checkStatus).then(dealToken)
        //Loading.hide();
        return result;
    } catch (error) {
        Loading.hide();
        console.error('---invoke_uploadFile_error---: ', error);
        throw error;
    }
}


export class Network {
    constructor(applicationName){
        if(applicationName){this.applicationName = applicationName;}
        if(config.SOA_GATE.port){
            this.host = config.SOA_GATE.host + ':' + config.SOA_GATE.port;
        }else{
            this.host = config.SOA_GATE.host;
        }
        
    }

    composeBaseUrl(path, useApplicationName){
        let finalUrl = config.SOA_GATE.schema + '://' + this.host + '/';
        if((useApplicationName) && this.applicationName){
            finalUrl = finalUrl +  '/' + this.applicationName + path;  
        }else{
            finalUrl = finalUrl + path;
        }
        return  finalUrl;
        
    }
    switchDevServerHost(newHost){
       if(config.ENV_NAME === "DEV"){
            this.host = newHost;
       }
    }
    async fetch_post(url, params = {}) {
        try {
            //Loading.show();
            const fullUrl = this.composeBaseUrl(url, true);
            axios.defaults.withCredentials = true;
            axios.defaults.crossDomain = true;
            let token = localStorage.getItem('token');
            let result = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: 'post',
                //url: `${soaPrefix}${url}`,
                url: fullUrl,
                data: { head: { version: 1, systemCode: "1", deviceType: "1" }, params: params }
            }).then(checkStatus).then(dealToken)
            //Loading.hide();
            return result;
        } catch (error) {
            //Loading.hide();
            console.error('---invoke_post_error---: ', error);
            throw error;
        }
    }
    async fetch_get(url, params = {}) {
        try {
            //Loading.show();
            const fullUrl = this.composeBaseUrl(url, true);
            axios.defaults.withCredentials = true;
            axios.defaults.crossDomain = true;
            let token = localStorage.getItem('token');
            params.version = 1;
            params.systemCode = "1";
            params.deviceType = "1";
            let result = await axios({
                headers: {
                    'token': token
                },
                method: 'get',
                //url: `${soaPrefix}${url}`,
                url: fullUrl,
                params: params,
            }).then(checkStatus).then(dealToken)
            //Loading.hide();
            return result;
        } catch (error) {
            //Loading.hide();
            console.error('---invoke_post_error---: ', error);
            throw error;
        }
    }

}





export function doHref(path=''){
    location.href = `${location.origin}${baseUrl}/${path}` //首页登录成功处理
}
