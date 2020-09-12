/**
 * Created by Joezhang on 2019/11/21.
 */

require('shelljs/global');
// var PathConfig = require('./path_config');
// var ParamsHelper = require('./params_helper');
// pathConfig = new PathConfig();
// paramsHelper = new ParamsHelper();

/**
 * 对源代码进行编译构建
 */
function compileAndBuild(paramsHelper,pathConfig) {
    let workPath = pathConfig.releaseTargetSrcPath();
    let compileCommand = "";
    if (paramsHelper.isJava()) {
        compileCommand = 'docker run -i --rm  --name java-maven-project -v /root/.m2:/root/.m2 -v ' + workPath + ':/usr/src/mymaven -w /usr/src/mymaven maven:3.5.0-jdk-8-alpine sh -c "mvn clean install package -Dmaven.test.skip=true"';
    } else {
        compileCommand = 'docker run -i --rm  --name nodejs-project -v /root/.npm:/root/.npm -v ' + workPath + ':/usr/src/mynode -w /usr/src/mynode node:latest  sh -c "npm install && npm run build"';
    
    }
    console.log('compile command:' + compileCommand);
    let result = exec(compileCommand);
    if (result.code !== 0) {
        console.log(result.stderr);
        console.log('failed to compile sourcecode, release is stopped!  compile command:[' + compileCommand + ']');
       
        return false;
    }
    return true;

}

module.exports = {
    build: compileAndBuild,
}