
var gitTools = require('./git-tool');
var dockerTools = require('./docker-tool');
var shellTools = require('./shell-tool');
var builderTools = require('./building_tool');
var PathConfig = require('./path_config');
var ParamsHelper = require('./params_helper');
var messageClient = require('./message_client');
let pathConfig = new PathConfig();
let paramsHelper = new ParamsHelper();


function autoRelease(params) {
    console.log('begin to fetch git source code!....')
    //get sourcecode or execute scripts
    paramsHelper.init(params);
    pathConfig.init(params);
    messageClient.updateReleaseStatus(params.buildId, "fetching-code");
    var resultgit = gitTools.fetchSourceFromGit(params);
    if (!resultgit) {
        console.log('failed to get source from git,root case: git fetch a failure!')
       
        messageClient.updateReleaseStatus(params.buildId, "fetching-code-failed");
        return false;
    }
    messageClient.updateReleaseStatus(params.buildId, "fetching-code-finished");
    if (paramsHelper.isScript()){
        shellTools.execReleaseScript(paramsHelper,pathConfig);
        return true;
    }

    if (paramsHelper.isLib()){
        messageClient.updateReleaseStatus(params.buildId, "building-code...");
        builderTools.build(paramsHelper,pathConfig);
        messageClient.updateReleaseStatus(params.buildId, "building-code-finished");
        return true;
    }

    /*
    if (paramsHelper.isIOS()){
        //builderTools.compileAndBuild(paramsHelper,pathConfig);
        //let result = dockerTools.release2K8sCloud(params);
    }
    if (paramsHelper.isAndroid()){
        //builderTools.compileAndBuild(paramsHelper,pathConfig);
        //let result = dockerTools.release2K8sCloud(params);
    }
    */
    if (paramsHelper.isServer()){
        messageClient.updateReleaseStatus(params.buildId, "building-code...");
        builderTools.build(paramsHelper,pathConfig);
        messageClient.updateReleaseStatus(params.buildId, "building-code-finished");
        console.log('begin to buildDockerImage!....');
        messageClient.updateReleaseStatus(params.buildId, "deploying-to-k8s");
        let result = dockerTools.release2K8sCloud(params);
        messageClient.updateReleaseStatus(params.buildId, "deploying-to-k8s-finished");
        return result;
    }
    
    return true;
}

exports.autoRelease = autoRelease;
