
var gitTools = require('./git-tool');
var dockerTools = require('./docker-tool');
var shellTools = require('./shell-tool');
var envConfig = require('./env-config');


function autoRelease(params) {
    console.log('begin to fetch git source code!....')
    var resultgit = gitTools.fetchSourceFromGit(params.name, params.cloneUrl, 'master');
    if (!resultgit) {
        console.log('failed to get source from git,root case: git fetch a failure!')
        return false;
    }
    
    console.log('begin to buildDockerImage!....');
    // let result = dockerTools.buildServiceDockerImage(params.name, params.label, params.lang, params.type, params.targetPath,params.isUseOwnDockerFile);
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
