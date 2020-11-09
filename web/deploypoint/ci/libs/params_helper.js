
var path = require('path');
var fs = require('fs');
const low = require('lowdb');
var codeTools = require('./code_tools');
const FileSync = require('lowdb/adapters/FileSync');  // 有多种适配器可选择
const adapter = new FileSync('route.json');
var config = require('../../utils/server-config');

const db = low(adapter);

class ParamsHelper {

    initDatabase() {
        db.defaults({ 'routetable': [] }).write();
    }

    constructor() {
        this.initDatabase();
        this.sideType = 'server';
        this.typeId   = "JavaServer";

        this.framework = 'nextjs';
        this.gateway = 'gateway.koudaibook.com';
        this.website = 'www.koudaibook.com';
        this.hostName = this.gateway;
        this.dockerRepo = config.DOCKER_REPO;
        this.releasePointSupport = "k8s";
        console.log('init application config')


    }

    init(setting) {
        if(!setting.applicationType){ console.log("params is invalid!!!");return;}
        this.applicationType = setting.applicationType;
        this.sideType = this.applicationType.sideType;
        this.typeId = this.applicationType.idName;
        if(this.sideType === "web"){
            if(setting.envType ==="UAT"){
              this.domainName = this.website = setting.projectInfo.domainNameUAT;
            }else{
              this.domainName = this.website = setting.projectInfo.domainName;
            }
            
          }else if(this.sideType==="server"){
            if(setting.envType ==="UAT"){
              this.domainName = this.gateway = setting.projectInfo.gatewayUAT;
            }else{
              this.domainName = this.gateway = setting.projectInfo.gateway;
            }
            
          }

        this.name = setting.name;
        this.path = setting.path;
        this.applicationName = setting.applicationName;
        this.version = setting.version;
        this.label = setting.version;
        this.setting = setting;
        this.takeOwnDeploymentFile = setting.useOwnDeploymentFile;
        this.takeOwnDockerFile = setting.useOwnDockerFile;
        
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
            label: this.setting.version,
            version: this.setting.version,
            gateway: this.gateway,
            webDomain: this.website,
            path: this.path,
            isCommonLib: this.isCommonLib,

        }
        params.deploymentName = this.applicationName + "-"+ this.sideType + "-deployment";
        params.applicationName = this.applicationName + "-app";
        let gatewayName = this.hostName + "-gateway";
        let certName =this.hostName + "-cert";
        let vServiceName = this.hostName + "-vservice";
        let ingressName =this.hostName + "-ingress";
        let configName =this.serviceName() + "-config";
        params.gatewayConfigName = gatewayName.replace(/\./g,'-');
        params.vServiceConfigName = vServiceName.replace(/\./g,'-');
        params.certConfigName = certName.replace(/\./g,'-');
        params.ingressName = ingressName.replace(/\./g,'-');
        params.configName = configName.replace(/\./g,'-');
       
        params.imageName = this.imageNameRepo();
        params.serviceName = this.serviceName();
        
        params.applicationPath = this.path;
        params.routes = this.getRoutes();
        return params;
    }


    buildParamsForDeployment(templateName) {

        let params = this.buildGenericParams();
        return params;

    }
    getTypeId(){
        return this.typeId;
    }
    dockerfile() {

        let dockerfile = "Dockerfile-" + this.getTypeId() +  ".single";
        //checkPath(pathName);
        return dockerfile;
    }

    imageName() {
        let imageName = 'a/b:1.0.1';
        imageName = this.applicationName + "-" + this.sideType + ":" + this.label;
        console.log('imageName is ....................' + imageName);

        return imageName;
    }
    imageNameRepo(){
        return this.dockerRepo + this.imageName();
    }
    serviceName(){
        let name = this.applicationName + "-" + this.sideType;
        return name;
    }
    templatefile() {
        if (this.releasePoint){
            return this.sideType + "-" + this.releasePointSupport +".yaml";
        }else{
            return this.sideType + ".yaml";
        }
        
    }
    deploymentfile() {
            return this.sideType + "-" + this.releasePointSupport +".yaml";
            //return this.language + "-" + this.sideType + "-" + this.applicationName + "-" + this.version + "-" +this.releasePointSupport + ".yaml";
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
    getApplicationType(){
        return this.applicationType;
    }

}


module.exports = ParamsHelper;



