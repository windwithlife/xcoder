
var path = require('path');
var fs = require('fs');

class ProjectConfig {

    constructor() {
        this.basePackage = "com.simple.bz.auto";
        this.apiServer = "127.0.0.1:8080";
        this.sideType = 'web';
        this.language = 'js';
        this.framework = 'nextjs';
        this.platform = 'all';
        console.log('init project config');
    }
    initFromSettingParams(setting) {
        this.sideType = setting.sideType;
        this.language = setting.language;
        this.framework = setting.framework;
        this.platform = setting.platform;
        this.projectId = setting.projectId;
        this.projectName = setting.projectName;
        this.nickname = setting.typeNickname;
        this.codePath = setting.codePath;
        this.path     = setting.path;
        this.name = setting.name;
    }
    getCodePath(){
        if (!this.codePath){return this.name;}
        return this.codePath;
    }
    
    getAppNickname() {

        if (this.nickname) { return this.nickname; }
        let appNickname = this.sideType + '-' + this.language;

        let frameworkname = this.framework;
        if ((!this.framework) || (this.framework == '-1')) {
            frameworkname = "none";
        }
        appNickname = appNickname + "-" + frameworkname;
        console.log(appNickname);
        return appNickname;
    }

}


module.exports = ProjectConfig;



