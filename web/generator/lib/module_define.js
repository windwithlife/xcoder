/**
 * Created by zhangyq on 2016/5/1.
 */

var path = require('path');
var fs = require('fs');
var codeTools = require('./code_tools');

function firstUpperCase(str) {
    if (!str) {
        return ''
    }
    let strResult = str.substring(0, 1).toUpperCase() + str.substring(1);
    return strResult;
}

class ModuleDefines {
    constructor() {
        this.pSetting = {};
        this.pSetting.basePackage = "com.simple.bz.auto";
        this.pSetting.apiServer = "127.0.0.1:8080";
        this.pSetting.enables = [];
        this.modules = {};
        this.contracts = {};
        this.defines = [];
        console.log('initialize the ModuleDefines!');
    }

    addModuleDefine(moduleName, moduleDefine) {
        this.modules[moduleName] = moduleDefine;
    }
    getProjectSetting() {
        return this.projectSetting;
    }
   
    modules() {
        return this.defines;
    }

   

    loadDefinesFromParams(release) {

        // let that = this;
        // console.log(release);
        // release.modules.forEach(function (module) {
        //     module.pages = release.pages;
        //     that.adjustModulesData(module);
        // });
        this.defines = release.module;
        this.defines.pages = release.pages;
        this.adjustModulesData(this.defines);
    }
    parseInterfaceParams(params) {
        let fields = [];
        for (let param in params) {
            let className = codeTools.firstUpper(param);
            fields.push({ name: param, className: className, type: params[param] });
        }
        return fields;
    }
    buildInterface(name,method,inputType,outputType,ownerName){
        let interfaceItem={name:name};
        interfaceItem.inputType =inputType;
        interfaceItem.inputName = 'inputObj';
        interfaceItem.outputType = outputType;
        interfaceItem.outputName = 'outputObj';
        interfaceItem.requestMethod = method;
        interfaceItem.owner = 'table';
        interfaceItem.ownerName = ownerName;
        return interfaceItem;
    }
    adjustModulesData(module) {
        let that = this;
        module.domains = [];
        module.tableDomains = [];
        module.moduleDomains = [];
        module.storeDomains = [];
        module.dtos = [];
        module.refers = [];
        
        //调整table及列数据：
        module.tables.forEach(function (table) {
            table.refers = [];
            console.log('table info ************################');
            //建立模块与表的引用相关性，用于创建与模块相关的实体。
            let tableClassName = codeTools.firstUpper(table.name);
            module.refers.push({ name: table.name, className:tableClassName, mapType: "OneToMany"});
            //console.log(table);
            table.columns.forEach(function (col) {
                let clsName = codeTools.firstUpper(col.name);
                col.nameClassName = clsName;
                //let fieldType = col.fieldType;
                //let fieldName = codeTools.firstUpper(col.name);
                if (!col.description){
                    col.description = codeTools.firstUpper(col.name);
                }

                col.mapType = "NULL";
                if (col.referModule) {
                    let referModuleClass = codeTools.firstUpper(col.referModule);
                    if (col.map == 1) { col.mapType = "OneToMany"; }
                    if (col.map == 2) { col.mapType = "ManyToOne"; }
                    if (col.map == 3) { col.mapType = "ManyToMany"; }
                    if (col.map == 0) { col.mapType = "OneToOne"; }
                    col.referModuleClassName = referModuleClass;
                    table.refers.push({ name: col.referModule,nameClassName:referModuleClass, className: referModuleClass, mapType: col.mapType });
                }
            });

            
        });

        //分新表对应的缺省的DTOs及缺省接口创建。
        module.tables.forEach(function (table) {
           
            console.log('开始生成表对应的缺省的DTO及缺省创建的接口 ************################');
            console.log(table.columns);
            //console.log(table);
            let requestDtoDefines = [];
            let responseDtoDefines = [];
            table.columns.forEach(function (col) {
                let clsName = codeTools.firstUpper(col.name);
                let fieldType = col.fieldType;
                let fieldName = col.name;
                requestDtoDefines.push({ name: fieldName, className: clsName, type: fieldType });
                if (col.referModule) {
                    if ((col.map == 1) || (col.map == 3)) {
                        fieldType = "List<" + referModuleClass + ">";
                        fieldName = col.referModule + 's';
                    } else if (col.map == 2) {
                        fieldName = col.referModule + "Id";
                        fieldType = 'Long';
                    }
                }
                clsName = codeTools.firstUpper(fieldName);
                responseDtoDefines.push({ name: fieldName, className: clsName, type: fieldType });

            });

            //识别DTOs
            let requestDtoName = table.name + "Request";
            let requestDtoClass = codeTools.firstUpper(requestDtoName);
            let requestDto = { name: requestDtoName,nameClassName:requestDtoClass, className: requestDtoClass,type:'request',defines: requestDtoDefines };
            module.dtos.push(requestDto);
            let responseDtoName = table.name + "Response";
            let responseDtoClass = codeTools.firstUpper(responseDtoName);
            let responseDto = { name: responseDtoName,nameClassName:responseDtoClass, className: responseDtoClass, type:'response',defines: responseDtoDefines };
            module.dtos.push(responseDto);
            let responseListDtoName = table.name + "sResponse";
            let responseListDtoClass = codeTools.firstUpper(responseListDtoName);
            let fieldDefines = [];
            fieldDefines.push({ name: "itemsCount", className: "ItemsCount", type: "int"})
            fieldDefines.push({ name: 'items', className: "Items", type: "List<"+ responseDtoClass +">" })
            let responseListDto = { name: responseListDtoName,nameClassName: responseListDtoClass,className: responseListDtoClass, type:'response',defines: fieldDefines};
            module.dtos.push(responseListDto);
           
            
            let domainClassName = codeTools.firstUpper(table.name);
            let domainItem = { name: table.name, domainType: 'table', nameClassName: domainClassName, domainId: table.id, tableFields: table.columns, refers: table.refers };
            

            //创建缺省的接口,用于生成微服务的内部调用client.
            domainItem.interfaces = [];
            // domainItem.interfaces.push(that.buildInterface("queryAll","get","",responseListDtoClass,table.name));
            // domainItem.interfaces.push(that.buildInterface("queryById","get","Long",responseDtoClass,table.name));
            // domainItem.interfaces.push(that.buildInterface("save","post",requestDtoClass,responseDtoClass,table.name));
            // domainItem.interfaces.push(that.buildInterface("update","post",requestDtoClass,responseDtoClass,table.name));
            // domainItem.interfaces.push(that.buildInterface("remove","post","Long","Long",table.name));
            module.tableDomains.push(domainItem);

            table.requestDtoClassName = requestDtoClass;
            table.responseDtoClassName = responseDtoClass;
            table.responseListDtoClassName = responseListDtoClass;

        });
        //分析各接口中的输入输出参数形成DTO对象定义项。
        module.interfaces.forEach(function (interfaceItem) {
            interfaceItem.owner = 'module';
            interfaceItem.ownerName = module.name;
            interfaceItem.inputType = '';
            if (interfaceItem.inputParams) {
                console.log(interfaceItem.inputParams);
                let params = that.parseInterfaceParams(JSON.parse(interfaceItem.inputParams));
                console.log(params);
                if (params.length == 1) {
                    interfaceItem.inputType = params[0].type;
                    interfaceItem.inputName = params[0].name;
                } else if (params.length > 1) {
                    let requestName = interfaceItem.name + 'Request';
                    let requestNameClass = firstUpperCase(requestName);
                    let inputDTO = { name: requestName, className: requestNameClass,nameClassName:requestNameClass, defines: params };
                    module.dtos.push(inputDTO);
                    interfaceItem.inputType = requestNameClass;

                }

            }
            interfaceItem.outputType = '';
            if (interfaceItem.outputParams) {
                console.log(interfaceItem.outputParams);
                let params = that.parseInterfaceParams(JSON.parse(interfaceItem.outputParams));
                console.log(params);
                if (params.length == 1) {
                    interfaceItem.outputType = params[0].type;
                    interfaceItem.outputName = params[0].name;
                } else if (params.length > 1) {
                    let responseName = interfaceItem.name + 'Response';
                    let responseNameClass = firstUpperCase(responseName);
                    let outputDTO = { name: responseName, className: responseNameClass,nameClassName:responseNameClass,defines: params };
                    module.dtos.push(outputDTO);
                    interfaceItem.outputType = responseNameClass;
                }

            }

        });

        let moduleDomainName= module.name;
        let moduleDomainClassName= codeTools.firstUpper(moduleDomainName);
        let moduleDomain= { name: moduleDomainName, domainType: 'module', nameClassName: moduleDomainClassName,interfaces:module.interfaces,tableFields:[],refers:module.refers};
        
        module.domains = module.tableDomains;

        module.moduleDomain= moduleDomain;
        module.domains.push(moduleDomain);
        module.storeDomains = module.domains;
        module.clientInterfaces = [];
        module.domains.forEach(function(domainItem){
            module.clientInterfaces = module.clientInterfaces.concat(domainItem.interfaces);
        })
        console.log('**************************' + module.name + '模块的所有域 Begin**********************');
        console.log(module.domains);
        console.log('**************************' + module.name + '模块的所有域 End**********************');

    }
    loadDefinesFromFiles(moduleDefinePath) {

        var that = this;
        var mPath = moduleDefinePath;
        var files = fs.readdirSync(mPath);
        files.forEach(function (file) {
            var filePath = mPath + file;
            var stats = fs.statSync(filePath);
            if (!stats.isDirectory()) {
                var mdefine = require(filePath);
                if (!mdefine.name) {
                    return;
                }
                console.log(filePath);
                var moduleName = mdefine.name;
                that.modules[moduleName] = mdefine;
            }
        });

        var setting = require(mPath + "config");
        this.projectSetting = setting;
        this.adjustData();

    }
    loadContractsFromFiles(moduleDefinePath) {

        var that = this;
        var mPath = moduleDefinePath;
        var files = fs.readdirSync(mPath);
        files.forEach(function (file) {
            var filePath = mPath + file;
            var stats = fs.statSync(filePath);
            if (!stats.isDirectory()) {
                var mdefine = require(filePath);
                if (!mdefine.name) {
                    return;
                }
                console.log(filePath);
                var service_name = mdefine.namespace + mdefine.service_name;
                that.contracts[service_name] = mdefine;
            }
        });

        this.adjustContractsData();

    }
  
    adjustData() {
        for (var moduleName in this.modules) {
            var module = this.modules[moduleName];
            this.adjustFields(module);

        }
    }

   
  
}
module.exports = ModuleDefines;

