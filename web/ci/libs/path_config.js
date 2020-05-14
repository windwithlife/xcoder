
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
        this.srcRoot = '../autoRelease/'; 
        this.dockerfilesRoot = './ci/cloud-resources/dockerfiles/';
        this.templateRoot = './ci/cloud-resources/k8s/templates/';
        this.currentRootPath = process.cwd();
        console.log('current sourcecode root path:' + this.currentRootPath);
    }
    switchSourceRootPath(srcRoot){
        this.srcRoot = srcRoot;
    }
    init(projectConfig){
        //this.srcRoot = srcRoot;
        //this.currentRootPath = process.cwd();
        this.projectConfig = projectConfig;
        console.log(this.projectConfig);
    }
    rootPath(){
        let pathName  = path.join(this.currentRootPath, this.srcRoot);
        checkPath(pathName);
        return pathName;
       
    }
   
    projectRootPath(){
        let pathName  = path.join(this.rootPath(), this.projectConfig.applicationName);
        checkPath(pathName);
        return pathName;
    }

    deploymentRootPath(){
        let pathName  = path.join(this.projectRootPath(), "deployment/");
        checkPath(pathName);
        return pathName;
    }
    projectSrcRootPath(){
        let pathName  = path.join(this.projectRootPath(), "src/");
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
   
    prepareClonePath(){
        let pathName  = path.join(this.projectSrcRootPath());
        cd(pathName);
        return pathName;
     
    }
    preparePullPath(){
        let pathName  = path.join(this.projectSrcRootPath(), "projects/");
        cd(pathName);
        return pathName;
    }

    releaseTargetSrcPath(){
        let targetPath =  this.projectConfig.targetPath;
        let pathName  = path.join(this.projectSrcRootPath(), "/projects/",targetPath);
        checkPath(pathName);
        return pathName;
    }

   
    haveClonedCode(){
        //let pathName  = this.releaseTargetSrcPath();
        let pathName  = path.join(this.projectRootPath(), "src/");
        return pathIsReady(pathName);
    }

    resetWorkPath(){
        cd(this.currentRootPath);
        console.log("reset to web root " + process.cwd());
    }

    dockerWorkPath(){
        let dockerWorkPath = path.join(this.projectSrcRootPath(),"/dockerwork/");
        checkPath(dockerWorkPath);
        return dockerWorkPath;
    }
    prepareSourceCode(){
        rm("-rf",this.dockerWorkPath());

        let serverPath = path.join(this.releaseTargetSrcPath(),"../../server");
        //cp("-R",serverPath,this.dockerWorkPath());
        let cpCommand = 'cp -ar ' + serverPath + '. ' +  this.dockerWorkPath();
        let result = exec(cpCommand);
        if (result.code !== 0) {
            console.log('failed! command:' + cpCommand);
            console.log(result.stderr); 
        }else{
            console.log('successful command:' + cpCommand);
        }
        cpCommand = 'cp -ar ' + this.releaseTargetSrcPath()+ "."  + ' ' +  this.dockerWorkPath();
        result = exec(cpCommand);
        if (result.code !== 0) {
            console.log('failed! command:' + cpCommand);
            console.log(result.stderr); 
        }else{
            console.log('successful command:' + cpCommand);
        }
        //cp("-R",this.releaseTargetSrcPath()+ "/*",this.dockerWorkPath());
        console.log("****************xxxxxxxxxxxxx current path" + process.cwd());
        console.log("****************xxxxxxxxxxxxx targetsrc path" + this.releaseTargetSrcPath());
        console.log("****************xxxxxxxxxxxxx serverPath" + serverPath);   

    }
   
}

module.exports = PathConfig;



