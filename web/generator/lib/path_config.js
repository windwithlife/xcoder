
var path = require('path');
var fs   = require('fs');
require('shelljs/global');


function checkPath(pathName) {
    var isExist = fs.existsSync(pathName);
    if(!isExist){
        mkdir('-p', pathName);
    }  
}

function pathIsReady(pathName) {
    var isExist = fs.existsSync(pathName);
    return isExist;
}
// var codeTools = require('../code_tools');
// var xtools = require('../xtools');
//var PathConfig = require('../path_config');



let TemplateRoot = '/generator/templates/';
let TargetRoot = '../../projects/';
//const DOWNLOAD_PATH = '/tmp/my-uploads/';

 class PathConfig{

   
    constructor(){
        //this.downloadRootPath = DOWNLOAD_PATH;
        this.basePackage="com.simple.server.auto";
        this.languageExt = 'js';
        this.srcRoot = '/pages/';
        console.log('init papth config');
    }
  
    switchSourceRootPath(srcRoot){
        this.srcRoot = srcRoot;
    }
    switchModulePackage(moduleName){
        this.basePackage= "com.simple.server.auto." + moduleName;
    }
    initWithRootPath(srcRoot,appConfig){
        this.srcRoot = srcRoot;
        this.currentRootPath = process.cwd();
        this.appConfig = appConfig;
        console.log(this.appConfig);
    }
   
    javaPackageToPath(packageName){
        if (packageName) {
            var pathtmp;
            packageName.split('.').forEach(function(item) {
                if (pathtmp) {
                    pathtmp += item +"/" ;
                }
                else {
    
                    pathtmp = '/' + item + '/';
                }
    
            });
            return pathtmp;
        }
        return "/";
    }
   
    rootPath(){
        return this.currentRootPath;
    }
    templateRoot(){
        return path.join(this.currentRootPath, TemplateRoot,this.appConfig.getAppNickname());
    }
    targetRoot(){
        //let pathName  = path.join(this.currentRootPath,TargetRoot,this.appConfig.projectId,this.appConfig.sideType);
        let finalPath = "/";
        if(this.appConfig.sideType == 'server'){
            finalPath = path.join(this.currentRootPath,TargetRoot,this.appConfig.projectName,this.appConfig.sideType, this.appConfig.getCodePath() + "-svc");
        }else{
            finalPath  = path.join(this.currentRootPath,TargetRoot,this.appConfig.projectName,this.appConfig.sideType,this.appConfig.getCodePath());
        }
        
        checkPath(finalPath);
        return finalPath;
    }
    // targetApplicationRoot(){
    //     //let pathName  = path.join(this.currentRootPath,TargetRoot,this.appConfig.projectId,this.appConfig.sideType);
    //     let appName  =this.applicationName;
    //     if (this.sideType =='server'){
    //         appName = this.applicationName + "-svc";
    //     }else if("web"==this.sideType){
    //         appName = this.applicationName;
    //     }else{
    //         appName  ="/";
    //     }

    //     let pathName  = path.join(this.targetRoot(),appName);
    //     checkPath(pathName);
    //     return pathName;
    // }
    templateView(pageName){
        let pathName  = path.join(this.templateRoot(),"/views/");
        //checkPath(pathName);
        return pathName;
    }

    templateConfig(pageName){
        let pathName  = path.join(this.templateRoot(),"/configs/");
        //checkPath(pathName);
        return pathName;
    }
    templateModel(pageName){
        let pathName  = path.join(this.templateRoot(),"/models/");
        //checkPath(pathName);
        return pathName;
    }
    templateServer(moduleName){
        let pathName  = path.join(this.templateRoot(),"/server/");
        //checkPath(pathName);
        return pathName;
    }
    templateCopyFiles(name){
        let childPath = "";
        if(name){childPath = name;}

        let pathName  = path.join(this.templateRoot(),"/copyfiles/",childPath);
        //checkPath(pathName);
        return pathName;
    }
    targetCopyFiles(name){
        let childPath = "";
        if(name){childPath = name;}

        let pathName  = path.join(this.targetRoot(),"/",childPath);
        checkPath(pathName);
        return pathName;
    }
    templateMicroServicesCopyFiles(){
        let pathName  = path.join(this.templateRoot(),"/copyfiles/servers");
        return pathName;
    }
    targetMicroServicesCopyFiles(){
        let pathName  = path.join(this.targetRoot(),"../");
        checkPath(pathName);
        return pathName;
    }
    targetMicroServicesIsReady(){
        let tryFile = this.targetMicroServicesCopyFiles() + "/pom.xml" ;
        return pathIsReady(tryFile);
        //return true;
    }

    targetSrcRoot(){
        let pathName  = path.join(this.targetRoot(),this.srcRoot);
        checkPath(pathName);
        return pathName;
    }
    targetView(moduleName,childName){
        let childPath = '';
        if (childName){
            childPath = childName;
        }
        let pathName  = path.join(this.targetSrcRoot(),moduleName,'/',childPath + "/");
        checkPath(pathName);
        return pathName;
    }
    targetModel(moduleName,childName){
        let childPath = '';
        if (childName){
            childPath = childName;
        }
        let pathName  = path.join(this.targetSrcRoot(),moduleName,childPath,'/models/');
        checkPath(pathName);
        return pathName;
    }
    targetServer(moduleName,typeName){
        let typePath ='/';
        if (typeName){
            typePath = typeName + '/';
        }
        let pathName  = path.join(this.targetSrcRoot(),this.javaPackageToPath(this.basePackage),typePath);
        //console.log(this.basePackage);
        //console.log(this.javaPackageToPath(this.basePackage));
        //console.log(pathName);
        checkPath(pathName);
        return pathName;
    }
    copyPath(source, dest){

        let cpCommand = 'cp -R ' + source + "/."  + ' ' +  dest ;
        let result = exec(cpCommand);
        if (result.code !== 0) {
            console.log('failed! command:' + cpCommand);
            console.log(result.stderr); 
            return false;
        }else{
            console.log('successful command:' + cpCommand);
            return true;
        }
    }
    copyFrameworkFiles(){
        this.copyPath(this.templateCopyFiles(),this.targetCopyFiles());
    }
}


module.exports = PathConfig;



