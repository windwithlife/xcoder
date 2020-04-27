
var gitTools = require('./git-tool');
var dockerTools = require('./docker-tool');
var shellTools = require('./shell-tool');
var envConfig = require('./env-config');
var PathConfig = require('./path_config');
var ParamsHelper = require('./params_helper');
//pathConfig = new PathConfig();
//paramsHelper = new ParamsHelper();


function autoRelease(params) {
    console.log('begin to fetch git source code!....')
    var resultgit = gitTools.fetchSourceFromGit(params);
    if (!resultgit) {
        console.log('failed to get source from git,root case: git fetch a failure!')
        return false;
    }
    
    console.log('begin to buildDockerImage!....');
   
    let result = dockerTools.release2K8sCloud(params);
    //let result = dockerTools.buildServiceDockerImage(params.name, params.label, params.lang, params.type, params.targetPath);
    // if (result) {
    //     console.log('begin to deploy the resource to k8s!....')
    //     dockerTools.release2K8sCloud(params.name, params.label, params.type,params.webDomainName,params.isSubWebSite,params.isUseOwnDeploymentFile,params.targetPath,params.exName);
    //     return true;
    // } else {
    //     console.log("failed to create service image! can't continue to deploy to k8s");
    //     return false;
    // }
    return true;
}

exports.autoRelease = autoRelease;
