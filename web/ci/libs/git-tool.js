/**
 * Created by Joe on 2018/11/21.
 */

require('shelljs/global');
//var fs = require('fs')
//var path= require('path')
//var envConfig = require('./env-config');
var PathConfig = require('./path_config');
var ParamsHelper = require('./params_helper');
pathConfig = new PathConfig();
paramsHelper = new ParamsHelper();



function cloneSource(url){
    let gitCloneCommand = 'git clone ' + url + "  .";


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

function push_prepare (path){
    if (!which('git')) {
        echo('Sorry, this script requires git');
        return;
    }
    let gitResetCommand = 'git -C ' + path + ' reset --hard origin/master';
   
   // exec(gitResetCommand);

    let result = exec(gitResetCommand);
    if (result.code !== 0) {
        echo('Error: Git pull failed');
        console.log(result.stderr); 
        return ;
    }
}

function push_do (path){
    if (!which('git')) {
        echo('Sorry, this script requires git');
        return false;
    }
    let gitAddCommand = 'git -C ' + path +' add .';
    let gitCommitCommand = 'git -C ' + path + ' commit -m "auto-create-coder"' ;
    let gitPushCommand = 'git -C ' + path +' push';
    exec(gitAddCommand);

    let result = exec(gitCommitCommand);
    if (result.code !== 0) {
        console.log(result.stderr); 
        return false;
    }

    result = exec(gitPushCommand);
    if (result.code !== 0) {
        console.log(result.stderr); 
        return false;
    }
   

}

function fetch_project_src(params) {
    console.log('*********************************begin to fetch sourcecode!....******************************************');
    pathConfig.init(params);
    paramsHelper.init(params);
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
        if (cloneSource(params.gitUrl)){
            console.log('successful to clone project:' + params.name);
            pathConfig.markClone();
            //cd(envConfig.getServerRootPath());    
        }else{
            //cd(envConfig.getServerRootPath());
            console.log('failed to clone project:' + params.name);
            result =  false;
        }
    }
    //pathConfig.prepareSourceCode();
    pathConfig.resetWorkPath();
    console.log('*********************************finish to compile sourcecode!....******************************************');
    return result;
}


module.exports = {
    fetchSourceFromGit: fetch_project_src,
    gitPull:pullSource,
    gitClone:cloneSource,
    pushPrepare:push_prepare,
    pushDo:push_do,
}