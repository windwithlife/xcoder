
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
    console.log('************************************************begin to fetch git source code!....************************')
    //get sourcecode or execute scripts
    paramsHelper.init(params);
    pathConfig.init(params);
    //messageClient.updateReleaseStatus(params.buildId, "starting...");
    var resultgit = gitTools.fetchSourceFromGit(params);
    if (!resultgit) {
        console.log('failed to get source from git, release is stopped!')
       
        //messageClient.updateReleaseStatus(params.buildId, "failed");
        return false;
    }
    //messageClient.updateReleaseStatus(params.buildId, "fetching-code-finished");
    if (paramsHelper.isScript()){
        if(shellTools.execReleaseScript(paramsHelper,pathConfig)){
            //messageClient.updateReleaseStatus(params.buildId, "success");
            return true;
        }else{
            //messageClient.updateReleaseStatus(params.buildId, "failed");
            return false;
        }
        
        
    }

    if (paramsHelper.isLib()){
        //messageClient.updateReleaseStatus(params.buildId, "building-code...");
        if(builderTools.build(paramsHelper,pathConfig)){
            //messageClient.updateReleaseStatus(params.buildId, "success");
            return true;
        }else{
            //messageClient.updateReleaseStatus(params.buildId, "failed");
            return false;
        }
   
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
        //messageClient.updateReleaseStatus(params.buildId, "building-code...");
        
        if(!builderTools.build(paramsHelper,pathConfig)){
            return false;
        }
        //messageClient.updateReleaseStatus(params.buildId, "building-code-finished");
        console.log('begin to buildDockerImage!....');
        //messageClient.updateReleaseStatus(params.buildId, "deploying-to-k8s");
        let result = dockerTools.release2K8sCloud(params);
        messageClient.updateReleaseStatus(params.buildId, "success");
        return result;
    }
    
    return true;
}

exports.autoRelease = autoRelease;
