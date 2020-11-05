/**
 * Created by Joezhang on 2019/11/21.
 */

/**
 * Created by Joezhang on 2018/11/21.
 */

require('shelljs/global');
yaml = require('node-yaml');



function executeCommand(command,commandTag){
    console.log('*************************************************************************');
    console.log('****************************** going to execute ' + commandTag + ' command:[' + command + "] *************");
    console.log('*************************************************************************');
    let result = exec(command);
    if (result.code !== 0) {
        console.log(result.stderr);
        console.log('*********************failed to excute '+ commandTag + ' command:[' + command + ']');
        return false;
    }
    console.log('*************************************************************************');
    console.log('*********************************finish to excute ' + commandTag + ' command *******************************');
    console.log('*************************************************************************');
    return true;
}


function executeScripts(paramsHelper,pathObj){
    console.log('*********************************begin to deploy k8s files !....******************************************');
    let result = true;
    let executeScripts = pathObj.executeScriptFiles();

    executeScripts.forEach(function(scriptFile){
        let grantPermissionCommand = "chmod +x " + scriptFile;
        let runScriptCommand = './' + scriptFile;
        
        if (!executeCommand(grantPermissionCommand,"grant the permission")){ result = false;}
        if(!executeCommand(runScriptCommand,"execute the script")){ result = false;}
    });
    console.log('*********************************finish to deploy config files !*****************************************');
    return result;
}




module.exports = {
    executeScripts: executeScripts,
    
}

