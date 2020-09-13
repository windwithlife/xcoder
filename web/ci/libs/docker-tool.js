/**
 * Created by Joezhang on 2018/11/21.
 */

require('shelljs/global');
yaml = require('node-yaml');
var codeTools = require('./code_tools');
var PathConfig = require('./path_config');
var ParamsHelper = require('./params_helper');
pathConfig = new PathConfig();
paramsHelper = new ParamsHelper();

/**
 * 根据Docker的multi-stage文件进行分段创建镜像
 */
function buildDockerByMultifile(workPath,dockfile, imageName){
    let compileCommand = "docker build " + workPath + " -t " + imageName + " -f " + dockfile;
    console.log('compile command:' + compileCommand);
    let removeCommand = "docker rmi  " + imageName;
    exec(removeCommand);
    let result = exec(compileCommand);
    if (result.code !== 0) {
        console.log('failed to compile  compile command:[' + compileCommand +']');
        console.log(result.stderr); 
        return false;
    }
    return true;
}
/**
 * 根据Docker的multi-stage文件进行分段创建镜像
 */
function buildServiceDockerImage(params) {
    console.log('*********************************begin to build docker image!....******************************************');
    let dockerfile = pathConfig.dockerfilesRootPath() + "/"  +paramsHelper.dockerfile();
    if(paramsHelper.useOwnDockerFile()){
        dockerfile = pathConfig.releaseTargetSrcPath() + "/Dockerfile" ;
    }
    let imageName = paramsHelper.imageName();
    //let workPath = pathConfig.dockerWorkPath();
    let workPath = pathConfig.releaseTargetSrcPath();
    
    let buildResult = buildDockerByMultifile(workPath, dockerfile, imageName);
    console.log('*********************************finish to build docker image!******************************************');
    return buildResult;
}




function createK8sDeploymentFiles(serviceName,imageName,type,name,webDomainName,isSubWebSite,exName){

     paramsHelper.updateRoute(); //新增一条当前路由记录。
    let templatefileName = paramsHelper.templatefile();
    let deploymentfileName = paramsHelper.deploymentfile();
    let templatefile = pathConfig.deploymentTemplateFile(templatefileName);
    let depolymentfile = pathConfig.deploymentTargetFile(deploymentfileName);
    let params = paramsHelper.buildParamsForDeployment();
    codeTools.generateCode(templatefile,params,depolymentfile);



}

function modifyOwnDeploymentFile(){

}

function deployConfigFiles(){
    let configFiles = pathConfig.loadConfigFiles();
    configFiles.forEach(function(configFile){
        let runDeployCommand = 'kubectl create -f  ' + configFile;
        console.log("Exec Command String:" + runDeployCommand);
        let result = exec(runDeployCommand);
        if(result.code !== 0){   
            console.log('failed to apply configMap to k8s! configMap file Name:' + configFile);
            console.log('root cause:' + result.stderr);
        }else{
            console.log('sucessfule to apply configMap to k8s cloud platform!')
            
        }
    });
}

/**
 * 使用发布到k8s的发布文件全路径名，发布服务到k8s中。
 */
function deploy2Cloud(){
    console.log('*********************************begin to deploy to k8s!....******************************************');
    let deploymentfileName = paramsHelper.deploymentfile();
    let depolymentfile = pathConfig.deploymentTargetFile(deploymentfileName);
    let runUnDeployCommand = 'kubectl delete -f  ' + depolymentfile;
    let runDeployCommand = 'kubectl create -f  ' + depolymentfile;

    console.log("Exec Command String:" + runDeployCommand);
    exec(runUnDeployCommand);
    let result = exec(runDeployCommand);
    if(result.code !== 0){   
        console.log('failed to release service to k8s based service Name:' + serviceName);
        console.log('root cause:' + result.stderr);
    }else{
        console.log('sucessfule to release service to k8s cloud platform!')
        
    }
    console.log('*********************************finish to deploy to k8s!....******************************************');
}

/**
 * 创建并使用发布文件，发布服务到k8s中。
 */
function release2K8sCloud(params) {
    pathConfig.init(params);
    paramsHelper.init(params);

    if(!buildServiceDockerImage(params)){
        return;
    }
    if (paramsHelper.useOwnDepolymentFile()){
         modifyOwnDeploymentFile();
    }else{
         createK8sDeploymentFiles();
    }
    deployConfigFiles();
    deploy2Cloud();
}


module.exports = {
    release2K8sCloud:release2K8sCloud
}

