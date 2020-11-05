/**
 * Created by Joe on 2018/11/21.
 */
var envConfig = require('./env-config')
require('shelljs/global');


function restartNPM (port){
    cd(envConfig.getServerRootPath());
    console.log( "Start restart  server myself")
    let startNPM = "kill -9 $(lsof -i:" + port + "|awk '{print $2}' | tail -n 2) && npm run start";
    if (exec(startNPM).code !== 0) {
        console.log('Error: failed to restart server');
        return false;
    }else{
        console.log('successful to restart server');
        return true;
    }
}

function restartServer (){
    restartNPM(3333);
    return;
    console.log( "Restarting  server myself");
    let startCommand = 'npm restart start';
    if (exec(startCommand).code !== 0) {
        console.log('failed to restart! COMMAND:' + startCommand)
        return false;
    }else{
        console.log('sucessful to restart! COMMAND:' + startCommand)
        return true;
    }
}


function execScript(script){
    console.log("going to execute script:[" + script + "].......");   
    let result = exec(script);
    if (result.code !=0){
        console.log(result.stderr);   
        return false;
    }else{
        return true;
    }
}
function execReleaseScript(paramHelper, pathConfig){
    let script = pathConfig.scriptFile();
    let result = execScript(script);
    return result;
}



module.exports = {
    restartNPM: restartNPM,
    restartServer:restartServer,
    execReleaseScript:execReleaseScript,
   
}