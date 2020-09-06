
var gitTools = require('./git-tool');
var dockerTools = require('./docker-tool');
var shellTools = require('./shell-tool');
var builderTools = require('./building_tool');
var PathConfig = require('./path_config');
var ParamsHelper = require('./params_helper');
let pathConfig = new PathConfig();
let paramsHelper = new ParamsHelper();


function autoRelease(params) {
    console.log('begin to fetch git source code!....')
    //get sourcecode or execute scripts
    paramsHelper.init(params);
    pathConfig.init(params);
    var resultgit = gitTools.fetchSourceFromGit(params);
    if (!resultgit) {
        console.log('failed to get source from git,root case: git fetch a failure!')
        return false;
    }
    if (paramsHelper.isScript()){
        shellTools.execReleaseScript(paramsHelper,pathConfig);
        return true;
    }

    if (paramsHelper.isLib()){
        builderTools.build(paramsHelper,pathConfig);
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
        builderTools.build(paramsHelper,pathConfig);
        console.log('begin to buildDockerImage!....');
        let result = dockerTools.release2K8sCloud(params);
        return result;
    }
    
    return true;
}

exports.autoRelease = autoRelease;
