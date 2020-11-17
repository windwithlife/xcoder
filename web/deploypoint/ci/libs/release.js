
let logInfo = require('../../utils/globalUtils').logInfo;
var gitTools = require('./git-tool');
var dockerTools = require('./docker-tool');
var shellTools = require('./execute-tool');
var builderTools = require('./building_tool');

var messageClient = require('../../store/message-client');



function autoRelease(params) {
    console.log('************************************************begin to fetch git source code!....************************')
    //get sourcecode or execute scripts
    paramsHelper.init(params);
    pathConfig.init(params);
   
    var resultgit = gitTools.fetchSourceFromGit(params);
    if (!resultgit) {
        console.log('failed to get source from git, release is stopped!')
        return false;
    }
   
    const applicationType = paramsHelper.getApplicationType();

    if (applicationType.needBuildAndInstall){
        if(!builderTools.build(paramsHelper,pathConfig)){
            logInfo("build", "failed to build sourcecode!");
            return false;
        }
    }
    if (applicationType.needExecuteScript){
        if(!shellTools.executeScripts(paramsHelper,pathConfig)){ 
            logInfo("execuite script", "failed to execute script!");    
            return false;
        } 
    }
    if (applicationType.needBuildDocker){
        if(!dockerTools.buildDockerImage(paramsHelper,pathConfig)){ 
            logInfo("build docker image", "failed to build docker iamge!");
            return false;
        }
    }

    if (applicationType.needDeploy){
        if(!dockerTools.deploy2K8sCloud(paramsHelper,pathConfig)){ 
            logInfo("deploy", "failed to deploy application!");
            return false;
        }
    }    
    return true;
}

exports.autoRelease = autoRelease;
