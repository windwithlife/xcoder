
var path = require('path');
var fs   = require('fs');

 class ProjectConfig {
    
    ProjectConfig(){
        this.basePackage="com.simple.bz.auto";
        this.apiServer ="127.0.0.1:8080";
        this.sideType ='web';
        this.language = 'js';
        this.framework='nextjs';
        this.platform ='all';
        console.log('init project config');
    }
    initFromSettingParams(setting){
        this.sideType = setting.sideType;
        this.language = setting.language;
        this.framework = setting.framework;
        this.platform  = setting.platform;
        this.projectId = setting.projectId;
        this.projectName = setting.projectName;
    }
    buildProjectParams(){
        return {
            projectName:this.projectName,
            
        }
    }
    
}


module.exports = ProjectConfig;



