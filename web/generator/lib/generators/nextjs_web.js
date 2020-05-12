
var path = require('path');
var fs   = require('fs');
var codeTools = require('../code_tools');
var xtools = require('../xtools');
var PathConfig = require('../path_config');
var ParamsHelper = require('../params_helper');
var archiver = require('../archiver');
pathConfig = new PathConfig();
paramsHelper = new ParamsHelper();

function createStore(moduleName,defineData){
    let templateFilename =   "/model.js";
    let targetFileName = codeTools.firstUpper(defineData.name) + "Store.js";

    templateFilename = pathConfig.templateModel() + templateFilename ;
    targetFileName   = pathConfig.targetModel(moduleName)+ targetFileName;
    var params = paramsHelper.buildParamsByDomain(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};


function createBaseStore(moduleName,defineData){
    let templateFilename =   "/model.js";
    let targetFileName = codeTools.firstUpper(defineData.name) + "Store.js";

    templateFilename = pathConfig.templateModel() + templateFilename ;
    targetFileName   = pathConfig.targetModel(moduleName)+ targetFileName;
    var params = paramsHelper.buildParamsByDomain(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};

function generatePage(moduleName,defineData){
    let targetFileName = pathConfig.targetView(moduleName) + codeTools.firstUpper(defineData.name) + ".js";
    templateText = defineData.defineText;
    var params = paramsHelper.buildParamsByPage(moduleName,defineData);
    codeTools.generateCodeFileByText(templateText,params,targetFileName);

};
function createView(moduleName,tableDefine,viewName){
    let templateFilename =  viewName + ".js";
    let targetFileName = tableDefine.name + "_"+viewName + ".js";

    templateFilename = pathConfig.templateView() + templateFilename ;
    targetFileName   = pathConfig.targetView(moduleName)+ targetFileName;
    var params = paramsHelper.buildParamsForViewPage(moduleName,tableDefine);
    codeTools.generateCode(templateFilename,params,targetFileName);
};




function generateStoreByInterfaces(moduleName,defines){
    //createModel(moduleName,tableDefine);
    createStore(moduleName,defines);
}

function generateModuleByName(moduleDefine){
    
    console.log('module defines:' + JSON.stringify(moduleDefine));
    //createView(moduleDefine.name,moduleDefine,'module_home');
     moduleDefine.tables.forEach(function(table){
         createView(moduleDefine.name,table,'home');
         createView(moduleDefine.name,table,'detail');
         createView(moduleDefine.name,table,'add');
         createView(moduleDefine.name,table,'edit');
         //createBaseStore(moduleDefine.name,table);
     });
    moduleDefine.storeDomains.forEach(function(domainItem){
        generateStoreByInterfaces(moduleDefine.name,domainItem);
    });

    moduleDefine.pages.forEach(function(pageItem){
        generatePage(moduleDefine.name,pageItem);
    });

    archiver.compress(pathConfig.targetRoot()+ "/**", "test.zip");
    
}


function generateFramework(){
   
    xtools.copyDirEx(pathConfig.templateCopyFiles(),pathConfig.targetCopyFiles());
}


function initPathEnv(proConfig){
   
    pathConfig.initWithRootPath("/pages/",proConfig);
    paramsHelper.initParamsFromProject(proConfig);
    projectConfig = proConfig;
    console.log("workRootPath:" + pathConfig.rootPath()+'templateroot' + pathConfig.templateRoot()+ "Code-targetServerPath:" + pathConfig.targetRoot());   
}

exports.generateFramework = generateFramework;
exports.generateModuleByName = generateModuleByName;
//exports.generateCommon = generateCommon;
exports.initEnv = initPathEnv;

exports.coderDefine = {name:"web-reactjs-nextjs-all",desc:"create a react js framework and related project code"};


