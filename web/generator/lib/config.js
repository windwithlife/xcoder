
var path = require('path');
var fs   = require('fs');



var config = {
    appName : "",
    module: "",
    platform:"mobile",
    sideName:"frontend",
    workRootPath: process.cwd(),
    targetRootPath:process.cwd(),
    language : "reactjs",
    framework:"simple",
    basePackage:"com.simple.base.bz",
    apiServer:"127.0.0.1",
    defines:null,
    //当前工作目录下的模块定义目录
    workModulesPath: function(){return path.join(this.workRootPath , "modules/")},
    //当前工作目录下的模板目录
    workTemplateRootPath:  function(){return path.join(this.workRootPath,"generator/templates/");},
    templatePath: function(){return this.workTemplateRootPath()  + this.sideName + "/" + this.language + "/";},
    workCopyFilesTemplatePath:function() {return this.templatePath() +  "copyfiles/"},
    workReleasePackageTemplatePath:function() {return path.join(this.templatePath() ,"release/");},
    workFrameworkTemplatePath:function() {return path.join(this.workCopyFilesTemplatePath() ,this.platform);},




    workConfigTemplatePath:function(){return this.templatePath() + "config/"},
    workRouterTemplatePath:function(){return path.join(this.templatePath() , "router/");},
    workViewTemplatePath:function(){return path.join(this.templatePath() ,"view/",this.endName,"/");},
    workControllerTemplatePath:function(){return path.join(this.templatePath() ,"controller",this.platform, "/");},
    workModelTemplatePath:function(){return this.templatePath() + "model/"},
    workReduxTemplatePath:function(){return path.join(this.templatePath() , "redux/");},
    //workLayoutTemplatePath:function(){return this.templatePath() + "layout/"},

    //代码生成目标目录---网站基本目录
    targetWebRootPath:function(){return path.join(this.targetRootPath, "/")},
    targetWebResourceRootPath:function(){return path.join(this.targetWebRootPath(), "src/");},
    targetWebResourceCommonPath:function(){return path.join(this.targetWebResourceRootPath(), "common/");},
    //代码生成目标目录---每个模块目录
    targetModuleRootPath:function(){return path.join(this.targetWebResourceRootPath(),this.module);},
    targetModuleModelPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/models/");},
    targetModuleRouterPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/");},
    targetModuleConfigPath:function(){return path.join(this.targetWebResourceRootPath(),this.module + "/");},
    targetModuleViewTemplatePath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/templates/");},
    targetModuleControllerPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/");},
    targetModuleComponentsPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/components/");},
    targetModuleReduxPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/redux/");},

    buildBaseParams: function(){
        return {
            appName: this.appName,
            endName: this.endName,
            moduleName:this.module,
            apiServer:this.apiServer,
        };
    }
};



module.exports= config;


