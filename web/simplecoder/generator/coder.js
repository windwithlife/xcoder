#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var NPM = (process.platform === 'win32') ? 'npm.cmd' : 'npm';
var mainGenerator = require('./lib/common_creator');

function init(isFromFiles, setting) {
    mainGenerator.initProject(isFromFiles,setting);
    console.log('initialize the project env!');
}

function initByWebQuery(setting) {
    mainGenerator.initProject(false,setting);
    console.log('initialize the project!');
}

function generator(cmdOptions,platformName, withframework) {
    //生成代码
    //verboseCommand = verbose ? ' --verbose' : '';
    mainGenerator.generateCode(cmdOptions, platformName, withframework);
}
function generateByWebQuery(params) {
    //生成代码
    //verboseCommand = verbose ? ' --verbose' : '';
    console.log('initialize the project and building.......!');
    //console.log(params);
    if ('project' == params.type){
        let project = params.defines;
        console.log(project);
        project.releases.forEach(function(release){
            console.log(release);
            release.projectName = project.name;
            mainGenerator.initProject(false,release);
            mainGenerator.generateCode(release);
        });      
    }else if('release' == params.type){
        let release = params.defines;
        console.log(release);
        mainGenerator.initProject(false,release);
        mainGenerator.generateCode(release);
    }
   
   
}
module.exports.init = init;
module.exports.generate = generator;
module.exports.initByQuery = initByWebQuery;
module.exports.generateByQuery = generateByWebQuery;
module.exports.usage = function(){return mainGenerator.generatorPromptMsg()};