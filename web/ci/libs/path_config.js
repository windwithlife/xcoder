
var path = require('path');
var fs   = require('fs');
require('shelljs/global');

//let sourcecodePath = '/projects';

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


let TemplateRoot = '/generator/templates/';
let TargetRoot = '../files/';

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
        let pathName  = path.join(this.rootPath(), this.projectConfig.name);
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
        let pathName  = path.join(this.rootPath(), this.projectConfig.name,"src/");
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
        cp("-r",serverPath,this.dockerWorkPath());
        cp("-r",this.releaseTargetSrcPath()+ "/*",this.dockerWorkPath());
       

    }
   
}


module.exports = PathConfig;



