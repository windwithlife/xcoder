
var path = require('path');
var fs   = require('fs');
var codeTools = require('./code_tools');

 class ParamsHelper {
    
    constructor(){
        this.basePackage="com.simple.server.auto";
        this.apiServer ="127.0.0.1:8080";
        this.sideType ='web';
        this.language = 'js';
        this.framework='nextjs';
        this.platform ='all';
        console.log('init project config');
    }
    switchModulePackage(moduleName){
        this.basePackage= "com.simple.server.auto." + moduleName;
    }
    initParamsFromProject(setting){
        this.sideType = setting.sideType;
        this.language = setting.language;
        this.framework = setting.framework;
        this.platform  = setting.platform;
        this.projectId = setting.projectId;
        this.projectName = setting.projectName;
    }
    buildGenericParams(moduleName,defineName){
        let dname = "";
        if(defineName){
            dname = defineName;
        }
        let params = {
            projectId:this.projectId,
            projectName:this.projectName, 
            basePackage:this.basePackage, 
            packageName:this.basePackage,
            moduleName:moduleName,
            moduleNameClass:codeTools.firstUpper(moduleName),
            name: dname,
            nameClassName:codeTools.firstUpper(dname),
        }

        return params;
    }


    buildParamsForViewPage(moduleName,tableDefine){

        let params = this.buildGenericParams(moduleName,tableDefine.name);
        params.tableName = tableDefine.name;
        params.pageBasePath = "/" + moduleName + "/";
        params.pagePrefixName = tableDefine.name + "-";
        params.tableClassName = codeTools.firstUpper(tableDefine.name);
        params.refers = tableDefine.refers;
        params.fields = tableDefine.columns;
        params.fields.forEach(function(col){
            if(col.chooseCategory){
               col.needChoosed = true;
            }
            // Field Type
            //let fieldType = col.fieldType;
            let fieldColumnType = col.fieldType;
            if (col.fieldType == 'int'){col.fieldColumnType = 'Long'};
            if (col.fieldType == 'Text'){col.fieldColumnType = 'String'};
        });
        return params;

    }
    buildParamsForServerTable(moduleName,tableDefine){

        let params = this.buildGenericParams(moduleName,tableDefine.name);
        params.tableName = tableDefine.name;
        params.tableClassName = codeTools.firstUpper(tableDefine.name);
        params.requestDtoClassName = tableDefine.requestDtoClassName;
        params.responseDtoClassName = tableDefine.responseDtoClassName;
        params.responseListDtoClassName =tableDefine.responseListDtoClassName; 

        params.refers = tableDefine.refers;
        params.fields = tableDefine.columns;
        params.fields.forEach(function(col){
            if(col.chooseCategory){
               col.needChoosed = true;
            }
            // Field Type
            //let fieldType = col.fieldType;
            col.fieldTypeClassName = col.fieldColumnType = col.fieldType;
            if (col.fieldType == 'int'){col.fieldTypeClassName = 'Long'};
            if (col.fieldType == 'Text'){col.fieldTypeClassName = 'String'};
        });
        return params;

    }
    buildParamsByDomain(moduleName,defineData){
        let params = this.buildGenericParams(moduleName,defineData.name);
        let domainType = defineData.domainType;
        params.define = defineData;
        params.fields = defineData.tableFields;
        params.refers = defineData.refers;
        params.interfaces = defineData.interfaces;
        params.interfaces.forEach(function(interfaceObj){
            if(interfaceObj.requestMethod == 'get'){
                interfaceObj.requestMethodName = 'queryRaw';
                interfaceObj.requestMethodType = "GET";
            }else{
                interfaceObj.requestMethodName = 'postRaw';
                interfaceObj.requestMethodType = "POST";
            }
            interfaceObj.responseDataName = interfaceObj.name + 'Response';

            if(domainType=='module'){
                interfaceObj.declaredPath = "/" + interfaceObj.name;
                interfaceObj.requestPath = "/" + moduleName + "/" + interfaceObj.name;
            }else{
                interfaceObj.declaredPath = "/" + interfaceObj.name;
                interfaceObj.requestPath = "/" + moduleName + "/" + defineData.name+ "/" + interfaceObj.name;
            }
        })
        return params;
    }

    buildParamsByServiceInterfaces(moduleName,defineData){
        let params = this.buildGenericParams(moduleName,defineData.name);
        params.define = defineData;
        params.clientPath = "/v1/" + defineData.name;
        params.clientServiceEndPoint = "/" + defineData.endPoint;
        params.interfaces = defineData.clientInterfaces;
        params.interfaces.forEach(function(interfaceObj){
            let owner = interfaceObj.owner;
            if(interfaceObj.requestMethod == 'get'){
                interfaceObj.requestMethodName = 'query';
                interfaceObj.requestMethodType = "GET";
            }else{
                interfaceObj.requestMethodName = 'post';
                interfaceObj.requestMethodType = "POST";
            }
            interfaceObj.responseDataName = interfaceObj.name + 'Response';

            if(owner=='module'){
                interfaceObj.declaredPath = "/" + interfaceObj.name; 
            }else if(owner=='table'){
                interfaceObj.declaredPath = "/" + interfaceObj.ownerName + "/" + interfaceObj.name;
    
            }
        })
        return params;
    }

    buildParamsByDTO(moduleName,defineData){
        let params = this.buildGenericParams(moduleName,defineData.name);
        params.define = defineData;
        params.fields = defineData.defines;

        params.fields.forEach(function(col){
           
            col.fieldTypeClassName =col.fieldType = col.type;
            if (col.type == 'int'){col.fieldTypeClassName = 'Long'};
            if (col.type == 'Text'){col.fieldTypeClassName = 'String'};
            col.nameClassName = codeTools.firstUpper(col.name);
        });
        return params;

    }
    buildParamsByPage(moduleName,defineData){
        let params = this.buildGenericParams(moduleName,defineData.name);
        params.define = defineData;
        params.domains = [];
        params.interfaces = defineData.interfaces;
        params.interfaces.forEach(function(interfaceObj){
            interfaceObj.requestURL = interfaceObj.name;
            if(interfaceObj.requestMethod == 'get'){
                interfaceObj.requestMethodName = 'query';
                interfaceObj.requestMethodType = 'GET';
            }else{
                interfaceObj.requestMethodName = 'post';
                interfaceObj.requestMethodType = 'POST';
            }
            interfaceObj.responseDataName = interfaceObj.name + 'Response';
            
            let haveThisDomain = false;
            params.domains.forEach(function(domainItem){
                if(domainItem == interfaceObj.domain){
                    haveThisDomain = true;
                }
            });
            if (!haveThisDomain){
                params.domains.push(interfaceObj.domain);
            }

            interfaceObj.fullName = interfaceObj.domain + "." + interfaceObj.name;
            interfaceObj.resultDataObjName = interfaceObj.name + 'Response';
            interfaceObj.inputParamObjName = interfaceObj.name + "InputParam";
            interfaceObj.invokeName = interfaceObj.fullName  + "("+ interfaceObj.inputParamObjName +').then(this.composeResultData.bind(this,'+'"' +interfaceObj.resultDataObjName+ '"' +'))';

        })

        params.widgets = defineData.widgets;
        params.widgets.forEach(function(item){
            item.className =  codeTools.firstUpper(item.name);
            item.fileName =  item.name;
        });

        return params;

    }
    
}


module.exports = ParamsHelper;



