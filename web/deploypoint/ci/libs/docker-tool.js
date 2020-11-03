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


function executeCommand(command,commandTag){
    console.log('*************************************************************************');
    console.log('****************************** going to execute ' + commandTag + ' command:[' + command + "] *************");
    console.log('*************************************************************************');
    let result = exec(command);
    if (result.code !== 0) {
        console.log(result.stderr);
        console.log('*********************failed to excute '+ commandTag + ' command:[' + command + ']');
        return false;
    }
    console.log('*************************************************************************');
    console.log('*********************************finish to excute ' + commandTag + ' command *******************************');
    console.log('*************************************************************************');
    return true;
}


/**
 * 根据Docker的multi-stage文件进行分段创建镜像
 */
function buildServiceDockerImage(params) {
    let dockerfile = pathConfig.dockerfilesRootPath() + "/"  +paramsHelper.dockerfile();
    if(paramsHelper.useOwnDockerFile()){
        dockerfile = pathConfig.releaseTargetSrcPath() + "/Dockerfile" ;
    }
    let imageName = paramsHelper.imageName();
    let workPath = pathConfig.releaseTargetSrcPath();

    let compileCommand = "docker build " + workPath + " -t " + imageName + " -f " + dockerfile;
    let removeCommand = "docker rmi  " + imageName;
   
    let result = executeCommand(removeCommand,'remove old image');
    return executeCommand(compileCommand,'build docker image:' + imageName);
}




function createK8sDeploymentFiles(){

    
    paramsHelper.updateRoute(); //新增一条当前路由记录。

    //发布到带istio的k8s集群或者普通的集群。
    let templatefileName = paramsHelper.templatefile();
    let deploymentfileName = paramsHelper.deploymentfile();
    let templatefile = pathConfig.deploymentTemplateFile(templatefileName);
    let deploymentfile = pathConfig.deploymentTargetFile(deploymentfileName);
    let params = paramsHelper.buildParamsForDeployment();
    codeTools.generateCode(templatefile,params,deploymentfile);


    //保存发布文件到项目目录中
    deploymentfile = pathConfig.deploymentK8sTargetFile(deploymentfileName);
    codeTools.generateCode(templatefile,params,deploymentfile);

    //生成降低docker compose方案



}

function modifyOwnDeploymentFile(){

}

function deployConfigFiles(){
    console.log('*********************************begin to deploy config files !....******************************************');
    let configFiles = pathConfig.loadConfigFiles();
    configFiles.forEach(function(configFile){
        let runUnDeployCommand = 'kubectl delete -f  ' + configFile;
        let runDeployCommand = 'kubectl create -f  ' + configFile;
        executeCommand(runUnDeployCommand,"delete origin configMap");
        executeCommand(runDeployCommand,"create configMap");
    });
     console.log('*********************************finish to deploy config files !*****************************************');
}



/**
 * 使用发布到k8s的发布文件全路径名，发布服务到k8s中。
 */
function deploy2Cloud(){
    let deploymentfileName = paramsHelper.deploymentfile();
    let depolymentfile = pathConfig.deploymentTargetFile(deploymentfileName);
    let runUnDeployCommand = 'kubectl delete -f  ' + depolymentfile;
    let runDeployCommand = 'kubectl create -f  ' + depolymentfile;
    
    executeCommand(runUnDeployCommand,"delete origin k8s objects");
    return executeCommand(runDeployCommand,"application deployment");
}


function deployK8sFiles(pathObj){
    console.log('*********************************begin to deploy k8s files !....******************************************');
    let k8sFiles = pathObj.loadK8sFiles();
    k8sFiles.forEach(function(k8sFile){
        let runUnDeployCommand = 'kubectl delete -f  ' + k8sFile;
        let runDeployCommand = 'kubectl create -f  ' + k8sFile;
        executeCommand(runUnDeployCommand,"delete origin configMap");
        executeCommand(runDeployCommand,"create configMap");
    });
     console.log('*********************************finish to deploy config files !*****************************************');
}


/**
 * 把结果镜像ush到docker镜像仓库中。
 */
function push2DockerRepository(paramsObj){
   
    let imageName = paramsObj.imageName();
    let imageNameRepo = paramsObj.imageNameRepo();
    
    let runTagDockerImageCommand = 'docker tag ' + imageName + ' ' + imageNameRepo;
    let runPushDockerImageCommand = 'docker push  ' + imageNameRepo;
    
    if(!executeCommand(runTagDockerImageCommand,"tag image to " + imageNameRepo)){
        return false;
    }
    return executeCommand(runPushDockerImageCommand,"push docker image to " + imageNameRepo);
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
    if (!push2DockerRepository(paramsHelper)){
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



function releaseFilesToK8s(paramsObj, pathObj) {
    return deployK8sFiles(pathObj);
}


module.exports = {
    release2K8sCloud:release2K8sCloud,
    releaseFilesToK8s:releaseFilesToK8s,
}

