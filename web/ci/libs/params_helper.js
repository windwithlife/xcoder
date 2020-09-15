
var path = require('path');
var fs = require('fs');
const low = require('lowdb');
var codeTools = require('./code_tools');
const FileSync = require('lowdb/adapters/FileSync');  // 有多种适配器可选择
const adapter = new FileSync('route.json');
const db = low(adapter);

class ParamsHelper {

    initDatabase() {
        db.defaults({ 'routetable': [] }).write();
    }

    constructor() {
        this.initDatabase();
        this.sideType = 'web';
        this.language = 'js';
        this.framework = 'nextjs';
        this.gateway = 'gateway.koudaibook.com';
        this.website = 'www.koudaibook.com';
        this.hostName = this.gateway;

        console.log('init project config')


    }

    init(setting) {
        this.applicationType = setting.applicationType;
        this.sideType = setting.sideType;
        this.language = setting.language;
        this.framework = setting.framework;
        this.platform = setting.platform;
        this.isCommonLib    = setting.isLib;
        this.name = setting.name;
        this.path = setting.path;
        this.applicationName = setting.applicationName;
        this.version = setting.version;
        this.label = setting.version;
        this.setting = setting;
        this.takeOwnDeploymentFile = setting.useOwnDeploymentFile;
        this.takeOwnDockerFile = setting.useOwnDockerFile;
        if (setting.domainName){
            this.gateway = setting.domainName;
            this.website = setting.domainName; 
        }
        
        //check path
        if(this.path.substring(0,1) != '/'){this.path = "/" + this.path;}
    }

    addRouteRecord(host,path, serviceName) {
        let data = db.read().get('routetable').find({path:path,host:host}).value();
        if (data){
            db.read().get('routetable').remove({path:path,host:host}).write();
        }
        db.get('routetable')
            .push({ host: host, path: path, serviceName: serviceName })
            .write()
    }
    updateRoute(){
        let host = this.gateway;
        if(this.sideType=='web'){
            host=this.website;
        }
        this.hostName = host;
        this.addRouteRecord(host,this.path,this.serviceName());
    }
    getRoutes() {
        let host = this.gateway;
        if(this.sideType=='web'){
            host=this.website;
        }
        let data = db.read().get('routetable').filter({ host: host }).value();
        console.log(data);
        return data;
    }
    buildGenericParams() {
        if(this.path.substring(0,1) != '/'){this.path = "/" + this.path;}
        let params = {
            projectId: this.projectId,
            projectName: this.projectName,
            name: this.name,
            sideType: this.sideType,
            framework: this.framework,
            language: this.language,
            label: this.setting.version,
            version: this.setting.version,
            gateway: this.gateway,
            webDomain: this.website,
            path: this.path,
            isCommonLib: this.isCommonLib,

        }
        params.deploymentName = this.applicationName + "-deployment";
        params.applicationName = this.applicationName + "-app";
        let gatewayName = this.hostName + "-gateway";
        let certName =this.hostName + "-cert";
        let vServiceName = this.hostName + "-vservice";
        params.gatewayConfigName = gatewayName.replace(/\./g,'-');
        params.vServiceConfigName = vServiceName.replace(/\./g,'-');
        params.certConfigName = certName.replace(/\./g,'-');

        params.imageName = this.imageName();
        params.serviceName = this.serviceName();
        params.ingressName = this.applicationName + "-ingress";
        params.applicationPath = this.path;
        params.routes = this.getRoutes();
        return params;
    }


    buildParamsForDeployment(templateName) {

        let params = this.buildGenericParams();
        return params;

    }
    dockerfile() {

        let dockerfile = "Dockerfile-" + this.language + "-" + this.sideType + ".single";
        //checkPath(pathName);
        return dockerfile;
    }

    imageName() {
        let imageName = 'a/b:1.0.1';
        imageName = this.applicationName + "-" + this.sideType + ":" + this.label;
        console.log('imageName is ....................' + imageName);

        return imageName;
    }
    serviceName(){
        let name = this.applicationName + "-" + this.sideType;
        return name;
    }
    templatefile() {
        if ('cinode' == this.sideType){
            return 'xcoder-web.yaml';
        }else{
            return this.sideType + ".yaml";
        }
        
    }
    deploymentfile() {
        return this.language + "-" + this.sideType + "-" + this.applicationName + "-" + this.version + ".yaml";
    }

    useOwnDepolymentFile() {
        if ((this.takeOwnDeploymentFile) && (this.takeOwnDeploymentFile > 0)) {
            return true;
        } else {
            return false;
        }

    }
    useOwnDockerFile() {
        if ((this.takeOwnDockerFile) && (this.takeOwnDockerFile > 0)) {
            return true;
        } else {
            return false;
        }
    }
    isLib() {
        if ((this.isCommonLib) && (this.isCommonLib == 1)) {
            return true;
        } else {
            return false;
        }
    }
    isScript() {
        if ((this.applicationType) && ('script' == this.applicationType)) {
            return true;
        } else {
            return false;
        }
    }
    isK8s() {
        if ((this.applicationType) && ('k8s' == this.applicationType)) {
            return true;
        } else {
            return false;
        }
    }
    isServer() {
        if (('web' == this.sideType)||('server' == this.sideType)||('cinode' == this.sideType)) {
            return true;
        } else {
            return false;
        }
    }
   
    isJavaServer() {
        if ((this.language) && ('java' == this.language)) {
            return true;
        } else {
            return false;
        }
    }

    isNodeJS() {
        if ((this.language) && ('nodejs' == this.language)) {
            return true;
        } else {
            return false;
        }
    }

}


module.exports = ParamsHelper;



