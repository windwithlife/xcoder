/**
 * Created by Joe on 2018/11/21.
 */

require('shelljs/global');
var fs = require('fs')
var path= require('path')
var envConfig = require('./env-config');
var PathConfig = require('./path_config');
var ParamsHelper = require('./params_helper');
pathConfig = new PathConfig();
paramsHelper = new ParamsHelper();



function cloneSource(url){
    let gitCloneCommand = 'git clone ' + url;


    let result = exec(gitCloneCommand);
    if (result.code !== 0) {
        console.log('failed to gie clone project!, clone command:' + gitCloneCommand);
        console.log(result.stderr); 
        return false
    }else{
        console.log('successful to gie clone project!, clone command:' + gitCloneCommand);
        return true;
    }
}
function pullSource (){
    if (!which('git')) {
        echo('Sorry, this script requires git');
        return;
    }
    let gitResetCommand = 'git reset --hard origin/master';
    let gitPullCommand = 'git pull';

    
    exec(gitResetCommand);

    let result = exec(gitPullCommand);
    if (result.code !== 0) {
        echo('Error: Git pull failed');
        console.log(result.stderr); 
        return false;
    }

}
function fetch_project_src(params) {
    pathConfig.init(params);
    let result = true;
    if (!which('git')) {
        echo('Sorry, this script requires git');
        return;
    }

    if (pathConfig.haveClonedCode()) {
        //cd(release_directory);
        console.log('begin to pull source code!');
        pathConfig.preparePullPath();
        console.log(process.cwd());
        pullSource();

    } else {
        console.log('begin to clone project source code!');
        //init_release_directory(project_name);
        //cd(envConfig.releaseSourceCodeRootPath(project_name));
        //console.log('begin to clone project source code!');
        pathConfig.prepareClonePath();
        console.log(process.cwd());
        if (cloneSource(params.cloneUrl)){
            console.log('successful to clone project:' + params.name);
            //cd(envConfig.getServerRootPath());    
        }else{
            //cd(envConfig.getServerRootPath());
            console.log('failed to clone project:' + params.name);
            result =  false;
        }
    }

    pathConfig.resetWorkPath();

    return result;
}


module.exports = {
    fetchSourceFromGit: fetch_project_src,
    gitPull:pullSource,
    gitClone:cloneSource
}