
var path = require('path');
var fs   = require('fs');
var codeTools = require('./code_tools');

 class ParamsHelper {
    
    constructor(){
        this.sideType ='web';
        this.language = 'js';
        this.framework='nextjs';
        this.gateway='gateway.koudaibook.com';
     
        console.log('init project config');
    }
  
    init(setting){
        this.sideType = setting.sideType;
        this.language = setting.language;
        this.framework = setting.framework;
        this.platform  = setting.platform;
        this.name = setting.name;
        this.path = setting.path;
        this.applicationName = setting.applicationName;
        this.version = setting.version;
        this.label = setting.version;
        this.setting = setting;
        this.isUseOwnDeploymentFile = setting.isUseOwnDeploymentFile;
        this.isUseOwnDockerFile = setting.isUseOwnDockerFile;
    }
    buildGenericParams(){
       
        let params = {
            projectId:this.projectId,
            projectName:this.projectName, 
            name: this.name,
            sideType:this.sideType,
            framework:this.framework,
            language:this.language,
            label:this.setting.version,
            version:this.setting.version,
            gateway:this.gateway,
            
        }
        params.deploymentName = this.applicationName + "-deployment";
        params.applicationName = this.applicationName + "-app";
        params.imageName = this.imageName();
        params.serviceName = this.applicationName + "-" + params.sideType;
        params.ingressName = this.applicationName + "-ingress";
        params.applicationPath = this.path;
        return params;
    }


    buildParamsForDeployment(templateName){

        let params = this.buildGenericParams();
        return params;

    }
    dockerfile(){
       
        let dockerfile  = "Dockerfile-" + this.language + "-" + this.sideType + ".multi";
        //checkPath(pathName);
        return dockerfile;
    }

    imageName(){
        let imageName  = 'a/b:1.0.1';
        imageName =  this.applicationName +"-" + this.sideType + ":" + this.label;
        console.log('imageName is ....................' + imageName);
       
        return imageName;
    }
    templatefile(){
        return this.language+"-" + this.sideType + ".yaml";
    }
    deploymentfile(){
       return  this.language + "-" + this.sideType + "-" + this.version +".yaml";
    }

    useOwnDepolymentFile(){
        if((this.isUseOwnDeploymentFile)&&(true == this.isUseOwnDeploymentFile)){
            return true;
        }else{
            return false;
        }

    }
    useOwnDockerFile(){
        if ((this.isUseOwnDockerFile)&&(true==this.isUseOwnDockerFile)){
            return true;
        }else{
            return false;
        }      
    }
   

}


module.exports = ParamsHelper;



