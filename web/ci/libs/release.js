
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
    
    return true;
}

exports.autoRelease = autoRelease;
