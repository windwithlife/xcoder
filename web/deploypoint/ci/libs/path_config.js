
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




 class PathConfig{

   
    constructor(){
        this.releaseType = 'prod';
        this.srcRoot = '~/autoRelease/'; 
        this.dockerfilesRoot = './ci/k8s/dockerfiles/';
        this.templateRoot = './ci/k8s/templates/';
        this.currentRootPath = process.cwd();
        this.applicationName = "applicationName";
        this.projectName = "simple";
        console.log('current sourcecode root path:' + this.currentRootPath);
    }
    switchSourceRootPath(srcRoot){
        this.srcRoot = srcRoot;
    }
    init(appConfig){
        this.appConfig = appConfig;
        this.applicationName = appConfig.applicationName;
        if(appConfig.releaseType){
            this.releaseType = appConfig.releaseType;
        }
       
        //console.log(this.appConfig);
    }
    rootPath(){
        let pathName  = path.join(this.currentRootPath, this.srcRoot);
        checkPath(pathName);
        return pathName;
       
    }
   
    projectRootPath(){
        let pathName  = path.join(this.rootPath(), this.applicationName);
        checkPath(pathName);
        return pathName;
    }

    deploymentRootPath(){
        let pathName  = path.join(this.projectRootPath(), "deployment/");
        checkPath(pathName);
        return pathName;
    }
   
    projectSrcRootPath(){
        let pathName  = path.join(this.projectRootPath(), "sourcecode/");
        checkPath(pathName);
        return pathName;
    }

  
   
    dockerfilesRootPath(){
        let pathName  = path.join(this.currentRootPath, this.dockerfilesRoot);
        //checkPath(pathName);
        return pathName;
    }

    

    deploymentTemplateFile(filename){
        let templateFile = path.join(this.currentRootPath,this.templateRoot) + filename;
       
        return templateFile;
    }
    deploymentTargetFile(filename){
        
        let deploymentfile  = this.deploymentRootPath() +"/" + filename;
        //checkPath(pathName);
        return deploymentfile;
    }
    deploymentK8sTargetFile(filename){
        let pathName  = path.join(this.rootPath(), "k8s/", this.projectName);
        checkPath(pathName);
        let filePath = path.join(pathName, filename);
        return filePath;
    }
    deploymentComposeTargetFile(filename){
        let pathName  = path.join(this.rootPath(), "compose/", this.projectName);
        checkPath(pathName);
        let filePath = path.join(pathName, filename);
        return filePath;
    }
    
    loadfiles(mPath){
         var configFiles = [];
       
        if (!pathIsReady(mPath)){return  configFiles;}
        var files = fs.readdirSync(mPath);
        files.forEach(function (file) {
            var configFile = path.join(mPath,file);
            var stats = fs.statSync(configFile);
            if (!stats.isDirectory()) {
                configFiles.push(configFile);
            }
        });
        console.log(configFiles);
        return configFiles;
    }

    loadConfigFiles() {
        var mPath = this.configFilesRootPath();
        return this.loadfiles(mPath); 
    }

    loadK8sFiles() {
        var mPath = this.k8sFilesRootPath();
        return this.loadfiles(mPath); 
    }
    prepareClonePath(){
        let pathName  = path.join(this.projectSrcRootPath());
        cd(pathName);
        return pathName;
     
    }
    preparePullPath(){
        let pathName  = path.join(this.projectSrcRootPath(), "./");
        cd(pathName);
        return pathName;
    }

    releaseTargetSrcPath(relativePath){
        let childPath = "./";
        if (relativePath){
            childPath = relativePath;
        }
        let targetPath =  this.appConfig.targetPath;
        let pathName  = path.join(this.projectSrcRootPath(), targetPath,childPath);
        checkPath(pathName);
        return pathName;
    }
    hasInterface(){
        let iPath = this.interfacePath();
        return pathIsReady(iPath);
    }
    interfacePath(){
        let pathName  = path.join(this.releaseTargetSrcPath(), "../api");
        return pathName;
       
    }
    executeScriptFiles(){
        let mPath  = path.join(this.releaseTargetSrcPath(),"/script/");
        return this.loadfiles(mPath); 
       
    }
    k8sFilesRootPath(){
        let releaseEnvirnoment = "";
        if (this.releaseType){
            releaseEnvirnoment = this.releaseType;
        }
        let pathName  = path.join(this.releaseTargetSrcPath(),"k8s",releaseEnvirnoment);
        return pathName;
    }
    configFilesRootPath(){
        let releaseEnvirnoment = "";
        if (this.releaseType){
            releaseEnvirnoment = this.releaseType;
        }
        
        let pathName  = path.join(this.releaseTargetSrcPath(),"k8s/",releaseEnvirnoment.toLowerCase(),"config/");
        return pathName;
    }
    markClone(){
        let touchFile = path.join(this.projectSrcRootPath(),".haveClonedMarker-"+ this.applicationName);
        touch(touchFile);
    }
    haveClonedCode(){
        //let pathName  = this.releaseTargetSrcPath();
        let touchFile = path.join(this.projectSrcRootPath(),".haveClonedMarker-"+ this.applicationName);
        return pathIsReady(touchFile);
    }

    resetWorkPath(){
        cd(this.currentRootPath);
        console.log("reset to web root " + process.cwd());
    }
      
}

module.exports = PathConfig;



