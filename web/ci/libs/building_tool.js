/**
 * Created by Joezhang on 2019/11/21.
 */

require('shelljs/global');
// var PathConfig = require('./path_config');
// var ParamsHelper = require('./params_helper');
// pathConfig = new PathConfig();
// paramsHelper = new ParamsHelper();

function execCommand(command,commandTag){
    console.log('****************************** going to execute command:[' + command + "] *************");
    let result = exec(command);
    if (result.code !== 0) {
        console.log(result.stderr);
        console.log('*********************failed to excute'+ commandTag + ' command:[' + command + ']');
        return false;
    }
    console.log('*********************************finish to excute command *******************************');
    return true;
}

function compileJava(workPath){
    let compileCommand = 'docker run -i --rm  --name java-maven-project -v /root/.m2:/root/.m2 -v ' + workPath + ':/usr/src/mymaven -w /usr/src/mymaven maven:3.5.0-jdk-8-alpine sh -c "mvn clean install package -Dmaven.test.skip=true"';
    return execCommand(compileCommand);
}


function compileNodeNext(workPath){
    let compileCommand = 'docker run -i --rm  --name nodejs-project -v /root/.npm:/root/.npm -v ' + workPath + ':/usr/src/mynode -w /usr/src/mynode node:latest  sh -c "npm install && npm run build"';
    return execCommand(compileCommand);
}

function compilePython(workPath){
    let compileCommand = 'docker run -i --rm  --name nodejs-project -v /root/.npm:/root/.npm -v ' + workPath + ':/usr/src/mynode -w /usr/src/mynode node:latest  sh -c "npm install && npm run build"';
    return execCommand(compileCommand);
}

function compileJavaApplication(){
    let result = false;
    let interfacePath = pathConfig.interfacePath();
    if (pathConfig.pathIsReady(interfacePath)){
        result = compileJava(interfacePath);
    }
    let applicationPath = pathConfig.releaseTargetSrcPath();
    result = compileJava(applicationPath);
    return result;
    
}
function compileNodeNextApplication(){
    let applicationPath = pathConfig.releaseTargetSrcPath();
    result = compileNodeNext(applicationPath);
    return result;
    
}
function compilePythonApplication(){
    let applicationPath = pathConfig.releaseTargetSrcPath();
    result = compilePython(applicationPath);
    return result;
    
}
/**
 * 对源代码进行编译构建
 */
function compileAndBuild(paramsHelper,pathConfig) {
    if (paramsHelper.isJava()) {
        return compileJavaApplication();
    }else{
        return compileNodeNextApplication();
    }
   
    // let workPath = pathConfig.releaseTargetSrcPath();
    // let compileCommand = "";
    // if (paramsHelper.isJava()) {
    //     compileCommand = 'docker run -i --rm  --name java-maven-project -v /root/.m2:/root/.m2 -v ' + workPath + ':/usr/src/mymaven -w /usr/src/mymaven maven:3.5.0-jdk-8-alpine sh -c "mvn clean install package -Dmaven.test.skip=true"';
    // } else {
    //     compileCommand = 'docker run -i --rm  --name nodejs-project -v /root/.npm:/root/.npm -v ' + workPath + ':/usr/src/mynode -w /usr/src/mynode node:latest  sh -c "npm install && npm run build"';
    
    // }
    // return execCommand(compileCommand);
    
}

module.exports = {
    build: compileAndBuild,
}