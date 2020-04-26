/**
 * Created by zhangyq on 2016/5/1.
 */

var path = require('path');
var ejsTool = require('ejs');
var fs       = require('fs');



function generateCodeFileByTemplateText(templateText, params, outFile){
    //console.log("Generate source template file*:[[" + templateFile + "]]")
    console.log("***********Begin to Generate source file************[[" + outFile + "]]" );
    //console.log("The Template file---------:[[" + templateFile + "]]")
    console.log("The PARAMS transfered to template:");
    //console.log(params);
    console.log(JSON.stringify(params));

    var strResult = ejsTool.render(templateText, {data: params});
    fs.writeFileSync(outFile,strResult,'utf-8');

    console.log("***********Finished to Generate source file************[[" + outFile + "]]" );
}

function generateCodeTextByTemplateText(templateText, params){
    //console.log("Generate source template file*:[[" + templateFile + "]]")
    console.log("\r\n");
    console.log("***********Begin to create code Text************");
    console.log("The PARAMS transfered to template:");
    console.log(JSON.stringify(params));

    var strResult = ejsTool.render(templateText, {data: params});
    fs.writeFileSync(outFile,strResult,'utf-8');

    console.log("***********Finished to create code Text************");
    console.log("\r\n");
}

function generateCodeFileByTemplateFile(templateFile, params, outFile){
    console.log("\r\n");
    console.log("***********Begin to Generate source file************[[" + outFile + "]]" );
    console.log("The Template file---------:[[" + templateFile + "]]")
    console.log("The PARAMS transfered to template:");
    //console.log(params);
    console.log(JSON.stringify(params));

    var temple = fs.readFileSync(templateFile, 'utf-8');
    var strResult = ejsTool.render(temple, {data: params});
    fs.writeFileSync(outFile,strResult,'utf-8');

    console.log("***********Finished to Generate source file************[[" + outFile + "]]" );
    console.log("\r\n");
}
function generateH5Code(templateFile, params, outFile){
    var temple = fs.readFileSync(templateFile, 'utf-8');
    var strResult = ejsTool.render(temple, {data: params},{delimiter: '?'});
    fs.writeFileSync(outFile,strResult,'utf-8');
}
//create directory sync
function createDirectory(dirName){
    console.log("------------begin to create directory:" + dirName);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
        console.log("------------successful to create directory:" + dirName);
    }
}
function testInRightCoderPath(){
    var currentPath = process.cwd();
    var coderFilePath = currentPath + "/node_modules/simple-coder/coder.js";
    if (fs.existsSync(root)) {
       return true;
    }else{
        console.log('you should execute COMMAND:[simple-coder] in right project path! please check that before do a job!');
        return false;
    }
}

function firstUpper(input){
    var strTemp = "";
    for (var i =0; i <input.length; i++){
       if (i==0){
           strTemp += input[i].toUpperCase();
           continue;
       }
        strTemp += input[i];

    }
    return strTemp;
}

exports.generateCode = generateCodeFileByTemplateFile;
exports.generateCodeFileByText = generateCodeFileByTemplateText;
exports.generateCodeTextByText = generateCodeTextByTemplateText;
exports.generateH5Code = generateH5Code;
exports.createDirectory = createDirectory;
exports.firstUpper = firstUpper;

