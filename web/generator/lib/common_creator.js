var path = require('path');
var fs = require('fs');
var codeTools = require('./code_tools');
var ModuleDefine = require('./module_define');
var ProjectConfig = require('./project_config');
var Archiver = require('./archiver');
var archiver = new Archiver();
var moduleDefines = new ModuleDefine();
var projectConfig = new ProjectConfig();
var git_helper = require('../../ci/libs/git-tool');

var generatorList = [];
//var moduleDefines = {basePackage:"com.simple.bz",apiServer:"127.0.0.1:8080",enables: [], modules: {}};

var config = {
    workRootPath: process.cwd(),
    workModulesPath: function () {return path.join(this.workRootPath, "generator/modules/")},
    workContractsPath: function () {return path.join(this.workRootPath, "generator/contracts/")},
    rootGeneratorsPath: function () {return path.join(this.workRootPath,"generator/lib/generators/");},
};


function findGeneratorByName(name) {
    var foundGenerator;
    generatorList.forEach(function (generator) {
        if (generator.coderDefine.name == name) {
            foundGenerator = generator;
            return;
        }
    });

    return foundGenerator;
}
function generatorPromptMsg(name) {
    var msg = 'Usage:\n';
    generatorList.forEach(function (generator) {
        var cmd = generator.coderDefine.name;
        var desc = generator.coderDefine.name;
        msg = msg + "Command:[" + cmd + "] --Function:" + desc + "\n";
    });

    return msg;
}

function loadGenerators() {
    var mPath = config.rootGeneratorsPath();
    var files = fs.readdirSync(mPath);
    files.forEach(function (file) {
        var filePath = path.join(mPath, file);
        //console.log("generater file:" + filePath);
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()) {
            var generator = require(filePath);
            if (!generator.coderDefine) {
                return;
            }
            if (!generator.coderDefine.name) {
                return;
            }
            generatorList.push(generator);
        }
    });
}
function initGenerators() {
    initPathEnv();
    loadGenerators();
}
function initPathEnv() {
    var currentPath = process.cwd() + "/";
    console.log("currentPath is:" + currentPath);
    config.workRootPath = currentPath;
}

function initProject(isFromFiles, releaseData) {
    initGenerators();
    if (isFromFiles==true){
        moduleDefines.loadDefinesFromFiles(config.workModulesPath());
        moduleDefines.loadContractsFromFiles(config.workContractsPath());
    }else{
        //moduleDefines.loadDefinesFromParams(setting.projectSetting, setting.modules);
        moduleDefines.loadDefinesFromParams(releaseData);
        projectConfig.initFromSettingParams(releaseData);
    }
    console.log("finished init project ! new project!");
}
function getSelectorName(targetConfig){
    let generatorSelector = targetConfig.sideType + '-' + targetConfig.language;
    
    if (!targetConfig.sideType){
        targetConfig.sideType = 'web';
    }
    if ((!targetConfig.framework)|| (targetConfig.framework=='-1')){
        generatorSelector = generatorSelector + '-' + 'none';
    }else{
        generatorSelector = generatorSelector + '-' + targetConfig.framework;
    }
    if ((!targetConfig.platform)||(targetConfig.platform=='-1')){
        generatorSelector = generatorSelector + '-' + 'all';
       
    }else{
        generatorSelector = generatorSelector + '-' +  targetConfig.platform;
    }
   
    //generatorSelector = targetConfig.sideType + '-' + targetConfig.language + '-' + targetConfig.framework + targetConfig.platform;
    console.log(generatorSelector);
    return generatorSelector;
}
function generateCode(release) {
    console.log('begin to create code!');
    //let targetOptions = release;
    console.log(release);
    
    initGenerators();
    
    var generator = findGeneratorByName(getSelectorName(release));
    //console.log(generator);
    if (!generator) {
        console.log("Generator named:[" + release.language + "] not found!");
        return;
    }

    let gitWorkPath = path.join(process.cwd(), "../../projects/");

    git_helper.pushPrepare(gitWorkPath);
    generator.initEnv(release);


    //if ((targetOptions.hasFramework) && (targetOptions.hasFramework == true)){   
    generator.generateFramework(release);
    //}

    // if ((targetOptions.hasCommon) && (targetOptions.hasCommon == true)){   
    //     generator.generateCommon();
    // }
   
    // moduleDefines.getProjectSetting().enables.forEach(function (moduleName) {
    //     generator.generateModuleByName(moduleName, moduleDefines.getModuleDefineByName(moduleName),platformName);
    // });
    //console.log(moduleDefines.defines);
  
    //moduleDefines.defines.forEach(function (module) {
    generator.generateModuleByName(moduleDefines.defines);
    //});

    //生成代碱后，压缩上传到服务器，方便下载源代码
    if (generator.sources){
        let zipFile = "application-" +  release.name + "-" + release.id + "-" + release.sideType + "-" + release.language  + ".zip";
        let sources = generator.sources();
        //archiver.compress(sources,zipFile);
        console.log(sources);
    }
    // moduleDefines.contracts.forEach(function (contractName) {
    //     generator.generateContractByName(contractName, moduleDefines.getServiceContractDefineByName(contractName),platformName);
    // });
    
    git_helper.pushDo(gitWorkPath);

    console.log("generated code by define file in modules directory\n");

}

exports.generateCode = generateCode;
exports.generatorPromptMsg = generatorPromptMsg;
exports.initProject = initProject;





