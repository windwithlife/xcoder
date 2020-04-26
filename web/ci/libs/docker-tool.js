/**
 * Created by Joezhang on 2018/11/21.
 */

require('shelljs/global');
yaml = require('node-yaml');
var fs = require('fs');
var path = require('path');
var evnConfig = require('./env-config');


/**
 * 得到服务或者网站的service,pod的名称
 */
function getServiceName(serviceName, type){
    let imageName = "a/b:1.0.1";
    if (type){
        imageName = serviceName +'-' + type;
    }else{
        imageName = serviceName ;
    }
    return imageName;
}
/**
 * 得到服务或者网站pod所用的docker image名称
 */
function getDockerImageName(serviceName,labelName, type){
    let imageName = "a/b:1.0.1";
    imageName = getServiceName(serviceName,type) + ":" + labelName;
    return imageName;
}

/**
 * 得到创建Docker镜像所用的dockerfile的全路径文件名，根据是否使用项目自带dockerfile或者xci创建。
 */
function getDockerFileByParams(name,lang,type,useProjectDockerFile,sourceRootPath) {
    let dockerFile = 'Dockerfile';
    if (useProjectDockerFile){
        dockerFile = path.join(getWorkPath(name,sourceRootPath),dockerFile);
    }else{
        dockerFile = 'Dockerfile' + '-' + lang + '-' + type + '.multi';
        dockerFile = path.join(evnConfig.getReleaseDockerFilePath(), dockerFile);
    }
    return dockerFile;
}
/**
 * 得到项目当前有效资源或代码的当前根路径
 */
function getWorkPath(name,sourceRootPath){
    let workPath = path.join(evnConfig.releaseSourceCodePath(name),sourceRootPath);
     return workPath;
}

/**
 * 根据Docker的multi-stage文件进行分段创建镜像
 */
function buildServiceImageByDockerFileMulti(name, label, lang, type, dockerfilePath,isUseOwnDockerFile){
    let compileDockerFile= getDockerFileByParams(name,lang, type,isUseOwnDockerFile,dockerfilePath);
    let imageName = getDockerImageName(name, label, type);
    let workPath = getWorkPath(name,dockerfilePath);
    let compileCommand = "docker build " + workPath + " -t " + imageName + " -f " + compileDockerFile;
    console.log('compile command:' + compileCommand);
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
function buildServiceDockerImage(name, label, lang, type, dockerfilePath,isUseOwnDockerFile) {
    
    let buildResult = buildServiceImageByDockerFileMulti(name, label, lang, type, dockerfilePath,isUseOwnDockerFile);
    return buildResult;
}

/**
 * 创建每个服务（soa或者web)发布到k8s所需要的deployment，service,ingress文件。
 */
function createK8sOperationFiles(serviceName,imageName,type,name,webDomainName,isSubWebSite,exName){

    let currentPath = process.cwd();
    console.log(currentPath);
    let templateFilePath =evnConfig.getDeploymentTemplatePath();

    let deploymentTemplate = templateFilePath + 'deployment.yaml';
    let serviceTemplate = templateFilePath + 'service.yaml';
    let ingressTemplate = templateFilePath + type + '-ingress.yaml';
    let kongingressTemplate = templateFilePath + 'kong-ingress.yaml';

    let deployServiceFile = evnConfig.getDeploymentResourcesPath() +  serviceName;
     if(exec('mkdir -p ' + evnConfig.getDeploymentResourcesPath()).code !==0){
        console.log('failed to mkdir' + evnConfig.getDeploymentResourcesPath());
     }
     //if (exec(gitCloneCommand).code !== 0) 
    let tempDeployFile = deployServiceFile + "-deploy.yaml"
    let tempServiceFile = deployServiceFile + "-service.yaml"
    let tempIngressFile = deployServiceFile + "-ingress.yaml"
    let tempKongIngressFile = deployServiceFile + "-kongingress.yaml"
    let finalDeploymentFileName = deployServiceFile +'-deployment.yaml';
    console.log("Deploy template:\r\n" + deploymentTemplate);



    let deploy = yaml.readSync(deploymentTemplate, {encoding: "utf8",schema: yaml.schema.defaultSafe})
    deploy.metadata.name = serviceName;
    deploy.metadata.labels.k8sApp = serviceName;
    deploy.spec.selector.matchLabels.k8sApp = serviceName;
    deploy.spec.template.metadata.name= serviceName;
    deploy.spec.template.metadata.labels.k8sApp= serviceName;
    deploy.spec.template.spec.containers[0].image= imageName;
    console.log(JSON.stringify(deploy));
    yaml.writeSync(tempDeployFile,deploy,"utf8");


    console.log("service template" + serviceTemplate);
    let service = yaml.readSync(serviceTemplate, {encoding: "utf8",schema: yaml.schema.defaultSafe})
    service.metadata.name = serviceName;
    service.metadata.labels.k8sApp = serviceName;
    service.spec.selector.k8sApp = serviceName;
    console.log(service);
    yaml.writeSync(tempServiceFile,service,"utf8");

    console.log("ingress template" + ingressTemplate);
    let ingress = yaml.readSync(ingressTemplate, {encoding: "utf8",schema: yaml.schema.defaultSafe})
    ingress.metadata.name = serviceName + '-ingress';
   
    if (webDomainName){
        ingress.spec.rules[0].host = webDomainName;
    }
    if (isSubWebSite){
        //ingress.spec.rules[0].http.paths[0].path = "/" + exName + "/?(.*)";
        ingress.spec.rules[0].http.paths[0].path = "/" + exName + "/?";
    }else{
        ingress.spec.rules[0].http.paths[0].path = "/"; 
    }
    //ingress.spec.rules[0].http.paths[0].path = "/" + name + "/?(.*)";
    ingress.spec.rules[0].http.paths[0].backend.serviceName = serviceName;
    console.log(ingress);
    yaml.writeSync(tempIngressFile,ingress,"utf8");

    //Kong-ingress
    console.log("kong ingress template" + kongingressTemplate);
    let kongingress = yaml.readSync(kongingressTemplate, {encoding: "utf8",schema: yaml.schema.defaultSafe})
    kongingress.metadata.name = serviceName + '-ingress';
    //kongingress.proxy.path = '/';
    //kongingress.proxy.path = '/' + exName;
    //if (isSubWebSite){
     //   kongingress.route.strip_path = 'true'
    //}else{
    //    kongingress.route.strip_path = 'false'
    //}
    
    console.log(kongingress);
    yaml.writeSync(tempKongIngressFile,kongingress,"utf8");



    var contentTextDeployment = fs.readFileSync(tempDeployFile,'utf-8');
    var contentTextService = fs.readFileSync(tempServiceFile,'utf-8');
    var contentTextIngress = fs.readFileSync(tempIngressFile,'utf-8');
    var contentTextKongIngress = fs.readFileSync(tempKongIngressFile,'utf-8');
    var contentSplitLine = "\n---\n\n"

    rm(finalDeploymentFileName);
    rm(tempDeployFile);
    rm(tempServiceFile);
    rm(tempIngressFile);
    rm(tempKongIngressFile);

    var result = fs.appendFileSync(finalDeploymentFileName,contentTextDeployment);
    result = fs.appendFileSync(finalDeploymentFileName,contentSplitLine);
    result = fs.appendFileSync(finalDeploymentFileName,contentTextService);
    result = fs.appendFileSync(finalDeploymentFileName,contentSplitLine);
    result = fs.appendFileSync(finalDeploymentFileName,contentTextIngress);
    result = fs.appendFileSync(finalDeploymentFileName,contentSplitLine);
    result = fs.appendFileSync(finalDeploymentFileName,contentTextKongIngress);

    console.log("DockerImageName:" + imageName);
    return imageName;
}
/**
 * 因为有的项目要使用自定 义的发布文件，所以在这里要修改对应的域名。
 */
function createK8sProjectOwnOperationFiles(name,sourceRootPath,webDomainName){

    let currentPath = process.cwd();
    console.log(currentPath);
  
    if(exec('mkdir -p ' + evnConfig.getDeploymentResourcesPath()).code !==0){
        console.log('failed to mkdir' + evnConfig.getDeploymentResourcesPath());
     }
     //if (exec(gitCloneCommand).code !== 0) 
    let deployServiceFile = evnConfig.getDeploymentResourcesPath() +  serviceName;
    let finalDeploymentFileName = deployServiceFile +'-deployment.yaml';
    let ownDeploymentFileName =  path.join(getWorkPath(name,sourceRootPath),"demployment.yaml");

    console.log("Deploy destination file:\r\n" + finalDeploymentFileName);
 
    rm(finalDeploymentFileName);
    let replaceCommand = 'sed -e "s/release.zhangyongqiao.com/' + webDomainName + '/g" < ' + ownDeploymentFileName + " > " + finalDeploymentFileName;
    let result = exec(replaceCommand);
    console.log('failed to replace domain name of the deployment file command is' + finalDeploymentFileName);
    if(result.code !==0){
        console.log(result.stderr);
     }
    console.log("DockerImageName:" + imageName);
    return imageName;
}

/**
 * 获取最终使用发布到k8s的发布文件全路径名
 */
function getDeploymentFile(serviceName){
    let deployServicePath =  evnConfig.getDeploymentResourcesPath();
    let finalDeploymentFileName = deployServicePath + serviceName +'-deployment.yaml';
    return finalDeploymentFileName;
}

/**
 * 使用发布到k8s的发布文件全路径名，发布服务到k8s中。
 */
function releaseService2Cloud(serviceName){
    let finalDeploymentFileName = getDeploymentFile(serviceName);
    let runUnDeployCommand = 'kubectl delete -f  ' + finalDeploymentFileName;
    let runDeployCommand = 'kubectl create -f  ' + finalDeploymentFileName;

    console.log("Exec Command String:" + runDeployCommand);
    exec(runUnDeployCommand);
    let result = exec(runDeployCommand);
    if(result.code !== 0){   
        console.log('failed to release service to k8s based service Name:' + serviceName);
        console.log('root cause:' + result.stderr);
    }else{
        console.log('sucessfule to release service to k8s cloud platform!')
        
    }

}

/**
 * 创建并使用发布文件，发布服务到k8s中。
 */
function release2K8sCloud(name,labelName,type,webDomainName,isSubWebSite,isUserOwnDeploymentFile,sourceRootPath,exName) {
    let imageName = getDockerImageName(name,labelName,type);
    let serviceName  = getServiceName(name, type);
    if (isUserOwnDeploymentFile){
        createK8sProjectOwnOperationFiles(name,sourceRootPath,webDomainName);
    }else{
        createK8sOperationFiles(serviceName,imageName,type,name,webDomainName,isSubWebSite,exName);
    }
    
    releaseService2Cloud(serviceName);
}

module.exports = {
    buildServiceDockerImage:buildServiceDockerImage,
    release2K8sCloud:release2K8sCloud
}